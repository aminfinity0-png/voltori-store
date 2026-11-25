/* ==========================================================
   VOLTORI STORE — Product Catalog & Interactive Storefront
   Edit PRODUCTS below to add, remove, or update items/prices.
   ========================================================== */

const PRODUCTS = [
  {
    id: "magsafe-15w",
    name: "MagSafe Wireless Charger 15W",
    category: "Charging",
    price: 39.00,
    oldPrice: 49.00,
    rating: 4.9,
    reviews: 412,
    badge: "Best Seller",
    image: "assets/magsafe-charger.jpg",
    variants: ["Silver Aluminum", "Space Gray"],
    swatches: ["#cbd5e1", "#334155"],
    description: "Snap-on 15W magnetic fast charging pad crafted from CNC-machined aluminum with a 1.5m braided USB-C cable.",
    specs: ["15W Qi2 / MagSafe certified", "N52 neodymium magnet array", "Foreign-object & thermal protection"]
  },
  {
    id: "gan-65w",
    name: "65W GaN USB-C Charger",
    category: "Charging",
    price: 49.00,
    oldPrice: 59.00,
    rating: 4.9,
    reviews: 538,
    badge: "Top Rated",
    image: "assets/gan-charger-65w.jpg",
    variants: ["Matte Black", "Arctic White"],
    swatches: ["#1e293b", "#f1f5f9"],
    description: "Dual-port GaN III wall adapter powerful enough to charge a MacBook Pro and phone simultaneously.",
    specs: ["2x USB-C PD 3.0 + PPS", "Foldable prongs, travel-ready", "40% smaller than stock bricks"]
  },
  {
    id: "anc-earbuds",
    name: "ANC Wireless Earbuds",
    category: "Audio",
    price: 79.00,
    oldPrice: 99.00,
    rating: 4.8,
    reviews: 329,
    badge: "Save $20",
    image: "assets/anc-earbuds.jpg",
    variants: ["Graphite", "Obsidian"],
    swatches: ["#475569", "#0f172a"],
    description: "Hybrid 42dB active noise cancellation with 11mm dynamic drivers, transparency mode, and 36-hour battery life.",
    specs: ["Bluetooth 5.4 multipoint", "IPX5 sweat & rain resistant", "USB-C + wireless charging case"]
  },
  {
    id: "mini-speaker",
    name: "Mini Bluetooth Speaker",
    category: "Audio",
    price: 45.00,
    oldPrice: 55.00,
    rating: 4.7,
    reviews: 214,
    badge: "Portable",
    image: "assets/mini-speaker.jpg",
    variants: ["Charcoal Mesh", "Slate Blue"],
    swatches: ["#334155", "#0284c7"],
    description: "360° room-filling acoustics with passive bass radiator, ambient cyan LED ring, and 14-hour playtime.",
    specs: ["IP67 waterproof & dustproof", "Stereo pairing support", "10W rich bass driver"]
  },
  {
    id: "power-bank-100w",
    name: "VoltCore 100W Power Bank (20,000mAh)",
    category: "Charging",
    price: 69.00,
    oldPrice: 89.00,
    rating: 4.9,
    reviews: 287,
    badge: "New",
    image: "assets/power-bank-100w.jpg",
    variants: ["Titanium Gray"],
    swatches: ["#475569"],
    description: "Airline-safe 20,000mAh portable power station with smart digital percentage display and 100W laptop output.",
    specs: ["100W USB-C PD + 22.5W USB-A", "Smart OLED battery readout", "Pass-through charging supported"]
  },
  {
    id: "desk-lamp-hub",
    name: "VoltDesk Lamp & 6-in-1 USB-C Hub",
    category: "Desk",
    price: 89.00,
    oldPrice: 109.00,
    rating: 4.8,
    reviews: 176,
    badge: "Studio Pick",
    image: "assets/desk-lamp-hub.jpg",
    variants: ["Anodized Silver", "Matte Black"],
    swatches: ["#cbd5e1", "#1e293b"],
    description: "Eye-care stepless dimming aluminum desk lamp paired with a 4K HDMI + 100W PD aluminum USB-C dock.",
    specs: ["CRI 95+ flicker-free LED", "4K@60Hz HDMI + SD/TF + USB 3.2", "Touch dimmer & color temp control"]
  },
  {
    id: "smart-power-strip",
    name: "Smart Wi-Fi Surge Power Strip",
    category: "Smart Home",
    price: 34.00,
    oldPrice: 44.00,
    rating: 4.7,
    reviews: 193,
    badge: "Smart Home",
    image: "assets/smart-power-strip.jpg",
    variants: ["White / Charcoal"],
    swatches: ["#f8fafc", "#334155"],
    description: "App & voice-controlled 3-outlet surge protector with built-in USB-C fast charging and energy monitoring.",
    specs: ["Works with Alexa & Google Home", "Individual outlet schedules", "1800J surge protection"]
  },
  {
    id: "desk-stand-bundle",
    name: "MagSafe Desk Stand + Cable Kit",
    category: "Desk",
    price: 42.00,
    oldPrice: 52.00,
    rating: 4.8,
    reviews: 145,
    badge: "Desk Essential",
    image: "assets/magsafe-charger.jpg",
    variants: ["Silver Aluminum", "Space Gray"],
    swatches: ["#cbd5e1", "#334155"],
    description: "Weighted aluminum magnetic desk dock with StandBy mode angle adjustment and magnetic cable anchor.",
    specs: ["Weighted anti-slip base", "Supports iOS StandBy mode", "Includes 2m 100W braided cable"]
  }
];

