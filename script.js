// ==================== PIZZA DATA ====================
const pizzas = [
    { id: 1, name: 'Margherita', description: 'Tom, mozzarella ja basilika', price: 12.90, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop' },
    { id: 2, name: 'Pepperoni', description: 'Tom, mozzarella ja pepperoni', price: 14.90, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&h=300&fit=crop' },
    { id: 3, name: 'Vesuvius', description: 'Tom, mozzarella, jalapeno ja chili', price: 15.90, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop' },
    { id: 4, name: 'Quattro Formaggi', description: 'Tom, mozzarella, parmesaani ja blue cheese', price: 17.90, image: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=300&h=300&fit=crop' }
];

const drinks = [
    { id: 101, name: 'Coca-Cola', description: 'Klassinen virvoitusjuoma', price: 2.50, image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=300&fit=crop' },
    { id: 102, name: 'Fanta Appelsiini', description: 'Makea appelsiinijuoma', price: 2.50, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop' },
    { id: 103, name: 'Sprite', description: 'Sitruunainen virvoitusjuoma', price: 2.50, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=300&h=300&fit=crop' },
    { id: 104, name: 'Appelsiinimehu', description: 'Tuore appelsiinimehu', price: 3.50, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop' }
];

// ==================== DOM ELEMENTS (initialized later) ====================
let pizzaGrid;
let drinksGrid;
let productModal;
let modalContent;
let closeBtn;
let closeModal; // will be set after DOM load
let selectedItem = null;

// ==================== NAVIGATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // element references must be acquired after DOM ready
    pizzaGrid = document.getElementById('pizza-grid');
    drinksGrid = document.getElementById('drinks-grid');
    productModal = document.getElementById('product-modal');
    modalContent = document.querySelector('.modal-content');
    closeBtn = document.querySelector('.close-modal');
    closeModal = closeBtn; // alias used later

    loadMenus();
    setupNavigation();
    setupEventListeners();
    // show menu by default so pizzas and drinks are visible immediately
    showSection('menu');
    setupMenuTabs();
});

function setupNavigation() {
    document.querySelectorAll('[data-section]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const section = btn.getAttribute('data-section');
            showSection(section);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    // Show selected section
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== MENU LOADING ====================
function loadMenus() {
    loadPizzas();
    loadDrinks();
}

// tab switching logic for menu
function setupMenuTabs() {
    const pizzaTab = document.getElementById('show-pizzas');
    const drinksTab = document.getElementById('show-drinks');
    const pizzaCat = document.getElementById('pizza-category');
    const drinksCat = document.getElementById('drinks-category');

    if (!pizzaTab || !drinksTab || !pizzaCat || !drinksCat) return;

    pizzaTab.addEventListener('click', () => {
        pizzaCat.style.display = 'block';
        drinksCat.style.display = 'none';
        pizzaTab.classList.add('active');
        drinksTab.classList.remove('active');
    });

    drinksTab.addEventListener('click', () => {
        pizzaCat.style.display = 'none';
        drinksCat.style.display = 'block';
        drinksTab.classList.add('active');
        pizzaTab.classList.remove('active');
    });

    // default to pizzas
    pizzaTab.click();
}

function loadPizzas() {
    const grid = document.getElementById('pizza-grid');
    if (!grid) return;
    // remove any static fallback cards once we're inserting dynamic ones
    grid.querySelectorAll('.menu-item.static').forEach(el => el.remove());
    // clear placeholder text if still present
    if (grid.textContent.includes('ladataan')) grid.innerHTML = '';
    pizzas.forEach(pizza => {
        const card = createMenuCard(pizza);
        grid.appendChild(card);
    });
}

function loadDrinks() {
    const grid = document.getElementById('drinks-grid');
    if (!grid) return;
    // remove static fallback cards before adding dynamic content
    grid.querySelectorAll('.menu-item.static').forEach(el => el.remove());
    // clear placeholder text if still present
    if (grid.textContent.includes('ladataan')) grid.innerHTML = '';
    drinks.forEach(drink => {
        const card = createMenuCard(drink);
        grid.appendChild(card);
    });
}

function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-item dynamic';
    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-item-image" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(item.name)}'">
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-item-price">${item.price.toFixed(2)}€</div>
        </div>
    `;
    card.addEventListener('click', () => {
        selectedItem = item;
        populatePaymentPage();
        showSection('payment');
    });
    return card;
}
// ==================== PAYMENT PAGE ====================
function populatePaymentPage() {
    if (!selectedItem) return;
    const paymentItem = document.getElementById('payment-item');
    paymentItem.innerHTML = `
        <img src="${selectedItem.image}" alt="${selectedItem.name}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
        <h3>${selectedItem.name}</h3>
        <p>${selectedItem.description}</p>
        <div class="price-display">${selectedItem.price.toFixed(2)}€</div>
    `;
    updatePaymentTotal();
}

// ==================== PAYMENT TOTAL UPDATE ====================
function updatePaymentTotal() {
    if (!selectedItem) return;
    const quantity = parseInt(document.getElementById('payment-quantity').value) || 1;
    const total = selectedItem.price * quantity;
    document.getElementById('payment-total').textContent = total.toFixed(2) + '€';
}

// ==================== MODAL FUNCTIONALITY ====================
function openProductModal(item) {
    if (!productModal || !modalContent) return;
    
    modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="modal-title">${item.name}</div>
        <img src="${item.image}" alt="${item.name}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(item.name)}'">
        <div class="modal-description">${item.description}</div>
        <div class="price-display">${item.price.toFixed(2)}€</div>
        <form id="purchase-form" class="purchase-form">
            <div class="form-group">
                <label>Määrä:</label>
                <input type="number" id="quantity" name="quantity" min="1" value="1" required>
            </div>
            <div class="form-group">
                <label>Puhelinnumero:</label>
                <input type="tel" id="customer-phone" name="phone" required>
            </div>
            <div class="form-group">
                <label>Osoite (missä asut):</label>
                <input type="text" id="customer-address" name="address" required>
            </div>
            <button type="button" class="btn btn-primary full-width" onclick="purchaseItem(${item.id}, ${item.price})">Tilaa Nyt</button>
        </form>
    `;
    
    productModal.classList.add('active');
    
    const closeBtn = modalContent.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
}

function closeProductModal() {
    if (productModal) {
        productModal.classList.remove('active');
    }
}

// Close modal when clicking outside
if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
}

// ==================== CONFIRM PAYMENT ====================
function confirmPayment() {
    const form = document.getElementById('payment-form');
    if (!form.checkValidity()) {
        alert('Täytä kaikki kentät oikein!');
        return;
    }
    
    const quantity = parseInt(document.getElementById('payment-quantity').value);
    const phone = document.getElementById('payment-phone').value;
    const address = document.getElementById('payment-address').value;
    const cardNumber = document.getElementById('payment-card-number').value;
    const cardExpiry = document.getElementById('payment-card-expiry').value;
    const cardCvv = document.getElementById('payment-card-cvv').value;
    
    if (!selectedItem) return;
    
    const total = selectedItem.price * quantity;
    
    const order = {
        id: Date.now(),
        customer: {
            phone: phone,
            address: address,
            cardNumber: cardNumber.replace(/\d(?=\d{4})/g, '*'), // mask card
            cardExpiry: cardExpiry,
            cardCvv: cardCvv
        },
        items: [{
            id: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: quantity,
            total: total
        }],
        total: total,
        status: 'Vastaanotettu',
        timestamp: new Date().toLocaleString('fi-FI')
    };
    
    let orders = JSON.parse(localStorage.getItem('pizzaOrders')) || [];
    orders.push(order);
    localStorage.setItem('pizzaOrders', JSON.stringify(orders));
    
    alert(`Tilaus vastaanotettu! Tilaus ID: ${order.id}. Yhteensä: ${total.toFixed(2)}€`);
    selectedItem = null;
    showSection('tracking');
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    const adminTabs = document.querySelectorAll('.tab-btn');
    adminTabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            adminTabs.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const tabName = e.target.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
            
            if (tabName === 'orders-tab') {
                loadOrders();
            }
        });
    });
    
    const addProductBtn = document.querySelector('#add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', addNewProduct);
    }

    // Payment form listeners
    const paymentQuantity = document.getElementById('payment-quantity');
    if (paymentQuantity) {
        paymentQuantity.addEventListener('input', updatePaymentTotal);
    }

    const confirmPaymentBtn = document.getElementById('confirm-payment');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', confirmPayment);
    }

    const backToMenuBtn = document.getElementById('back-to-menu');
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', () => showSection('menu'));
    }
}

