// Hiển thị/ẩn mật khẩu
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

const toggleRePassword = document.getElementById("toggleRePassword");
const repasswordInput = document.getElementById("repassword");
toggleRePassword.addEventListener("click", function () {
  const type =
    repasswordInput.getAttribute("type") === "password" ? "text" : "password";
  repasswordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

// Validate form
function ValidateForm() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let repassword = document.getElementById("repassword").value.trim();

  // Xóa thông báo lỗi cũ
  document.getElementById("emailError").innerText = "";
  document.getElementById("passwordError").innerText = "";
  document.getElementById("repasswordError").innerText = "";

  let isValid = true;

  // Kiểm tra email
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").innerText =
      "Email không đúng định dạng!";
    isValid = false;
  }

  // Kiểm tra mật khẩu
  let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!passwordPattern.test(password)) {
    document.getElementById("passwordError").innerText =
      "Mật khẩu phải có ít nhất 8 kí tự và có 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!";
    isValid = false;
  }

  // Kiểm tra nhập lại mật khẩu
  if (password !== repassword) {
    document.getElementById("repasswordError").innerText =
      "Mật khẩu không giống nhau, vui lòng kiểm tra lại!";
    isValid = false;
  }
  if (isValid) {
    window.location.href = "welcome.html"; // đổi thành trang bạn muốn
  }

  return false;
}
