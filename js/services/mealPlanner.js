// Algorithme de sélection intelligente de repas sous contrainte budgétaire
// Similaire aux logiques d'optimisation de Planivore

import { RECIPES_DATA, DEFAULT_PRICE_INDEX } from "../data/recipes.js";

export class MealPlanner {
  constructor(recipes = RECIPES_DATA) {
    this.recipes = recipes;
  }

  /**
   * Calcule le coût unitaire réel consommé d'une recette par portion
   */
  calculateCostPerServing(recipe) {
    let totalPerServing = 0;
    for (const ing of recipe.ingredients) {
      const priceMeta = DEFAULT_PRICE_INDEX[ing.name];
      if (priceMeta && priceMeta.unitPrice) {
        totalPerServing += ing.amountPerPerson * priceMeta.unitPrice;
      } else if (ing.packagePrice && ing.packageSize) {
        totalPerServing += (ing.amountPerPerson * ing.packagePrice) / ing.packageSize;
      } else {
        totalPerServing += 0.50; // estimation par défaut
      }
    }
    return Math.round(totalPerServing * 100) / 100;
  }

  /**
   * Calcule le coût pour N personnes
   */
  calculateMealCost(recipe, servings = 2) {
    return Math.round(this.calculateCostPerServing(recipe) * servings * 100) / 100;
  }

  /**
   * Génère un planning de N repas respectant le budget cible et les filtres
   */
  generatePlan({ mealCount = 7, servings = 2, targetBudget = 50, filter = "all" }) {
    // 1. Filtrer les recettes éligibles
    let pool = this.recipes.filter(recipe => {
      if (filter === "all") return true;
      if (filter === "vege") return recipe.diet === "vegetarien";
      if (filter === "express") return recipe.prepTime + recipe.cookTime <= 20;
      if (filter === "eco") return this.calculateCostPerServing(recipe) <= 2.20;
      if (filter === "poisson") return recipe.category === "poisson";
      return true;
    });

    if (pool.length < mealCount) {
      // Si le filtre est trop restrictif, on élargit pour toujours fournir le nombre de repas demandé
      pool = [...this.recipes];
    }

    // Associer les coûts
    const enriched = pool.map(recipe => ({
      ...recipe,
      costPerServing: this.calculateCostPerServing(recipe),
      mealTotalCost: this.calculateMealCost(recipe, servings)
    }));

    // Trier pour équilibrer coût et diversité
    const shuffled = [...enriched].sort(() => Math.random() - 0.5);

    // Sélection avec contrainte de budget
    const targetPerMeal = targetBudget / mealCount;
    let selected = [];

    // Sélection gloutonne équilibrée
    for (const candidate of shuffled) {
      if (selected.length >= mealCount) break;

      // Éviter de dépasser drastiquement le budget restant
      const currentTotal = selected.reduce((acc, m) => acc + m.mealTotalCost, 0);
      const remainingBudget = targetBudget - currentTotal;
      const remainingMeals = mealCount - selected.length;
      const avgLeftBudget = remainingBudget / remainingMeals;

      // Tolérance budgétaire souple (+25% par repas pour permettre un repas un peu plus cher compensé par un moins cher)
      if (candidate.mealTotalCost <= avgLeftBudget * 1.35 || selected.length + 1 === mealCount) {
        selected.push(candidate);
      }
    }

    // Compléter si besoin
    if (selected.length < mealCount) {
      for (const candidate of shuffled) {
        if (!selected.find(s => s.id === candidate.id)) {
          selected.push(candidate);
          if (selected.length >= mealCount) break;
        }
      }
    }

    // Résumé financier
    const totalRealCost = Math.round(selected.reduce((acc, m) => acc + m.mealTotalCost, 0) * 100) / 100;

    return {
      meals: selected,
      totalRealCost,
      servings,
      mealCount,
      targetBudget,
      isUnderBudget: totalRealCost <= targetBudget,
      budgetDifference: Math.round((targetBudget - totalRealCost) * 100) / 100
    };
  }

  /**
   * Remplace une recette par une autre alternative compatible
   */
  swapMeal(currentMealId, currentMealList, { servings = 2, targetBudget = 50, filter = "all" }) {
    const existingIds = new Set(currentMealList.map(m => m.id));
    
    // Candidats non déjà présents dans le planning
    const available = this.recipes.filter(r => !existingIds.has(r.id));
    
    if (available.length === 0) {
      // Si toutes sont déjà dans la liste, on reprend la liste globale
      return null;
    }

    // Filtrage préférentiel
    let candidates = available.filter(recipe => {
      if (filter === "all") return true;
      if (filter === "vege") return recipe.diet === "vegetarien";
      if (filter === "express") return recipe.prepTime + recipe.cookTime <= 20;
      if (filter === "eco") return this.calculateCostPerServing(recipe) <= 2.20;
      return true;
    });

    if (candidates.length === 0) candidates = available;

    // Choix aléatoire parmi les candidats
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    return {
      ...picked,
      costPerServing: this.calculateCostPerServing(picked),
      mealTotalCost: this.calculateMealCost(picked, servings)
    };
  }
}

export const mealPlanner = new MealPlanner();
