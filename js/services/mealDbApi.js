// Service d'intégration TheMealDB API (https://www.themealdb.com/api.json)
// Permet d'importer dynamiquement des recettes internationales et de les convertir au format PlanRepas

const THEMEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Dictionnaire de traduction & normalisation des ingrédients courants
const INGREDIENT_TRANSLATIONS = {
  "chicken": { fr: "Poulet", dep: "boucherie", unit: "g", pricePerUnit: 0.012, pkgSize: 400, pkgPrice: 4.80, off: "poulet" },
  "chicken breast": { fr: "Blancs de poulet", dep: "boucherie", unit: "g", pricePerUnit: 0.012, pkgSize: 400, pkgPrice: 4.80, off: "filet de poulet" },
  "beef": { fr: "Bœuf haché", dep: "boucherie", unit: "g", pricePerUnit: 0.0125, pkgSize: 400, pkgPrice: 5.00, off: "boeuf hache" },
  "salmon": { fr: "Pavé de saumon", dep: "frais", unit: "g", pricePerUnit: 0.021, pkgSize: 240, pkgPrice: 5.20, off: "saumon" },
  "rice": { fr: "Riz blanc", dep: "epicerie", unit: "g", pricePerUnit: 0.002, pkgSize: 1000, pkgPrice: 1.80, off: "riz basmati" },
  "basmati rice": { fr: "Riz basmati", dep: "epicerie", unit: "g", pricePerUnit: 0.0025, pkgSize: 500, pkgPrice: 1.40, off: "riz basmati" },
  "onion": { fr: "Oignon", dep: "legumes", unit: "pièce", pricePerUnit: 0.30, pkgSize: 1000, pkgPrice: 1.50, off: "oignon" },
  "onions": { fr: "Oignons", dep: "legumes", unit: "pièce", pricePerUnit: 0.30, pkgSize: 1000, pkgPrice: 1.50, off: "oignon" },
  "garlic": { fr: "Ail", dep: "legumes", unit: "gousse", pricePerUnit: 0.20, pkgSize: 3, pkgPrice: 0.90, off: "ail" },
  "garlic clove": { fr: "Gousse d'ail", dep: "gousse", unit: "pièce", pricePerUnit: 0.20, pkgSize: 3, pkgPrice: 0.90, off: "ail" },
  "tomatoes": { fr: "Tomates", dep: "legumes", unit: "pièce", pricePerUnit: 0.40, pkgSize: 1000, pkgPrice: 2.20, off: "tomates" },
  "tomato": { fr: "Tomate", dep: "legumes", unit: "pièce", pricePerUnit: 0.40, pkgSize: 1000, pkgPrice: 2.20, off: "tomates" },
  "chopped tomatoes": { fr: "Tomates concassées en boîte", dep: "epicerie", unit: "g", pricePerUnit: 0.0024, pkgSize: 400, pkgPrice: 0.95, off: "tomates concassees" },
  "pasta": { fr: "Pâtes", dep: "epicerie", unit: "g", pricePerUnit: 0.0022, pkgSize: 500, pkgPrice: 1.10, off: "pates" },
  "spaghetti": { fr: "Spaghetti", dep: "epicerie", unit: "g", pricePerUnit: 0.0022, pkgSize: 500, pkgPrice: 1.10, off: "spaghetti" },
  "penne": { fr: "Penne", dep: "epicerie", unit: "g", pricePerUnit: 0.0022, pkgSize: 500, pkgPrice: 1.10, off: "penne" },
  "eggs": { fr: "Œufs frais", dep: "frais", unit: "pièce", pricePerUnit: 0.32, pkgSize: 6, pkgPrice: 1.95, off: "oeufs" },
  "egg": { fr: "Œuf frais", dep: "frais", unit: "pièce", pricePerUnit: 0.32, pkgSize: 6, pkgPrice: 1.95, off: "oeufs" },
  "milk": { fr: "Lait demi-écrémé", dep: "frais", unit: "ml", pricePerUnit: 0.0012, pkgSize: 1000, pkgPrice: 1.15, off: "lait" },
  "butter": { fr: "Beurre doux", dep: "frais", unit: "g", pricePerUnit: 0.0084, pkgSize: 250, pkgPrice: 2.10, off: "beurre" },
  "olive oil": { fr: "Huile d'olive", dep: "epicerie", unit: "ml", pricePerUnit: 0.009, pkgSize: 750, pkgPrice: 6.50, off: "huile olive" },
  "cheese": { fr: "Fromage râpé", dep: "frais", unit: "g", pricePerUnit: 0.009, pkgSize: 200, pkgPrice: 1.80, off: "fromage rape" },
  "parmesan": { fr: "Parmesan râpé", dep: "frais", unit: "g", pricePerUnit: 0.017, pkgSize: 100, pkgPrice: 1.70, off: "parmesan" },
  "mozzarella": { fr: "Mozzarella", dep: "frais", unit: "g", pricePerUnit: 0.0092, pkgSize: 125, pkgPrice: 1.15, off: "mozzarella" },
  "spinach": { fr: "Épinards frais", dep: "legumes", unit: "g", pricePerUnit: 0.008, pkgSize: 200, pkgPrice: 1.60, off: "epinards" },
  "mushrooms": { fr: "Champignons de Paris", dep: "legumes", unit: "g", pricePerUnit: 0.0056, pkgSize: 250, pkgPrice: 1.40, off: "champignons" },
  "potatoes": { fr: "Pommes de terre", dep: "legumes", unit: "g", pricePerUnit: 0.0011, pkgSize: 2500, pkgPrice: 2.70, off: "pommes de terre" },
  "carrots": { fr: "Carottes", dep: "legumes", unit: "pièce", pricePerUnit: 0.25, pkgSize: 1000, pkgPrice: 1.40, off: "carottes" },
  "cream": { fr: "Crème fraîche", dep: "frais", unit: "ml", pricePerUnit: 0.0047, pkgSize: 200, pkgPrice: 0.95, off: "creme fraiche" }
};

