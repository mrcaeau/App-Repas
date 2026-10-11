// Catalogue de recettes JSON & Adaptateur Supermarché
// Format standard JSON avec détection d'appareils, portions et calcul du panier

export const INITIAL_RECIPES_JSON = [
  {
    "id": 1,
    "nom": "Pâtes crémeuses au poulet",
    "portions": 1,
    "temps_minutes": 20,
    "categorie": "pates",
    "ingredients": [
      {
        "nom": "pâtes",
        "quantite": 100,
        "unite": "g"
      },
      {
        "nom": "blanc de poulet",
        "quantite": 120,
        "unite": "g"
      },
      {
        "nom": "crème fraîche",
        "quantite": 80,
        "unite": "g"
      }
    ],
    "instructions": [
      "Faire cuire les pâtes.",
      "Couper le poulet en morceaux et le faire revenir.",
      "Ajouter la crème et laisser mijoter quelques minutes.",
      "Mélanger avec les pâtes."
    ]
  }
];

// Référentiel des formats supermarché français pour le calcul du ticket de caisse
export const SUPERMARKET_LOOKUP = {
  "pâtes": { name: "Pâtes (Penne / Tagliatelles)", department: "epicerie", packageSize: 500, packagePrice: 1.35, unitPrice: 0.0027, offQuery: "pates" },
  "pates": { name: "Pâtes (Penne / Tagliatelles)", department: "epicerie", packageSize: 500, packagePrice: 1.35, unitPrice: 0.0027, offQuery: "pates" },
  "blanc de poulet": { name: "Blanc de poulet (Filet)", department: "boucherie", packageSize: 400, packagePrice: 5.50, unitPrice: 0.01375, offQuery: "blanc de poulet" },
  "poulet": { name: "Filets de poulet", department: "boucherie", packageSize: 400, packagePrice: 5.50, unitPrice: 0.01375, offQuery: "filet de poulet" },
  "crème fraîche": { name: "Crème fraîche épaisse", department: "frais", packageSize: 200, packagePrice: 1.15, unitPrice: 0.00575, offQuery: "creme fraiche" },
  "creme fraiche": { name: "Crème fraîche épaisse", department: "frais", packageSize: 200, packagePrice: 1.15, unitPrice: 0.00575, offQuery: "creme fraiche" },
  "crème": { name: "Crème fraîche", department: "frais", packageSize: 200, packagePrice: 1.15, unitPrice: 0.00575, offQuery: "creme fraiche" },
  "creme": { name: "Crème fraîche", department: "frais", packageSize: 200, packagePrice: 1.15, unitPrice: 0.00575, offQuery: "creme fraiche" },
  "lardons": { name: "Lardons fumés", department: "frais", packageSize: 200, packagePrice: 2.20, unitPrice: 0.011, offQuery: "lardons" },
  "œufs": { name: "Œufs frais", department: "frais", packageSize: 6, packagePrice: 2.30, unitPrice: 0.383, offQuery: "oeufs" },
  "oeufs": { name: "Œufs frais", department: "frais", packageSize: 6, packagePrice: 2.30, unitPrice: 0.383, offQuery: "oeufs" },
  "oeuf": { name: "Œufs frais", department: "frais", packageSize: 6, packagePrice: 2.30, unitPrice: 0.383, offQuery: "oeufs" },
  "riz": { name: "Riz blanc long", department: "epicerie", packageSize: 1000, packagePrice: 1.85, unitPrice: 0.00185, offQuery: "riz" },
  "emmental": { name: "Emmental râpé", department: "frais", packageSize: 200, packagePrice: 2.25, unitPrice: 0.0112, offQuery: "emmental rape" },
  "parmesan": { name: "Parmesan râpé", department: "frais", packageSize: 100, packagePrice: 2.10, unitPrice: 0.021, offQuery: "parmesan rape" },
  "oignon": { name: "Oignon jaune", department: "legumes", packageSize: 1000, packagePrice: 1.60, unitPrice: 0.0016, offQuery: "oignon" },
  "tomate": { name: "Tomates rondes", department: "legumes", packageSize: 1000, packagePrice: 2.50, unitPrice: 0.0025, offQuery: "tomates" },
  "sauce tomate": { name: "Coulis de tomate", department: "epicerie", packageSize: 400, packagePrice: 1.20, unitPrice: 0.003, offQuery: "coulis tomate" },
  "beurre": { name: "Beurre doux", department: "frais", packageSize: 250, packagePrice: 2.40, unitPrice: 0.0096, offQuery: "beurre" },
  "salade": { name: "Salade verte", department: "legumes", packageSize: 150, packagePrice: 1.45, unitPrice: 0.0096, offQuery: "salade" },
  "courgette": { name: "Courgettes fraîches", department: "legumes", packageSize: 1000, packagePrice: 2.10, unitPrice: 0.0021, offQuery: "courgettes" }
};

export const DEFAULT_PRICE_INDEX = {};
for (const [key, val] of Object.entries(SUPERMARKET_LOOKUP)) {
  DEFAULT_PRICE_INDEX[val.name] = { unitPrice: val.unitPrice, packagePrice: val.packagePrice, unit: "g" };
  DEFAULT_PRICE_INDEX[key] = { unitPrice: val.unitPrice, packagePrice: val.packagePrice, unit: "g" };
}

/**
 * Détection automatique de l'électroménager requis depuis les instructions et le titre
 */
