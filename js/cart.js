let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cart-list");
const totalEl = document.getElementById("total");
const subtotalEl = document.getElementById("subtotal");
const cartEmpty = document.getElementById("cart-empty");

// ✅ Hàm render giỏ hàng
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  // Kiểm tra giỏ hàng trống
  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartList.style.display = "none";
    totalEl.innerText = "0đ";
    if (subtotalEl) subtotalEl.innerText = "0đ";
    return;
  } else {
    cartEmpty.style.display = "none";
    cartList.style.display = "flex";
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";

    const subtotal = item.price * item.quantity;
    total += subtotal;

    li.innerHTML = `
      <div class="item-top">
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-price">${subtotal.toLocaleString()}đ</div>
        </div>
        <div class="item-controls">
          <button class="delete-btn" data-index="${index}">
            <i class="fa-solid fa-trash"></i>
            Xóa
          </button>
        </div>
      </div>

      <div class="quantity-controls">
        <button class="minus" data-index="${index}">-</button>
        <input type="number" value="${
          item.quantity
        }" min="1" data-index="${index}" class="quantity-input" />
        <button class="plus" data-index="${index}">+</button>
      </div>

      <textarea class="note-input" data-index="${index}" placeholder="Ghi chú đặc biệt...">${
      item.note || ""
    }</textarea>
    `;

    cartList.appendChild(li);
  });

  totalEl.innerText = `${total.toLocaleString()}đ`;
  if (subtotalEl) subtotalEl.innerText = `${total.toLocaleString()}đ`;

  attachEvents();
}

// ✅ Gắn sự kiện cho từng phần tử trong giỏ
function attachEvents() {
  // Xóa từng món (thêm hiệu ứng fade-out)
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = (e) => {
      const i = e.target.dataset.index;
      const itemEl = e.target.closest(".cart-item");
      itemEl.classList.add("fade-out");
      setTimeout(() => {
        cart.splice(i, 1);
        saveCart();
      }, 300);
    };
  });

  // Tăng / giảm số lượng
  document.querySelectorAll(".plus").forEach((btn) => {
    btn.onclick = (e) => {
      const i = e.target.dataset.index;
      cart[i].quantity++;
      saveCart();
    };
  });

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.onclick = (e) => {
      const i = e.target.dataset.index;
      if (cart[i].quantity > 1) cart[i].quantity--;
      saveCart();
    };
  });

  // Nhập số lượng trực tiếp
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.onchange = (e) => {
      const i = e.target.dataset.index;
      let value = parseInt(e.target.value);
      cart[i].quantity = isNaN(value) || value < 1 ? 1 : value;
      saveCart();
    };
  });

  // Ghi chú
  document.querySelectorAll(".note-input").forEach((area) => {
    area.oninput = (e) => {
      const i = e.target.dataset.index;
      cart[i].note = e.target.value;
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  });
}

// ✅ Lưu & render lại
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ✅ Xóa toàn bộ
document.getElementById("clear-cart").addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng không?")) {
    cart = [];
    saveCart();
  }
});

// ✅ Thanh toán
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Giỏ hàng trống!");
    return;
  }
  // show a small notification and let the QR overlay handler run
  showToast("Chuẩn bị hiển thị mã QR — vui lòng quét để thanh toán");
});

// ✅ Khi tải trang
renderCart();
// ✅ Thanh toán (hiển thị mã QR)
document.getElementById("checkout").addEventListener("click", () => {
  // Kiểm tra xem QR đã hiển thị chưa
  let overlay = document.getElementById("overlay");
  if (!overlay) {
    // Tạo lớp phủ tối
    overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    // Tạo hộp QR
    const qrBox = document.createElement("div");
    qrBox.id = "qr-box";
    qrBox.innerHTML = `
      <div class="qr-container">
        <h3>Quét mã để thanh toán 💳</h3>
  <img src="../images/QR.png" alt="QR thanh toán" class="qr-image" />
        <p>Vui lòng quét mã để chuyển khoản thanh toán đơn hàng của bạn.</p>
        <div class="qr-buttons">
          <button id="hide-qr" class="hide-qr">Ẩn mã QR</button>
          <button id="confirm-payment" class="confirm-payment">Xác nhận đã thanh toán</button>
        </div>
      </div>
    `;
    document.body.appendChild(qrBox);

    // Ẩn QR
    document.getElementById("hide-qr").addEventListener("click", () => {
      qrBox.remove();
      overlay.remove();
    });

    // Xác nhận thanh toán => xóa giỏ hàng
    document.getElementById("confirm-payment").addEventListener("click", () => {
      // snapshot current cart so we can offer an undo
      const prevCart = JSON.parse(JSON.stringify(cart));

      // clear cart UI & storage
      cart = [];
      localStorage.removeItem("cart");
      document.getElementById("cart-list").innerHTML = "";
      if (document.getElementById("total")) document.getElementById("total").textContent = "Tổng cộng: 0đ";

      qrBox.remove();
      overlay.remove();

      // show actionable toast with Undo (Hoàn tác)
      showToast("✅ Thanh toán thành công!", {
        type: "success",
        duration: 8000,
        actionText: "Hoàn tác",
        actionHandler: () => {
          // restore previous cart
          cart = prevCart;
          saveCart();
          showToast("Hoàn tác: giỏ hàng đã được khôi phục.", { type: "info", duration: 2200 });
        },
      });
    });
  }
});
