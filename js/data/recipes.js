// Catalogue de recettes JSON & Référentiel Supermarché Français
// Découplage complet : les recettes utilisent des identifiants sémantiques propres (ex: "spaghetti", "poulet"),
// et les caractéristiques supermarché (format paquet, prix, rayon) sont gérées dans data/produits.json.

export const DEFAULT_PRODUCTS = {
  "spaghetti": {
    "nom": "Spaghetti",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "g",
    "prix": 1.35,
    "prix_unitaire": 0.0027
  },
  "penne": {
    "nom": "Penne",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "g",
    "prix": 1.35,
    "prix_unitaire": 0.0027
  },
  "tagliatelles": {
    "nom": "Tagliatelles",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "g",
    "prix": 1.45,
    "prix_unitaire": 0.0029
  },
  "fusilli": {
    "nom": "Fusilli",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "g",
    "prix": 1.3,
    "prix_unitaire": 0.0026
  },
  "coquillettes": {
    "nom": "Coquillettes",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "g",
    "prix": 1.25,
    "prix_unitaire": 0.0025
  },
  "linguine": {
    "nom": "Linguine",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "g",
    "prix": 1.4,
    "prix_unitaire": 0.0028
  },
  "riz_basmati": {
    "nom": "Riz basmati",
    "rayon": "epicerie",
    "paquet": 1000,
    "unite": "g",
    "prix": 2.3,
    "prix_unitaire": 0.0023
  },
  "riz_long": {
    "nom": "Riz long blanc",
    "rayon": "epicerie",
    "paquet": 1000,
    "unite": "g",
    "prix": 1.85,
    "prix_unitaire": 0.00185
  },
  "riz_thai": {
    "nom": "Riz thaï jasmin",
    "rayon": "epicerie",
    "paquet": 1000,
    "unite": "g",
    "prix": 2.4,
    "prix_unitaire": 0.0024
  },
  "riz_rond": {
    "nom": "Riz rond",
    "rayon": "epicerie",
    "paquet": 1000,
    "unite": "g",
    "prix": 2.4,
    "prix_unitaire": 0.0024
  },
  "riz_risotto": {
    "nom": "Riz Arborio pour risotto",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "g",
    "prix": 1.95,
    "prix_unitaire": 0.0039
  },
  "lardons": {
    "nom": "Lardons fumés",
    "rayon": "frais",
    "paquet": 200,
    "unite": "g",
    "prix": 2.2,
    "prix_unitaire": 0.011
  },
  "poulet": {
    "nom": "Filets de poulet",
    "rayon": "boucherie",
    "paquet": 500,
    "unite": "g",
    "prix": 6.2,
    "prix_unitaire": 0.0124
  },
  "dinde": {
    "nom": "Filet de dinde",
    "rayon": "boucherie",
    "paquet": 400,
    "unite": "g",
    "prix": 5.2,
    "prix_unitaire": 0.013
  },
  "boeuf_hache": {
    "nom": "Bœuf haché 15% MG",
    "rayon": "boucherie",
    "paquet": 350,
    "unite": "g",
    "prix": 5.2,
    "prix_unitaire": 0.0148
  },
  "boulettes_boeuf": {
    "nom": "Boulettes de bœuf",
    "rayon": "boucherie",
    "paquet": 300,
    "unite": "g",
    "prix": 3.9,
    "prix_unitaire": 0.013
  },
  "steak_hache": {
    "nom": "Steak haché pur bœuf 15%",
    "rayon": "boucherie",
    "paquet": 125,
    "unite": "g",
    "prix": 1.95,
    "prix_unitaire": 0.0156
  },
  "saucisses_strasbourg": {
    "nom": "Saucisses de Strasbourg (x4)",
    "rayon": "frais",
    "paquet": 160,
    "unite": "g",
    "prix": 1.9,
    "prix_unitaire": 0.0118
  },
  "jambon_blanc": {
    "nom": "Jambon blanc (4 tranches)",
    "rayon": "frais",
    "paquet": 160,
    "unite": "g",
    "prix": 2.6,
    "prix_unitaire": 0.01625
  },
  "jambon_sec": {
    "nom": "Jambon sec (4 tranches)",
    "rayon": "frais",
    "paquet": 100,
    "unite": "g",
    "prix": 2.8,
    "prix_unitaire": 0.028
  },
  "des_jambon": {
    "nom": "Dés de jambon",
    "rayon": "frais",
    "paquet": 200,
    "unite": "g",
    "prix": 2.3,
    "prix_unitaire": 0.0115
  },
  "chorizo": {
    "nom": "Chorizo doux",
    "rayon": "frais",
    "paquet": 200,
    "unite": "g",
    "prix": 2.5,
    "prix_unitaire": 0.0125
  },
  "thon": {
    "nom": "Thon au naturel en boîte",
    "rayon": "epicerie",
    "paquet": 160,
    "unite": "g",
    "prix": 2.15,
    "prix_unitaire": 0.0134
  },
  "saumon_frais": {
    "nom": "Pavé de saumon frais",
    "rayon": "boucherie",
    "paquet": 140,
    "unite": "g",
    "prix": 4.8,
    "prix_unitaire": 0.034
  },
  "saumon_fume": {
    "nom": "Saumon fumé",
    "rayon": "frais",
    "paquet": 100,
    "unite": "g",
    "prix": 3.9,
    "prix_unitaire": 0.039
  },
  "cabillaud": {
    "nom": "Dos de cabillaud frais",
    "rayon": "boucherie",
    "paquet": 200,
    "unite": "g",
    "prix": 4.9,
    "prix_unitaire": 0.0245
  },
  "crevettes": {
    "nom": "Crevettes décortiquées cuites",
    "rayon": "boucherie",
    "paquet": 200,
    "unite": "g",
    "prix": 4.2,
    "prix_unitaire": 0.021
  },
  "oeufs": {
    "nom": "Boîte de 6 œufs frais",
    "rayon": "frais",
    "paquet": 6,
    "unite": "piece",
    "prix": 2.3,
    "prix_unitaire": 0.383
  },
  "creme_fraiche": {
    "nom": "Crème fraîche fluide/épaisse",
    "rayon": "frais",
    "paquet": 200,
    "unite": "ml",
    "prix": 1.15,
    "prix_unitaire": 0.00575
  },
  "beurre": {
    "nom": "Beurre doux",
    "rayon": "frais",
    "paquet": 250,
    "unite": "g",
    "prix": 2.4,
    "prix_unitaire": 0.0096
  },
  "parmesan": {
    "nom": "Parmesan râpé",
    "rayon": "frais",
    "paquet": 100,
    "unite": "g",
    "prix": 2.1,
    "prix_unitaire": 0.021
  },
  "emmental": {
    "nom": "Emmental râpé",
    "rayon": "frais",
    "paquet": 200,
    "unite": "g",
    "prix": 2.25,
    "prix_unitaire": 0.0112
  },
  "mozzarella": {
    "nom": "Mozzarella",
    "rayon": "frais",
    "paquet": 125,
    "unite": "g",
    "prix": 1.35,
    "prix_unitaire": 0.0108
  },
  "cheddar": {
    "nom": "Cheddar râpé / bloc",
    "rayon": "frais",
    "paquet": 200,
    "unite": "g",
    "prix": 2.3,
    "prix_unitaire": 0.0115
  },
  "chevre_frais": {
    "nom": "Fromage de chèvre frais",
    "rayon": "frais",
    "paquet": 150,
    "unite": "g",
    "prix": 2.1,
    "prix_unitaire": 0.014
  },
  "vache_qui_rit": {
    "nom": "La Vache qui rit (12 port.)",
    "rayon": "frais",
    "paquet": 12,
    "unite": "piece",
    "prix": 2.4,
    "prix_unitaire": 0.2
  },
  "lait": {
    "nom": "Lait demi-écrémé",
    "rayon": "frais",
    "paquet": 1000,
    "unite": "ml",
    "prix": 1.15,
    "prix_unitaire": 0.00115
  },
  "coulis_tomate": {
    "nom": "Coulis de tomate",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "ml",
    "prix": 1.3,
    "prix_unitaire": 0.0026
  },
  "tomates_concassees": {
    "nom": "Tomates concassées en boîte",
    "rayon": "epicerie",
    "paquet": 400,
    "unite": "g",
    "prix": 1.2,
    "prix_unitaire": 0.003
  },
  "pesto_vert": {
    "nom": "Pesto alla Genovese",
    "rayon": "epicerie",
    "paquet": 190,
    "unite": "g",
    "prix": 1.95,
    "prix_unitaire": 0.0102
  },
  "pesto_rouge": {
    "nom": "Pesto Rosso",
    "rayon": "epicerie",
    "paquet": 190,
    "unite": "g",
    "prix": 1.95,
    "prix_unitaire": 0.0102
  },
  "huile_olive": {
    "nom": "Huile d'olive vierge extra",
    "rayon": "epicerie",
    "paquet": 750,
    "unite": "ml",
    "prix": 6.9,
    "prix_unitaire": 0.0092
  },
  "huile_tournesol": {
    "nom": "Huile de tournesol",
    "rayon": "epicerie",
    "paquet": 1000,
    "unite": "ml",
    "prix": 2.1,
    "prix_unitaire": 0.0021
  },
  "sauce_soja_salee": {
    "nom": "Sauce soja salée",
    "rayon": "epicerie",
    "paquet": 150,
    "unite": "ml",
    "prix": 1.8,
    "prix_unitaire": 0.012
  },
  "sauce_soja_sucree": {
    "nom": "Sauce soja sucrée",
    "rayon": "epicerie",
    "paquet": 150,
    "unite": "ml",
    "prix": 1.95,
    "prix_unitaire": 0.013
  },
  "lait_coco": {
    "nom": "Lait de coco",
    "rayon": "epicerie",
    "paquet": 200,
    "unite": "ml",
    "prix": 1.35,
    "prix_unitaire": 0.00675
  },
  "mayonnaise": {
    "nom": "Mayonnaise en tube",
    "rayon": "epicerie",
    "paquet": 175,
    "unite": "g",
    "prix": 1.5,
    "prix_unitaire": 0.0085
  },
  "moutarde_dijon": {
    "nom": "Moutarde de Dijon",
    "rayon": "epicerie",
    "paquet": 200,
    "unite": "g",
    "prix": 1.25,
    "prix_unitaire": 0.00625
  },
  "moutarde_ancienne": {
    "nom": "Moutarde à l'ancienne",
    "rayon": "epicerie",
    "paquet": 200,
    "unite": "g",
    "prix": 1.4,
    "prix_unitaire": 0.007
  },
  "olives_noires": {
    "nom": "Olives noires dénoyautées",
    "rayon": "epicerie",
    "paquet": 150,
    "unite": "g",
    "prix": 1.5,
    "prix_unitaire": 0.01
  },
  "mais_doux": {
    "nom": "Maïs doux en boîte",
    "rayon": "epicerie",
    "paquet": 300,
    "unite": "g",
    "prix": 1.2,
    "prix_unitaire": 0.004
  },
  "haricots_rouges": {
    "nom": "Haricots rouges en boîte",
    "rayon": "epicerie",
    "paquet": 400,
    "unite": "g",
    "prix": 1.25,
    "prix_unitaire": 0.0031
  },
  "pois_chiches": {
    "nom": "Pois chiches cuits en bocal",
    "rayon": "epicerie",
    "paquet": 400,
    "unite": "g",
    "prix": 1.35,
    "prix_unitaire": 0.003375
  },
  "lentilles_vertes": {
    "nom": "Lentilles vertes",
    "rayon": "epicerie",
    "paquet": 500,
    "unite": "g",
    "prix": 1.65,
    "prix_unitaire": 0.0033
  },
  "bouillon_legumes": {
    "nom": "Bouillon de légumes (cubes)",
    "rayon": "epicerie",
    "paquet": 8,
    "unite": "piece",
    "prix": 1.3,
    "prix_unitaire": 0.1625
  },
  "curry": {
    "nom": "Curry doux en poudre",
    "rayon": "epicerie",
    "paquet": 45,
    "unite": "g",
    "prix": 1.4,
    "prix_unitaire": 0.031
  },
  "paprika": {
    "nom": "Paprika doux en flacon",
    "rayon": "epicerie",
    "paquet": 40,
    "unite": "g",
    "prix": 1.4,
    "prix_unitaire": 0.035
  },
  "graines_sesame": {
    "nom": "Graines de sésame",
    "rayon": "epicerie",
    "paquet": 100,
    "unite": "g",
    "prix": 1.45,
    "prix_unitaire": 0.0145
  },
  "poivre": {
    "nom": "Poivre noir moulin",
    "rayon": "epicerie",
    "paquet": 50,
    "unite": "g",
    "prix": 2.2,
    "prix_unitaire": 0.044
  },
  "oignon": {
    "nom": "Oignons jaunes (filet 1kg)",
    "rayon": "legumes",
    "paquet": 1000,
    "unite": "g",
    "prix": 1.6,
    "prix_unitaire": 0.0016
  },
  "ail": {
    "nom": "Ail frais (tête)",
    "rayon": "legumes",
    "paquet": 1,
    "unite": "piece",
    "prix": 0.8,
    "prix_unitaire": 0.1
  },
  "champignons": {
    "nom": "Champignons de Paris frais",
    "rayon": "legumes",
    "paquet": 250,
    "unite": "g",
    "prix": 1.65,
    "prix_unitaire": 0.0066
  },
  "courgette": {
    "nom": "Courgettes fraîches",
    "rayon": "legumes",
    "paquet": 300,
    "unite": "g",
    "prix": 1.1,
    "prix_unitaire": 0.0036
  },
  "aubergine": {
    "nom": "Aubergine",
    "rayon": "legumes",
    "paquet": 250,
    "unite": "g",
    "prix": 1.2,
    "prix_unitaire": 0.0048
  },
  "poivron": {
    "nom": "Poivron rouge",
    "rayon": "legumes",
    "paquet": 200,
    "unite": "g",
    "prix": 1.3,
    "prix_unitaire": 0.0065
  },
  "brocoli": {
    "nom": "Brocoli frais",
    "rayon": "legumes",
    "paquet": 500,
    "unite": "g",
    "prix": 1.9,
    "prix_unitaire": 0.0038
  },
  "epinards": {
    "nom": "Épinards frais",
    "rayon": "legumes",
    "paquet": 250,
    "unite": "g",
    "prix": 1.8,
    "prix_unitaire": 0.0072
  },
  "carotte": {
    "nom": "Carottes fraîches (botte)",
    "rayon": "legumes",
    "paquet": 1000,
    "unite": "g",
    "prix": 1.6,
    "prix_unitaire": 0.0016
  },
  "poireau": {
    "nom": "Poireaux frais",
    "rayon": "legumes",
    "paquet": 500,
    "unite": "g",
    "prix": 1.8,
    "prix_unitaire": 0.0036
  },
  "courge_butternut": {
    "nom": "Courge butternut",
    "rayon": "legumes",
    "paquet": 800,
    "unite": "g",
    "prix": 2.2,
    "prix_unitaire": 0.00275
  },
  "tomates_cerises": {
    "nom": "Tomates cerises",
    "rayon": "legumes",
    "paquet": 250,
    "unite": "g",
    "prix": 1.7,
    "prix_unitaire": 0.0068
  },
  "piment": {
    "nom": "Piment rouge frais",
    "rayon": "legumes",
    "paquet": 50,
    "unite": "g",
    "prix": 1.1,
    "prix_unitaire": 0.022
  },
  "petits_pois": {
    "nom": "Petits pois surgelés",
    "rayon": "frais",
    "paquet": 600,
    "unite": "g",
    "prix": 1.7,
    "prix_unitaire": 0.0028
  },
  "persil": {
    "nom": "Persil plat frais",
    "rayon": "legumes",
    "paquet": 30,
    "unite": "g",
    "prix": 1.1,
    "prix_unitaire": 0.036
  },
  "basilic": {
    "nom": "Basilic frais",
    "rayon": "legumes",
    "paquet": 25,
    "unite": "g",
    "prix": 1.3,
    "prix_unitaire": 0.052
  },
  "citron": {
    "nom": "Jus de citron",
    "rayon": "epicerie",
    "paquet": 250,
    "unite": "ml",
    "prix": 1.2,
    "prix_unitaire": 0.0048
  }
};

