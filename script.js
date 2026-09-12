// --- قاعدة بيانات المنتجات التجريبية لبَيْعان (Mock Data) ---
const bayanProducts = [
    {
        id: 1,
        name: "هودي بَيْعان العصري الثقيل (Unisex)",
        category: "الموضة",
        price: 750,
        oldPrice: 950,
        discount: "20%",
        rating: 4.8,
        reviewsCount: 142,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        description: "مصنوع من قطن مصري نقي 100%، تصميم عصري مريح يناسب الأجواء الشبابية مع جودة تطريز عالية تحمل هوية بَيْعان.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["أسود كلاسيكي", "رمادي داكن", "كحلي"]
    },
    {
        id: 2,
        name: "سماعات بَيْعان اللاسلكية الذكية Pro",
        category: "الإلكترونيات",
        price: 599,
        oldPrice: 899,
        discount: "33%",
        rating: 4.9,
        reviewsCount: 280,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "عزل ضوضاء فائق، بطارية تدوم حتى 30 ساعة متواصلة، صوت نقدي فائق العمق مصمم خصيصاً لعشاق الموسيقى والألعاب.",
        sizes: [],
        colors: ["أبيض لؤلؤي", "أسود مطفي"]
    },
    {
        id: 3,
        name: "ساعة بَيْعان الذكية Ultra Series",
        category: "الإكسسوارات",
        price: 1250,
        oldPrice: 1600,
        discount: "22%",
        rating: 4.7,
        reviewsCount: 95,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        description: "شاشة AMOLED عالية الدقة، متابعة الحيوية والصحة، مقاومة للماء، مع سوارين إضافيين هدية داخل العلبة.",
        sizes: [],
        colors: ["تيتانيوم فضي", "أسود داكن"]
    },
    {
        id: 4,
        name: "باور بانك سريع 20,000 ملي أمبير",
        category: "الإلكترونيات",
        price: 450,
        oldPrice: 600,
        discount: "25%",
        rating: 4.6,
        reviewsCount: 110,
        image: "https://images.unsplash.com/photo-1609592424109-857e64516773?auto=format&fit=crop&w=600&q=80",
        description: "شحن سريع جداً بقوة 22.5 واط، منافذ مزدوجة Type-C و USB، تصميم أنيق وصغير الحجم.",
        sizes: [],
        colors: ["أسود", "أبيض"]
    },
    {
        id: 5,
        name: "حذاء بَيْعان الرياضي المريح (Runner)",
        category: "الموضة",
        price: 890,
        oldPrice: 1150,
        discount: "23%",
        rating: 4.8,
        reviewsCount: 215,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        description: "خفيف الوزن، نعل مبطن مريح للجري والتمارين الطويلة، وتصميم بصري يخطف الأنظار.",
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["أحمر ناري", "أسود بالكامل"]
    },
    {
        id: 6,
        name: "منظم مكتب ذكي بإضاءة LED ومكبر صوت",
        category: "المنزل",
        price: 380,
        oldPrice: 500,
        discount: "24%",
        rating: 4.5,
        reviewsCount: 78,
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
        description: "منتج منزلي عصري يجمع بين إضاءة مكتبية مريحة للعين، شاحن لاسلكي للجوال، وساعة دائرية رقمية.",
        sizes: [],
        colors: ["أبيض خشبي", "أسود عصري"]
    }
];

const bayanCategories = [
    { name: "الموضة", icon: "fa-shirt", count: "أكثر من 150 منتج" },
    { name: "الإلكترونيات", icon: "fa-mobile-screen", count: "أحدث الأجهزة والموبايلات" },
    { name: "الإكسسوارات", icon: "fa-clock", count: "ساعات ونظارات عصرية" },
    { name: "المنزل", icon: "fa-house", count: "أدوات ذكية ومفيدة" },
    { name: "منتجات متنوعة", icon: "fa-gift", count: "عروض وهدايا مميزة" }
];

// --- إدارة حالة التطبيق (State Management) ---
let cart = JSON.parse(localStorage.getItem('bayan_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bayan_wishlist')) || [];

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts(bayanProducts);
    updateBadges();
    initDarkMode();
    startCountdown();
});

// --- التنقل بين الصفحات (Views System) ---
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });

    const target = document.getElementById(viewId + '-view');
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (viewId === 'wishlist') {
        renderWishlist();
    }
}