// ==================== ADMIN FUNCTIONS ====================
function loadOrders() {
    const ordersList = document.querySelector('#orders-list');
    if (!ordersList) return;
    
    const orders = JSON.parse(localStorage.getItem('pizzaOrders')) || [];
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p style="text-align: center; color: var(--gray);">Ei tilauksia</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <h4>Tilaus #${order.id}</h4>
            <p><strong>Puhelin:</strong> ${order.customer.phone}</p>
            <p><strong>Osoite:</strong> ${order.customer.address}</p>
            <p><strong>Tilauksen aika:</strong> ${order.timestamp}</p>
            <p><strong>Tuotteet:</strong> ${order.items.map(i => `${i.name} (${i.quantity}x)`).join(', ')}</p>
            <p><strong>Yhteensä:</strong> ${order.total.toFixed(2)}€</p>
            <p><strong>Status:</strong> <span style="color: var(--primary); font-weight: bold;">${order.status}</span></p>
        </div>
    `).join('');
}

function addNewProduct() {
    const productType = document.querySelector('#product-type');
    const productName = document.querySelector('#product-name');
    const productDesc = document.querySelector('#product-desc');
    const productPrice = document.querySelector('#product-price');
    
    if (!productName || !productName.value || !productPrice || !productPrice.value) {
        alert('Täytä tuotteen nimi ja hinta!');
        return;
    }
    
    const newProduct = {
        id: Date.now(),
        name: productName.value,
        description: productDesc ? productDesc.value : '',
        price: parseFloat(productPrice.value),
        image: 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(productName.value)
    };
    
    const type = productType ? productType.value : 'pizza';
    
    if (type === 'pizza') {
        pizzas.push(newProduct);
        loadPizzas();
    } else {
        drinks.push(newProduct);
        loadDrinks();
    }
    
    if (productName) productName.value = '';
    if (productDesc) productDesc.value = '';
    if (productPrice) productPrice.value = '';
    
    alert('Tuote lisätty!');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal && productModal.classList.contains('active')) {
        closeProductModal();
    }
});