export const SUPERMARKET_PRODUCTS_MAP = {};
export const DEFAULT_PRICE_INDEX = {};

export function updateProductsRegistry(catalog = {}) {
  for (const [key, prod] of Object.entries(catalog)) {
    const name = prod.nom || prod.name;
    const department = prod.rayon || prod.department || "epicerie";
    const packageSize = prod.paquet || prod.packageSize || 100;
    const packagePrice = prod.prix !== undefined ? prod.prix : (prod.packagePrice || 1.50);
    const unit = prod.unite || prod.unit || "g";
    const unitPrice = prod.prix_unitaire !== undefined ? prod.prix_unitaire : (prod.unitPrice || (packageSize ? packagePrice / packageSize : 0.003));

    const meta = {
      name,
      department,
      packageSize,
      packagePrice,
      unit,
      unitPrice
    };

    SUPERMARKET_PRODUCTS_MAP[key] = meta;
    DEFAULT_PRICE_INDEX[name] = { unitPrice, packagePrice, unit };
    DEFAULT_PRICE_INDEX[key] = { unitPrice, packagePrice, unit };
  }
}

// Initialisation immédiate avec le catalogue par défaut
updateProductsRegistry(DEFAULT_PRODUCTS);

/**
 * Image illustrative selon le titre de la recette
 */
