// Application principale PlanRepas avec TheMealDB, filtre électroménager et adaptation solo
import { mealPlanner } from "./services/mealPlanner.js";
import { groceryListService, DEPARTMENT_LABELS } from "./services/groceryList.js";
import { openPricesService } from "./services/openPricesApi.js";
import { theMealDbService } from "./services/mealDbApi.js";
import { RECIPES_DATA } from "./data/recipes.js";

const APPLIANCE_ICONS = {
  plaques: "🍳 Poêle/Plaques",
  four: "♨️ Four",
  microondes: "⚡ Micro-ondes",
  airfryer: "🌪️ Airfryer",
  fritteuse: "🍟 Friteuse"
};

class PlanRepasApp {
  constructor() {
    this.state = {
      mealCount: 7,
      servings: 2,
      targetBudget: 35,
      filter: "all",
      availableAppliances: ["plaques", "four", "microondes"],
      activeTab: "meals",
      currentPlan: null,
      pantryChecked: new Set(),
      theme: localStorage.getItem("planrepas_theme") || "light",
      isMealDbLoading: false
    };

    this.initElements();
    this.bindEvents();
    this.applyTheme(this.state.theme);
    this.initTheMealDb();
  }

  initElements() {
    // Éléments de configuration
    this.mealPills = document.querySelectorAll("#durationPills .pill-btn");
    this.servingPills = document.querySelectorAll("#servingPills .pill-btn");
    this.budgetSlider = document.getElementById("budgetSlider");
    this.budgetValBadge = document.getElementById("budgetValBadge");
    this.avgPortionBadge = document.getElementById("avgPortionBadge");
    this.filterChips = document.querySelectorAll(".filter-chip");
    this.btnGenerate = document.getElementById("btnGenerate");

    // Électroménager
    this.applianceCheckboxes = document.querySelectorAll("#appliancesSelector input[type='checkbox']");

    // Bannière solo
    this.soloBannerContainer = document.getElementById("soloBannerContainer");

    // Onglets
    this.tabMeals = document.getElementById("tabMeals");
    this.tabGrocery = document.getElementById("tabGrocery");
    this.tabMealsCount = document.getElementById("tabMealsCount");
    this.tabGroceryCount = document.getElementById("tabGroceryCount");
    this.mealsView = document.getElementById("mealsView");
    this.groceryView = document.getElementById("groceryView");

    // Jauge de budget
    this.meterTarget = document.getElementById("meterTarget");
    this.meterStoreTotal = document.getElementById("meterStoreTotal");
    this.meterReal = document.getElementById("meterReal");
    this.meterDiff = document.getElementById("meterDiff");
    this.meterBar = document.getElementById("meterBar");

    // Grilles & Conteneurs
    this.mealsGrid = document.getElementById("mealsGrid");
    this.groceryDepartmentsContainer = document.getElementById("groceryDepartmentsContainer");
    this.grocerySummaryBadge = document.getElementById("grocerySummaryBadge");

    // Boutons d'export
    this.btnCopyGrocery = document.getElementById("btnCopyGrocery");
    this.btnPrintGrocery = document.getElementById("btnPrintGrocery");
    this.btnWhatsapp = document.getElementById("btnWhatsapp");

    // Thème & Modales
    this.themeToggle = document.getElementById("themeToggle");
    this.recipeModal = document.getElementById("recipeModal");
    this.modalContentContainer = document.getElementById("modalContentContainer");
    this.btnCloseRecipeModal = document.getElementById("btnCloseRecipeModal");

    // TheMealDB & Open Prices
    this.btnSyncMealDb = document.getElementById("btnSyncMealDb");
    this.mealDbStatusText = document.getElementById("mealDbStatusText");
    this.btnOpenPricesModal = document.getElementById("btnOpenPricesModal");
    this.apiTesterModal = document.getElementById("apiTesterModal");
    this.btnCloseApiModal = document.getElementById("btnCloseApiModal");
    this.apiSearchInput = document.getElementById("apiSearchInput");
    this.btnSearchApi = document.getElementById("btnSearchApi");
    this.apiResultBox = document.getElementById("apiResultBox");

    this.toastContainer = document.getElementById("toastContainer");
  }

  async initTheMealDb() {
    try {
      // Charger le catalogue initial de TheMealDB
      const meals = await theMealDbService.fetchCuratedMeals(12);
      if (meals && meals.length > 0) {
        mealPlanner.setExternalRecipes(meals);
        this.mealDbStatusText.textContent = `TheMealDB (+${meals.length} plats)`;
      }
    } catch (e) {
      console.warn("TheMealDB init fallback:", e);
    }
    this.updateAvgPortionBadge();
    this.generatePlan();
  }

