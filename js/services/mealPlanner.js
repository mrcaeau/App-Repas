// Algorithme de sélection intelligente de repas avec optimisation sous contrainte du PRIX TOTAL EN CAISSE
// Mutualise intelligemment les ingrédients achetés pour toujours respecter le budget indiqué.

import { RECIPES_DATA, DEFAULT_PRICE_INDEX } from "../data/recipes.js";
import { groceryListService } from "./groceryList.js";

export class MealPlanner {
  constructor(baseRecipes = RECIPES_DATA) {
    this.baseRecipes = baseRecipes;
    this.externalRecipes = [];
  }

  setExternalRecipes(recipes = []) {
    this.externalRecipes = recipes;
  }

  getAllRecipes() {
    return [...this.baseRecipes, ...this.externalRecipes];
  }

  calculateCostPerServing(recipe) {
    let totalPerServing = 0;
    for (const ing of recipe.ingredients) {
      const priceMeta = DEFAULT_PRICE_INDEX[ing.name];
      if (priceMeta && priceMeta.unitPrice) {
        totalPerServing += ing.amountPerPerson * priceMeta.unitPrice;
      } else if (ing.packagePrice && ing.packageSize) {
        totalPerServing += (ing.amountPerPerson * ing.packagePrice) / ing.packageSize;
      } else {
        totalPerServing += 0.45;
      }
    }
    return Math.round(totalPerServing * 100) / 100;
  }

  calculateMealCost(recipe, servings = 2) {
    return Math.round(this.calculateCostPerServing(recipe) * servings * 100) / 100;
  }

  isApplianceCompatible(recipe, availableAppliances = ["plaques", "four", "microondes"]) {
    if (!recipe.appliances || recipe.appliances.length === 0) return true;
    return recipe.appliances.some(app => availableAppliances.includes(app));
  }

  isServingsCompatible(recipe, servings = 1) {
    const min = recipe.minServings || 1;
    return servings >= min;
  }

  /**
   * Calcule le coût réel du ticket de caisse pour une liste de recettes donnée
   */
  getStoreCartCost(meals, servings = 1, pantryChecked = new Set()) {
    const grocery = groceryListService.generateGroceryList(meals, servings, pantryChecked);
    return grocery.finalCheckoutCost;
  }

  /**
   * Générateur de planning optimisé sur le PRIX TOTAL DU PANIER EN CAISSE
   * Utilise un algorithme glouton à coût incrémental minimal pour mutualiser les ingrédients
   */
  generatePlan({
    mealCount = 7,
    servings = 1,
    targetBudget = 30,
    filter = "all",
    availableAppliances = ["plaques", "four", "microondes"],
    pantryChecked = new Set()
  }) {
    const all = this.getAllRecipes();

    // 1. Filtrer les recettes compatibles avec l'électroménager et les portions
    let pool = all.filter(recipe => {
      if (!this.isApplianceCompatible(recipe, availableAppliances)) return false;
      if (!this.isServingsCompatible(recipe, servings)) return false;

      if (filter === "all") return true;
      if (filter === "vege") return recipe.diet === "vegetarien";
      if (filter === "express") return recipe.prepTime + recipe.cookTime <= 20;
      if (filter === "eco") return this.calculateCostPerServing(recipe) <= 2.20;
      if (filter === "poisson") return recipe.category === "poisson";
      return true;
    });

    if (pool.length < mealCount) {
      pool = all.filter(r => this.isApplianceCompatible(r, availableAppliances) && this.isServingsCompatible(r, servings));
    }
    if (pool.length < mealCount) {
      pool = all;
    }

    // 2. Optimisation gloutonne incrémentale : 120 itérations avec sélection à coût minimal
    let validPlans = [];
    let lowestCostPlan = null;
    let minOverheadCost = Infinity;

    const ATTEMPTS = 120;
    for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      let chosen = [shuffled[0]];

      while (chosen.length < mealCount) {
        let bestNext = null;
        let lowestIncremental = Infinity;

        // Trouver le plat qui ajoute le moins de surcoût au ticket de caisse
        for (const cand of shuffled) {
          if (chosen.some(c => c.id === cand.id)) continue;
          const costWithCand = this.getStoreCartCost([...chosen, cand], servings, pantryChecked);
          if (costWithCand < lowestIncremental) {
            lowestIncremental = costWithCand;
            bestNext = cand;
          }
        }

        if (bestNext) {
          chosen.push(bestNext);
        } else {
          break;
        }
      }

      if (chosen.length === mealCount) {
        const finalCost = this.getStoreCartCost(chosen, servings, pantryChecked);

        if (finalCost <= targetBudget) {
          validPlans.push({ meals: chosen, finalCost });
        }

        if (finalCost < minOverheadCost) {
          minOverheadCost = finalCost;
          lowestCostPlan = { meals: chosen, finalCost };
        }
      }
    }

