// Produk database - Toko Snack Online Goyal Gayil
const products = [
  {
    id: 1,
    name: "Snack Pedas",
    price: 10000,
    category: "pedas",
    description: "Snack pedas yang gurih dan nikmat",
    emoji: "🌶️",
    image: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Snack+Pedas",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Snack Manis",
    price: 12000,
    category: "manis",
    description: "Snack manis yang lezat",
    emoji: "🍬",
    image: "https://via.placeholder.com/300x200/ff9800/ffffff?text=Snack+Manis",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Snack Gurih",
    price: 8000,
    category: "gurih",
    description: "Snack gurih yang renyah",
    emoji: "🍿",
    image: "https://via.placeholder.com/300x200/ffc107/ffffff?text=Snack+Gurih",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Chips Pedas Mantab",
    price: 15000,
    category: "pedas",
    description: "Chips pedas dengan rasa yang kuat",
    emoji: "🔥",
    image: "https://via.placeholder.com/300x200/d32f2f/ffffff?text=Chips+Pedas",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Cokelat Susu",
    price: 13000,
    category: "manis",
    description: "Cokelat premium yang lezat",
    emoji: "🍫",
    image:
      "https://via.placeholder.com/300x200/8b4513/ffffff?text=Cokelat+Susu",
    rating: 5.0,
  },
  {
    id: 6,
    name: "Keripik Kentang",
    price: 9000,
    category: "gurih",
    description: "Keripik kentang crispy dan gurih",
    emoji: "🥔",
    image:
      "https://via.placeholder.com/300x200/cd853f/ffffff?text=Keripik+Kentang",
    rating: 4.6,
  },
  {
    id: 7,
    name: "Permen Asam",
    price: 7000,
    category: "manis",
    description: "Permen asam yang segar",
    emoji: "🍋",
    image: "https://via.placeholder.com/300x200/ffe66d/ffffff?text=Permen+Asam",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Biscuit Asin",
    price: 11000,
    category: "gurih",
    description: "Biscuit asin yang renyah",
    emoji: "🥐",
    image:
      "https://via.placeholder.com/300x200/a0522d/ffffff?text=Biscuit+Asin",
    rating: 4.8,
  },
];

// Shopping Cart
let cart = [];
const WHATSAPP_NUMBER = "6285808778641"; // Ganti dengan nomor WhatsApp Anda

// DOM Elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productContainer = document.getElementById("productContainer");
const noResults = document.getElementById("noResults");
const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const totalPrice = document.getElementById("totalPrice");
const subtotalPrice = document.getElementById("subtotalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  renderProducts(products);

  // Event listeners
  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
});