  bindEvents() {
    // Choix du nombre de repas (1 à 7)
    this.mealPills.forEach(pill => {
      pill.addEventListener("click", () => {
        this.mealPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.state.mealCount = parseInt(pill.dataset.count, 10);
        this.suggestBudgetForConfig();
        this.generatePlan();
      });
    });

    // Choix des personnes (1 à 6)
    this.servingPills.forEach(pill => {
      pill.addEventListener("click", () => {
        this.servingPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.state.servings = parseInt(pill.dataset.servings, 10);
        this.toggleSoloPortionMode(this.state.servings === 1);
        this.suggestBudgetForConfig();
        this.generatePlan();
      });
    });

    // Slider de budget (10€ à 100€ précis à 1€)
    this.budgetSlider.addEventListener("input", (e) => {
      this.state.targetBudget = parseInt(e.target.value, 10);
      this.budgetValBadge.textContent = `${this.state.targetBudget} €`;
      this.updateAvgPortionBadge();
      this.updateBudgetMeter();
    });

    // Filtres d'appareils de cuisine (four, plaques, micro-ondes, airfryer, friteuse)
    this.applianceCheckboxes.forEach(cb => {
      cb.addEventListener("change", () => {
        this.updateAvailableAppliances();
        this.generatePlan();
        this.showToast("🍳 Filtre appareils mis à jour !");
      });
    });

    // Filtres de régime
    this.filterChips.forEach(chip => {
      chip.addEventListener("click", () => {
        this.filterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.state.filter = chip.dataset.filter;
        this.generatePlan();
      });
    });

    // Bouton de régénération
    this.btnGenerate.addEventListener("click", () => {
      this.generatePlan();
      this.showToast("✨ Planning recalculé avec succès !");
    });

    // Bouton de synchronisation TheMealDB
    this.btnSyncMealDb.addEventListener("click", () => this.syncMoreTheMealDb());

    // Navigation Onglets
    this.tabMeals.addEventListener("click", () => this.switchTab("meals"));
    this.tabGrocery.addEventListener("click", () => this.switchTab("grocery"));

    // Exports
    this.btnCopyGrocery.addEventListener("click", () => this.copyGroceryToClipboard());
    this.btnPrintGrocery.addEventListener("click", () => window.print());
    this.btnWhatsapp.addEventListener("click", () => this.shareOnWhatsapp());

    // Thème clair/sombre
    this.themeToggle.addEventListener("click", () => {
      const next = this.state.theme === "dark" ? "light" : "dark";
      this.applyTheme(next);
    });

    // Fermeture modales
    this.btnCloseRecipeModal.addEventListener("click", () => this.closeRecipeModal());
    this.recipeModal.addEventListener("click", (e) => {
      if (e.target === this.recipeModal) this.closeRecipeModal();
    });

    // Testeur Open Prices
    this.btnOpenPricesModal.addEventListener("click", () => this.openApiModal());
    this.btnCloseApiModal.addEventListener("click", () => this.closeApiModal());
    this.apiTesterModal.addEventListener("click", (e) => {
      if (e.target === this.apiTesterModal) this.closeApiModal();
    });
    this.btnSearchApi.addEventListener("click", () => this.handleApiSearch());
    this.apiSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.handleApiSearch();
    });
  }

  updateAvailableAppliances() {
    const checked = [];
    this.applianceCheckboxes.forEach(cb => {
      if (cb.checked) checked.push(cb.value);
    });
    // Toujours au moins un moyen de cuisson
    this.state.availableAppliances = checked.length > 0 ? checked : ["plaques"];
  }

  toggleSoloPortionMode(isSolo) {
    if (this.soloBannerContainer) {
      this.soloBannerContainer.style.display = isSolo ? "block" : "none";
    }
  }

  suggestBudgetForConfig() {
    // Calcul équilibré : ~2.50€ à 3.20€ par repas par personne, borné à [10, 100]
    let suggested = Math.round(this.state.mealCount * this.state.servings * 2.8);
    suggested = Math.max(10, Math.min(100, suggested));
    this.budgetSlider.value = suggested;
    this.state.targetBudget = suggested;
    this.budgetValBadge.textContent = `${suggested} €`;
    this.updateAvgPortionBadge();
  }

  updateAvgPortionBadge() {
    const totalPortions = this.state.mealCount * this.state.servings;
    const avg = totalPortions > 0 ? (this.state.targetBudget / totalPortions).toFixed(2) : "0";
    if (this.avgPortionBadge) {
      this.avgPortionBadge.textContent = `~${avg} € / portion (${this.state.servings} pers)`;
    }
  }

  applyTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("planrepas_theme", theme);
    this.themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  switchTab(tabName) {
    this.state.activeTab = tabName;
    if (tabName === "meals") {
      this.tabMeals.classList.add("active");
      this.tabGrocery.classList.remove("active");
      this.mealsView.style.display = "block";
      this.groceryView.style.display = "none";
    } else {
      this.tabMeals.classList.remove("active");
      this.tabGrocery.classList.add("active");
      this.mealsView.style.display = "none";
      this.groceryView.style.display = "block";
      this.renderGroceryList();
    }
  }

  async syncMoreTheMealDb() {
    if (this.state.isMealDbLoading) return;
    this.state.isMealDbLoading = true;
    this.mealDbStatusText.textContent = "Chargement API...";
    this.showToast("🌍 Recherche de nouvelles recettes sur TheMealDB...");

    try {
      const meals = await theMealDbService.fetchCuratedMeals(25);
      if (meals && meals.length > 0) {
        mealPlanner.setExternalRecipes(meals);
        this.mealDbStatusText.textContent = `TheMealDB (${mealPlanner.getAllRecipes().length} recettes)`;
        this.generatePlan();
        this.showToast(`✨ ${meals.length} recettes TheMealDB intégrées au planning !`);
      }
    } catch (e) {
      this.showToast("Erreur lors de la synchronisation TheMealDB");
    } finally {
      this.state.isMealDbLoading = false;
    }
  }

  generatePlan() {
    this.state.currentPlan = mealPlanner.generatePlan({
      mealCount: this.state.mealCount,
      servings: this.state.servings,
      targetBudget: this.state.targetBudget,
      filter: this.state.filter,
      availableAppliances: this.state.availableAppliances
    });

    this.tabMealsCount.textContent = `${this.state.currentPlan.meals.length}`;
    this.renderMealCards();
    this.renderGroceryList();
    this.updateBudgetMeter();
  }

  updateBudgetMeter() {
    if (!this.state.currentPlan) return;
    const target = this.state.targetBudget;
    const portionReal = this.state.currentPlan.totalRealCost;

    // Calcul du coût du panier réel en magasin (paquets entiers)
    const groceryData = groceryListService.generateGroceryList(
      this.state.currentPlan.meals,
      this.state.servings,
      this.state.pantryChecked
    );
    const storeTotal = groceryData.finalCheckoutCost;
    const diff = Math.round((target - storeTotal) * 100) / 100;

    this.meterTarget.textContent = `${target} €`;
    if (this.meterStoreTotal) {
      this.meterStoreTotal.textContent = `${storeTotal.toFixed(2)} €`;
    }
    this.meterReal.textContent = `${portionReal.toFixed(2)} €`;

    if (diff >= 0) {
      this.meterDiff.textContent = `+${diff.toFixed(2)} € restant`;
      this.meterDiff.className = "meter-val positive";
    } else {
      this.meterDiff.textContent = `${Math.abs(diff).toFixed(2)} € dépassé`;
      this.meterDiff.className = "meter-val warning";
    }

    const pct = Math.min(100, Math.round((storeTotal / target) * 100));
    this.meterBar.style.width = `${pct}%`;
    this.meterBar.className = storeTotal > target ? "meter-progress-bar over" : "meter-progress-bar";
  }

  renderMealCards() {
    this.mealsGrid.innerHTML = "";
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    this.state.currentPlan.meals.forEach((meal, idx) => {
      const card = document.createElement("article");
      card.className = "meal-card";

      const dayLabel = days[idx] || `Repas ${idx + 1}`;
      const totalTime = meal.prepTime + meal.cookTime;

      // Badges des appareils requis
      const applianceBadges = (meal.appliances || ["plaques"]).map(app => {
        return `<span class="appliance-badge">${APPLIANCE_ICONS[app] || app}</span>`;
      }).join(" ");

      const isSolo = this.state.servings === 1;
      const priceText = isSolo
        ? `~${meal.mealTotalCost.toFixed(2)} € (1 portion solo)`
        : `~${meal.mealTotalCost.toFixed(2)} € (${meal.costPerServing.toFixed(2)}€/p)`;

      card.innerHTML = `
        <span class="meal-badge-day">${dayLabel}</span>
        <div class="meal-image-wrap">
          <img src="${meal.image}" alt="${meal.title}" class="meal-image" loading="lazy" />
        </div>
        <div class="meal-card-body">
          <div class="meal-meta-row">
            <span class="meal-time">⏱️ ${totalTime} min</span>
            <span class="meal-cost-badge">${priceText}</span>
          </div>
          <h3 class="meal-title">${meal.title}</h3>
          <p class="meal-description">${meal.description}</p>
          
          <div style="display: flex; gap: 0.35rem; margin-bottom: 0.6rem; flex-wrap: wrap;">
            ${applianceBadges}
          </div>

          <div class="meal-tags">
            ${meal.tags.map(t => `<span class="tag-badge">${t}</span>`).join("")}
          </div>

          <div class="meal-card-footer">
            <button class="btn-secondary btn-swap" data-meal-id="${meal.id}">
              🔄 Remplacer
            </button>
            <button class="btn-secondary btn-detail" data-meal-id="${meal.id}">
              📖 Voir recette
            </button>
          </div>
        </div>
      `;

      card.querySelector(".btn-swap").addEventListener("click", () => {
        this.swapSpecificMeal(meal.id, idx);
      });

      card.querySelector(".btn-detail").addEventListener("click", () => {
        this.openRecipeModal(meal);
      });

      this.mealsGrid.appendChild(card);
    });
  }

  swapSpecificMeal(mealId, index) {
    const newMeal = mealPlanner.swapMeal(mealId, this.state.currentPlan.meals, {
      servings: this.state.servings,
      targetBudget: this.state.targetBudget,
      filter: this.state.filter,
      availableAppliances: this.state.availableAppliances
    });

    if (newMeal) {
      this.state.currentPlan.meals[index] = newMeal;
      this.state.currentPlan.totalRealCost = Math.round(
        this.state.currentPlan.meals.reduce((sum, m) => sum + m.mealTotalCost, 0) * 100
      ) / 100;
      this.renderMealCards();
      this.renderGroceryList();
      this.updateBudgetMeter();
      this.showToast(`🔄 Remplacé par "${newMeal.title}"`);
    } else {
      this.showToast("Toutes les recettes compatibles avec vos appareils sont déjà sélectionnées !");
    }
  }

  renderGroceryList() {
    if (!this.state.currentPlan) return;

    const groceryData = groceryListService.generateGroceryList(
      this.state.currentPlan.meals,
      this.state.servings,
      this.state.pantryChecked
    );

    this.tabGroceryCount.textContent = `${groceryData.totalItemsCount}`;
    const servingNote = this.state.servings === 1 ? " (Panier pour 1 personne)" : ` (${this.state.servings} convives)`;
    this.grocerySummaryBadge.textContent = `Total caisse estimé : ${groceryData.finalCheckoutCost} €${servingNote} • Économies placard : -${groceryData.pantrySavings} €`;

    this.groceryDepartmentsContainer.innerHTML = "";

    for (const [depKey, meta] of Object.entries(DEPARTMENT_LABELS)) {
      const items = groceryData.byDepartment[depKey];
      if (!items || items.length === 0) continue;

      const card = document.createElement("div");
      card.className = "department-card";

      card.innerHTML = `
        <div class="department-header">
          <div class="department-title">${meta.icon} ${meta.label}</div>
          <span class="department-count">${items.length} article(s)</span>
        </div>
        <ul class="department-items-list">
          ${items.map(item => `
            <li class="grocery-item-row ${item.inPantry ? 'in-pantry' : ''}" data-item-id="${item.id}">
              <div class="grocery-item-left">
                <input type="checkbox" class="custom-checkbox" ${item.inPantry ? 'checked' : ''} data-item-id="${item.id}" />
                <div class="grocery-item-info">
                  <span class="grocery-item-name">${item.name}</span>
                  <span class="grocery-item-sub">Quantité pour ${this.state.servings} pers : ${Math.round(item.totalQuantity * 10) / 10} ${item.unit} (${item.packagesNeeded} paquet(s) de magasin)</span>
                </div>
              </div>
              <div class="grocery-item-right">
                ${item.inPantry ? '<span class="pantry-tag">Dans le placard</span>' : ''}
                <span class="grocery-item-price">~${item.estimatedStoreCost.toFixed(2)} €</span>
              </div>
            </li>
          `).join("")}
        </ul>
      `;

      card.querySelectorAll(".custom-checkbox").forEach(box => {
        box.addEventListener("change", (e) => {
          const itemId = e.target.dataset.itemId;
          if (e.target.checked) {
            this.state.pantryChecked.add(itemId);
          } else {
            this.state.pantryChecked.delete(itemId);
          }
          this.renderGroceryList();
          this.updateBudgetMeter();
        });
      });

      this.groceryDepartmentsContainer.appendChild(card);
    }
  }

  openRecipeModal(meal) {
    const servings = this.state.servings;
    const appliancesText = (meal.appliances || ["plaques"]).map(a => APPLIANCE_ICONS[a] || a).join(", ");

    this.modalContentContainer.innerHTML = `
      <div class="modal-header-image">
        <img src="${meal.image}" alt="${meal.title}" />
        <button class="btn-close-modal" id="btnModalCloseCross">✕</button>
      </div>
      <div class="modal-body">
        <h2 class="modal-title">${meal.title}</h2>
        <div class="modal-meta-bar">
          <span class="meal-time">⏱️ Prépa : ${meal.prepTime} min | Cuisson : ${meal.cookTime} min</span>
          <span class="meal-cost-badge">👥 ${servings === 1 ? '1 portion individuelle' : `${servings} portions`} • Coût ~${(meal.costPerServing * servings).toFixed(2)} €</span>
          <span class="tag-badge">Appareils : ${appliancesText}</span>
        </div>
        <p class="meal-description">${meal.description}</p>
        
        <h3 class="modal-section-title">🛒 Ingrédients (${servings === 1 ? '1 personne' : `${servings} personnes`})</h3>
        <div class="ingredients-list">
          ${meal.ingredients.map(ing => {
            const scaledQty = Math.round(ing.amountPerPerson * servings * 10) / 10;
            return `
              <div class="ingredient-chip">
                <span><strong>${scaledQty} ${ing.unit}</strong> ${ing.name}</span>
                <span style="font-size: 0.72rem; color: var(--text-dim);">Ref. Open Food Facts</span>
              </div>
            `;
          }).join("")}
        </div>

        <h3 class="modal-section-title">👨‍🍳 Préparation étape par étape</h3>
        <ol class="instructions-steps">
          ${meal.instructions.map(step => `<li>${step}</li>`).join("")}
        </ol>
      </div>
    `;

    document.getElementById("btnModalCloseCross").addEventListener("click", () => this.closeRecipeModal());
    this.recipeModal.classList.add("open");
  }

  closeRecipeModal() {
    this.recipeModal.classList.remove("open");
  }

  openApiModal() {
    this.apiTesterModal.classList.add("open");
  }

  closeApiModal() {
    this.apiTesterModal.classList.remove("open");
  }

  async handleApiSearch() {
    const query = this.apiSearchInput.value.trim();
    if (!query) return;

    this.apiResultBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted);">
        <div class="pulse-dot"></div> Interrogation en direct de l'API Open Food Facts & Open Prices...
      </div>
    `;

    try {
      const result = await openPricesService.getIngredientPrice({ name: query, offQuery: query });
      this.apiResultBox.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 1.05rem;">${result.productName}</strong>
            <span style="font-size: 1.15rem; font-weight: 800; color: var(--primary-600);">${result.price.toFixed(2)} €</span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Source : <strong>${result.source}</strong> ${result.isLive ? '🟢 (En direct)' : '🟠 (Index moyen)'}
          </div>
          ${result.date ? `<div style="font-size: 0.75rem; color: var(--text-dim);">Dernier relevé : ${result.date}</div>` : ''}
          <div style="font-size: 0.78rem; background: var(--bg-surface); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-top: 0.25rem;">
            🔍 Intégration active : les prix de vos recettes sont alimentés par ce catalogue libre et ouvert !
          </div>
        </div>
      `;
    } catch (err) {
      this.apiResultBox.innerHTML = `<span style="color: var(--danger-500);">Erreur lors de la requête : ${err.message}</span>`;
    }
  }

  copyGroceryToClipboard() {
    const groceryData = groceryListService.generateGroceryList(
      this.state.currentPlan.meals,
      this.state.servings,
      this.state.pantryChecked
    );
    const text = groceryListService.formatAsShareText(
      groceryData,
      this.state.mealCount,
      this.state.servings,
      this.state.targetBudget
    );
    navigator.clipboard.writeText(text).then(() => {
      this.showToast("📋 Liste de courses copiée dans le presse-papier !");
    });
  }

  shareOnWhatsapp() {
    const groceryData = groceryListService.generateGroceryList(
      this.state.currentPlan.meals,
      this.state.servings,
      this.state.pantryChecked
    );
    const text = groceryListService.formatAsShareText(
      groceryData,
      this.state.mealCount,
      this.state.servings,
      this.state.targetBudget
    );
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  }

  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>${message}</span>`;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.planRepasApp = new PlanRepasApp();
});
