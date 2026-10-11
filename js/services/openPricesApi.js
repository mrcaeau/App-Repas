// Service d'interrogation de l'API Open Food Facts & Open Prices
// Documentation : https://prices.openfoodfacts.org/api/docs et https://wiki.openfoodfacts.org/API

import { DEFAULT_PRICE_INDEX } from "../data/recipes.js";

const CACHE_KEY_PREFIX = "open_price_cache_v1_";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 heures

export class OpenPricesService {
  constructor() {
    this.memoryCache = new Map();
  }

  /**
   * Récupère le prix estimé pour un ingrédient
   * Essaie le cache local, puis l'API Open Prices / OFF, et se rabat gracieusement sur l'index de référence.
   */
  async getIngredientPrice(ingredient) {
    const query = ingredient.offQuery || ingredient.name;
    const cacheKey = `${CACHE_KEY_PREFIX}${query.toLowerCase()}`;

    // 1. Vérification en cache mémoire ou LocalStorage
    const cached = this._getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    // 2. Recherche distante vers Open Prices / Open Food Facts
    try {
      const liveData = await this._fetchFromOpenFoodFacts(query);
      if (liveData && liveData.price) {
        const result = {
          price: liveData.price,
          currency: "EUR",
          source: "Open Prices (Open Food Facts)",
          productName: liveData.productName || ingredient.name,
          brand: liveData.brand || "Enseigne",
          date: liveData.date || new Date().toISOString().split("T")[0],
          isLive: true
        };
        this._saveToCache(cacheKey, result);
        return result;
      }
    } catch (err) {
      console.warn(`[OpenPrices] Fallback utilisé pour "${query}":`, err.message);
    }

    // 3. Repli fiable sur l'index de référence
    const fallback = DEFAULT_PRICE_INDEX[ingredient.name] || {
      packagePrice: ingredient.packagePrice || 1.50,
      unitPrice: (ingredient.packagePrice || 1.50) / (ingredient.packageSize || 100)
    };

    const fallbackResult = {
      price: fallback.packagePrice,
      unitPrice: fallback.unitPrice,
      currency: "EUR",
      source: "Référentiel vérifié (Moyenne Supermarchés France)",
      productName: ingredient.name,
      brand: "Moyenne nationale",
      isLive: false
    };

    this._saveToCache(cacheKey, fallbackResult);
    return fallbackResult;
  }

  /**
   * Recherche un produit dans la base Open Food Facts
   */
  async _fetchFromOpenFoodFacts(searchTerm) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500); // Timeout rapide pour ne pas bloquer l'UI

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        searchTerm
      )}&search_simple=1&action=process&json=1&page_size=2&lc=fr&cc=fr`;

      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "PlanRepasApp/1.0 (https://github.com/mrcaeau/App-Repas)"
        },
        signal: controller.signal
      });

      if (!response.ok) return null;
      const data = await response.json();

      if (data && data.products && data.products.length > 0) {
        const product = data.products[0];
        
        // Si le produit possède un code barre, on peut tenter l'API Open Prices
        if (product.code) {
          const priceFromOpenPrices = await this._fetchOpenPricesByCode(product.code);
          if (priceFromOpenPrices) {
            return {
              price: priceFromOpenPrices.price,
              productName: product.product_name_fr || product.product_name,
              brand: product.brands || "Distributeur",
              date: priceFromOpenPrices.date
            };
          }
        }
      }
    } catch (e) {
      // Échec silencieux ou abort
    } finally {
      clearTimeout(timeoutId);
    }
    return null;
  }

  /**
   * Appel à l'API publique Open Prices
   */
  async _fetchOpenPricesByCode(barcode) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);
      const url = `https://prices.openfoodfacts.org/api/v1/prices?product_code=${barcode}&size=1&order_by=-date`;

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const result = await res.json();
        if (result && result.items && result.items.length > 0) {
          const priceRecord = result.items[0];
          return {
            price: Number(priceRecord.price),
            date: priceRecord.date
          };
        }
      }
    } catch (e) {
      // Ignorer si indisponible
    }
    return null;
  }

  _getFromCache(key) {
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const item = JSON.parse(raw);
      if (Date.now() - item.timestamp > CACHE_TTL_MS) {
        localStorage.removeItem(key);
        return null;
      }
      this.memoryCache.set(key, item.data);
      return item.data;
    } catch {
      return null;
    }
  }

  _saveToCache(key, data) {
    this.memoryCache.set(key, data);
    try {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {
      // Quota localStorage plein
    }
  }
}

export const openPricesService = new OpenPricesService();