    // Sélection finale : privilégie un plan strictement sous budget si disponible
    let chosenPlan = null;
    if (validPlans.length > 0) {
      chosenPlan = validPlans[Math.floor(Math.random() * validPlans.length)];
    } else if (lowestCostPlan) {
      chosenPlan = lowestCostPlan;
    } else {
      chosenPlan = {
        meals: pool.slice(0, mealCount),
        finalCost: this.getStoreCartCost(pool.slice(0, mealCount), servings, pantryChecked)
      };
    }

    const enriched = chosenPlan.meals.map(recipe => ({
      ...recipe,
      costPerServing: this.calculateCostPerServing(recipe),
      mealTotalCost: this.calculateMealCost(recipe, servings)
    }));

    const finalCheckoutCost = this.getStoreCartCost(enriched, servings, pantryChecked);
    const totalRealCost = Math.round(enriched.reduce((acc, m) => acc + m.mealTotalCost, 0) * 100) / 100;

    return {
      meals: enriched,
      totalRealCost,
      finalCheckoutCost,
      servings,
      mealCount,
      targetBudget,
      isUnderBudget: finalCheckoutCost <= targetBudget,
      budgetDifference: Math.round((targetBudget - finalCheckoutCost) * 100) / 100
    };
  }

  /**
   * Permute une recette tout en veillant à ne pas dépasser le budget du panier en caisse
   */
  swapMeal(currentMealId, currentMealList, {
    servings = 1,
    targetBudget = 30,
    filter = "all",
    availableAppliances = ["plaques", "four", "microondes"],
    pantryChecked = new Set()
  }) {
    const existingIds = new Set(currentMealList.filter(m => m.id !== currentMealId).map(m => m.id));
    const all = this.getAllRecipes();

    const candidates = all.filter(recipe => {
      if (existingIds.has(recipe.id)) return false;
      if (!this.isApplianceCompatible(recipe, availableAppliances)) return false;
      if (!this.isServingsCompatible(recipe, servings)) return false;

      if (filter === "all") return true;
      if (filter === "vege") return recipe.diet === "vegetarien";
      if (filter === "express") return recipe.prepTime + recipe.cookTime <= 20;
      if (filter === "eco") return this.calculateCostPerServing(recipe) <= 2.20;
      return true;
    });

    if (candidates.length === 0) return null;

    const otherMeals = currentMealList.filter(m => m.id !== currentMealId);

    let bestCandidate = null;
    let lowestCost = Infinity;

    for (const cand of candidates) {
      const trialCartCost = this.getStoreCartCost([...otherMeals, cand], servings, pantryChecked);

      if (trialCartCost <= targetBudget) {
        return {
          ...cand,
          costPerServing: this.calculateCostPerServing(cand),
          mealTotalCost: this.calculateMealCost(cand, servings)
        };
      }

      if (trialCartCost < lowestCost) {
        lowestCost = trialCartCost;
        bestCandidate = cand;
      }
    }

    const picked = bestCandidate || candidates[0];
    return {
      ...picked,
      costPerServing: this.calculateCostPerServing(picked),
      mealTotalCost: this.calculateMealCost(picked, servings)
    };
  }
}

export const mealPlanner = new MealPlanner();
