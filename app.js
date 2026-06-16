// ============================================
// THE NOTEBOOK — our two lists in LocalStorage
// ============================================

// Read products from storage, or start with empty list
function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

// Read sales from storage, or start with empty list
function getSales() {
  return JSON.parse(localStorage.getItem('sales')) || [];
}

// Save products back to storage
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Save sales back to storage
function saveSales(sales) {
  localStorage.setItem('sales', JSON.stringify(sales));
}


// ============================================
// SECTION 1 — ADD PRODUCT
// ============================================

function addProduct() {
  // Step 1: Read what user typed
  const name  = document.getElementById('productName').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const stock = parseInt(document.getElementById('productStock').value);

  // Step 2: Basic check — don't allow empty inputs
  if (!name || isNaN(price) || isNaN(stock)) {
    alert('Please fill in all fields correctly.');
    return;
  }

  // Step 3: Get current products list
  const products = getProducts();

  // Step 4: Add new product to the list
  products.push({
    id: Date.now(),   // unique id using current timestamp
    name,
    price,
    stock
  });

  // Step 5: Save updated list back to storage
  saveProducts(products);

  // Step 6: Clear the input boxes
  document.getElementById('productName').value  = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productStock').value = '';

  // Step 7: Refresh the display
  renderAll();
}


// ============================================
// SECTION 2 — SHOW PRODUCTS IN TABLE
// ============================================

function renderProducts() {
  const products = getProducts();
  const tbody    = document.getElementById('productTableBody');

  // If no products yet, show a message
  if (products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-msg">
          No products yet. Add one above.
        </td>
      </tr>`;
    return;
  }

  // Build one table row per product
  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${p.name}</td>
      <td>₹${p.price}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn-delete" onclick="deleteProduct(${p.id})">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}


// ============================================
// SECTION 3 — DELETE PRODUCT
// ============================================

function deleteProduct(id) {
  // Filter out the product with matching id
  const updated = getProducts().filter(p => p.id !== id);
  saveProducts(updated);
  renderAll();
}


// ============================================
// SECTION 4 — FILL BILLING DROPDOWN
// ============================================

function renderBillingDropdown() {
  const products = getProducts();
  const select   = document.getElementById('billProduct');

  // Always start with the default option
  select.innerHTML = '<option value="">-- Select Product --</option>';

  // Add one option per product
  products.forEach(p => {
    select.innerHTML += `
      <option value="${p.id}">
        ${p.name} (₹${p.price}) — Stock: ${p.stock}
      </option>`;
  });
}


// ============================================
// SECTION 5 — BILLING (Add items to bill)
// ============================================

// This list holds items in the current bill
// It resets when page refreshes — that's fine
let currentBill = [];

function addToBill() {
  const productId = parseInt(document.getElementById('billProduct').value);
  const qty       = parseInt(document.getElementById('billQty').value);

  // Check product is selected
  if (!productId || isNaN(qty) || qty <= 0) {
    alert('Select a product and enter a valid quantity.');
    return;
  }

  // Find product details
  const products = getProducts();
  const product  = products.find(p => p.id === productId);

  // Check stock is enough
  if (qty > product.stock) {
    alert(`Not enough stock. Only ${product.stock} left.`);
    return;
  }

  // Check if this product is already in the bill
  const existing = currentBill.find(item => item.id === productId);

  if (existing) {
    // Just increase quantity
    existing.qty += qty;
  } else {
    // Add new item to bill
    currentBill.push({
      id:    product.id,
      name:  product.name,
      price: product.price,
      qty
    });
  }

  // Clear quantity input
  document.getElementById('billQty').value = '';

  renderBill();
}

function renderBill() {
  const billList = document.getElementById('billItems');
  const billTotal = document.getElementById('billTotal');

  if (currentBill.length === 0) {
    billList.innerHTML = '<li class="empty-msg">No items added yet.</li>';
    billTotal.textContent = '0';
    return;
  }

  // Show each bill item
  billList.innerHTML = currentBill.map(item => `
    <li>
      <span>${item.name} × ${item.qty}</span>
      <span>₹${item.price * item.qty}</span>
    </li>
  `).join('');

  // Calculate and show total
  const total = currentBill.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );
  billTotal.textContent = total;
}


// ============================================
// SECTION 6 — CONFIRM SALE
// ============================================

function confirmSale() {
  if (currentBill.length === 0) {
    alert('Your bill is empty.');
    return;
  }

  // Step 1: Reduce stock for each item sold
  const products = getProducts();

currentBill.forEach(billItem => {
    const product = products.find(p => p.id === billItem.id);
    if (product) {
      product.stock = Math.max(0, product.stock - billItem.qty);
    }
  });

  saveProducts(products);

  // Step 2: Calculate total bill amount
const total = currentBill.reduce(
    (sum, item) => sum + (parseFloat(item.price) * parseInt(item.qty)), 0
  );

  // Step 3: Save this sale to sales history
  const sales = getSales();
  sales.push({
    date:  new Date().toLocaleDateString(),
    items: currentBill.length,
    total
  });
  saveSales(sales);

  // Step 4: Clear the current bill
  currentBill = [];

  alert(`✅ Sale confirmed! Total: ₹${total}`);

  renderAll();
}


// ============================================
// SECTION 7 — SHOW SALES SUMMARY
// ============================================

function renderSales() {
  const sales   = getSales();
  const count   = sales.length;
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);

  document.getElementById('salesCount').textContent   = count;
  document.getElementById('salesRevenue').textContent = revenue;
}


// ============================================
// RENDER ALL — call this after every action
// ============================================

function renderAll() {
  renderProducts();
  renderBillingDropdown();
  renderBill();
  renderSales();
}


// ============================================
// START — runs when page first loads
// ============================================

renderAll();