import { mealPlanner } from "./services/mealPlanner.js";
import { groceryListService, DEPARTMENT_LABELS } from "./services/groceryList.js";
import { openPricesService } from "./services/openPricesApi.js";
import { savedPlansService } from "./services/savedPlans.js";
import { pdfExportService } from "./services/pdfExport.js";
import { RECIPES_DATA, loadRecipesCatalog } from "./data/recipes.js";

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
      servings: 1,
      targetBudget: 30,
      filter: "all",
      availableAppliances: ["plaques", "four", "microondes"],
      activeTab: "meals",
      currentPlan: null,
      pantryChecked: new Set(),
      theme: localStorage.getItem("planrepas_theme") || "light"
    };

    this.initElements();
    this.bindEvents();
    this.applyTheme(this.state.theme);
    this.toggleSoloPortionMode(true);
    this.updateSavedBadgeCount();
    this.initRecipesCatalog();
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
    this.tabSaved = document.getElementById("tabSaved");
    this.tabMealsCount = document.getElementById("tabMealsCount");
    this.tabGroceryCount = document.getElementById("tabGroceryCount");
    this.tabSavedCount = document.getElementById("tabSavedCount");
    this.mealsView = document.getElementById("mealsView");
    this.groceryView = document.getElementById("groceryView");
    this.savedView = document.getElementById("savedView");
    this.savedPlansGrid = document.getElementById("savedPlansGrid");
    this.btnClearSavedPlans = document.getElementById("btnClearSavedPlans");

    // Bouton enregistrer les recettes
    this.btnSaveMealsPlan = document.getElementById("btnSaveMealsPlan");

    // Jauge de budget simplifiée
    this.meterTarget = document.getElementById("meterTarget");
    this.meterTotal = document.getElementById("meterTotal");
    this.meterStatus = document.getElementById("meterStatus");
    this.meterBar = document.getElementById("meterBar");

    // Grilles & Conteneurs
    this.mealsGrid = document.getElementById("mealsGrid");
    this.groceryDepartmentsContainer = document.getElementById("groceryDepartmentsContainer");
    this.grocerySummaryBadge = document.getElementById("grocerySummaryBadge");

    // Boutons d'export & PDF
    this.btnDownloadPdf = document.getElementById("btnDownloadPdf");
    this.btnCopyGrocery = document.getElementById("btnCopyGrocery");
    this.btnPrintGrocery = document.getElementById("btnPrintGrocery");
    this.btnWhatsapp = document.getElementById("btnWhatsapp");

    // Thème & Modales
    this.themeToggle = document.getElementById("themeToggle");
    this.recipeModal = document.getElementById("recipeModal");
    this.modalContentContainer = document.getElementById("modalContentContainer");
    this.btnModalOverlayClose = document.getElementById("btnModalOverlayClose");

    // Catalogue JSON & Open Prices
    this.catalogStatusText = document.getElementById("catalogStatusText");
    this.btnOpenPricesModal = document.getElementById("btnOpenPricesModal");
    this.apiTesterModal = document.getElementById("apiTesterModal");
    this.btnCloseApiModal = document.getElementById("btnCloseApiModal");
    this.apiSearchInput = document.getElementById("apiSearchInput");
    this.btnSearchApi = document.getElementById("btnSearchApi");
    this.apiResultBox = document.getElementById("apiResultBox");

    this.toastContainer = document.getElementById("toastContainer");
  }

  async initRecipesCatalog() {
    try {
      const catalog = await loadRecipesCatalog();
      if (catalog && catalog.length > 0) {
        mealPlanner.setBaseRecipes(catalog);
        if (this.catalogStatusText) {
          this.catalogStatusText.textContent = `Catalogue JSON (${catalog.length} recette${catalog.length > 1 ? 's' : ''})`;
        }
      }
    } catch (e) {
      console.warn("Erreur chargement catalogue JSON:", e);
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


    // Navigation Onglets
    this.tabMeals.addEventListener("click", () => this.switchTab("meals"));
    this.tabGrocery.addEventListener("click", () => this.switchTab("grocery"));
    if (this.tabSaved) {
      this.tabSaved.addEventListener("click", () => this.switchTab("saved"));
    }

    // Enregistrer les recettes
    if (this.btnSaveMealsPlan) {
      this.btnSaveMealsPlan.addEventListener("click", () => this.handleSaveCurrentPlan());
    }

    // Exports & PDF
    if (this.btnDownloadPdf) {
      this.btnDownloadPdf.addEventListener("click", () => this.handleDownloadPdf());
    }
    this.btnCopyGrocery.addEventListener("click", () => this.copyGroceryToClipboard());
    this.btnPrintGrocery.addEventListener("click", () => window.print());
    this.btnWhatsapp.addEventListener("click", () => this.shareOnWhatsapp());

    // Tout effacer les plans enregistrés
    if (this.btnClearSavedPlans) {
      this.btnClearSavedPlans.addEventListener("click", () => this.handleClearAllSavedPlans());
    }

    // Thème clair/sombre
    this.themeToggle.addEventListener("click", () => {
      const next = this.state.theme === "dark" ? "light" : "dark";
      this.applyTheme(next);
    });

    // Fermeture modales
    if (this.btnModalOverlayClose) {
      this.btnModalOverlayClose.addEventListener("click", () => this.closeRecipeModal());
    }
    this.recipeModal.addEventListener("click", (e) => {
      if (e.target === this.recipeModal) this.closeRecipeModal();
    });

    // Touche Échap globale pour fermer n'importe quelle modale ouverte
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        this.closeRecipeModal();
        this.closeApiModal();
      }
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
    let suggested = 30;
    if (this.state.servings === 1) {
      suggested = Math.round(this.state.mealCount * 4.2); // ~30€ pour 7 repas
    } else if (this.state.servings === 2) {
      suggested = Math.round(this.state.mealCount * 6.5); // ~45€ pour 14 repas (2 pers)
    } else {
      suggested = Math.round(this.state.mealCount * this.state.servings * 2.8);
    }
    suggested = Math.max(15, Math.min(100, suggested));
    this.budgetSlider.value = suggested;
    this.state.targetBudget = suggested;
    this.budgetValBadge.textContent = `${suggested} €`;
    this.updateAvgPortionBadge();
  }

  updateAvgPortionBadge() {
    if (this.avgPortionBadge) {
      this.avgPortionBadge.textContent = `${this.state.targetBudget} €`;
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
    this.tabMeals.classList.toggle("active", tabName === "meals");
    this.tabGrocery.classList.toggle("active", tabName === "grocery");
    if (this.tabSaved) {
      this.tabSaved.classList.toggle("active", tabName === "saved");
    }

    this.mealsView.style.display = tabName === "meals" ? "block" : "none";
    this.groceryView.style.display = tabName === "grocery" ? "block" : "none";
    if (this.savedView) {
      this.savedView.style.display = tabName === "saved" ? "block" : "none";
    }

    if (tabName === "grocery") {
      this.renderGroceryList();
    } else if (tabName === "saved") {
      this.renderSavedPlans();
    }
  }


  generatePlan() {
    this.state.currentPlan = mealPlanner.generatePlan({
      mealCount: this.state.mealCount,
      servings: this.state.servings,
      targetBudget: this.state.targetBudget,
      filter: this.state.filter,
      availableAppliances: this.state.availableAppliances,
      pantryChecked: this.state.pantryChecked
    });

    this.tabMealsCount.textContent = `${this.state.currentPlan.meals.length}`;
    this.renderMealCards();
    this.renderGroceryList();
    this.updateBudgetMeter();
  }

  updateBudgetMeter() {
    if (!this.state.currentPlan) return;
    const target = this.state.targetBudget;

    // Calcul du coût du panier réel en magasin (paquets entiers)
    const groceryData = groceryListService.generateGroceryList(
      this.state.currentPlan.meals,
      this.state.servings,
      this.state.pantryChecked
    );
    const totalPrice = groceryData.finalCheckoutCost;
    const diff = Math.round((target - totalPrice) * 100) / 100;

    this.meterTarget.textContent = `${target} €`;
    if (this.meterTotal) {
      this.meterTotal.textContent = `${totalPrice.toFixed(2)} €`;
    }

    if (this.meterStatus) {
      if (diff >= 0) {
        this.meterStatus.textContent = `✓ Dans le budget (+${diff.toFixed(2)} €)`;
        this.meterStatus.className = "meter-val positive";
      } else {
        this.meterStatus.textContent = `⚠️ Dépassé (-${Math.abs(diff).toFixed(2)} €)`;
        this.meterStatus.className = "meter-val warning";
      }
    }

    const pct = Math.min(100, Math.round((totalPrice / target) * 100));
    this.meterBar.style.width = `${pct}%`;
    this.meterBar.className = totalPrice > target ? "meter-progress-bar over" : "meter-progress-bar";
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

      const priceText = `~${meal.mealTotalCost.toFixed(2)} €`;

      card.innerHTML = `
        <span class="meal-badge-day">${dayLabel}</span>
        <div class="meal-image-wrap">
          <img src="${meal.image}" alt="${meal.title}" class="meal-image" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';" />
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
      availableAppliances: this.state.availableAppliances,
      pantryChecked: this.state.pantryChecked
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
      this.showToast("ℹ️ Aucune autre recette dans le catalogue pour l'instant.");
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
    this.grocerySummaryBadge.textContent = `Prix total des courses : ${groceryData.finalCheckoutCost.toFixed(2)} €`;

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
      <button class="modal-sticky-close" id="btnModalCloseSticky" title="Fermer la boîte (Échap)" aria-label="Fermer la recette">✕</button>
      <div class="modal-header-image">
        <img src="${meal.image}" alt="${meal.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';" />
        <button class="btn-close-modal" id="btnModalCloseCross" title="Fermer la boîte (Échap)" aria-label="Fermer la recette">✕</button>
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
      <div class="modal-footer">
        <button class="btn-primary" id="btnModalBottomClose" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.6rem; font-size: 1.05rem; font-weight: 700; padding: 0.9rem 1.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md);">
          <span>✕</span> Fermer la recette
        </button>
      </div>
    `;

    document.getElementById("btnModalCloseSticky")?.addEventListener("click", () => this.closeRecipeModal());
    document.getElementById("btnModalCloseCross")?.addEventListener("click", () => this.closeRecipeModal());
    document.getElementById("btnModalBottomClose")?.addEventListener("click", () => this.closeRecipeModal());
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

  // ==========================================
  // GESTION DES REPAS ENREGISTRÉS & EXPORT PDF
  // ==========================================

  handleSaveCurrentPlan() {
    if (!this.state.currentPlan || !this.state.currentPlan.meals || this.state.currentPlan.meals.length === 0) {
      this.showToast("⚠️ Aucun menu à enregistrer. Générez d'abord un planning.");
      return;
    }

    try {
      const saved = savedPlansService.savePlan(this.state.currentPlan);
      this.updateSavedBadgeCount();
      this.showToast("💾 Recettes enregistrées ! Retrouvez-les dans 'Repas enregistrés'");
    } catch (err) {
      console.error("Erreur enregistrement menu :", err);
      this.showToast("❌ Impossible d'enregistrer le menu : " + err.message);
    }
  }

  updateSavedBadgeCount() {
    const count = savedPlansService.getCount();
    if (this.tabSavedCount) {
      this.tabSavedCount.textContent = `${count}`;
    }
    if (this.btnClearSavedPlans) {
      this.btnClearSavedPlans.style.display = count > 0 ? "inline-flex" : "none";
    }
  }

  renderSavedPlans() {
    if (!this.savedPlansGrid) return;
    const plans = savedPlansService.getAllPlans();
    this.updateSavedBadgeCount();

    if (plans.length === 0) {
      this.savedPlansGrid.innerHTML = `
        <div class="saved-empty-state" style="grid-column: 1 / -1;">
          <div class="saved-empty-icon">⭐</div>
          <div class="saved-empty-title">Aucun repas enregistré pour le moment</div>
          <p class="saved-empty-text">
            Lorsque vous générez un planning qui vous plaît, cliquez sur <strong>"Enregistrer les recettes"</strong> dans l'onglet Planning. Vous pourrez recharger vos menus favoris à tout moment en un clic !
          </p>
          <button class="btn-primary" id="btnGoToMealsFromSaved" style="margin-top: 0.5rem;">
            <span>🗓️</span> Voir le planning actuel
          </button>
        </div>
      `;
      document.getElementById("btnGoToMealsFromSaved")?.addEventListener("click", () => {
        this.switchTab("meals");
      });
      return;
    }

    this.savedPlansGrid.innerHTML = plans.map(plan => {
      const costStr = Number(plan.finalCheckoutCost || 0).toFixed(2);
      const mealsPreviewHtml = (plan.meals || []).map(m => `
        <div class="saved-meal-mini-item">
          <img src="${m.image}" alt="${m.title}" class="saved-meal-thumb" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';" />
          <span>${m.title}</span>
        </div>
      `).join("");

      return `
        <div class="saved-plan-card" data-plan-id="${plan.id}">
          <div class="saved-plan-header">
            <div>
              <div class="saved-plan-title">${plan.title}</div>
              <div class="saved-plan-date">📅 Enregistré le ${plan.dateFormatted}</div>
              <div class="saved-plan-badges">
                <span class="saved-badge">🗓️ ${plan.mealCount} repas</span>
                <span class="saved-badge">👥 ${plan.servings} pers</span>
                <span class="saved-badge saved-badge-cost">💶 ${costStr} € en caisse</span>
              </div>
            </div>
          </div>

          <div class="saved-plan-meals-preview">
            ${mealsPreviewHtml}
          </div>

          <div class="saved-plan-actions">
            <button class="btn-primary btn-load-plan" data-id="${plan.id}" title="Recharger ce menu et sa liste de courses">
              <span>📂</span> Charger ce menu
            </button>
            <button class="btn-secondary btn-pdf-plan" data-id="${plan.id}" title="Télécharger la liste de courses en PDF">
              <span>📄</span> PDF
            </button>
            <button class="btn-secondary btn-delete-plan" data-id="${plan.id}" title="Supprimer ce menu enregistré" style="margin-left: auto; color: #ef4444;">
              <span>🗑️</span>
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Écouteurs sur les boutons d'action des cartes
    this.savedPlansGrid.querySelectorAll(".btn-load-plan").forEach(btn => {
      btn.addEventListener("click", () => {
        this.loadSavedPlan(btn.dataset.id);
      });
    });

    this.savedPlansGrid.querySelectorAll(".btn-pdf-plan").forEach(btn => {
      btn.addEventListener("click", () => {
        this.downloadSavedPlanPdf(btn.dataset.id);
      });
    });

    this.savedPlansGrid.querySelectorAll(".btn-delete-plan").forEach(btn => {
      btn.addEventListener("click", () => {
        this.deleteSavedPlan(btn.dataset.id);
      });
    });
  }

  loadSavedPlan(planId) {
    const plan = savedPlansService.getPlanById(planId);
    if (!plan) {
      this.showToast("❌ Menu introuvable.");
      return;
    }

    // Restaurer l'état
    this.state.mealCount = plan.mealCount;
    this.state.servings = plan.servings;
    this.state.targetBudget = plan.targetBudget || 30;
    this.state.pantryChecked = new Set(plan.pantryChecked || []);
    this.state.currentPlan = plan;

    // Synchroniser les pilules d'interface
    this.mealPills.forEach(p => {
      p.classList.toggle("active", parseInt(p.dataset.count, 10) === this.state.mealCount);
    });
    this.servingPills.forEach(p => {
      p.classList.toggle("active", parseInt(p.dataset.servings, 10) === this.state.servings);
    });
    this.toggleSoloPortionMode(this.state.servings === 1);

    if (this.budgetSlider) {
      this.budgetSlider.value = this.state.targetBudget;
    }
    if (this.budgetValBadge) {
      this.budgetValBadge.textContent = `${this.state.targetBudget} €`;
    }

    this.tabMealsCount.textContent = `${plan.meals.length}`;
    this.renderMealCards();
    this.renderGroceryList();
    this.updateBudgetMeter();
    this.switchTab("meals");
    this.showToast(`📂 Menu chargé (${plan.mealCount} repas pour ${plan.servings} pers) !`);
  }

  deleteSavedPlan(planId) {
    savedPlansService.deletePlan(planId);
    this.updateSavedBadgeCount();
    this.renderSavedPlans();
    this.showToast("🗑️ Menu supprimé des repas enregistrés.");
  }

  handleClearAllSavedPlans() {
    if (confirm("Voulez-vous vraiment effacer tous vos repas enregistrés ?")) {
      savedPlansService.clearAllPlans();
      this.updateSavedBadgeCount();
      this.renderSavedPlans();
      this.showToast("🗑️ Tous les menus enregistrés ont été effacés.");
    }
  }

  async handleDownloadPdf() {
    if (!this.state.currentPlan || !this.state.currentPlan.meals || this.state.currentPlan.meals.length === 0) {
      this.showToast("⚠️ Aucun repas sélectionné pour générer la liste de courses.");
      return;
    }

    const groceryData = groceryListService.generateGroceryList(
      this.state.currentPlan.meals,
      this.state.servings,
      this.state.pantryChecked
    );

    this.showToast("📄 Génération de la liste de courses en PDF...");
    const success = await pdfExportService.generateGroceryPdf({
      groceryData,
      mealCount: this.state.mealCount,
      servings: this.state.servings,
      targetBudget: this.state.targetBudget,
      meals: this.state.currentPlan.meals
    });

    if (success) {
      this.showToast("✅ Téléchargement du PDF réussi !");
    }
  }

  async downloadSavedPlanPdf(planId) {
    const plan = savedPlansService.getPlanById(planId);
    if (!plan) return;

    const groceryData = groceryListService.generateGroceryList(
      plan.meals,
      plan.servings,
      new Set(plan.pantryChecked || [])
    );

    this.showToast("📄 Génération du PDF pour ce menu...");
    const success = await pdfExportService.generateGroceryPdf({
      groceryData,
      mealCount: plan.mealCount,
      servings: plan.servings,
      targetBudget: plan.targetBudget,
      meals: plan.meals
    });

    if (success) {
      this.showToast("✅ Téléchargement du PDF réussi !");
    }
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
