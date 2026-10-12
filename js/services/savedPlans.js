// Service de gestion et persistance des menus de repas enregistrés dans localStorage
const STORAGE_KEY = "planrepas_saved_plans_v1";

export class SavedPlansService {
  constructor() {
    this.storageKey = STORAGE_KEY;
  }

  /**
   * Récupère tous les plans enregistrés (les plus récents en premier)
   */
  getAllPlans() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const list = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (err) {
      console.warn("Erreur lecture des plans enregistrés :", err);
      return [];
    }
  }

  /**
   * Enregistre un plan de repas
   */
  savePlan(planData) {
    if (!planData || !Array.isArray(planData.meals) || planData.meals.length === 0) {
      throw new Error("Aucun repas sélectionné à enregistrer");
    }

    const plans = this.getAllPlans();
    const id = "plan_" + Date.now();
    const now = new Date();
    const dateFormatted = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(now);

    const mealCount = planData.meals.length;
    const servings = planData.servings || 1;
    const cost = planData.finalCheckoutCost !== undefined ? planData.finalCheckoutCost : (planData.totalRealCost || 0);

    const newRecord = {
      id,
      createdAt: now.toISOString(),
      dateFormatted,
      title: `Menu ${mealCount} repas (${servings} pers)`,
      mealCount,
      servings,
      targetBudget: planData.targetBudget || 30,
      finalCheckoutCost: cost,
      totalRealCost: planData.totalRealCost || cost,
      pantryChecked: Array.from(planData.pantryChecked || []),
      meals: planData.meals.map(m => ({
        id: m.id,
        title: m.title,
        nom: m.nom || m.title,
        image: m.image,
        category: m.category,
        diet: m.diet,
        prepTime: m.prepTime,
        cookTime: m.cookTime,
        costPerServing: m.costPerServing,
        mealTotalCost: m.mealTotalCost,
        ingredients: m.ingredients,
        instructions: m.instructions,
        tags: m.tags || []
      }))
    };

    // Insérer en tête
    plans.unshift(newRecord);
    localStorage.setItem(this.storageKey, JSON.stringify(plans));
    return newRecord;
  }

  /**
   * Récupère un plan par son ID
   */
  getPlanById(id) {
    const plans = this.getAllPlans();
    return plans.find(p => p.id === id) || null;
  }

  /**
   * Supprime un plan par son ID
   */
  deletePlan(id) {
    const plans = this.getAllPlans().filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(plans));
    return plans;
  }

  /**
   * Renomme un plan
   */
  renamePlan(id, newTitle) {
    const plans = this.getAllPlans();
    const target = plans.find(p => p.id === id);
    if (target && newTitle && newTitle.trim()) {
      target.title = newTitle.trim();
      localStorage.setItem(this.storageKey, JSON.stringify(plans));
    }
    return plans;
  }

  /**
   * Efface tous les plans enregistrés
   */
  clearAllPlans() {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Retourne le nombre total de plans enregistrés
   */
  getCount() {
    return this.getAllPlans().length;
  }
}

export const savedPlansService = new SavedPlansService();
