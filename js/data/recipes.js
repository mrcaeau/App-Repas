// Base de recettes diversifiées, économiques et équilibrées
// Chaque ingrédient contient les ratios par personne, le conditionnement standard de supermarché et le mot-clé Open Food Facts.

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
    instructions: [
      "Faire cuire les pâtes dans un grand volume d'eau bouillante salée selon le temps indiqué.",
      "Pendant ce temps, faire dorer les lardons à feu vif dans une poêle sans matière grasse.",
      "Battre les œufs avec la crème, une pincée de poivre noir et la moitié du parmesan râpé.",
      "Égoutter les pâtes en gardant 2 cuillères à soupe d'eau de cuisson.",
      "Mélanger les pâtes chaudes avec les lardons, puis hors du feu verser le mélange œuf/crème pour une texture onctueuse. Saupoudrer du reste de parmesan."
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
    title: "Dahl parfumé de lentilles corail au lait de coco",
    description: "Riche en protéines végétales, doux, réconfortant et ultra économique.",
    category: "vege",
    diet: "vegetarien",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    tags: ["Végétarien", "Économique", "Équilibré"],
    instructions: [
      "Émincer l'oignon et le faire suer dans une casserole avec un filet d'huile.",
      "Ajouter les épices (curry/curcuma) et mélanger 1 minute pour libérer les arômes.",
      "Rincer les lentilles corail et les ajouter avec les tomates concassées et le lait de coco.",
      "Verser un verre d'eau (environ 150ml par pers), couvrir et laisser mijoter 15 à 20 minutes à feu doux.",
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
    id: "poelee-poulet-courgettes-riz",
    title: "Poêlée de poulet doré, courgettes et riz sauté",
    description: "Un repas complet, léger et équilibré prêt en moins de 25 minutes.",
    category: "equilibre",
    diet: "omnivore",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80",
    tags: ["Équilibré", "Riche en protéines", "Rapide"],
    instructions: [
      "Cuire le riz dans une casserole d'eau bouillante salée.",
      "Couper les blancs de poulet en dés et les courgettes en demi-rondelles.",
      "Faire sauter le poulet dans une poêle chaude avec un filet d'huile d'olive pendant 5 min.",
      "Ajouter les courgettes et l'ail, assaisonner d'herbes de Provence, sel et poivre.",
      "Mélanger le riz égoutté à la poêlée et faire dorer le tout 2 minutes supplémentaires."
    ],
    ingredients: [
      { name: "Filets de poulet", amountPerPerson: 120, unit: "g", department: "boucherie", packageSize: 400, packagePrice: 4.60, offQuery: "filet de poulet" },
      { name: "Courgettes", amountPerPerson: 1, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 1.80, offQuery: "courgettes" },
      { name: "Riz blanc long", amountPerPerson: 75, unit: "g", department: "epicerie", packageSize: 1000, packagePrice: 1.60, offQuery: "riz long" },
      { name: "Ail", amountPerPerson: 0.5, unit: "gousse", department: "legumes", packageSize: 3, packagePrice: 0.90, offQuery: "ail" }
    ]
  },
  {
    id: "galettes-bretonnes-completes",
    title: "Galette de sarrasin complète œuf, jambon & fromage",
    description: "Le régal simple du bistrot breton : croustillante à l'extérieur et fondante au centre.",
    category: "express",
    diet: "omnivore",
    prepTime: 5,
    cookTime: 8,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Express", "Familial", "Tradition"],
    instructions: [
      "Faire fondre une noisette de beurre dans une poêle large à feu moyen.",
      "Déposer la galette de sarrasin et casser l'œuf au centre.",
      "Répartir le jambon coupé en morceaux et parsemer d'emmental râpé autour du jaune d'œuf.",
      "Rabattre les 4 coins de la galette vers le centre dès que le blanc est cuit.",
      "Servir avec une salade verte croquante."
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
    title: "Chili sin Carne généreux & Haricots rouges",
    description: "Un plat mijoté mexicain 100% végétarien, riche en saveurs et ultra rassasiant.",
    category: "vege",
    diet: "vegetarien",
    prepTime: 10,
    cookTime: 25,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    tags: ["Végétarien", "Économique", "Batch cooking"],
    instructions: [
      "Faire revenir l'oignon et le poivron coupé en lamelles avec un peu d'huile.",
      "Ajouter les épices chili ou cumin selon les goûts.",
      "Ajouter les haricots rouges égouttés, le maïs doux et les tomates concassées.",
      "Laisser mijoter à feu doux 20 minutes pour que les saveurs se mélangent bien.",
      "Déguster avec du riz ou des tortillas de blé."
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
    title: "Gratin doré de coquillettes au thon et mozzarella",
    description: "Le repas réconfortant du soir avec des ingrédients faciles toujours sous la main.",
    category: "eco",
    diet: "pescetarien",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    tags: ["Fondant", "Fond de placard", "Enfants"],
    instructions: [
      "Préchauffer le four à 200°C. Faire cuire les coquillettes al dente.",
      "Mélanger dans un plat à gratin les pâtes égouttées, la sauce tomate et le thon émietté.",
      "Couper la mozzarella en dés et les répartir sur le dessus avec un voile d'origan.",
      "Enfourner 15 minutes jusqu'à ce que le fromage soit gratiné et bouillonnant."
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
    title: "Omelette baveuse aux champignons de Paris",
    description: "Simple, raffinée et prête en 10 minutes avec une belle salade croquante.",
    category: "express",
    diet: "vegetarien",
    prepTime: 5,
    cookTime: 8,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    tags: ["Express", "Moins de 10 min", "Léger"],
    instructions: [
      "Laver et émincer les champignons de Paris.",
      "Les faire dorer 4 minutes dans une poêle avec un peu de beurre ou d'huile.",
      "Battre les œufs dans un bol avec sel, poivre et persil haché.",
      "Verser les œufs sur les champignons chauds et cuire à feu moyen en ramenant les bords vers le centre.",
      "Plier en deux et servir aussitôt avec du pain frais."
    ],
    ingredients: [
      { name: "Œufs frais", amountPerPerson: 3, unit: "pièce", department: "frais", packageSize: 6, packagePrice: 1.95, offQuery: "oeufs" },
      { name: "Champignons de Paris frais", amountPerPerson: 100, unit: "g", department: "legumes", packageSize: 250, packagePrice: 1.40, offQuery: "champignons paris" },
      { name: "Beurre doux", amountPerPerson: 10, unit: "g", department: "frais", packageSize: 250, packagePrice: 2.10, offQuery: "beurre" },
      { name: "Pain de mie ou baguette", amountPerPerson: 60, unit: "g", department: "boulangerie", packageSize: 250, packagePrice: 1.00, offQuery: "baguette" }
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
    instructions: [
      "Dans une poêle profonde, faire suer l'oignon haché avec une cuillère de pâte de curry ou curry en poudre.",
      "Ajouter les pois chiches rincés et égouttés.",
      "Verser la crème de coco ou crème légère et laisser réduire 10 minutes.",
      "En fin de cuisson, ajouter les épinards qui vont fondre en 2 minutes.",
      "Servir bien chaud avec du riz ou du pain naan."
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
    id: "salade-cesar-maison",
    title: "Salade César croustillante au poulet doré",
    description: "Laitue croquante, morceaux de poulet tièdes, croûtons dorés et sauce crémeuse.",
    category: "equilibre",
    diet: "omnivore",
    prepTime: 12,
    cookTime: 8,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
    tags: ["Frais", "Complet", "Bistrot"],
    instructions: [
      "Couper le poulet en aiguillettes et les faire griller à la poêle avec sel et poivre.",
      "Laver et essorer la salade romaine.",
      "Préparer les croûtons en faisant dorer des dés de pain dans un peu d'huile d'olive.",
      "Disposer la salade dans les assiettes, ajouter le poulet tiède, les croûtons et les copeaux de parmesan.",
      "Napper d'un filet de vinaigrette crémeuse."
    ],
    ingredients: [
      { name: "Filets de poulet", amountPerPerson: 110, unit: "g", department: "boucherie", packageSize: 400, packagePrice: 4.60, offQuery: "filet de poulet" },
      { name: "Salade Romaine ou Sucrine", amountPerPerson: 80, unit: "g", department: "legumes", packageSize: 200, packagePrice: 1.35, offQuery: "salade romaine" },
      { name: "Pain rassis ou croûtons", amountPerPerson: 30, unit: "g", department: "boulangerie", packageSize: 250, packagePrice: 1.00, offQuery: "croutons" },
      { name: "Parmesan râpé", amountPerPerson: 20, unit: "g", department: "frais", packageSize: 100, packagePrice: 1.70, offQuery: "parmesan" },
      { name: "Sauce César ou mayonnaise", amountPerPerson: 25, unit: "g", department: "epicerie", packageSize: 250, packagePrice: 1.50, offQuery: "sauce cesar" }
    ]
  },
  {
    id: "tarte-fine-tomates-moutarde",
    title: "Tarte rustique moutarde, tomates & chèvre fondant",
    description: "Pâte croustillante, moutarde à l'ancienne et rondelles de tomates fondantes au four.",
    category: "eco",
    diet: "vegetarien",
    prepTime: 10,
    cookTime: 25,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    tags: ["Four", "Convivial", "Rustique"],
    instructions: [
      "Préchauffer le four à 200°C. Dérouler la pâte feuilletée sur une plaque de cuisson.",
      "Piquer le fond avec une fourchette et étaler 2 belles cuillères de moutarde.",
      "Couper les tomates en rondelles et les disposer harmonieusement.",
      "Déposer des rondelles de bûche de chèvre, un filet d'huile d'olive et un peu d'origan.",
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
    id: "saumon-riz-sauce-soja",
    title: "Pavé de saumon poêlé, riz blanc & fleurettes de brocoli",
    description: "Un repas sain, riche en oméga-3, ultra simple et digne d'un bon restaurant.",
    category: "poisson",
    diet: "pescetarien",
    prepTime: 10,
    cookTime: 12,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Poisson frais", "Équilibré", "Oméga 3"],
    instructions: [
      "Faire cuire le riz et les fleurettes de brocoli à l'eau bouillante salée ou vapeur.",
      "Dans une poêle bien chaude avec une goutte d'huile, saisir le pavé de saumon côté peau 4 minutes.",
      "Le retourner délicatement et poursuivre la cuisson 3 minutes à feu doux.",
      "Déglacer avec une cuillère de sauce soja.",
      "Dresser le saumon avec le riz parfumé et les brocolis arrosés d'un jus de citron."
    ],
    ingredients: [
      { name: "Pavé de saumon frais ou surgelé", amountPerPerson: 120, unit: "g", department: "frais", packageSize: 240, packagePrice: 5.20, offQuery: "saumon" },
      { name: "Brocolis frais ou surgelés", amountPerPerson: 120, unit: "g", department: "legumes", packageSize: 500, packagePrice: 1.70, offQuery: "brocolis" },
      { name: "Riz basmati", amountPerPerson: 75, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 1.40, offQuery: "riz basmati" },
      { name: "Sauce soja", amountPerPerson: 10, unit: "ml", department: "epicerie", packageSize: 150, packagePrice: 1.60, offQuery: "sauce soja" }
    ]
  },
  {
    id: "tortilla-espagnole-pommes-de-terre",
    title: "Tortilla espagnole moelleuse aux pommes de terre",
    description: "L'authentique omelette épaisse aux pommes de terre fondantes et oignons dorés.",
    category: "eco",
    diet: "vegetarien",
    prepTime: 15,
    cookTime: 20,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    tags: ["Économique", "Traditionnel", "Gourmand"],
    instructions: [
      "Éplucher et couper les pommes de terre en fines lamelles.",
      "Les faire confire doucement dans une poêle avec de l'huile et les oignons émincés pendant 15 min.",
      "Battre les œufs avec du sel et du poivre dans un saladier.",
      "Égoutter légèrement les pommes de terre et les mélanger aux œufs battus.",
      "Verser dans la poêle chaude, cuire 5 minutes puis retourner à l'aide d'une assiette pour dorer l'autre face."
    ],
    ingredients: [
      { name: "Pommes de terre", amountPerPerson: 180, unit: "g", department: "legumes", packageSize: 2500, packagePrice: 2.70, offQuery: "pommes de terre" },
      { name: "Œufs frais", amountPerPerson: 2.5, unit: "pièce", department: "frais", packageSize: 6, packagePrice: 1.95, offQuery: "oeufs" },
      { name: "Oignon jaune", amountPerPerson: 0.5, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 1.50, offQuery: "oignon" },
      { name: "Huile de tournesol ou olive", amountPerPerson: 15, unit: "ml", department: "epicerie", packageSize: 1000, packagePrice: 2.30, offQuery: "huile" }
    ]
  },
  {
    id: "curry-vert-crevettes-nouilles",
    title: "Nouilles sautées aux crevettes & petits légumes croquants",
    description: "Nouilles chinoises, crevettes sautées à l'ail et julienne de carottes bien parfumées.",
    category: "poisson",
    diet: "pescetarien",
    prepTime: 12,
    cookTime: 10,
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    tags: ["Wok", "Exotique", "Rapide"],
    instructions: [
      "Cuire les nouilles 4 minutes dans l'eau bouillante puis égoutter.",
      "Dans un wok ou poêle très chaude, faire sauter les crevettes avec l'ail 2 minutes.",
      "Ajouter les carottes émincées finement et poursuivre la cuisson 3 minutes pour garder le croquant.",
      "Ajouter les nouilles, arroser de sauce soja et remuer vivement 2 minutes.",
      "Servir chaud parsemé de graines de sésame si désiré."
    ],
    ingredients: [
      { name: "Crevettes décortiquées cuites", amountPerPerson: 90, unit: "g", department: "frais", packageSize: 200, packagePrice: 3.50, offQuery: "crevettes" },
      { name: "Nouilles asiatiques aux œufs", amountPerPerson: 75, unit: "g", department: "epicerie", packageSize: 250, packagePrice: 1.30, offQuery: "nouilles asiatiques" },
      { name: "Carottes fraîches", amountPerPerson: 1, unit: "pièce", department: "legumes", packageSize: 1000, packagePrice: 1.40, offQuery: "carottes" },
      { name: "Sauce soja salée", amountPerPerson: 15, unit: "ml", department: "epicerie", packageSize: 150, packagePrice: 1.60, offQuery: "sauce soja" }
    ]
  },
  {
    id: "hachis-parmentier-maison",
    title: "Hachis parmentier maison & purée gratinée",
    description: "Bœuf haché mijoté aux oignons sous une généreuse purée de pommes de terre dorée au four.",
    category: "equilibre",
    diet: "omnivore",
    prepTime: 20,
    cookTime: 25,
    difficulty: "Moyen",
    image: "https://images.unsplash.com/photo-1584947915598-8e6f1f44e138?auto=format&fit=crop&w=800&q=80",
    tags: ["Familial", "Tradition", "Rassasiant"],
    instructions: [
      "Cuire les pommes de terre épluchées dans l'eau salée 20 minutes puis les écraser avec du lait et du beurre.",
      "Faire revenir l'oignon et le bœuf haché dans une poêle avec sel, poivre et herbes.",
      "Dans un plat à gratin, étaler la viande hachée dans le fond.",
      "Recouvrir de la purée maison et parsemer de fromage râpé.",
      "Enfourner à 200°C pendant 20 minutes jusqu'à obtention d'une croûte dorée."
    ],
    ingredients: [
      { name: "Bœuf haché 15% MG", amountPerPerson: 120, unit: "g", department: "boucherie", packageSize: 400, packagePrice: 4.80, offQuery: "boeuf hache" },
      { name: "Pommes de terre", amountPerPerson: 200, unit: "g", department: "legumes", packageSize: 2500, packagePrice: 2.70, offQuery: "pommes de terre" },
      { name: "Lait demi-écrémé", amountPerPerson: 40, unit: "ml", department: "frais", packageSize: 1000, packagePrice: 1.15, offQuery: "lait" },
      { name: "Emmental râpé", amountPerPerson: 25, unit: "g", department: "frais", packageSize: 200, packagePrice: 1.80, offQuery: "emmental" }
    ]
  },
  {
    id: "risotto-champignons-parmesan",
    title: "Risotto crémeux aux champignons & parmesan",
    description: "Riz rond nacré, bouillon parfumé, champignons dorés et touche finale de beurre et parmesan.",
    category: "vege",
    diet: "vegetarien",
    prepTime: 10,
    cookTime: 22,
    difficulty: "Moyen",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    tags: ["Italien", "Crémeux", "Raffiné"],
    instructions: [
      "Préparer 300ml de bouillon de légumes chaud par personne.",
      "Faire revenir les champignons émincés dans une poêle et réserver.",
      "Faire nacrer le riz Arborio dans une sauteuse avec l'oignon haché et un filet d'huile.",
      "Verser le bouillon louche après louche en remuant constamment jusqu'à absorption complète (environ 18 min).",
      "Ajouter les champignons, puis hors du feu incorporer le beurre et le parmesan."
    ],
    ingredients: [
      { name: "Riz Arborio spécial risotto", amountPerPerson: 80, unit: "g", department: "epicerie", packageSize: 500, packagePrice: 1.95, offQuery: "riz risotto arborio" },
      { name: "Champignons de Paris", amountPerPerson: 90, unit: "g", department: "legumes", packageSize: 250, packagePrice: 1.40, offQuery: "champignons" },
      { name: "Bouillon de légumes en cube", amountPerPerson: 0.5, unit: "cube", department: "epicerie", packageSize: 8, packagePrice: 1.10, offQuery: "bouillon cubes" },
      { name: "Parmesan râpé", amountPerPerson: 20, unit: "g", department: "frais", packageSize: 100, packagePrice: 1.70, offQuery: "parmesan rape" },
      { name: "Beurre", amountPerPerson: 10, unit: "g", department: "frais", packageSize: 250, packagePrice: 2.10, offQuery: "beurre" }
    ]
  },
  {
    id: "croque-monsieur-four-salade",
    title: "Croque-monsieur gratiné à la béchamel & salade",
    description: "Pain croustillant, jambon de qualité et béchamel fondante gratinée à point.",
    category: "express",
    diet: "omnivore",
    prepTime: 10,
    cookTime: 12,
    difficulty: "Très facile",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    tags: ["Express", "Classique", "Moins de 2€/pers"],
    instructions: [
      "Préchauffer le four à 210°C position grill.",
      "Beurrer légèrement les tranches de pain de mie.",
      "Déposer une tranche de jambon et du fromage râpé entre deux tranches de pain.",
      "Napper le dessus d'une cuillère de béchamel ou crème et recouvrir d'emmental.",
      "Enfourner 10 à 12 minutes jusqu'à ce que le dessus soit gratiné et croustillant."
    ],
    ingredients: [
      { name: "Pain de mie grandes tranches", amountPerPerson: 2, unit: "tranche", department: "boulangerie", packageSize: 14, packagePrice: 1.45, offQuery: "pain de mie" },
      { name: "Jambon blanc", amountPerPerson: 1, unit: "tranche", department: "frais", packageSize: 4, packagePrice: 2.20, offQuery: "jambon blanc" },
      { name: "Emmental râpé", amountPerPerson: 40, unit: "g", department: "frais", packageSize: 200, packagePrice: 1.80, offQuery: "emmental rape" },
      { name: "Crème fraîche ou béchamel", amountPerPerson: 30, unit: "g", department: "frais", packageSize: 200, packagePrice: 0.95, offQuery: "creme fraiche" },
      { name: "Salade verte", amountPerPerson: 40, unit: "g", department: "legumes", packageSize: 150, packagePrice: 1.30, offQuery: "salade verte" }
    ]
  }
];

// Barèmes de repli et de référence pour produits frais et d'épicerie (Moyennes supermarché France)
export const DEFAULT_PRICE_INDEX = {
  "Pâtes (Penne ou Tagliatelles)": { unitPrice: 0.0023, packagePrice: 1.15, unit: "g" },
  "Lardons fumés": { unitPrice: 0.0092, packagePrice: 1.85, unit: "g" },
  "Œufs frais": { unitPrice: 0.325, packagePrice: 1.95, unit: "pièce" },
  "Crème fraîche fluide": { unitPrice: 0.0047, packagePrice: 0.95, unit: "ml" },
  "Parmesan râpé": { unitPrice: 0.017, packagePrice: 1.70, unit: "g" },
  "Lentilles corail": { unitPrice: 0.0033, packagePrice: 1.65, unit: "g" },
  "Lait de coco": { unitPrice: 0.0036, packagePrice: 1.45, unit: "ml" },
  "Tomates concassées en boîte": { unitPrice: 0.0024, packagePrice: 0.95, unit: "g" },
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
  "Bœuf haché 15% MG": { unitPrice: 0.012, packagePrice: 4.80, unit: "g" }
};
