// Catalogue de recettes JSON & Référentiel Supermarché Français
// Supporte le format produit_id et les métadonnées supermarché directes

export const SUPERMARKET_PRODUCTS_MAP = {
  ail_tete: { name: "Ail frais (Tête)", department: "legumes", packageSize: 1, packagePrice: 0.80, unit: "gousse", unitPrice: 0.10 },
  aubergine_piece: { name: "Aubergine", department: "legumes", packageSize: 250, packagePrice: 1.20, unit: "g", unitPrice: 0.0048 },
  basilic_frais_botte: { name: "Basilic frais", department: "legumes", packageSize: 25, packagePrice: 1.30, unit: "g", unitPrice: 0.052 },
  beurre_doux_250g: { name: "Beurre doux", department: "frais", packageSize: 250, packagePrice: 2.40, unit: "g", unitPrice: 0.0096 },
  boeuf_hache_15pct_350g: { name: "Bœuf haché 15% MG", department: "boucherie", packageSize: 350, packagePrice: 5.20, unit: "g", unitPrice: 0.0148 },
  boulettes_boeuf_300g: { name: "Boulettes de bœuf (300g)", department: "boucherie", packageSize: 300, packagePrice: 3.90, unit: "g", unitPrice: 0.013 },
  brocoli_piece_500g: { name: "Brocoli frais", department: "legumes", packageSize: 500, packagePrice: 1.90, unit: "g", unitPrice: 0.0038 },
  carotte_botte: { name: "Carottes fraîches", department: "legumes", packageSize: 1000, packagePrice: 1.60, unit: "g", unitPrice: 0.0016 },
  champignons_paris_250g: { name: "Champignons de Paris (250g)", department: "legumes", packageSize: 250, packagePrice: 1.65, unit: "g", unitPrice: 0.0066 },
  cheddar_mature_200g: { name: "Cheddar râpé / bloc", department: "frais", packageSize: 200, packagePrice: 2.30, unit: "g", unitPrice: 0.0115 },
  chorizo_doux_200g: { name: "Chorizo doux", department: "frais", packageSize: 200, packagePrice: 2.50, unit: "g", unitPrice: 0.0125 },
  coquillettes_500g: { name: "Coquillettes (500g)", department: "epicerie", packageSize: 500, packagePrice: 1.25, unit: "g", unitPrice: 0.0025 },
  coulis_tomate_500g: { name: "Coulis de tomate (500g)", department: "epicerie", packageSize: 500, packagePrice: 1.30, unit: "ml", unitPrice: 0.0026 },
  courge_butternut_piece: { name: "Courge butternut", department: "legumes", packageSize: 800, packagePrice: 2.20, unit: "g", unitPrice: 0.00275 },
  courgette_piece: { name: "Courgette fraîche", department: "legumes", packageSize: 300, packagePrice: 1.10, unit: "g", unitPrice: 0.0036 },
  creme_fraiche_20cl: { name: "Crème fraîche 20cl", department: "frais", packageSize: 200, packagePrice: 1.15, unit: "ml", unitPrice: 0.00575 },
  crevettes_decortiquees_200g: { name: "Crevettes décortiquées (200g)", department: "boucherie", packageSize: 200, packagePrice: 4.20, unit: "g", unitPrice: 0.021 },
  des_jambon_200g: { name: "Dés de jambon (200g)", department: "frais", packageSize: 200, packagePrice: 2.30, unit: "g", unitPrice: 0.0115 },
  emmental_rape_200g: { name: "Emmental râpé (200g)", department: "frais", packageSize: 200, packagePrice: 2.25, unit: "g", unitPrice: 0.0112 },
  epinards_frais_250g: { name: "Épinards frais (250g)", department: "legumes", packageSize: 250, packagePrice: 1.80, unit: "g", unitPrice: 0.0072 },
  filet_dinde_400g: { name: "Filet de dinde (400g)", department: "boucherie", packageSize: 400, packagePrice: 5.20, unit: "g", unitPrice: 0.013 },
  fromage_chevre_frais_150g: { name: "Chèvre frais (150g)", department: "frais", packageSize: 150, packagePrice: 2.10, unit: "g", unitPrice: 0.014 },
  fusilli_500g: { name: "Fusilli (500g)", department: "epicerie", packageSize: 500, packagePrice: 1.30, unit: "g", unitPrice: 0.0026 },
  huile_olive_vierge_75cl: { name: "Huile d'olive vierge (75cl)", department: "epicerie", packageSize: 750, packagePrice: 6.90, unit: "ml", unitPrice: 0.0092 },
  jambon_blanc_4_tranches_160g: { name: "Jambon blanc 4 tranches", department: "frais", packageSize: 160, packagePrice: 2.60, unit: "g", unitPrice: 0.01625 },
  jambon_sec_4_tranches_100g: { name: "Jambon sec 4 tranches", department: "frais", packageSize: 100, packagePrice: 2.80, unit: "g", unitPrice: 0.028 },
  jus_citron_25cl: { name: "Jus de citron (25cl)", department: "epicerie", packageSize: 250, packagePrice: 1.20, unit: "ml", unitPrice: 0.0048 },
  lait_demi_ecreme_1l: { name: "Lait demi-écrémé (1L)", department: "frais", packageSize: 1000, packagePrice: 1.15, unit: "ml", unitPrice: 0.00115 },
  lardons_fumes_200g: { name: "Lardons fumés (200g)", department: "frais", packageSize: 200, packagePrice: 2.20, unit: "g", unitPrice: 0.011 },
  linguine_500g: { name: "Linguine (500g)", department: "epicerie", packageSize: 500, packagePrice: 1.40, unit: "g", unitPrice: 0.0028 },
  mais_doux_boite_300g: { name: "Maïs doux en boîte (300g)", department: "epicerie", packageSize: 300, packagePrice: 1.20, unit: "g", unitPrice: 0.004 },
  mayonnaise_tube_175g: { name: "Mayonnaise (175g)", department: "epicerie", packageSize: 175, packagePrice: 1.50, unit: "g", unitPrice: 0.0085 },
  moutarde_ancienne_200g: { name: "Moutarde à l'ancienne (200g)", department: "epicerie", packageSize: 200, packagePrice: 1.40, unit: "g", unitPrice: 0.007 },
  moutarde_dijon_200g: { name: "Moutarde de Dijon (200g)", department: "epicerie", packageSize: 200, packagePrice: 1.25, unit: "g", unitPrice: 0.00625 },
  mozzarella_125g: { name: "Mozzarella (125g)", department: "frais", packageSize: 125, packagePrice: 1.35, unit: "g", unitPrice: 0.0108 },
  oeufs_boite_6: { name: "Boîte de 6 œufs frais", department: "frais", packageSize: 6, packagePrice: 2.30, unit: "piece", unitPrice: 0.383 },
  oignon_jaune_filet_1kg: { name: "Oignons jaunes (filet 1kg)", department: "legumes", packageSize: 1000, packagePrice: 1.60, unit: "g", unitPrice: 0.0016 },
  olives_noires_denoyautees_150g: { name: "Olives noires dénoyautées (150g)", department: "epicerie", packageSize: 150, packagePrice: 1.50, unit: "g", unitPrice: 0.01 },
  paprika_doux_flacon_40g: { name: "Paprika doux flacon (40g)", department: "epicerie", packageSize: 40, packagePrice: 1.40, unit: "g", unitPrice: 0.035 },
  parmesan_rape_100g: { name: "Parmesan râpé (100g)", department: "frais", packageSize: 100, packagePrice: 2.10, unit: "g", unitPrice: 0.021 },
  pave_saumon_frais_140g: { name: "Pavé de saumon frais (140g)", department: "boucherie", packageSize: 140, packagePrice: 4.80, unit: "g", unitPrice: 0.034 },
  penne_500g: { name: "Penne (500g)", department: "epicerie", packageSize: 500, packagePrice: 1.35, unit: "g", unitPrice: 0.0027 },
  persil_plat_botte: { name: "Persil plat frais", department: "legumes", packageSize: 30, packagePrice: 1.10, unit: "g", unitPrice: 0.036 },
  pesto_alla_genovese_190g: { name: "Pesto alla Genovese (190g)", department: "epicerie", packageSize: 190, packagePrice: 1.95, unit: "g", unitPrice: 0.0102 },
  pesto_rosso_190g: { name: "Pesto Rosso (190g)", department: "epicerie", packageSize: 190, packagePrice: 1.95, unit: "g", unitPrice: 0.0102 },
  petits_pois_surgeles_600g: { name: "Petits pois surgelés (600g)", department: "frais", packageSize: 600, packagePrice: 1.70, unit: "g", unitPrice: 0.0028 },
  piment_rouge_frais_50g: { name: "Piment rouge frais (50g)", department: "legumes", packageSize: 50, packagePrice: 1.10, unit: "g", unitPrice: 0.022 },
  poivre_noir_moulin_50g: { name: "Poivre noir moulin (50g)", department: "epicerie", packageSize: 50, packagePrice: 2.20, unit: "g", unitPrice: 0.044 },
  poivron_rouge_piece: { name: "Poivron rouge", department: "legumes", packageSize: 200, packagePrice: 1.30, unit: "g", unitPrice: 0.0065 },
  portions_vache_qui_rit_x12: { name: "La Vache qui rit (12 port.)", department: "frais", packageSize: 12, packagePrice: 2.40, unit: "piece", unitPrice: 0.20 },
  poudre_curry_doux_45g: { name: "Curry doux flacon (45g)", department: "epicerie", packageSize: 45, packagePrice: 1.40, unit: "g", unitPrice: 0.031 },
  poulet_filet_500g: { name: "Filets de poulet (500g)", department: "boucherie", packageSize: 500, packagePrice: 6.20, unit: "g", unitPrice: 0.0124 },
  saucisses_strasbourg_x4: { name: "Saucisses de Strasbourg (x4)", department: "frais", packageSize: 160, packagePrice: 1.90, unit: "g", unitPrice: 0.0118 },
  saumon_fume_100g: { name: "Saumon fumé (100g)", department: "frais", packageSize: 100, packagePrice: 3.90, unit: "g", unitPrice: 0.039 },
  spaghetti_500g: { name: "Spaghetti (500g)", department: "epicerie", packageSize: 500, packagePrice: 1.35, unit: "g", unitPrice: 0.0027 },
  tagliatelles_500g: { name: "Tagliatelles (500g)", department: "epicerie", packageSize: 500, packagePrice: 1.45, unit: "g", unitPrice: 0.0029 },
  thon_au_naturel_160g: { name: "Thon au naturel (160g)", department: "epicerie", packageSize: 160, packagePrice: 2.15, unit: "g", unitPrice: 0.0134 },
  tomates_cerises_250g: { name: "Tomates cerises (250g)", department: "legumes", packageSize: 250, packagePrice: 1.70, unit: "g", unitPrice: 0.0068 },
  tomates_concassees_400g: { name: "Tomates concassées (400g)", department: "epicerie", packageSize: 400, packagePrice: 1.20, unit: "g", unitPrice: 0.003 }
};