function detectAppliances(instructions = [], title = "") {
  const text = [...instructions, title].join(" ").toLowerCase();
  const apps = new Set();

  if (text.includes("four") || text.includes("préchauff") || text.includes("gratiner") || text.includes("enfourner")) {
    apps.add("four");
  }
  if (text.includes("airfryer") || text.includes("air fryer") || text.includes("friteuse sans huile")) {
    apps.add("airfryer");
  }
  if (text.includes("fritteuse") || text.includes("friteuse") || text.includes("frire")) {
    apps.add("fritteuse");
  }
  if (text.includes("micro-onde") || text.includes("micro onde") || text.includes("microonde")) {
    apps.add("microondes");
  }
  if (text.includes("poêle") || text.includes("poele") || text.includes("casserole") || text.includes("cuire") || text.includes("revenir") || text.includes("bouillir") || text.includes("eau bouillante") || text.includes("mijoter") || text.includes("pâtes")) {
    apps.add("plaques");
  }

  if (apps.size === 0) {
    apps.add("plaques");
  }
  return Array.from(apps);
}

/**
 * Image illustrative de qualité selon la catégorie ou le nom
 */
function getRecipeImage(nom = "", categorie = "") {
  const text = `${nom} ${categorie}`.toLowerCase();
  if (text.includes("pâte") || text.includes("pate")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d62816dc?auto=format&fit=crop&w=800&q=80";
  }
  if (text.includes("poulet") || text.includes("volaille")) {
    return "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80";
  }
  if (text.includes("riz") || text.includes("curry") || text.includes("dahl")) {
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80";
  }
  if (text.includes("poisson") || text.includes("saumon") || text.includes("thon")) {
    return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80";
}

/**
 * Enrichit un ingrédient du JSON brut avec le packaging supermarché
 */
function enrichIngredient(rawIng, recipePortions = 1) {
  const rawName = (rawIng.nom || rawIng.name || "").trim();
  const lower = rawName.toLowerCase();
  const portions = Math.max(1, recipePortions);
  const qty = rawIng.quantite !== undefined ? rawIng.quantite : (rawIng.amountPerPerson || 100);
  const amountPerPerson = Math.round((qty / portions) * 10) / 10;
  const unit = rawIng.unite || rawIng.unit || "g";

  let match = SUPERMARKET_LOOKUP[lower];
  if (!match) {
    for (const [key, val] of Object.entries(SUPERMARKET_LOOKUP)) {
      if (lower.includes(key) || key.includes(lower)) {
        match = val;
        break;
      }
    }
  }

  if (match) {
    return {
      name: match.name,
      amountPerPerson,
      unit,
      department: match.department,
      packageSize: match.packageSize,
      packagePrice: match.packagePrice,
      offQuery: match.offQuery || lower
    };
  }

  // Fallback universel
  let department = "epicerie";
  if (lower.includes("viande") || lower.includes("poulet") || lower.includes("boeuf") || lower.includes("poisson")) {
    department = "boucherie";
  } else if (lower.includes("lait") || lower.includes("fromage") || lower.includes("crème") || lower.includes("beurre") || lower.includes("œuf")) {
    department = "frais";
  } else if (lower.includes("légume") || lower.includes("tomate") || lower.includes("oignon") || lower.includes("carotte") || lower.includes("salade")) {
    department = "legumes";
  }

  const packageSize = unit === "g" ? 500 : unit === "ml" ? 500 : 1;
  const packagePrice = 2.00;

  return {
    name: rawName.charAt(0).toUpperCase() + rawName.slice(1),
    amountPerPerson,
    unit,
    department,
    packageSize,
    packagePrice,
    offQuery: lower
  };
}

/**
 * Normalise un objet recette JSON brut
 */
export function normalizeRecipe(raw) {
  const portions = raw.portions || 1;
  const totalMinutes = raw.temps_minutes || ((raw.prepTime || 10) + (raw.cookTime || 10));
  const prepTime = Math.max(5, Math.round(totalMinutes * 0.4));
  const cookTime = Math.max(5, Math.round(totalMinutes * 0.6));
  const title = raw.nom || raw.title || "Plat maison";
  const category = raw.categorie || raw.category || "pates";
  const instructions = Array.isArray(raw.instructions) ? raw.instructions : [];

  return {
    id: String(raw.id || "1"),
    title,
    nom: title,
    description: raw.description || `Délicieuses ${title.toLowerCase()} prêtes en ${totalMinutes} minutes.`,
    category,
    diet: (raw.nom || "").toLowerCase().includes("poulet") || (raw.nom || "").toLowerCase().includes("viande") ? "omnivore" : "vegetarien",
    prepTime,
    cookTime,
    difficulty: "Facile",
    image: raw.image || getRecipeImage(title, category),
    tags: raw.tags || [
      category.charAt(0).toUpperCase() + category.slice(1),
      `⏱️ ${totalMinutes} min`,
      "Catalogue JSON"
    ],
    appliances: raw.appliances || detectAppliances(instructions, title),
    minServings: portions,
    instructions,
    ingredients: (raw.ingredients || []).map(ing => enrichIngredient(ing, portions))
  };
}

export function normalizeCatalog(rawList = []) {
  return rawList.map(item => normalizeRecipe(item));
}

// Données initiales normalisées prêtes à l'emploi
export const RECIPES_DATA = normalizeCatalog(INITIAL_RECIPES_JSON);

/**
 * Charge le catalogue depuis data/recipes.json avec repli sécurisé sur INITIAL_RECIPES_JSON
 */
export async function loadRecipesCatalog() {
  try {
    const res = await fetch(`data/recipes.json?v=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return normalizeCatalog(data);
      }
    }
  } catch (err) {
    console.warn("Chargement distant de data/recipes.json échoué, utilisation du catalogue local :", err.message);
  }
  return normalizeCatalog(INITIAL_RECIPES_JSON);
}
