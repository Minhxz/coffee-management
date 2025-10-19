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
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.querySelector("h3").textContent;
    const price = card
      .querySelector(".price-tag")
      .textContent.replace("đ", "")
      .trim();

    popupName.textContent = name;
    popupPrice.textContent = price;
    quantityInput.value = 1;
    noteInput.value = "";
    popup.style.display = "flex";
  });
});

// Nút tăng/giảm
btnMinus.addEventListener("click", () => {
  if (quantityInput.value > 1) quantityInput.value--;
});

btnPlus.addEventListener("click", () => {
  quantityInput.value++;
});

// Nút hủy
btnCancel.addEventListener("click", () => {
  popup.style.display = "none";
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

// Hàm cập nhật số lượng trên biểu tượng giỏ
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countElement = document.querySelector(".cart-count");
  let totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );
  countElement.textContent = totalItems;
}

// Khi tải trang lần đầu, hiển thị đúng số món hiện có
document.addEventListener("DOMContentLoaded", updateCartCount);

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
