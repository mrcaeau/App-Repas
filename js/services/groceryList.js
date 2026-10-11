// Consolidateur de liste de courses intelligente avec calcul en caisse et gestion du placard

export const DEPARTMENT_LABELS = {
  legumes: { label: "Fruits & Légumes", icon: "🥦" },
  frais: { label: "Frais & Crèmerie", icon: "🧀" },
  boucherie: { label: "Boucherie & Poissonnerie", icon: "🥩" },
  epicerie: { label: "Épicerie & Condiments", icon: "🍝" },
  boulangerie: { label: "Boulangerie", icon: "🥖" }
};

export class GroceryListService {
  /**
   * Consolide tous les ingrédients des repas sélectionnés
   */
  generateGroceryList(meals, servings = 2, pantryCheckedSet = new Set()) {
    const aggregated = new Map();

    for (const meal of meals) {
      for (const ing of meal.ingredients) {
        const key = `${ing.name}__${ing.unit}`;
        const totalAmount = ing.amountPerPerson * servings;

        if (!aggregated.has(key)) {
          aggregated.set(key, {
            id: key.replace(/[^a-zA-Z0-9]/g, "_"),
            name: ing.name,
            unit: ing.unit,
            department: ing.department || "epicerie",
            totalQuantity: 0,
            packageSize: ing.packageSize || 100,
            packagePrice: ing.packagePrice || 1.50,
            offQuery: ing.offQuery || ing.name,
            mealsUsedIn: [meal.title]
          });
        }

        const current = aggregated.get(key);
        current.totalQuantity += totalAmount;
        if (!current.mealsUsedIn.includes(meal.title)) {
          current.mealsUsedIn.push(meal.title);
        }
      }
    }

    // Calcul des conditionnements d'achat (paquets nécessaires en magasin)
    const items = Array.from(aggregated.values()).map(item => {
      const packagesNeeded = Math.max(1, Math.ceil(item.totalQuantity / item.packageSize));
      const estimatedStoreCost = Math.round(packagesNeeded * item.packagePrice * 100) / 100;
      const inPantry = pantryCheckedSet.has(item.id);

      return {
        ...item,
        packagesNeeded,
        estimatedStoreCost,
        inPantry
      };
    });

    // Calculs totaux
    const totalStoreCost = Math.round(
      items.reduce((sum, item) => sum + item.estimatedStoreCost, 0) * 100
    ) / 100;

    const pantrySavings = Math.round(
      items
        .filter(item => item.inPantry)
        .reduce((sum, item) => sum + item.estimatedStoreCost, 0) * 100
    ) / 100;

    const finalCheckoutCost = Math.max(0, Math.round((totalStoreCost - pantrySavings) * 100) / 100);

    // Regrouper par rayon de supermarché
    const byDepartment = {};
    for (const depKey of Object.keys(DEPARTMENT_LABELS)) {
      byDepartment[depKey] = items.filter(item => item.department === depKey);
    }

    return {
      items,
      byDepartment,
      totalItemsCount: items.length,
      totalStoreCost,
      pantrySavings,
      finalCheckoutCost
    };
  }

  /**
   * Formate la liste en texte prêt pour WhatsApp ou Presse-papier
   */
  formatAsShareText(groceryData, mealCount, servings, targetBudget) {
    let lines = [];
    lines.push(`🛒 *MA LISTE DE COURSES - PLANREPAS*`);
    lines.push(`📅 Pour ${mealCount} repas (${servings} personnes)`);
    lines.push(`💶 Budget cible : ${targetBudget} € | Estimation caisse : ${groceryData.finalCheckoutCost} €\n`);

    for (const [depKey, meta] of Object.entries(DEPARTMENT_LABELS)) {
      const itemsInDep = groceryData.byDepartment[depKey];
      if (itemsInDep && itemsInDep.length > 0) {
        lines.push(`${meta.icon} *${meta.label.toUpperCase()}*`);
        for (const it of itemsInDep) {
          const status = it.inPantry ? "✅ [Dans le placard]" : "◽";
          const qty = it.unit === "pièce" || it.unit === "tranche" || it.unit === "gousse"
            ? `${Math.round(it.totalQuantity * 10) / 10} ${it.unit}(s)`
            : `${Math.round(it.totalQuantity)} ${it.unit}`;
          lines.push(`  ${status} ${it.name} : ${qty} (~${it.estimatedStoreCost}€)`);
        }
        lines.push("");
      }
    }

    lines.push(`✨ Généré avec PlanRepas (Open Food Facts / Open Prices)`);
    return lines.join("\n");
  }
}

export const groceryListService = new GroceryListService();