function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- عرض الأقسام ديناميكياً ---
function renderCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = bayanCategories.map(cat => `
        <div class="category-card" onclick="filterCategory('${cat.name}')">
            <div class="category-icon"><i class="fa-solid ${cat.icon}"></i></div>
            <h4>${cat.name}</h4>
            <span>${cat.count}</span>
        </div>
    `).join('');
}

// --- عرض المنتجات ---
function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    if (!container) return;

    if (productsToRender.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">لا توجد منتجات مطابقة حالياً في بَيْعان.</p>`;
        return;
    }

    container.innerHTML = productsToRender.map(product => {
        const isFav = wishlist.some(item => item.id === product.id);
        return `
            <div class="product-card">
                <div class="product-img-box" onclick="openProductDetails(${product.id})">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="discount-badge">خصم ${product.discount}</span>
                    <button class="wishlist-icon-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h4 class="product-title" onclick="openProductDetails(${product.id})">${product.name}</h4>
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i> <strong>${product.rating}</strong> <span>(${product.reviewsCount})</span>
                    </div>
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="current-price">${product.price} ج.م</span>
                            <span class="old-price">${product.oldPrice} ج.م</span>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})" title="إضافة للسلة">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// تصفية المنتجات حسب القسم
function filterProducts(category, btnElement) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (category === 'all') {
        renderProducts(bayanProducts);
    } else {
        const filtered = bayanProducts.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

function filterCategory(catName) {
    switchView('home');
    scrollToSection('bestsellers');
    const matchingBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.textContent.includes(catName));
    if (matchingBtn) {
        filterProducts(catName, matchingBtn);
    }
}

// --- صفحة تفاصيل المنتج الفردي ---
function openProductDetails(productId) {
    const product = bayanProducts.find(p => p.id === productId);
    if (!product) return;

    const container = document.getElementById('product-details-content');
    container.innerHTML = `
        <div class="product-gallery">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details-info">
            <span class="product-category">${product.category}</span>
            <h2>${product.name}</h2>
            <div class="product-rating" style="font-size: 14px; margin-bottom: 15px;">
                <i class="fa-solid fa-star"></i> <strong>${product.rating}</strong> <span>(${product.reviewsCount} تقييم عميل)</span>
            </div>
            <div class="price-box">
                <span class="current-price">${product.price} ج.م</span>
                <span class="old-price" style="font-size: 16px;">${product.oldPrice} ج.م</span>
                <span class="discount-badge" style="position:static;">وفر ${product.discount}</span>
            </div>
            <p>${product.description}</p>
            
            ${product.sizes.length > 0 ? `
                <div class="variants-box">
                    <label>اختر المقاس:</label>
                    <div class="variant-options">
                        ${product.sizes.map((size, idx) => `<button class="variant-btn ${idx === 0 ? 'selected' : ''}" onclick="selectVariant(this, 'size')">${size}</button>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${product.colors.length > 0 ? `
                <div class="variants-box">
                    <label>اختر اللون:</label>
                    <div class="variant-options">
                        ${product.colors.map((color, idx) => `<button class="variant-btn ${idx === 0 ? 'selected' : ''}" onclick="selectVariant(this, 'color')">${color}</button>`).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="action-buttons-group">
                <button class="btn-primary" style="flex:2;" onclick="addToCart(${product.id}); toggleCart();">إضافة إلى السلة</button>
                <button class="btn-secondary" style="flex:1;" onclick="toggleWishlist(${product.id})"><i class="fa-solid fa-heart"></i> مفضلة</button>
            </div>
        </div>
    `;

    switchView('product');
}

function selectVariant(btn, type) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

// --- نظام السلة والمفضلة (Local Storage) ---
function addToCart(productId) {
    const product = bayanProducts.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateBadges();
    renderCartItems();
    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح 🛒`);
}

function updateCartQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    saveCart();
    updateBadges();
    renderCartItems();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateBadges();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('bayan_cart', JSON.stringify(cart));
}

function toggleCart() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 40px;">سلة بَيْعان فارغة حالياً.</p>`;
        totalElement.textContent = '0 ج.م';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item-card">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <span>${item.price} ج.م</span>
                    <div class="cart-item-controls">
                        <button onclick="updateCartQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-cart-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }).join('');

    totalElement.textContent = total + ' ج.م';
}

function toggleWishlist(productId) {
    const product = bayanProducts.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('تمت إزالة المنتج من المفضلة');
    } else {
        wishlist.push(product);
        showToast('تمت إضافة المنتج إلى المفضلة ❤️');
    }

    localStorage.setItem('bayan_wishlist', JSON.stringify(wishlist));
    updateBadges();
    renderProducts(bayanProducts);
    if (document.getElementById('wishlist-view').classList.contains('active')) {
        renderWishlist();
    }
}

function renderWishlist() {
    const container = document.getElementById('wishlist-container');
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">ليس لديك أي منتجات في المفضلة بعد.</p>`;
        return;
    }

    container.innerHTML = wishlist.map(product => `
        <div class="product-card">
            <div class="product-img-box" onclick="openProductDetails(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-icon-btn active" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h4 class="product-title" onclick="openProductDetails(${product.id})">${product.name}</h4>
                <div class="product-footer">
                    <span class="current-price">${product.price} ج.م</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateBadges() {
    document.getElementById('cart-badge').textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById('wishlist-badge').textContent = wishlist.length;
}

// --- نظام البحث الذكي الحي (Live Search) ---
function openSearchModal() {
    document.getElementById('search-modal').classList.add('active');
    document.getElementById('live-search-input').focus();
}

function closeSearchModal() {
    document.getElementById('search-modal').classList.remove('active');
}

function quickSearch(keyword) {
    document.getElementById('live-search-input').value = keyword;
    performSearch(keyword);
}

function performSearch(query) {
    const container = document.getElementById('search-results-container');
    if (!query.trim()) {
        container.innerHTML = '';
        return;
    }

    const results = bayanProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));

    if (results.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 20px;">عذراً، لم نجد نتائج مطابقة لـ "${query}"</p>`;
        return;
    }

    container.innerHTML = results.map(product => `
        <div style="display: flex; gap: 12px; align-items: center; padding: 10px; background: var(--bg-color); border-radius: 10px; cursor: pointer;" onclick="closeSearchModal(); openProductDetails(${product.id})">
            <img src="${product.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
            <div>
                <h5 style="font-size: 14px; font-weight: 700; margin-bottom: 2px;">${product.name}</h5>
                <span style="font-size: 13px; color: var(--primary); font-weight: 900;">${product.price} ج.م</span>
            </div>
        </div>
    `).join('');
}

// --- إتمام الطلب (Checkout) ---
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('سلتك فارغة، أضف منتجات أولاً!');
        return;
    }
    toggleCart();
    switchView('checkout');

    const itemsList = document.getElementById('checkout-items-list');
    let total = 0;
    itemsList.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `<div style="display:flex; justify-content:space-between; margin-bottom: 10px; font-size: 14px;"><span>${item.name} (${item.qty})</span><strong>${item.price * item.qty} ج.م</strong></div>`;
    }).join('');

    document.getElementById('checkout-total-price').textContent = total + ' ج.م';
}

