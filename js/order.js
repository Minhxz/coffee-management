

document.getElementById('cart-btn').addEventListener('click', function() {
  document.getElementById('order-modal').classList.add('active');
});
let cart = [];
const modal = document.getElementById('order-modal');
const cartList = modal.querySelector('#cart-list');
const cartTotal = modal.querySelector('#cart-total');
const closeBtn = modal.querySelector('#close-order-modal');
const form = modal.querySelector('#cart-form');

function updateCartView() {
  if (!cart.length) {
    cartList.innerHTML = '<div style="color:gray;text-align:center;">Chưa có sản phẩm.</div>';
    cartTotal.textContent = '0 đ';
    return;
  }
  cartList.innerHTML = cart.map(item => `
    <div class="cart-row">
      <span>${item.name}</span>
      <div class="cart-qty">
        <button class="qty-btn" data-action="dec" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
      </div>
      <span>${(item.price * item.qty).toLocaleString()} đ</span>
      <button class="qty-btn" data-action="remove" data-id="${item.id}" style="color:#d22;">×</button>
    </div>
  `).join('');
  cartTotal.textContent = cart.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString() + ' đ';
}

modal.querySelector('.modal-menu').addEventListener('click', e => {
  if (e.target.classList.contains('btn-add-cart')) {
    const itemDiv = e.target.closest('.modal-item');
    const id = itemDiv.getAttribute('data-id');
    const name = itemDiv.getAttribute('data-name');
    const price = +itemDiv.getAttribute('data-price');
    const found = cart.find(i => i.id === id);
    if (found) found.qty += 1;
    else cart.push({ id, name, price, qty: 1 });
    updateCartView();
  }
});

cartList.addEventListener('click', e => {
  if (e.target.classList.contains('qty-btn')) {
    const id = e.target.getAttribute('data-id');
    const action = e.target.getAttribute('data-action');
    const idx = cart.findIndex(i => i.id === id);
    if (idx === -1) return;
    if (action === 'inc') cart[idx].qty += 1;
    if (action === 'dec') {
      cart[idx].qty -= 1;
      if (cart[idx].qty < 1) cart.splice(idx,1);
    }
    if (action === 'remove') cart.splice(idx, 1);
    updateCartView();
  }
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!cart.length) return alert('Vui lòng chọn sản phẩm!');
  alert('Đặt hàng thành công!\nChúng tôi sẽ liên hệ bạn sớm.');
  cart = [];
  updateCartView();
  form.reset();
  modal.classList.remove('active');
  modal.addEventListener('click', function(e) {
  if (e.target === modal) modal.classList.remove('active');
});
});

updateCartView();
