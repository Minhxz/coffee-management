// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hiển thị danh sách giỏ hàng
const cartList = document.getElementById("cart-list");
const totalDiv = document.getElementById("total");

function renderCart() {
  if (cart.length === 0) {
    cartList.innerHTML = "<p>Giỏ hàng trống.</p>";
    totalDiv.textContent = "Tổng cộng: 0đ";
    return;
  }

  let total = 0;
  cartList.innerHTML = cart
    .map((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
        <li class="cart-item">
          <div class="item-info">
            <strong>${item.name}</strong><br>
            ${item.quantity} x ${
        item.price
      }đ = <b>${itemTotal.toLocaleString()}đ</b><br>
            <em>Ghi chú:</em> ${item.note || "Không có"}
          </div>
          <button class="delete-btn" onclick="removeItem(${index})">Xóa</button>
        </li>
      `;
    })
    .join("");

  totalDiv.textContent = "Tổng cộng: " + total.toLocaleString() + "đ";
}

// Xóa một món
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Xóa tất cả
document.getElementById("clear-cart").addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn xóa tất cả món trong giỏ hàng không?")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// Thanh toán
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  alert("Cảm ơn bạn đã đặt hàng! 🎉");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

// Gọi khi load trang
renderCart();
