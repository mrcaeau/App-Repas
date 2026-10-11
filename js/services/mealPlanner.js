// Algorithme de sélection intelligente de repas avec contrainte budgétaire,
// électroménager disponible et adaptation stricte aux portions (solo vs plusieurs).

import { RECIPES_DATA, DEFAULT_PRICE_INDEX } from "../data/recipes.js";

export class MealPlanner {
  constructor(baseRecipes = RECIPES_DATA) {
    this.baseRecipes = baseRecipes;
    this.externalRecipes = []; // Recettes importées de TheMealDB
  }

  setExternalRecipes(recipes = []) {
    this.externalRecipes = recipes;
  }

  getAllRecipes() {
    return [...this.baseRecipes, ...this.externalRecipes];
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
        totalPerServing += 0.45;
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
   * Vérifie si les équipements requis par la recette sont disponibles chez l'utilisateur
   */
  isApplianceCompatible(recipe, availableAppliances = ["plaques", "four", "microondes"]) {
    if (!recipe.appliances || recipe.appliances.length === 0) return true;
    
    // Si la recette propose plusieurs options d'appareils (ex: airfryer OU poêle)
    // Elle est compatible si l'utilisateur possède au moins un des équipements requis.
    return recipe.appliances.some(app => availableAppliances.includes(app));
  }

  /**
   * Vérifie la compatibilité des portions
   * Pas de gros plats non fractionnables (ex: pizza ou quiche entière de 4 personnes) si 1 portion seule
   */
  isServingsCompatible(recipe, servings = 1) {
    const min = recipe.minServings || 1;
    return servings >= min;
  }

  /**
   * Génère un planning de N repas respectant le budget cible, les équipements et les portions
   */
  generatePlan({
    mealCount = 7,
    servings = 2,
    targetBudget = 45,
    filter = "all",
    availableAppliances = ["plaques", "four", "microondes"]
  }) {
    const all = this.getAllRecipes();

    // 1. Filtrage strict : Équipements + Portions + Régime
    let pool = all.filter(recipe => {
      // Vérification électroménager
      if (!this.isApplianceCompatible(recipe, availableAppliances)) {
        return false;
      }

      // Vérification portions (exclure les gros plats collectifs si solo)
      if (!this.isServingsCompatible(recipe, servings)) {
        return false;
      }

      // Filtre diététique ou rapidité
      if (filter === "all") return true;
      if (filter === "vege") return recipe.diet === "vegetarien";
      if (filter === "express") return recipe.prepTime + recipe.cookTime <= 20;
      if (filter === "eco") return this.calculateCostPerServing(recipe) <= 2.20;
      if (filter === "poisson") return recipe.category === "poisson";
      return true;
    });

    // Si le filtre est trop restreint, on assouplit légèrement
    if (pool.length < mealCount) {
      pool = all.filter(r => this.isApplianceCompatible(r, availableAppliances) && this.isServingsCompatible(r, servings));
    }
    if (pool.length < mealCount) {
      pool = all;
    }

    // Associer les coûts
    const enriched = pool.map(recipe => ({
      ...recipe,
      costPerServing: this.calculateCostPerServing(recipe),
      mealTotalCost: this.calculateMealCost(recipe, servings)
    }));

    // Mélanger aléatoirement
    const shuffled = [...enriched].sort(() => Math.random() - 0.5);

    // Sélection avec contrainte de budget
    let selected = [];
    for (const candidate of shuffled) {
      if (selected.length >= mealCount) break;

      const currentTotal = selected.reduce((acc, m) => acc + m.mealTotalCost, 0);
      const remainingBudget = targetBudget - currentTotal;
      const remainingMeals = mealCount - selected.length;
      const avgLeftBudget = remainingBudget / remainingMeals;

      if (candidate.mealTotalCost <= avgLeftBudget * 1.35 || selected.length + 1 === mealCount) {
        selected.push(candidate);
      }
    }

    // Compléter au besoin
    if (selected.length < mealCount) {
      for (const candidate of shuffled) {
        if (!selected.find(s => s.id === candidate.id)) {
          selected.push(candidate);
          if (selected.length >= mealCount) break;
        }
      }
    }

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
   * Permute une recette spécifique en respectant les équipements et portions
   */
  swapMeal(currentMealId, currentMealList, {
    servings = 2,
    targetBudget = 45,
    filter = "all",
    availableAppliances = ["plaques", "four", "microondes"]
  }) {
    const existingIds = new Set(currentMealList.map(m => m.id));
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

    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    return {
      ...picked,
      costPerServing: this.calculateCostPerServing(picked),
      mealTotalCost: this.calculateMealCost(picked, servings)
    };
  }
}

export const mealPlanner = new MealPlanner();
