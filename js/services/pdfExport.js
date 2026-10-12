// Service d'export PDF pour la liste de courses PlanRepas avec prix de chaque produit
import { DEPARTMENT_LABELS } from "./groceryList.js";

/**
 * Nettoie et formate une chaîne de texte pour l'encodage PDF standard
 */
function sanitizeText(str = "") {
  return String(str)
    .replace(/[•]/g, "-")
    .replace(/[œ]/g, "oe")
    .replace(/[Œ]/g, "OE");
}

export class PdfExportService {
  /**
   * Vérifie ou charge la librairie jsPDF
   */
  async ensureJsPdf() {
    if (window.jspdf && window.jspdf.jsPDF) {
      return window.jspdf.jsPDF;
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "js/libs/jspdf.umd.min.js";
      script.onload = () => {
        if (window.jspdf && window.jspdf.jsPDF) {
          resolve(window.jspdf.jsPDF);
        } else {
          reject(new Error("jsPDF introuvable après chargement"));
        }
      };
      script.onerror = () => reject(new Error("Impossible de charger js/libs/jspdf.umd.min.js"));
      document.head.appendChild(script);
    });
  }

  /**
   * Génère et télécharge le PDF de la liste de courses
   */
  async generateGroceryPdf({ groceryData, mealCount = 7, servings = 1, targetBudget = 30, meals = [] }) {
    try {
      const jsPDFClass = await this.ensureJsPdf();
      const doc = new jsPDFClass({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const marginX = 14;
      const contentWidth = pageWidth - (marginX * 2);
      let cursorY = 16;
      let currentPage = 1;

      const dateStr = new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(new Date());

      // Helper pour pied de page
      const drawFooter = () => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `PlanRepas • Liste de courses générée le ${dateStr}`,
          marginX,
          pageHeight - 10
        );
        doc.text(
          `Page ${currentPage}`,
          pageWidth - marginX,
          pageHeight - 10,
          { align: "right" }
        );
      };

      // Helper pour vérifier le saut de page
      const checkPageBreak = (neededSpace = 18) => {
        if (cursorY + neededSpace > pageHeight - 18) {
          drawFooter();
          doc.addPage();
          currentPage++;
          cursorY = 16;
          return true;
        }
        return false;
      };

      // 1. BANNIÈRE D'EN-TÊTE
      doc.setFillColor(16, 185, 129); // Émeraude #10b981
      doc.roundedRect(marginX, cursorY, contentWidth, 24, 3, 3, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text("PLANREPAS • LISTE DE COURSES", marginX + 6, cursorY + 9);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(
        sanitizeText(`Semaine du ${dateStr}  •  ${mealCount} repas (${servings} ${servings > 1 ? "personnes" : "personne"})  •  Budget cible : ${targetBudget} €`),
        marginX + 6,
        cursorY + 16
      );

      cursorY += 30;

      // 2. RÉSUMÉ DES REPAS PLANIFIÉS (Cadre élégant)
      if (meals && meals.length > 0) {
        doc.setFillColor(248, 250, 252); // #f8fafc
        doc.setDrawColor(226, 232, 240);
        const mealTitles = meals.map(m => m.title).join("  •  ");
        const mealLines = doc.splitTextToSize(`Menu prévu : ${sanitizeText(mealTitles)}`, contentWidth - 8);
        const boxHeight = Math.max(12, (mealLines.length * 4.2) + 6);

        doc.roundedRect(marginX, cursorY, contentWidth, boxHeight, 2, 2, "FD");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text(mealLines, marginX + 4, cursorY + 5.5);

        cursorY += boxHeight + 6;
      }

      // 3. ARTICLES PAR RAYON DE SUPERMARCHÉ
      for (const [depKey, meta] of Object.entries(DEPARTMENT_LABELS)) {
        const items = groceryData.byDepartment[depKey] || [];
        if (items.length === 0) continue;

        checkPageBreak(25);

        // En-tête du rayon
        doc.setFillColor(241, 245, 249); // #f1f4f9
        doc.roundedRect(marginX, cursorY, contentWidth, 7, 1.5, 1.5, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(30, 41, 59);
        const depTitle = `${meta.label.toUpperCase()} (${items.length} produit${items.length > 1 ? "s" : ""})`;
        doc.text(sanitizeText(depTitle), marginX + 3.5, cursorY + 5);

        cursorY += 10;

        // Lignes de produits du rayon
        for (const item of items) {
          checkPageBreak(14);

          const isPantry = item.inPantry;

          // Case à cocher
          doc.setDrawColor(isPantry ? 203 : 100, isPantry ? 213 : 116, isPantry ? 225 : 139);
          doc.rect(marginX + 2, cursorY - 3.2, 3.8, 3.8);

          if (isPantry) {
            // Coche placard
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.setTextColor(100, 116, 139);
            doc.text("v", marginX + 3, cursorY - 0.5);
          }

          // Nom de l'article
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.5);
          doc.setTextColor(isPantry ? 148 : 30, isPantry ? 163 : 41, isPantry ? 184 : 59);
          const itemName = sanitizeText(item.name + (isPantry ? " (Déjà au placard)" : ""));
          doc.text(itemName, marginX + 8.5, cursorY);

          // Prix de l'article (aligné à droite)
          const priceStr = isPantry
            ? "0,00 € (placard)"
            : `${item.estimatedStoreCost.toFixed(2).replace(".", ",")} €`;

          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.5);
          doc.setTextColor(isPantry ? 148 : 5, isPantry ? 163 : 150, isPantry ? 184 : 105);
          doc.text(priceStr, pageWidth - marginX - 2, cursorY, { align: "right" });

          cursorY += 4.2;

          // Sous-titre détail : conditionnement, quantité consommée et recettes associées
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);

          const packDetail = `${item.packagesNeeded} paquet${item.packagesNeeded > 1 ? "s" : ""} de ${item.packageSize} ${item.unit} (${item.packagePrice.toFixed(2).replace(".", ",")} € / paquet)`;
          const needDetail = `Besoin : ${Math.round(item.totalQuantity * 10) / 10} ${item.unit}`;
          const recipesDetail = item.mealsUsedIn && item.mealsUsedIn.length > 0
            ? `Recettes : ${item.mealsUsedIn.join(", ")}`
            : "";

          const fullDetail = sanitizeText([packDetail, needDetail, recipesDetail].filter(Boolean).join("  •  "));
          const detailLines = doc.splitTextToSize(fullDetail, contentWidth - 30);
          doc.text(detailLines, marginX + 8.5, cursorY);

          cursorY += (detailLines.length * 3.5) + 2.5;

          // Ligne séparatrice fine
          doc.setDrawColor(241, 245, 249);
          doc.setLineWidth(0.2);
          doc.line(marginX + 8.5, cursorY - 1, pageWidth - marginX - 2, cursorY - 1);
        }

        cursorY += 3.5;
      }

      // 4. RÉCAPITULATIF FINANCIER & CAISSE
      checkPageBreak(30);

      doc.setFillColor(240, 253, 244); // Vert très doux #f0fdf4
      doc.setDrawColor(16, 185, 129); // Bordure verte
      doc.setLineWidth(0.5);
      doc.roundedRect(marginX, cursorY, contentWidth, 22, 2.5, 2.5, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text("TOTAL ESTIMÉ EN CAISSE SUPERMARCHÉ", marginX + 6, cursorY + 7.5);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(5, 150, 105);
      const totalStr = `${groceryData.finalCheckoutCost.toFixed(2).replace(".", ",")} €`;
      doc.text(totalStr, pageWidth - marginX - 6, cursorY + 8, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const itemsCountStr = `${groceryData.items.filter(i => !i.inPantry).length} article(s) à acheter  •  Budget prévu : ${targetBudget} €`;
      const savingsStr = groceryData.pantrySavings > 0
        ? `  •  Économie placard : ${groceryData.pantrySavings.toFixed(2).replace(".", ",")} €`
        : "";
      doc.text(sanitizeText(itemsCountStr + savingsStr), marginX + 6, cursorY + 15);

      // Dessine le pied de page sur la dernière page
      drawFooter();

      // Téléchargement automatique
      const safeFilename = `liste-courses-planrepas-${mealCount}repas.pdf`;
      doc.save(safeFilename);
      return true;
    } catch (err) {
      console.error("Erreur génération PDF:", err);
      // Repli sur l'impression du navigateur si nécessaire
      window.print();
      return false;
    }
  }
}

export const pdfExportService = new PdfExportService();
