// Base de recettes diversifiées, économiques et équilibrées
// Avec électroménager requis (appliances) et portions minimales adaptées (minServings)

export const RECIPES_DATA = [
  {
    id: "pates-carbo-rustique",
    title: "Pâtes façon Carbonara réconfortantes",
    description: "Un grand classique rapide et gourmand avec des lardons dorés, crème légère et parmesan.",
    category: "express",
    diet: "omnivore",
    prepTime: 10,
    cookTime: 12,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
    tags: ["Express", "Gourmand", "Moins de 2€/pers"],
    appliances: ["plaques"],
    minServings: 1, // Parfait pour 1 personne comme pour plusieurs
    instructions: [
      "Faire cuire les pâtes dans un grand volume d'eau bouillante salée selon le temps indiqué.",
      "Pendant ce temps, faire dorer les lardons à feu vif dans une poêle sans matière grasse.",
      "Battre les œufs avec la crème, une pincée de poivre noir et la moitié du parmesan râpé.",
      "Égoutter les pâtes en gardant 2 cuillères à soupe d'eau de cuisson.",
      "Mélanger les pâtes chaudes avec les lardons, puis hors du feu verser le mélange œuf/crème. Saupoudrer de parmesan."
    ],
    ingredients: [
      { name: "Pâtes (Penne ou Tagliatelles)", amountPerPerson: 100, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 1.15, offQuery: "pates penne" },
      { name: "Lardons fumés", amountPerPerson: 50, unit: "g", department: "frais", packageSize: 200, packagePrice: 1.85, offQuery: "lardons fumes" },
      { name: "Œufs frais", amountPerPerson: 1, unit: "pièce", department: "frais", packageSize: 6, packagePrice: 1.95, offQuery: "oeufs" },
      { name: "Crème fraîche fluide", amountPerPerson: 40, unit: "ml", department: "frais", packageSize: 200, packagePrice: 0.95, offQuery: "creme fraiche liquide" },
      { name: "Parmesan râpé", amountPerPerson: 15, unit: "g", department: "frais", packageSize: 100, packagePrice: 1.70, offQuery: "parmesan rape" }
    ]
  },
  {
    id: "dahl-lentilles-corail",
    title: "Dahl de lentilles corail au lait de coco",
    description: "Riche en protéines végétales, doux, réconfortant et ultra économique.",
    category: "vege",
    diet: "vegetarien",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    tags: ["Végétarien", "Économique", "Équilibré"],
    appliances: ["plaques"],
    minServings: 1,
    instructions: [
      "Émincer l'oignon et le faire suer dans une casserole avec un filet d'huile.",
      "Ajouter les épices (curry/curcuma) et mélanger 1 minute pour libérer les arômes.",
      "Rincer les lentilles corail et les ajouter avec les tomates concassées et le lait de coco.",
      "Verser un verre d'eau, couvrir et laisser mijoter 15 à 20 minutes à feu doux.",
      "Servir chaud accompagné de riz basmati."
    ],
    ingredients: [
      { name: "Lentilles corail", amountPerPerson: 80, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 1.65, offQuery: "lentilles corail" },
      { name: "Lait de coco", amountPerPerson: 100, unit: "ml", department: "epicerie", packageSize: 400, packagePrice: 1.45, offQuery: "lait de coco" },
      { name: "Tomates concassées en boîte", amountPerPerson: 100, unit: "g", department: "epicerie", packageSize: 400, packagePrice: 0.95, offQuery: "tomates concassees" },
      { name: "Oignon jaune", amountPerPerson: 0.5, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 1.50, offQuery: "oignon jaune" },
      { name: "Riz basmati", amountPerPerson: 70, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 1.40, offQuery: "riz basmati" }
    ]
  },
  {
    id: "poulet-dore-airfryer-courgettes",
    title: "Aiguillettes de poulet dorées à l'Airfryer & courgettes",
    description: "Cuisson croustillante et ultra rapide sans matière grasse superflue.",
    category: "express",
    diet: "omnivore",
    prepTime: 8,
    cookTime: 12,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80",
    tags: ["Airfryer", "Croustillant", "Protéines"],
    appliances: ["airfryer", "plaques"], // Peut être fait à l'airfryer ou poêle
    minServings: 1,
    instructions: [
      "Couper les blancs de poulet en aiguillettes et les courgettes en rondelles.",
      "Assaisonner d'une cuillère d'huile, paprika, sel et poivre.",
      "Placer dans le panier de l'Airfryer à 190°C pendant 12 minutes (ou 10 min à la poêle).",
      "Secouer à mi-cuisson pour une dorure homogène et servir avec du riz chaud."
    ],
    ingredients: [
      { name: "Filets de poulet", amountPerPerson: 120, unit: "g", department: "boucherie", packageSize: 400, packagePrice: 4.60, offQuery: "filet de poulet" },
      { name: "Courgettes", amountPerPerson: 1, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 1.80, offQuery: "courgettes" },
      { name: "Riz blanc long", amountPerPerson: 70, unit: "g", department: "epicerie", packageSize: 1000, packagePrice: 1.60, offQuery: "riz long" }
    ]
  },
  {
    id: "galettes-bretonnes-completes",
    title: "Galette de sarrasin complète œuf, jambon & emmental",
    description: "Le régal simple du bistrot breton : croustillante et fondante au centre.",
    category: "express",
    diet: "omnivore",
    prepTime: 5,
    cookTime: 6,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Express", "Solo friendly", "Tradition"],
    appliances: ["plaques"],
    minServings: 1, // Idéal pour portion solo
    instructions: [
      "Faire fondre une noisette de beurre dans une poêle large.",
      "Déposer la galette de sarrasin et casser l'œuf au centre.",
      "Répartir le jambon coupé en lanières et l'emmental râpé.",
      "Rabattre les 4 coins dès que le blanc d'œuf est cuit et servir avec de la salade."
    ],
    ingredients: [
      { name: "Galettes de sarrasin", amountPerPerson: 1, unit: "pièce", department: "frais", packageSize: 6, packagePrice: 2.10, offQuery: "galette sarrasin" },
      { name: "Œuf frais", amountPerPerson: 1, unit: "pièce", department: "frais", packageSize: 6, packagePrice: 1.95, offQuery: "oeufs plein air" },
      { name: "Jambon blanc supérieur", amountPerPerson: 1, unit: "tranche", department: "frais", packageSize: 4, packagePrice: 2.20, offQuery: "jambon blanc" },
      { name: "Emmental râpé", amountPerPerson: 30, unit: "g", department: "frais", packageSize: 200, packagePrice: 1.80, offQuery: "emmental rape" },
      { name: "Salade verte (Mâche ou Batiste)", amountPerPerson: 40, unit: "g", department: "legumes", packageSize: 150, packagePrice: 1.30, offQuery: "salade verte" }
    ]
  },
  {
    id: "chili-sin-carne",
    title: "Chili sin Carne mijoté & haricots rouges",
    description: "Un plat mijoté 100% végétarien, riche en saveurs et ultra rassasiant.",
    category: "vege",
    diet: "vegetarien",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    tags: ["Végétarien", "Économique", "Batch cooking"],
    appliances: ["plaques"],
    minServings: 1,
    instructions: [
      "Faire revenir l'oignon et le poivron coupé en lamelles avec un peu d'huile.",
      "Ajouter les épices chili ou cumin.",
      "Ajouter les haricots rouges égouttés, le maïs doux et les tomates concassées.",
      "Laisser mijoter 15 minutes à feu doux et servir avec du riz blanc."
    ],
    ingredients: [
      { name: "Haricots rouges en boîte", amountPerPerson: 120, unit: "g", department: "epicerie", packageSize: 400, packagePrice: 1.10, offQuery: "haricots rouges" },
      { name: "Tomates concassées", amountPerPerson: 100, unit: "g", department: "epicerie", packageSize: 400, packagePrice: 0.95, offQuery: "tomates concassees" },
      { name: "Maïs doux en boîte", amountPerPerson: 60, unit: "g", department: "epicerie", packageSize: 300, packagePrice: 1.05, offQuery: "mais doux" },
      { name: "Poivron rouge", amountPerPerson: 0.5, unit: "pièce", department: "legumes", packageSize: 3, packagePrice: 2.20, offQuery: "poivron" },
      { name: "Oignon jaune", amountPerPerson: 0.5, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 1.50, offQuery: "oignon" },
      { name: "Riz blanc", amountPerPerson: 60, unit: "g", department: "epicerie", packageSize: 1000, packagePrice: 1.60, offQuery: "riz" }
    ]
  },
  {
    id: "gratin-pates-thon-tomate",
    title: "Gratin doré de coquillettes au thon & mozzarella",
    description: "Le plat au four réconfortant avec du fromage filant et une sauce tomate parfumée.",
    category: "eco",
    diet: "pescetarien",
    prepTime: 10,
    cookTime: 18,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    tags: ["Four", "Fondant", "Confort"],
    appliances: ["four", "plaques"], // Requiert le four pour gratiner
    minServings: 2, // Plat à gratin type familial
    instructions: [
      "Préchauffer le four à 200°C. Cuire les coquillettes al dente sur les plaques.",
      "Mélanger dans un plat à gratin les pâtes, le coulis de tomate et le thon émietté.",
      "Couper la mozzarella en dés sur le dessus.",
      "Enfourner 15 minutes jusqu'à ce que le fromage soit gratiné et doré."
    ],
    ingredients: [
      { name: "Coquillettes", amountPerPerson: 100, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 0.99, offQuery: "coquillettes" },
      { name: "Thon au naturel en boîte", amountPerPerson: 80, unit: "g", department: "epicerie", packageSize: 160, packagePrice: 1.75, offQuery: "thon naturel" },
      { name: "Coulis de tomate cuisiné", amountPerPerson: 100, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 1.10, offQuery: "coulis tomate" },
      { name: "Mozzarella", amountPerPerson: 60, unit: "g", department: "frais", packageSize: 125, packagePrice: 1.15, offQuery: "mozzarella" }
    ]
  },
  {
    id: "omelette-champignons-persil",
    title: "Omelette individuelle aux champignons de Paris",
    description: "Prête en 8 minutes à la poêle : moelleuse, économique et riche en protéines.",
    category: "express",
    diet: "vegetarien",
    prepTime: 4,
    cookTime: 6,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    tags: ["Express", "Solo friendly", "Moins de 10 min"],
    appliances: ["plaques"],
    minServings: 1, // Portion solo idéale
    instructions: [
      "Émincer les champignons de Paris et les faire dorer 3 minutes à la poêle avec une noisette de beurre.",
      "Battre les œufs dans un bol avec sel, poivre et persil.",
      "Verser les œufs sur les champignons chauds et cuire 3 minutes en ramenant les bords.",
      "Plier en deux et servir avec du pain croustillant."
    ],
    ingredients: [
      { name: "Œufs frais", amountPerPerson: 2.5, unit: "pièce", department: "frais", packageSize: 6, packagePrice: 1.95, offQuery: "oeufs" },
      { name: "Champignons de Paris frais", amountPerPerson: 100, unit: "g", department: "legumes", packageSize: 250, packagePrice: 1.40, offQuery: "champignons paris" },
      { name: "Beurre doux", amountPerPerson: 10, unit: "g", department: "frais", packageSize: 250, packagePrice: 2.10, offQuery: "beurre" },
      { name: "Pain de mie ou baguette", amountPerPerson: 60, unit: "g", department: "boulangerie", packageSize: 250, packagePrice: 1.00, offQuery: "baguette" }
    ]
  },
  {
    id: "mug-cake-sale-microondes",
    title: "Mug salé minute au micro-ondes : œuf, jambon & fromage",
    description: "La solution express sans plaques ni four, prête en 3 minutes au micro-ondes !",
    category: "express",
    diet: "omnivore",
    prepTime: 3,
    cookTime: 2,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    tags: ["Micro-ondes", "Express 5 min", "Étudiant"],
    appliances: ["microondes"],
    minServings: 1, // Portion solo exclusive
    instructions: [
      "Dans une grande tasse ou un bol adapté au micro-ondes, battre 2 œufs avec 2 cuillères de crème.",
      "Ajouter les dés de jambon, l'emmental râpé, sel et poivre.",
      "Cuire 90 secondes à puissance maximale au micro-ondes (800W).",
      "Laisser tiédir 1 minute et déguster avec une tranche de pain toastée."
    ],
    ingredients: [
      { name: "Œufs frais", amountPerPerson: 2, unit: "pièce", department: "frais", packageSize: 6, packagePrice: 1.95, offQuery: "oeufs" },
      { name: "Jambon blanc supérieur", amountPerPerson: 1, unit: "tranche", department: "frais", packageSize: 4, packagePrice: 2.20, offQuery: "jambon blanc" },
      { name: "Emmental râpé", amountPerPerson: 30, unit: "g", department: "frais", packageSize: 200, packagePrice: 1.80, offQuery: "emmental" },
      { name: "Crème fraîche fluide", amountPerPerson: 30, unit: "ml", department: "frais", packageSize: 200, packagePrice: 0.95, offQuery: "creme fraiche" }
    ]
  },
  {
    id: "tarte-fine-tomates-moutarde",
    title: "Tarte rustique moutarde, tomates & chèvre au four",
    description: "Pâte croustillante, moutarde à l'ancienne et rondelles de tomates fondantes.",
    category: "eco",
    diet: "vegetarien",
    prepTime: 10,
    cookTime: 25,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    tags: ["Four", "Convivial", "Familial"],
    appliances: ["four"], // Requiert obligatoirement un four
    minServings: 2, // Tarte familiale (pas pour 1 portion seule)
    instructions: [
      "Préchauffer le four à 200°C. Dérouler la pâte feuilletée sur une plaque de cuisson.",
      "Piquer le fond et étaler 2 cuillères de moutarde.",
      "Disposer les rondelles de tomates et de bûche de chèvre avec un filet d'huile.",
      "Cuire 25 minutes jusqu'à ce que la pâte soit bien dorée et croustillante."
    ],
    ingredients: [
      { name: "Pâte feuilletée pur beurre", amountPerPerson: 0.25, unit: "pièce", department: "frais", packageSize: 1, packagePrice: 1.35, offQuery: "pate feuilletee" },
      { name: "Tomates rondes", amountPerPerson: 1.5, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 2.20, offQuery: "tomates" },
      { name: "Bûche de chèvre", amountPerPerson: 40, unit: "g", department: "frais", packageSize: 200, packagePrice: 1.85, offQuery: "fromage de chevre" },
      { name: "Moutarde de Dijon", amountPerPerson: 10, unit: "g", department: "epicerie", packageSize: 370, packagePrice: 1.10, offQuery: "moutarde dijon" }
    ]
  },
  {
    id: "saumon-airfryer-brocolis",
    title: "Pavé de saumon croustillant à l'Airfryer & brocolis",
    description: "Une peau ultra croustillante et une chair fondante en moins de 10 minutes.",
    category: "poisson",
    diet: "pescetarien",
    prepTime: 5,
    cookTime: 10,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Airfryer", "Oméga 3", "Rapide"],
    appliances: ["airfryer", "plaques"],
    minServings: 1, // Portion solo idéale
    instructions: [
      "Badigeonner le pavé de saumon d'un filet d'huile d'olive et de sauce soja.",
      "Disposer le saumon et les fleurettes de brocoli dans le panier de l'Airfryer.",
      "Cuire 9 à 10 minutes à 185°C sans préchauffage.",
      "Déguster avec du riz basmati chaud."
    ],
    ingredients: [
      { name: "Pavé de saumon frais ou surgelé", amountPerPerson: 120, unit: "g", department: "frais", packageSize: 240, packagePrice: 5.20, offQuery: "saumon" },
      { name: "Brocolis frais ou surgelés", amountPerPerson: 120, unit: "g", department: "legumes", packageSize: 500, packagePrice: 1.70, offQuery: "brocolis" },
      { name: "Riz basmati", amountPerPerson: 75, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 1.40, offQuery: "riz basmati" },
      { name: "Sauce soja", amountPerPerson: 10, unit: "ml", department: "epicerie", packageSize: 150, packagePrice: 1.60, offQuery: "sauce soja" }
    ]
  },
  {
    id: "hachis-parmentier-maison",
    title: "Hachis parmentier familial au four & purée dorée",
    description: "Grand plat convivial au four : bœuf haché mijoté et purée gratinée à l'emmental.",
    category: "equilibre",
    diet: "omnivore",
    prepTime: 20,
    cookTime: 25,
    difficulty: "Moyen",
    image: "https://images.unsplash.com/photo-1584947915598-8e6f1f44e138?auto=format&fit=crop&w=800&q=80",
    tags: ["Four", "Familial", "Tradition"],
    appliances: ["four", "plaques"], // Requiert four pour gratiner
    minServings: 2, // Plat pour minimum 2 personnes
    instructions: [
      "Cuire les pommes de terre épluchées dans l'eau salée puis les écraser avec du lait.",
      "Faire revenir le bœuf haché et l'oignon dans une poêle.",
      "Dans un plat à gratin, dresser la viande puis recouvrir de purée et de fromage râpé.",
      "Enfourner à 200°C pendant 20 minutes."
    ],
    ingredients: [
      { name: "Bœuf haché 15% MG", amountPerPerson: 120, unit: "g", department: "boucherie", packageSize: 400, packagePrice: 4.80, offQuery: "boeuf hache" },
      { name: "Pommes de terre", amountPerPerson: 200, unit: "g", department: "legumes", packageSize: 2500, packagePrice: 2.70, offQuery: "pommes de terre" },
      { name: "Lait demi-écrémé", amountPerPerson: 40, unit: "ml", department: "frais", packageSize: 1000, packagePrice: 1.15, offQuery: "lait" },
      { name: "Emmental râpé", amountPerPerson: 25, unit: "g", department: "frais", packageSize: 200, packagePrice: 1.80, offQuery: "emmental" }
    ]
  },
  {
    id: "frites-maison-fritteuse-steak",
    title: "Steak haché boucher & frites croustillantes à la friteuse",
    description: "Les frites dorées traditionnelles à la friteuse avec un bon steak haché saisi à point.",
    category: "express",
    diet: "omnivore",
    prepTime: 12,
    cookTime: 10,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    tags: ["Friteuse", "Gourmand", "Bistrot"],
    appliances: ["fritteuse", "plaques"], // Requiert une friteuse
    minServings: 1,
    instructions: [
      "Couper les pommes de terre en bâtonnets et bien les sécher dans un torchon.",
      "Plonger dans le bain de friture à 160°C pendant 6 min, puis à 180°C pendant 3 min pour dorer.",
      "Cuire le steak à la poêle selon la cuisson désirée.",
      "Saler les frites chaudes et servir immédiatement."
    ],
    ingredients: [
      { name: "Bœuf haché 15% MG", amountPerPerson: 120, unit: "g", department: "boucherie", packageSize: 400, packagePrice: 4.80, offQuery: "steak hache" },
      { name: "Pommes de terre", amountPerPerson: 220, unit: "g", department: "legumes", packageSize: 2500, packagePrice: 2.70, offQuery: "pommes de terre" }
    ]
  },
  {
    id: "croque-monsieur-individuel",
    title: "Croque-monsieur poêlé au beurre & salade croquante",
    description: "Version bistrot dorée à la poêle : pain croustillant et cœur fondant au fromage.",
    category: "express",
    diet: "omnivore",
    prepTime: 5,
    cookTime: 6,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    tags: ["Express", "Solo friendly", "Moins de 2€/pers"],
    appliances: ["plaques"],
    minServings: 1,
    instructions: [
      "Garnir le pain de mie d'une tranche de jambon et d'emmental râpé.",
      "Faire dorer à feu moyen dans une poêle avec une noisette de beurre 3 min par face.",
      "Servir chaud et croustillant avec une salade verte assaisonnée."
    ],
    ingredients: [
      { name: "Pain de mie grandes tranches", amountPerPerson: 2, unit: "tranche", department: "boulangerie", packageSize: 14, packagePrice: 1.45, offQuery: "pain de mie" },
      { name: "Jambon blanc supérieur", amountPerPerson: 1, unit: "tranche", department: "frais", packageSize: 4, packagePrice: 2.20, offQuery: "jambon blanc" },
      { name: "Emmental râpé", amountPerPerson: 35, unit: "g", department: "frais", packageSize: 200, packagePrice: 1.80, offQuery: "emmental rape" },
      { name: "Salade verte (Mâche ou Batiste)", amountPerPerson: 40, unit: "g", department: "legumes", packageSize: 150, packagePrice: 1.30, offQuery: "salade verte" }
    ]
  },
  {
    id: "curry-pois-chiches-epinards",
    title: "Curry doux de pois chiches & jeunes pousses d'épinards",
    description: "Une explosion de saveurs d'inspiration indienne, veloutée et nourrissante.",
    category: "vege",
    diet: "vegetarien",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    tags: ["Végétarien", "Riche en fibres", "Super sain"],
    appliances: ["plaques"],
    minServings: 1,
    instructions: [
      "Dans une poêle, faire suer l'oignon haché avec une cuillère de curry.",
      "Ajouter les pois chiches rincés et égouttés.",
      "Verser le lait de coco et laisser réduire 10 minutes.",
      "Ajouter les épinards en fin de cuisson pendant 2 minutes.",
      "Servir avec du riz blanc."
    ],
    ingredients: [
      { name: "Pois chiches en boîte", amountPerPerson: 130, unit: "g", department: "epicerie", packageSize: 400, packagePrice: 1.15, offQuery: "pois chiches" },
      { name: "Épinards frais en branches", amountPerPerson: 80, unit: "g", department: "legumes", packageSize: 200, packagePrice: 1.60, offQuery: "epinards" },
      { name: "Lait de coco", amountPerPerson: 90, unit: "ml", department: "epicerie", packageSize: 200, packagePrice: 1.10, offQuery: "lait de coco" },
      { name: "Oignon jaune", amountPerPerson: 0.5, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 1.50, offQuery: "oignon" },
      { name: "Riz blanc", amountPerPerson: 70, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 1.20, offQuery: "riz" }
    ]
  },
  {
    id: "nouilles-sautees-crevettes",
    title: "Wok de nouilles express aux crevettes & carottes",
    description: "Nouilles sautées à feu vif à la poêle avec crevettes et sauce soja.",
    category: "poisson",
    diet: "pescetarien",
    prepTime: 10,
    cookTime: 8,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    tags: ["Poêle / Wok", "Solo friendly", "Express"],
    appliances: ["plaques"],
    minServings: 1,
    instructions: [
      "Cuire les nouilles 4 minutes dans l'eau bouillante.",
      "Dans une poêle bien chaude, faire sauter les crevettes avec l'ail 2 minutes.",
      "Ajouter les carottes émincées finement puis les nouilles égouttées.",
      "Arroser de sauce soja et remuer vivement 2 minutes."
    ],
    ingredients: [
      { name: "Crevettes décortiquées cuites", amountPerPerson: 90, unit: "g", department: "frais", packageSize: 200, packagePrice: 3.50, offQuery: "crevettes" },
      { name: "Nouilles asiatiques aux œufs", amountPerPerson: 75, unit: "g", department: "epicerie", packageSize: 250, packagePrice: 1.30, offQuery: "nouilles asiatiques" },
      { name: "Carottes fraîches", amountPerPerson: 1, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 1.40, offQuery: "carottes" },
      { name: "Sauce soja salée", amountPerPerson: 15, unit: "ml", department: "epicerie", packageSize: 150, packagePrice: 1.60, offQuery: "sauce soja" }
    ]
  }
];