function completeOrder(event) {
    event.preventDefault();
    const orderId = 'BY-' + Math.floor(1000 + Math.random() * 9000);
    alert(`تهانينا! تم تأكيد طلبك بنجاح في بَيْعان 🎉\nرقم الطلب الخاص بك هو: ${orderId}\nسيتم التواصل معك قريباً لتأكيد الشحن.`);
    cart = [];
    saveCart();
    updateBadges();
    switchView('home');
}

// --- تتبع الطلب ---
function trackOrder() {
    const val = document.getElementById('tracking-input').value.trim();
    if (!val) {
        alert('يرجى إدخال رقم الطلب الصحيح');
        return;
    }
    document.getElementById('tracking-steps').style.display = 'flex';
    showToast('تم العثور على الشحنة بنجاح!');
}

// --- الوضع الليلي (Dark Mode) ---
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('bayan_theme', newTheme);

    const icon = document.getElementById('theme-icon');
    icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function initDarkMode() {
    const savedTheme = localStorage.getItem('bayan_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// --- العداد التنازلي للعروض (Countdown Timer) ---
function startCountdown() {
    let hours = 12, minutes = 45, seconds = 30;
    setInterval(() => {
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 12; }

        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
        if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// --- إشعارات سريعة Toast Notification ---
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 90px;
        left: 20px;
        background: var(--text-color);
        color: var(--bg-color);
        padding: 12px 20px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        z-index: 4000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: fadeInOut 3s ease forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}