export const DEFAULT_PRICE_INDEX = {};
for (const [key, val] of Object.entries(SUPERMARKET_PRODUCTS_MAP)) {
  DEFAULT_PRICE_INDEX[val.name] = { unitPrice: val.unitPrice, packagePrice: val.packagePrice, unit: val.unit };
  DEFAULT_PRICE_INDEX[key] = { unitPrice: val.unitPrice, packagePrice: val.packagePrice, unit: val.unit };
}

/**
 * Image illustrative selon le titre de la recette de pâtes
 */
function getRecipeImage(nom = "") {
  const lower = nom.toLowerCase();
  if (lower.includes("carbonara")) {
    return "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("bolognaise") || lower.includes("boeuf") || lower.includes("boulette")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d62816dc?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("pesto")) {
    return "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("poulet") || lower.includes("dinde")) {
    return "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("saumon") || lower.includes("crevette") || lower.includes("thon")) {
    return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("tomate") || lower.includes("arrabbiata")) {
    return "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("fromage") || lower.includes("mac and cheese") || lower.includes("vache qui rit")) {
    return "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80";
}

/**
 * Génère des étapes de préparation gourmandes pour chaque plat de pâtes
 */
function generatePastaInstructions(title, ingredients = []) {
  const garnish = ingredients.filter(i => {
    const n = i.name.toLowerCase();
    return !n.includes("spaghetti") && !n.includes("penne") && !n.includes("tagliatelle") &&
           !n.includes("fusilli") && !n.includes("coquillette") && !n.includes("linguine");
  });
  const garnishNames = garnish.map(i => i.name).slice(0, 3).join(", ");

  return [
    "Faire bouillir un grand volume d'eau salée et plonger les pâtes selon le temps indiqué al dente.",
    garnish.length > 0 ? `Dans une poêle avec un filet d'huile ou une noisette de beurre, faire revenir la garniture (${garnishNames}) à feu moyen.` : "Égoutter les pâtes en gardant 2 cuillères d'eau de cuisson.",
    "Égoutter les pâtes en réservant un petit fond d'eau de cuisson pour émulsionner la sauce.",
    "Mélanger immédiatement les pâtes bien chaudes avec la préparation et servir aussitôt avec le fromage !"
  ];
}

/**
 * Normalise un ingrédient à partir de produit_id ou nom
 */
function enrichIngredient(rawIng, recipePortions = 1) {
  const portions = Math.max(1, recipePortions);
  const qty = rawIng.quantite !== undefined ? rawIng.quantite : 100;
  const amountPerPerson = Math.round((qty / portions) * 10) / 10;
  const unit = rawIng.unite || "g";

  if (rawIng.produit_id && SUPERMARKET_PRODUCTS_MAP[rawIng.produit_id]) {
    const meta = SUPERMARKET_PRODUCTS_MAP[rawIng.produit_id];
    return {
      name: meta.name,
      amountPerPerson,
      unit: rawIng.unite || meta.unit,
      department: meta.department,
      packageSize: meta.packageSize,
      packagePrice: meta.packagePrice,
      unitPrice: meta.unitPrice,
      offQuery: meta.name
    };
  }

  // Fallback si nom fourni
  const name = rawIng.nom || rawIng.produit_id || "Ingrédient";
  return {
    name,
    amountPerPerson,
    unit,
    department: "epicerie",
    packageSize: 500,
    packagePrice: 1.50,
    unitPrice: 0.003,
    offQuery: name
  };
}

/**
 * Normalise une recette pour le planificateur et l'interface
 */
export function normalizeRecipe(raw, idx = 0) {
  const portions = raw.portions || 1;
  const title = raw.nom || raw.title || `Recette de pâtes #${idx + 1}`;
  const totalMinutes = raw.temps_minutes || 20;
  const prepTime = Math.max(5, Math.round(totalMinutes * 0.35));
  const cookTime = Math.max(5, Math.round(totalMinutes * 0.65));
  const category = raw.categorie || "pates";
  const id = String(raw.id || (raw.nom ? raw.nom.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `recette-${idx + 1}`));

  const ingredients = (raw.ingredients || []).map(ing => enrichIngredient(ing, portions));
  const instructions = Array.isArray(raw.instructions) && raw.instructions.length > 0
    ? raw.instructions
    : generatePastaInstructions(title, ingredients);

  const lowerText = JSON.stringify(raw).toLowerCase();
  const isVege = !lowerText.includes("poulet") && !lowerText.includes("boeuf") &&
                 !lowerText.includes("lardon") && !lowerText.includes("jambon") &&
                 !lowerText.includes("saumon") && !lowerText.includes("thon") &&
                 !lowerText.includes("crevette") && !lowerText.includes("dinde") &&
                 !lowerText.includes("saucisse") && !lowerText.includes("chorizo");

  return {
    id,
    title,
    nom: title,
    description: raw.description || `Délicieuse recette de ${title.toLowerCase()} facile et rapide.`,
    category,
    diet: isVege ? "vegetarien" : "omnivore",
    prepTime,
    cookTime,
    difficulty: "Très facile",
    image: raw.image || getRecipeImage(title),
    tags: [
      "Pâtes",
      `⏱️ ${totalMinutes} min`,
      isVege ? "Végétarien" : "Gourmand"
    ],
    appliances: ["plaques"],
    minServings: portions,
    instructions,
    ingredients
  };
}

export function normalizeCatalog(rawList = []) {
  return rawList.map((item, idx) => normalizeRecipe(item, idx));
}

// Initialisé vide, puis chargé dynamiquement
export const RECIPES_DATA = [];

/**
 * Charge le catalogue depuis data/recipes.json avec repli sécurisé
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
    console.warn("Chargement distant de data/recipes.json échoué :", err.message);
  }
  return [];
}
