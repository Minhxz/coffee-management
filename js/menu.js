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

// Thêm sự kiện cho các nút Thêm món
const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    
    const drinkCard = button.closest(".drink-card");
    const name = drinkCard.querySelector("h3").textContent;
    const priceText = drinkCard.querySelector(".drink-price").textContent;
    const price = parseInt(priceText.replace(/[^\d]/g, ''));

    // Thêm vào giỏ hàng
    addToCart(name, price);
    
    // Hiển thị thông báo
    showAddToCartNotification(name);
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
    note: noteInput.value,
  };

  console.log("Món đã thêm:", item);

  // Lấy giỏ hàng cũ (nếu có)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra xem món đã có trong giỏ chưa
  let existing = cart.find((x) => x.name === item.name);
  if (existing) {
    existing.quantity = Number(existing.quantity) + Number(item.quantity);
  } else {
    cart.push(item);
  }

  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Cập nhật hiển thị trên icon giỏ hàng ngay lập tức
  updateCartCount();

  showToast("Đã thêm vào giỏ hàng!");

  popup.style.display = "none";
});

function showToast(message) {
  // Tạo phần tử toast nếu chưa có
  let toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  // Hiệu ứng hiện lên
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Tự ẩn sau 2.5 giây
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 2500);
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
