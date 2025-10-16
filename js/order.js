// Xử lý modal đặt hàng và thanh toán
document.addEventListener('DOMContentLoaded', function () {
  const cartBtn = document.getElementById('cart-btn');
  const orderModal = document.getElementById('order-modal');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutBtn = document.getElementById('checkout-btn');
  const closeCheckout = document.getElementById('close-checkout');

  cartBtn?.addEventListener('click', () => {
    orderModal.classList.add('active');
    checkoutModal.classList.remove('active');
  });

  // Đóng modal đặt hàng khi click ra ngoài
  orderModal?.addEventListener('click', function(e) {
    if (e.target === this) orderModal.classList.remove('active');
  });

  // Khi nhấn Thanh toán, ẩn order, hiện checkout
  checkoutBtn?.addEventListener('click', () => {
    orderModal.classList.remove('active');
    checkoutModal.classList.add('active');
  });

  // Khi nhấn quay lại, đóng checkout, hiện lại order
  closeCheckout?.addEventListener('click', () => {
    checkoutModal.classList.remove('active');
    orderModal.classList.add('active');
  });

  // Đóng modal checkout khi click ra ngoài
  checkoutModal?.addEventListener('click', function(e) {
    if (e.target === this) checkoutModal.classList.remove('active');
  });
});