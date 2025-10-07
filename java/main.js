document.getElementById('toggle-password')?.addEventListener('click', function() {
  const pw = document.getElementById('password');
  if (!pw) return;
  const isHidden = pw.type === 'password';
  pw.type = isHidden ? 'text' : 'password';
  this.innerHTML = isHidden
    ? '<i class="fa-regular fa-eye-slash"></i>'
    : '<i class="fa-regular fa-eye"></i>';
  this.setAttribute('aria-label', isHidden ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
});