// Render Products
function renderProducts(productsToRender) {
  productContainer.innerHTML = "";

  if (productsToRender.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  productsToRender.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 col-xl-3 mb-4";

    // Build star rating HTML
    const stars = Math.round(product.rating);
    let starHTML = "";
    for (let i = 0; i < 5; i++) {
      starHTML +=
        i < stars
          ? '<i class="fas fa-star"></i>'
          : '<i class="far fa-star"></i>';
    }

    col.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${
      product.name
    }" style="width: 100%; height: 100%; object-fit: cover;">
                    <div class="product-badge">${product.emoji}</div>
                </div>
                <div class="product-body">
                    <h5 class="product-name">${product.name}</h5>
                    <div class="product-rating">${starHTML} (${
      product.rating
    })</div>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">Rp ${product.price.toLocaleString(
                      "id-ID"
                    )}</p>
                    <div class="product-actions">
                        <input type="number" class="qty-input" id="qty-${
                          product.id
                        }" value="1" min="1" max="99">
                        <button class="btn-add-cart" onclick="addToCart(${
                          product.id
                        })">
                            <i class="fas fa-cart-plus"></i> Tambah
                        </button>
                    </div>
                </div>
            </div>
        `;
    productContainer.appendChild(col);
  });
}

// Filter Products
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  let filtered = products.filter((product) => {
    const matchSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);
    const matchCategory = category === "all" || product.category === category;
    return matchSearch && matchCategory;
  });

  renderProducts(filtered);
}

// Add to Cart
function addToCart(productId) {
  const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
  const product = products.find((p) => p.id === productId);

  if (quantity <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text: "Silakan masukkan jumlah yang valid",
      confirmButtonColor: "#ff6b6b",
    });
    return;
  }

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      quantity: quantity,
    });
  }

  // Reset quantity input
  document.getElementById(`qty-${productId}`).value = 1;

  updateCart();

  // Show success alert
  Swal.fire({
    icon: "success",
    title: "Berhasil!",
    text: `${product.name} ditambahkan ke keranjang`,
    confirmButtonColor: "#ff6b6b",
    timer: 1500,
    showConfirmButton: false,
  });
}

// Update Cart Display
function updateCart() {
  cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="text-center text-muted">Keranjang masih kosong</p>';
    checkoutBtn.disabled = true;
    totalPrice.textContent = "Rp 0";
    if (subtotalPrice) subtotalPrice.textContent = "Rp 0";
    return;
  }

  checkoutBtn.disabled = false;

  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.emoji} ${item.name}</div>
                    <div class="cart-item-price">Rp ${item.price.toLocaleString(
                      "id-ID"
                    )}</div>
                </div>
                <div class="cart-item-qty">
                    <button onclick="decrementQty(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="incrementQty(${index})">+</button>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
  });

  cartItems.innerHTML = html;
  const discount = Math.floor(total * 0.05); // 5% discount
  const finalTotal = total - discount;
  if (subtotalPrice)
    subtotalPrice.textContent = "Rp " + total.toLocaleString("id-ID");
  totalPrice.textContent = "Rp " + finalTotal.toLocaleString("id-ID");
}

// Increment Quantity
function incrementQty(index) {
  if (cart[index].quantity < 99) {
    cart[index].quantity++;
    updateCart();
  }
}

// Decrement Quantity
function decrementQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    updateCart();
  } else {
    removeFromCart(index);
  }
}

// Remove From Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Clear Cart
function clearCart() {
  Swal.fire({
    title: "Konfirmasi",
    text: "Apakah Anda yakin ingin menghapus semua item dari keranjang?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#d32f2f",
    cancelButtonColor: "#999",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      cart = [];
      updateCart();
      Swal.fire({
        icon: "success",
        title: "Keranjang Dikosongkan",
        confirmButtonColor: "#ff6b6b",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

// Checkout to WhatsApp
function checkout() {
  if (cart.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Keranjang Kosong",
      text: "Silakan tambahkan produk ke keranjang terlebih dahulu",
      confirmButtonColor: "#ff6b6b",
    });
    return;
  }

  // Build message with proper line breaks
  let message = "*PESANAN DARI GOYAL GAYIL SNACK* 🛒\n";
  message += "==========================================\n\n";

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${item.emoji} ${item.name}\n`;
    message += `Jumlah: ${item.quantity} x Rp ${item.price.toLocaleString(
      "id-ID"
    )}\n`;
    message += `Subtotal: Rp ${itemTotal.toLocaleString("id-ID")}\n\n`;
  });

  message += "==========================================\n";
  message += `*TOTAL HARGA: Rp ${total.toLocaleString("id-ID")}*\n`;
  message += "==========================================\n\n";
  message += "Silahkan konfirmasi pesanan Anda!\n";
  message += "Terima kasih telah berbelanja di Goyal Gayil Snack 😊";

  // Encode message for WhatsApp
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/6285808778641?text=${encodedMessage}`;

  // Show loading and open WhatsApp
  Swal.fire({
    title: "Membuka WhatsApp...",
    html: '<i class="fab fa-whatsapp" style="font-size: 3rem; color: #25D366;"></i>',
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
      // Delay untuk memastikan pesan di-encode dengan benar
      setTimeout(() => {
        window.open(whatsappURL, "_blank");
        setTimeout(() => {
          Swal.close();
          // Show success message
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "Pesanan Terkirim!",
              text: "Terima kasih telah berbelanja di Goyal Gayil Snack",
              confirmButtonColor: "#ff6b6b",
            }).then(() => {
              cart = [];
              updateCart();
              // Close offcanvas
              const offcanvas = document.getElementById("cartOffcanvas");
              const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
              bsOffcanvas.hide();
            });
          }, 1000);
        }, 1500);
      }, 500);
    },
  });
}

console.log("Website Goyal Gayil berhasil dimuat dengan fitur modern! 🎉");

// Fungsi helper untuk menampilkan toast notification
function showToast(message, type = "success") {
  const toastHTML = `
    <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  const toastContainer = document.getElementById("toastContainer");
  const toastElement = document.createElement("div");
  toastElement.innerHTML = toastHTML;
  toastContainer.appendChild(toastElement);

  const toast = new bootstrap.Toast(toastElement.querySelector(".toast"));
  toast.show();

  setTimeout(() => {
    toastElement.remove();
  }, 3000);
}