const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1 },
  INR: { symbol: "₹", rate: 84 },
  EUR: { symbol: "€", rate: 0.92 }
};

const PROMO_CODES = {
  VOLTORI10: 0.10,
  WELCOME15: 0.15
};

const FREE_SHIPPING_THRESHOLD = 49;
const FLAT_SHIPPING_USD = 5.99;

// Safe storage helpers
function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveState(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Ignore storage quota / sandbox restrictions
  }
}

// App State
const state = {
  category: "All",
  search: "",
  sort: "featured",
  currency: loadState("voltori_currency", "USD"),
  theme: loadState("voltori_theme", "dark"),
  wishlist: loadState("voltori_wishlist", []),
  cart: loadState("voltori_cart", []),
  promoCode: loadState("voltori_promo", ""),
  quickViewId: null,
  quickViewVariant: "",
  quickViewQty: 1
};

// Formatting
function formatPrice(usdAmount) {
  const cfg = CURRENCY_RATES[state.currency] || CURRENCY_RATES.USD;
  const converted = usdAmount * cfg.rate;
  if (state.currency === "INR") {
    return `${cfg.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
  }
  return `${cfg.symbol}${converted.toFixed(2)}`;
}

// Toast
function showToast(message) {
  const container = document.getElementById("toastContainer");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// Theme
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  document.getElementById("themeIcon").textContent = theme === "dark" ? "☀️" : "🌙";
  saveState("voltori_theme", theme);
}

// Products Render
function getFilteredProducts() {
  let list = [...PRODUCTS];
  if (state.category === "Saved") {
    list = list.filter((p) => state.wishlist.includes(p.id));
  } else if (state.category !== "All") {
    list = list.filter((p) => p.category === state.category);
  }

  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    list = list.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);

  return list;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const items = getFilteredProducts();

  if (!items.length) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  grid.innerHTML = items.map((p) => {
    const isSaved = state.wishlist.includes(p.id);
    const swatches = p.swatches.map((hex) => `<span class="swatch" style="background:${hex}"></span>`).join("");
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <span class="product-badge">${p.badge}</span>
          <button type="button" class="wish-btn ${isSaved ? "saved" : ""}" data-action="wishlist" data-id="${p.id}" aria-label="Save ${p.name}">
            ${isSaved ? "♥" : "♡"}
          </button>
        </div>
        <div class="product-body">
          <div class="product-meta">
            <span>${p.category}</span>
            <span>★ ${p.rating} (${p.reviews})</span>
          </div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-swatches">${swatches}</div>
          <div class="product-price-row">
            <span class="price-now">${formatPrice(p.price)}</span>
            <span class="price-old">${formatPrice(p.oldPrice)}</span>
          </div>
          <div class="product-actions">
            <button type="button" class="btn btn-primary btn-sm" data-action="add" data-id="${p.id}">Add to Cart</button>
            <button type="button" class="btn btn-secondary btn-sm" data-action="quickview" data-id="${p.id}">Quick View</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Cart & Totals
function calculateTotals() {
  const subtotal = state.cart.reduce((sum, item) => {
    const prod = PRODUCTS.find((p) => p.id === item.id);
    return sum + (prod ? prod.price * item.qty : 0);
  }, 0);

  const discountRate = PROMO_CODES[state.promoCode] || 0;
  const discount = subtotal * discountRate;
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_USD;
  const total = afterDiscount + shipping;

  return { subtotal, discount, afterDiscount, shipping, total };
}

function renderCart() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = totalQty;
  document.getElementById("drawerCartCount").textContent = `(${totalQty})`;
  document.getElementById("wishlistCount").textContent = state.wishlist.length;

  const { subtotal, discount, afterDiscount, shipping, total } = calculateTotals();

  // Free shipping meter
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount);
  const pct = Math.min(100, (afterDiscount / FREE_SHIPPING_THRESHOLD) * 100);
  document.getElementById("shippingProgress").style.width = `${pct}%`;
  document.getElementById("shippingMsg").innerHTML = remaining === 0 && afterDiscount > 0
    ? `🎉 <strong>Unlocked!</strong> You get Free Express Shipping.`
    : `Add <strong>${formatPrice(remaining || FREE_SHIPPING_THRESHOLD)}</strong> more for Free Express Shipping.`;

  const itemsEl = document.getElementById("cartItems");
  const footerEl = document.getElementById("cartFooter");

  if (!state.cart.length) {
    itemsEl.innerHTML = `<div class="empty-state"><p>Your cart is empty.</p><p>Add smart gear to get started!</p></div>`;
    footerEl.hidden = true;
  } else {
    footerEl.hidden = false;
    itemsEl.innerHTML = state.cart.map((item, idx) => {
      const prod = PRODUCTS.find((p) => p.id === item.id);
      if (!prod) return "";
      return `
        <div class="cart-item">
          <img src="${prod.image}" alt="${prod.name}" />
          <div>
            <div class="cart-item-top">
              <span>${prod.name}</span>
              <span>${formatPrice(prod.price * item.qty)}</span>
            </div>
            <div class="cart-item-meta">${item.variant}</div>
            <div class="cart-item-bottom">
              <div class="qty-control">
                <button type="button" data-cart-action="dec" data-idx="${idx}" aria-label="Decrease">−</button>
                <span>${item.qty}</span>
                <button type="button" data-cart-action="inc" data-idx="${idx}" aria-label="Increase">+</button>
              </div>
              <button type="button" class="remove-item-btn" data-cart-action="remove" data-idx="${idx}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  document.getElementById("cartSubtotal").textContent = formatPrice(subtotal);
  const discountRow = document.getElementById("discountRow");
  if (discount > 0) {
    discountRow.hidden = false;
    document.getElementById("cartDiscount").textContent = `-${formatPrice(discount)} (${state.promoCode})`;
  } else {
    discountRow.hidden = true;
  }
  document.getElementById("cartShipping").textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
  document.getElementById("cartTotal").textContent = formatPrice(total);
  document.getElementById("checkoutTotalDisplay").textContent = formatPrice(total);

  // Update bundle pricing display
  document.getElementById("bundleOldPrice").textContent = formatPrice(167.00);
  document.getElementById("bundleNewPrice").textContent = formatPrice(141.95);

  saveState("voltori_cart", state.cart);
  saveState("voltori_wishlist", state.wishlist);
  saveState("voltori_promo", state.promoCode);
}

function addToCart(productId, variant = null, qty = 1) {
  const prod = PRODUCTS.find((p) => p.id === productId);
  if (!prod) return;
  const chosenVariant = variant || prod.variants[0];
  const existing = state.cart.find((item) => item.id === productId && item.variant === chosenVariant);
  if (existing) existing.qty += qty;
  else state.cart.push({ id: productId, variant: chosenVariant, qty });
  renderCart();
  showToast(`Added ${prod.name} to cart`);
}

function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx >= 0) {
    state.wishlist.splice(idx, 1);
    showToast("Removed from saved items");
  } else {
    state.wishlist.push(productId);
    showToast("Saved to your wishlist ♥");
  }
  renderProducts();
  renderCart();
}