export const DEFAULT_PRICE_INDEX = {
  "Pâtes (Penne ou Tagliatelles)": { unitPrice: 0.0023, packagePrice: 1.15, unit: "g" },
  "Lardons fumés": { unitPrice: 0.0092, packagePrice: 1.85, unit: "g" },
  "Œufs frais": { unitPrice: 0.325, packagePrice: 1.95, unit: "pièce" },
  "Crème fraîche fluide": { unitPrice: 0.0047, packagePrice: 0.95, unit: "ml" },
  "Parmesan râpé": { unitPrice: 0.017, packagePrice: 1.70, unit: "g" },
  "Lentilles corail": { unitPrice: 0.0033, packagePrice: 1.65, unit: "g" },
  "Lait de coco": { unitPrice: 0.0036, packagePrice: 1.45, unit: "ml" },
  "Tomates concassées en boîte": { unitPrice: 0.0024, packagePrice: 0.95, unit: "g" },
  "Tomates concassées": { unitPrice: 0.0024, packagePrice: 0.95, unit: "g" },
  "Oignon jaune": { unitPrice: 0.25, packagePrice: 1.50, unit: "pièce" },
  "Riz basmati": { unitPrice: 0.0028, packagePrice: 1.40, unit: "g" },
  "Filets de poulet": { unitPrice: 0.0115, packagePrice: 4.60, unit: "g" },
  "Courgettes": { unitPrice: 0.60, packagePrice: 1.80, unit: "pièce" },
  "Riz blanc long": { unitPrice: 0.0016, packagePrice: 1.60, unit: "g" },
  "Galettes de sarrasin": { unitPrice: 0.35, packagePrice: 2.10, unit: "pièce" },
  "Jambon blanc supérieur": { unitPrice: 0.55, packagePrice: 2.20, unit: "tranche" },
  "Emmental râpé": { unitPrice: 0.009, packagePrice: 1.80, unit: "g" },
  "Salade verte (Mâche ou Batiste)": { unitPrice: 0.0086, packagePrice: 1.30, unit: "g" },
  "Haricots rouges en boîte": { unitPrice: 0.0027, packagePrice: 1.10, unit: "g" },
  "Maïs doux en boîte": { unitPrice: 0.0035, packagePrice: 1.05, unit: "g" },
  "Poivron rouge": { unitPrice: 0.73, packagePrice: 2.20, unit: "pièce" },
  "Coquillettes": { unitPrice: 0.0019, packagePrice: 0.99, unit: "g" },
  "Thon au naturel en boîte": { unitPrice: 0.0109, packagePrice: 1.75, unit: "g" },
  "Coulis de tomate cuisiné": { unitPrice: 0.0022, packagePrice: 1.10, unit: "g" },
  "Mozzarella": { unitPrice: 0.0092, packagePrice: 1.15, unit: "g" },
  "Champignons de Paris frais": { unitPrice: 0.0056, packagePrice: 1.40, unit: "g" },
  "Pois chiches en boîte": { unitPrice: 0.0028, packagePrice: 1.15, unit: "g" },
  "Épinards frais en branches": { unitPrice: 0.008, packagePrice: 1.60, unit: "g" },
  "Bûche de chèvre": { unitPrice: 0.0092, packagePrice: 1.85, unit: "g" },
  "Pâte feuilletée pur beurre": { unitPrice: 1.35, packagePrice: 1.35, unit: "pièce" },
  "Tomates rondes": { unitPrice: 0.35, packagePrice: 2.20, unit: "pièce" },
  "Pavé de saumon frais ou surgelé": { unitPrice: 0.021, packagePrice: 5.20, unit: "g" },
  "Brocolis frais ou surgelés": { unitPrice: 0.0034, packagePrice: 1.70, unit: "g" },
  "Pommes de terre": { unitPrice: 0.0011, packagePrice: 2.70, unit: "g" },
  "Crevettes décortiquées cuites": { unitPrice: 0.0175, packagePrice: 3.50, unit: "g" },
  "Nouilles asiatiques aux œufs": { unitPrice: 0.0052, packagePrice: 1.30, unit: "g" },
  "Bœuf haché 15% MG": { unitPrice: 0.012, packagePrice: 4.80, unit: "g" },
  "Pain de mie grandes tranches": { unitPrice: 0.10, packagePrice: 1.45, unit: "tranche" },
  "Moutarde de Dijon": { unitPrice: 0.003, packagePrice: 1.10, unit: "g" },
  "Sauce soja": { unitPrice: 0.010, packagePrice: 1.60, unit: "ml" },
  "Sauce soja salée": { unitPrice: 0.010, packagePrice: 1.60, unit: "ml" },
  "Carottes fraîches": { unitPrice: 0.25, packagePrice: 1.40, unit: "pièce" },
  "Beurre doux": { unitPrice: 0.0084, packagePrice: 2.10, unit: "g" }
};