function getRecipeImage(nom = "") {
  const lower = nom.toLowerCase();
  if (lower.includes("risotto")) {
    return "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("cantonais") || lower.includes("riz sauté") || lower.includes("saute")) {
    return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("chili")) {
    return "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("curry") || lower.includes("coco")) {
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("bowl") || lower.includes("teriyaki") || lower.includes("soja")) {
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("riz")) {
    return "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80";
  }
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
  if (lower.includes("saumon") || lower.includes("crevette") || lower.includes("thon") || lower.includes("cabillaud") || lower.includes("poisson")) {
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
 * Génère des étapes de préparation gourmandes pour chaque plat
 */
function generateCookingInstructions(title, ingredients = []) {
  const lower = title.toLowerCase();
  const garnish = ingredients.filter(i => {
    const n = (i.name || "").toLowerCase();
    return !n.includes("spaghetti") && !n.includes("penne") && !n.includes("tagliatelle") &&
           !n.includes("fusilli") && !n.includes("coquillette") && !n.includes("linguine") &&
           !n.includes("riz") && !n.includes("bouillon");
  });
  const garnishNames = garnish.map(i => i.name).slice(0, 3).join(", ");

  if (lower.includes("risotto")) {
    return [
      "Dans une sauteuse chaude avec une noisette de beurre, faire nacrer le riz à sec pendant 2 minutes.",
      "Verser le bouillon chaud louche après louche en remuant régulièrement jusqu'à absorption complète (environ 18 min).",
      garnish.length > 0 ? ("Incorporer la garniture (" + garnishNames + ") à mi-cuisson pour qu'elle mijote doucement.") : "Assaisonner d'une pincée de poivre moulu.",
      "Hors du feu, lier avec le parmesan râpé et un soupçon de crème ou beurre, couvrir 2 minutes puis servir bien crémeux !"
    ];
  }

  if (lower.includes("riz")) {
    return [
      "Rincer le riz puis le cuire dans une casserole d'eau bouillante salée (environ 11 à 14 minutes) ou au cuiseur.",
      garnish.length > 0 ? ("Dans une poêle ou un wok chaud, faire dorer et mijoter la garniture (" + garnishNames + ") à feu moyen.") : "Égoutter le riz.",
      "Ajouter la sauce ou les aromates à la poêle et laisser réduire quelques minutes pour concentrer les saveurs.",
      "Servir le riz bien chaud généreusement nappé de la préparation parfumée !"
    ];
  }

  return [
    "Faire bouillir un grand volume d'eau salée et plonger les pâtes selon le temps indiqué al dente.",
    garnish.length > 0 ? ("Dans une poêle avec un filet d'huile ou une noisette de beurre, faire revenir la garniture (" + garnishNames + ") à feu moyen.") : "Égoutter les pâtes en gardant 2 cuillères d'eau de cuisson.",
    "Égoutter les pâtes en réservant un petit fond d'eau de cuisson pour émulsionner la sauce.",
    "Mélanger immédiatement les pâtes bien chaudes avec la préparation et servir aussitôt avec le fromage !"
  ];
}

/**
 * Normalise un ingrédient à partir de produit_id ou nom
 */
export function enrichIngredient(rawIng, recipePortions = 1) {
  const portions = Math.max(1, recipePortions);
  const qty = rawIng.quantite !== undefined ? rawIng.quantite : 100;
  const amountPerPerson = Math.round((qty / portions) * 10) / 10;
  const unit = rawIng.unite || "g";

  const id = rawIng.produit_id;
  if (id && SUPERMARKET_PRODUCTS_MAP[id]) {
    const meta = SUPERMARKET_PRODUCTS_MAP[id];
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
  const title = raw.nom || raw.title || ("Recette maison #" + (idx + 1));
  const totalMinutes = raw.temps_minutes || 20;
  const prepTime = Math.max(5, Math.round(totalMinutes * 0.35));
  const cookTime = Math.max(5, Math.round(totalMinutes * 0.65));
  const lower = title.toLowerCase();
  const category = raw.categorie || (lower.includes("risotto") ? "risotto" : lower.includes("riz") ? "riz" : "pates");
  const id = String(raw.id || (raw.nom ? raw.nom.toLowerCase().replace(/[^a-z0-9]+/g, "-") : ("recette-" + (idx + 1))));

  const ingredients = (raw.ingredients || []).map(ing => enrichIngredient(ing, portions));
  const instructions = Array.isArray(raw.instructions) && raw.instructions.length > 0
    ? raw.instructions
    : generateCookingInstructions(title, ingredients);

  const lowerText = JSON.stringify(raw).toLowerCase();
  const isVege = !lowerText.includes("poulet") && !lowerText.includes("boeuf") &&
                 !lowerText.includes("lardon") && !lowerText.includes("jambon") &&
                 !lowerText.includes("saumon") && !lowerText.includes("thon") &&
                 !lowerText.includes("crevette") && !lowerText.includes("dinde") &&
                 !lowerText.includes("saucisse") && !lowerText.includes("chorizo") &&
                 !lowerText.includes("cabillaud") && !lowerText.includes("steak");

  const tagLabel = category === "risotto" ? "Risotto" : category === "riz" ? "Riz" : "Pâtes";

  return {
    id,
    title,
    nom: title,
    description: raw.description || ("Délicieuse recette de " + title.toLowerCase() + " facile et rapide."),
    category,
    diet: isVege ? "vegetarien" : "omnivore",
    prepTime,
    cookTime,
    difficulty: "Très facile",
    image: raw.image || getRecipeImage(title),
    tags: [
      tagLabel,
      ("⏱️ " + totalMinutes + " min"),
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
 * Charge le référentiel supermarché depuis data/produits.json
 */
export async function loadProductsCatalog() {
  try {
    const res = await fetch("data/produits.json?v=" + Date.now());
    if (res.ok) {
      const data = await res.json();
      if (typeof data === "object" && Object.keys(data).length > 0) {
        updateProductsRegistry(data);
      }
    }
  } catch (err) {
    console.warn("Chargement de data/produits.json échoué, repli sur le catalogue interne :", err.message);
  }
}

/**
 * Charge le catalogue depuis data/recipes.json avec mise à jour préalable des produits
 */
export async function loadRecipesCatalog() {
  await loadProductsCatalog();
  try {
    const res = await fetch("data/recipes.json?v=" + Date.now());
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