// Quick View Modal
function openQuickView(productId) {
  const prod = PRODUCTS.find((p) => p.id === productId);
  if (!prod) return;
  state.quickViewId = prod.id;
  state.quickViewVariant = prod.variants[0];
  state.quickViewQty = 1;

  document.getElementById("qvImg").src = prod.image;
  document.getElementById("qvImg").alt = prod.name;
  document.getElementById("qvCategory").textContent = prod.category;
  document.getElementById("qvTitle").textContent = prod.name;
  document.getElementById("qvRating").textContent = `★ ${prod.rating} · ${prod.reviews} verified reviews`;
  document.getElementById("qvPrice").textContent = formatPrice(prod.price);
  document.getElementById("qvDesc").textContent = prod.description;
  document.getElementById("qvSpecs").innerHTML = prod.specs.map((s) => `<li>${s}</li>`).join("");
  document.getElementById("qvQty").textContent = "1";

  const variantsEl = document.getElementById("qvVariants");
  variantsEl.innerHTML = prod.variants.map((v, i) => `
    <button type="button" class="variant-pill ${i === 0 ? "active" : ""}" data-variant="${v}">${v}</button>
  `).join("");

  document.getElementById("quickViewModal").hidden = false;
}

function closeQuickView() {
  document.getElementById("quickViewModal").hidden = true;
}

