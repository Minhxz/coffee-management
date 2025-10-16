document.addEventListener('DOMContentLoaded', function() {
      const products = [
      { id: 1, name: "Cà phê sữa đá", price: 60000, img: "./images/cfsuada.jpg" },
      { id: 2, name: "Cacao dừa đá xay", price: 65000, img: "./images/duadaxay.jpg" },
      { id: 3, name: "Bạc xỉu", price: 70000, img: "./images/bacxiu.jpg" },
      { id: 4, name: "Trà sữa kem", price: 70000, img: "./images/kemtrung.jpg" }
    ];
    const cart = [];

    // Render sản phẩm
    const productList = document.getElementById('product-list');
    products.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${prod.img}" alt="${prod.name}">
        <h4>${prod.name}</h4>
        <div><strong>${prod.price.toLocaleString()} đ</strong></div>
        <button class="btn secondary" onclick="addToCart(${prod.id})">Thêm vào giỏ</button>
      `;
      productList.appendChild(card);
    });

    // Thêm vào giỏ
    window.addToCart = function(id) {
      const prod = products.find(p => p.id === id);
      const item = cart.find(c => c.id === id);
      if (item) item.qty += 1;
      else cart.push({ ...prod, qty: 1 });
      renderCart();
    };

    // Render giỏ hàng
    function renderCart() {
      const cartList = document.getElementById('cart-list');
      cartList.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        total += item.qty * item.price;
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x${item.qty} = <b>${(item.qty * item.price).toLocaleString()} đ</b>
        <button onclick="removeFromCart(${item.id})" style="margin-left:8px;">X</button>`;
        cartList.appendChild(li);
      });
      document.getElementById('total-amount').textContent = total.toLocaleString();
    }
    // Xóa sản phẩm khỏi giỏ
    window.removeFromCart = function(id) {
      const idx = cart.findIndex(c => c.id === id);
      if (idx >= 0) cart.splice(idx, 1);
      renderCart();
    };

    // Đặt hàng
    document.getElementById('order-form').addEventListener('submit', function(e) {
      e.preventDefault();
      if(cart.length === 0) {
        alert("Vui lòng chọn ít nhất 1 sản phẩm!");
        return;
      }
      
      const nameEl = document.getElementById('name');
      const phoneEl = document.getElementById('phone');
      const addressEl = document.getElementById('address');
      
      if (!nameEl || !phoneEl || !addressEl) {
        alert("Lỗi form! Vui lòng tải lại trang.");
        return;
      }
      
      const name = nameEl.value.trim();
      const phone = phoneEl.value.trim();
      const address = addressEl.value.trim();
      
      if(!name || !phone || !address) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      document.getElementById('order-success').style.display = 'block';
      document.getElementById('order-success').textContent = `Cảm ơn ${name}! Đơn hàng của bạn đã được ghi nhận.`;
      // Reset giỏ hàng và form
      cart.length = 0;
      renderCart();
      this.reset();
      setTimeout(() => {
        document.getElementById('order-success').style.display = 'none';
      }, 4000);
    });
  });


