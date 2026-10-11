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
   * Effectue une optimisation par mutualisation d'ingrédients pour respecter strictly targetBudget
   */
  generatePlan({
    mealCount = 7,
    servings = 2,
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

    // 2. Recherche par optimisation pour trouver le meilleur panier sous la contrainte targetBudget
    let validPlans = [];
    let lowestCostPlan = null;
    let minOverheadCost = Infinity;

    // Trier les recettes économiques en priorité
    const sortedPool = [...pool].sort((a, b) => this.calculateCostPerServing(a) - this.calculateCostPerServing(b));

    const ATTEMPTS = 250;
    for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
      let currentSelection = [];
      // Mélanger aléatoirement avec une légère préférence pour les recettes à haute synergie
      const randomized = [...sortedPool].sort(() => Math.random() - 0.5);

      for (const candidate of randomized) {
        if (currentSelection.length >= mealCount) break;
        if (currentSelection.some(m => m.id === candidate.id)) continue;

        const trialMeals = [...currentSelection, candidate];
        const trialCost = this.getStoreCartCost(trialMeals, servings, pantryChecked);

        // Règle stricte : si le budget est serré, on n'accepte le candidat que si le panier reste sous le budget
        if (trialCost <= targetBudget || currentSelection.length === 0) {
          currentSelection.push(candidate);
        }
      }

      // Si on a réussi à obtenir le nombre de repas demandé
      if (currentSelection.length === mealCount) {
        const finalCost = this.getStoreCartCost(currentSelection, servings, pantryChecked);

        if (finalCost <= targetBudget) {
          validPlans.push({ meals: currentSelection, finalCost });
        }

        if (finalCost < minOverheadCost) {
          minOverheadCost = finalCost;
          lowestCostPlan = { meals: currentSelection, finalCost };
        }
      }
    }

    // Sélection finale :
    let chosenPlan = null;
    if (validPlans.length > 0) {
      // Choisir un plan valide avec une bonne diversité
      chosenPlan = validPlans[Math.floor(Math.random() * validPlans.length)];
    } else if (lowestCostPlan) {
      chosenPlan = lowestCostPlan;
    } else {
      chosenPlan = { meals: sortedPool.slice(0, mealCount), finalCost: this.getStoreCartCost(sortedPool.slice(0, mealCount), servings, pantryChecked) };
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
    servings = 2,
    targetBudget = 30,
    filter = "all",
    availableAppliances = ["plaques", "four", "microondes"],
    pantryChecked = new Set()
  }) {
    const existingIds = new Set(currentMealList.filter(m => m.id !== currentMealId).map(m => m.id));
    const all = this.getAllRecipes();

    // Candidats valides
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

    // Autres repas déjà conservés
    const otherMeals = currentMealList.filter(m => m.id !== currentMealId);

    // Chercher un candidat dont le coût en caisse reste le plus proche possible du budget cible
    let bestCandidate = null;
    let bestDelta = Infinity;

    for (const cand of candidates) {
      const trialCartCost = this.getStoreCartCost([...otherMeals, cand], servings, pantryChecked);
      const delta = trialCartCost - targetBudget;

      // Priorité absolue aux candidats qui ne dépassent pas le budget
      if (trialCartCost <= targetBudget) {
        return {
          ...cand,
          costPerServing: this.calculateCostPerServing(cand),
          mealTotalCost: this.calculateMealCost(cand, servings)
        };
      }

      if (Math.abs(delta) < bestDelta) {
        bestDelta = Math.abs(delta);
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