function openCartDrawer() {
  document.getElementById("cartBackdrop").hidden = false;
  document.getElementById("cartDrawer").hidden = false;
}

function closeCartDrawer() {
  document.getElementById("cartBackdrop").hidden = true;
  document.getElementById("cartDrawer").hidden = true;
}

// Event Listeners
function initStore() {
  applyTheme(state.theme);
  document.getElementById("currencySelect").value = state.currency;
  renderProducts();
  renderCart();

  // Theme toggle
  document.getElementById("themeToggleBtn").addEventListener("click", () => {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  });

  // Currency switch
  document.getElementById("currencySelect").addEventListener("change", (e) => {
    state.currency = e.target.value;
    saveState("voltori_currency", state.currency);
    renderProducts();
    renderCart();
    if (!document.getElementById("quickViewModal").hidden && state.quickViewId) {
      const prod = PRODUCTS.find((p) => p.id === state.quickViewId);
      if (prod) document.getElementById("qvPrice").textContent = formatPrice(prod.price);
    }
  });

  // Mobile Menu
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  mobileBtn.addEventListener("click", () => {
    const isHidden = mobileNav.hidden;
    mobileNav.hidden = !isHidden;
    mobileBtn.setAttribute("aria-expanded", String(isHidden));
  });
  mobileNav.addEventListener("click", (e) => {
    if (e.target.classList.contains("mobile-nav-link")) mobileNav.hidden = true;
  });

  // Copy Promo Code
  document.getElementById("copyPromoBtn").addEventListener("click", () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText("VOLTORI10").catch(() => {});
    }
    showToast("Promo code VOLTORI10 copied!");
  });

  // Category filter
  document.getElementById("categoryBar").addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-pill");
    if (!btn) return;
    document.querySelectorAll(".cat-pill").forEach((el) => el.classList.remove("active"));
    btn.classList.add("active");
    state.category = btn.dataset.category;
    renderProducts();
  });

  // Wishlist header shortcut
  document.getElementById("wishlistFilterBtn").addEventListener("click", () => {
    document.querySelectorAll(".cat-pill").forEach((el) => {
      el.classList.toggle("active", el.dataset.category === "Saved");
    });
    state.category = "Saved";
    renderProducts();
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });

  // Search & Sort
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderProducts();
  });
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
  });
  document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    state.category = "All";
    state.search = "";
    state.sort = "featured";
    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "featured";
    document.querySelectorAll(".cat-pill").forEach((el) => el.classList.toggle("active", el.dataset.category === "All"));
    renderProducts();
  });

  // Product Grid Delegation
  document.getElementById("productGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === "add") addToCart(id);
    else if (action === "quickview") openQuickView(id);
    else if (action === "wishlist") toggleWishlist(id);
  });

  // Bundle Add
  document.getElementById("addBundleBtn").addEventListener("click", () => {
    addToCart("magsafe-15w", "Silver Aluminum", 1);
    addToCart("gan-65w", "Matte Black", 1);
    addToCart("anc-earbuds", "Graphite", 1);
    if (!state.promoCode) {
      state.promoCode = "WELCOME15";
      renderCart();
    }
    openCartDrawer();
    showToast("Bundle added with 15% savings (WELCOME15 applied)!");
  });

  // Quick View Controls
  document.getElementById("closeQuickViewBtn").addEventListener("click", closeQuickView);
  document.getElementById("quickViewModal").addEventListener("click", (e) => {
    if (e.target.id === "quickViewModal") closeQuickView();
  });
  document.getElementById("qvVariants").addEventListener("click", (e) => {
    const pill = e.target.closest(".variant-pill");
    if (!pill) return;
    document.querySelectorAll(".variant-pill").forEach((el) => el.classList.remove("active"));
    pill.classList.add("active");
    state.quickViewVariant = pill.dataset.variant;
  });
  document.getElementById("qvQtyMinus").addEventListener("click", () => {
    state.quickViewQty = Math.max(1, state.quickViewQty - 1);
    document.getElementById("qvQty").textContent = state.quickViewQty;
  });
  document.getElementById("qvQtyPlus").addEventListener("click", () => {
    state.quickViewQty += 1;
    document.getElementById("qvQty").textContent = state.quickViewQty;
  });
  document.getElementById("qvAddBtn").addEventListener("click", () => {
    if (!state.quickViewId) return;
    addToCart(state.quickViewId, state.quickViewVariant, state.quickViewQty);
    closeQuickView();
    openCartDrawer();
  });

  // Cart Drawer Controls
  document.getElementById("openCartBtn").addEventListener("click", openCartDrawer);
  document.getElementById("closeCartBtn").addEventListener("click", closeCartDrawer);
  document.getElementById("cartBackdrop").addEventListener("click", closeCartDrawer);
  document.getElementById("cartItems").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cart-action]");
    if (!btn) return;
    const idx = Number(btn.dataset.idx);
    const action = btn.dataset.cartAction;
    if (action === "inc") state.cart[idx].qty += 1;
    else if (action === "dec") {
      state.cart[idx].qty -= 1;
      if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
    } else if (action === "remove") {
      state.cart.splice(idx, 1);
    }
    renderCart();
  });

  // Promo Form
  document.getElementById("promoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("promoInput").value.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      state.promoCode = code;
      renderCart();
      showToast(`Code ${code} applied!`);
    } else {
      showToast("Invalid code. Try VOLTORI10 or WELCOME15.");
    }
  });

  // Checkout Modal
  document.getElementById("openCheckoutBtn").addEventListener("click", () => {
    closeCartDrawer();
    document.getElementById("checkoutFormWrap").hidden = false;
    document.getElementById("checkoutSuccessWrap").hidden = true;
    document.getElementById("checkoutModal").hidden = false;
  });
  document.getElementById("closeCheckoutBtn").addEventListener("click", () => {
    document.getElementById("checkoutModal").hidden = true;
  });
  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const orderNum = `#VLT-${Math.floor(100000 + Math.random() * 900000)}`;
    document.getElementById("orderIdText").textContent = orderNum;
    document.getElementById("checkoutFormWrap").hidden = true;
    document.getElementById("checkoutSuccessWrap").hidden = false;
    state.cart = [];
    state.promoCode = "";
    renderCart();
    if (typeof confetti === "function") {
      confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    }
  });
  document.getElementById("continueShoppingBtn").addEventListener("click", () => {
    document.getElementById("checkoutModal").hidden = true;
  });

  // FAQ Accordion
  document.getElementById("faqList").addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-q");
    if (!btn) return;
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  // Contact & Newsletter Forms
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    showToast("Message sent! Support will reply within 2 hours.");
  });
  document.getElementById("newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    showToast("Welcome! Use code WELCOME15 for 15% off.");
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStore);
} else {
  initStore();
}