export class TheMealDbService {
  constructor() {
    this.cacheKey = "themealdb_cached_recipes_v2";
  }

  /**
   * Récupère une sélection de recettes populaires depuis TheMealDB
   */
  async fetchCuratedMeals(count = 15) {
    // 1. Vérifier si on a un cache récent
    const cached = this._getCached();
    if (cached && cached.length >= count) {
      return cached;
    }

    try {
      const categories = ["Pasta", "Chicken", "Vegetarian", "Seafood", "Beef"];
      const fetched = [];

      for (const cat of categories) {
        const res = await fetch(`${THEMEALDB_BASE_URL}/filter.php?c=${cat}`);
        if (!res.ok) continue;
        const data = await res.json();
        if (data && data.meals) {
          // Prendre les 3 premiers de chaque catégorie
          const picks = data.meals.slice(0, 3);
          for (const item of picks) {
            const detailRes = await fetch(`${THEMEALDB_BASE_URL}/lookup.php?i=${item.idMeal}`);
            if (detailRes.ok) {
              const detailData = await detailRes.json();
              if (detailData.meals && detailData.meals[0]) {
                const parsed = this.parseTheMealDbRecipe(detailData.meals[0]);
                if (parsed) fetched.push(parsed);
              }
            }
          }
        }
      }

      if (fetched.length > 0) {
        this._saveCached(fetched);
        return fetched;
      }
    } catch (err) {
      console.warn("[TheMealDB] Erreur chargement API distante:", err.message);
    }

    return this._getCached() || [];
  }

  /**
   * Convertit un objet TheMealDB brut au format PlanRepas avec détection d'appareils et ingrédients
   */
  parseTheMealDbRecipe(raw) {
    if (!raw || !raw.idMeal) return null;

    // Détection de l'électroménager requis selon les instructions
    const instructionsText = (raw.strInstructions || "").toLowerCase();
    const appliances = new Set();

    if (/bake|oven|roast|preheat|casserole dish|gratin|broil/.test(instructionsText)) {
      appliances.add("four");
    }
    if (/microwave|micro-wave|high power/.test(instructionsText)) {
      appliances.add("microondes");
    }
    if (/airfryer|air fryer|air-fryer/.test(instructionsText)) {
      appliances.add("airfryer");
    }
    if (/deep fry|deep-fry|fryer/.test(instructionsText)) {
      appliances.add("fritteuse");
    }
    // Par défaut, la plupart des recettes utilisent les plaques / sauteuse / poêle
    if (/skillet|pan|pot|fry|boil|simmer|saut|heat oil|cook over/.test(instructionsText) || appliances.size === 0) {
      appliances.add("plaques");
    }

    // Extraction des ingrédients (strIngredient1 à 20)
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingName = raw[`strIngredient${i}`];
      const measure = raw[`strMeasure${i}`] || "";
      if (ingName && ingName.trim() !== "") {
        const cleaned = ingName.trim().toLowerCase();
        const mapping = INGREDIENT_TRANSLATIONS[cleaned] || {
          fr: ingName.trim(),
          dep: "epicerie",
          unit: "portion",
          pricePerUnit: 0.50,
          pkgSize: 1,
          pkgPrice: 1.50,
          off: ingName.trim()
        };

        // Estimation de la quantité unitaire par portion
        let qtyPerPerson = 1;
        if (mapping.unit === "g") qtyPerPerson = 90;
        else if (mapping.unit === "ml") qtyPerPerson = 50;
        else if (mapping.unit === "pièce") qtyPerPerson = 1;

        ingredients.push({
          name: mapping.fr,
          amountPerPerson: qtyPerPerson,
          unit: mapping.unit,
          department: mapping.dep,
          packageSize: mapping.pkgSize,
          packagePrice: mapping.pkgPrice,
          offQuery: mapping.off || mapping.fr
        });
      }
    }

    if (ingredients.length === 0) return null;

    const isVege = raw.strCategory === "Vegetarian" || raw.strCategory === "Vegan";
    const isSeafood = raw.strCategory === "Seafood";

    return {
      id: `mealdb-${raw.idMeal}`,
      title: raw.strMeal,
      description: `Spécialité ${raw.strArea || "du monde"} (${raw.strCategory}). Préparé avec des ingrédients frais.`,
      category: isVege ? "vege" : isSeafood ? "poisson" : "equilibre",
      diet: isVege ? "vegetarien" : isSeafood ? "pescetarien" : "omnivore",
      prepTime: 12,
      cookTime: 18,
      difficulty: "Facile",
      image: raw.strMealThumb || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      tags: ["TheMealDB API", raw.strArea || "Monde", isVege ? "Végétarien" : "Gourmand"],
      appliances: Array.from(appliances),
      minServings: 1, // Adaptable en portion solo
      instructions: raw.strInstructions 
        ? raw.strInstructions.split(/\r\n|\n/).filter(line => line.trim().length > 15).slice(0, 5)
        : ["Cuire les ingrédients selon les étapes traditionnelles.", "Assaisonner et servir bien chaud."],
      ingredients: ingredients.slice(0, 6) // Garder les ingrédients principaux
    };
  }

  _getCached() {
    try {
      const raw = localStorage.getItem(this.cacheKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  _saveCached(data) {
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify(data));
    } catch {
      // Ignore
    }
  }
}

export const theMealDbService = new TheMealDbService();
