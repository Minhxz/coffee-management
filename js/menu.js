// ========== Xử lý sidebar ==========
const menuItems = document.querySelectorAll(".sidebar li");
const productLists = document.querySelectorAll(".product-list");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Xóa trạng thái active cũ
    document.querySelector(".sidebar li.active")?.classList.remove("active");
    document.querySelector(".product-list.active")?.classList.remove("active");

    // Thêm active mới
    item.classList.add("active");
    productLists[index].classList.add("active");

    // Cuộn về đầu trang
    window.scrollTo({
      top: 0,
      behavior: "smooth", // cuộn mượt
    });
  });
});
// Lấy các phần tử cần dùng
const popup = document.getElementById("popup");
const popupName = document.getElementById("popup-name");
const popupPrice = document.getElementById("popup-price");
const quantityInput = document.getElementById("quantity");
const noteInput = document.getElementById("note");

const btnMinus = document.getElementById("minus");
const btnPlus = document.getElementById("plus");
const btnCancel = document.getElementById("cancel");
const btnConfirm = document.getElementById("confirm");

// Ẩn popup khi mới tải
popup.style.display = "none";

// Hàm hiển thị popup
function showPopup(name, price) {
  popupName.textContent = name;
  popupPrice.textContent = price.toLocaleString();
  quantityInput.value = 1;
  noteInput.value = "";
  
  popup.classList.add("active");
  popup.style.display = "flex";
}

// Thêm sự kiện cho các nút Thêm món
const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    
    const drinkCard = button.closest(".drink-card");
    const name = drinkCard.querySelector("h3").textContent;
    const priceText = drinkCard.querySelector(".drink-price").textContent;
    const price = parseInt(priceText.replace(/[^\d]/g, ''));

    // Hiển thị popup
    showPopup(name, price);
  });
});

// Hàm thêm vào giỏ hàng
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Kiểm tra xem món đã có trong giỏ chưa
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      note: ""
    });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Hàm hiển thị thông báo thêm vào giỏ
function showAddToCartNotification(itemName) {
  // Tạo notification element
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <i class="fa-solid fa-check-circle"></i>
    <span>Đã thêm "${itemName}" vào giỏ hàng</span>
  `;
  
  document.body.appendChild(notification);
  
  // Hiển thị notification
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Ẩn và xóa notification sau 3s
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Hàm cập nhật số lượng giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    let badge = cartBtn.querySelector('.mini-badge');
    if (!badge && totalItems > 0) {
      badge = document.createElement('span');
      badge.className = 'mini-badge';
      cartBtn.appendChild(badge);
    }
    
    if (badge) {
      if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'block';
      } else {
        badge.style.display = 'none';
      }
    }
  }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Xử lý click vào nút giỏ hàng
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'cart.html';
    });
  }
});

// Nút xác nhận
btnConfirm.addEventListener("click", () => {
  const item = {
    name: popupName.textContent,
    price: Number(popupPrice.textContent.replace(/\D/g, "")), // ép về số
    quantity: Number(quantityInput.value),
    note: noteInput.value.trim(),
  };

  console.log("Món đã thêm:", item);

  // Lấy giỏ hàng cũ (nếu có)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra xem món đã có trong giỏ chưa (bao gồm cả ghi chú)
  let existing = cart.find((x) => x.name === item.name && x.note === item.note);
  if (existing) {
    existing.quantity = Number(existing.quantity) + Number(item.quantity);
  } else {
    cart.push(item);
  }

  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Cập nhật hiển thị trên icon giỏ hàng ngay lập tức
  updateCartCount();

  showToast(`Đã thêm "${item.name}" vào giỏ hàng!`);

  popup.classList.remove("active");
  popup.style.display = "none";
});

// Nút hủy
btnCancel.addEventListener("click", () => {
  popup.classList.remove("active");
  popup.style.display = "none";
});

// Nút tăng/giảm số lượng
btnMinus.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
});

btnPlus.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  if (currentValue < 10) {
    quantityInput.value = currentValue + 1;
  }
});

// Đóng popup khi click bên ngoài
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("active");
    popup.style.display = "none";
  }
});

function showToast(message) {
  // Tạo phần tử toast nếu chưa có
  let toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${message}
  `;
  document.body.appendChild(toast);

  // Hiệu ứng hiện lên
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Tự ẩn sau 3 giây
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
// ========== Nút mở/đóng menu trên mobile ==========
const menuToggle = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector(".main-menu");

// Overlay đã có trong HTML hoặc CSS
let overlay = document.querySelector(".menu-overlay");
if (!overlay) {
  overlay = document.createElement("div");
  overlay.className = "menu-overlay";
  document.body.appendChild(overlay);
}

menuToggle.addEventListener("click", () => {
  const isActive = mainMenu.classList.toggle("active");
  overlay.classList.toggle("active", isActive);
});

overlay.addEventListener("click", () => {
  mainMenu.classList.remove("active");
  overlay.classList.remove("active");
});
