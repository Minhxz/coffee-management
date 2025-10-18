document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("bookingForm");
  const popup = document.getElementById("successPopup");
  const closePopup = document.getElementById("closePopup");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    // Xóa thông báo lỗi cũ
    form.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
    form.querySelectorAll("input, select").forEach(el => el.classList.remove("error"));

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const date = form.date.value.trim();
    const time = form.time.value.trim();
    const guests = form.guests.value.trim();

    // Kiểm tra từng trường
    if (!name) {
      showError("name", "Vui lòng nhập họ tên");
      isValid = false;
    }

    const phonePattern = /^(0|\+84)[0-9]{9,10}$/;
    if (!phone) {
      showError("phone", "Vui lòng nhập số điện thoại");
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      showError("phone", "Số điện thoại không hợp lệ");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError("email", "Vui lòng nhập email");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      showError("email", "Email không hợp lệ");
      isValid = false;
    }

    if (!date) {
      showError("date", "Vui lòng chọn ngày");
      isValid = false;
    }

    if (!time) {
      showError("time", "Vui lòng chọn giờ");
      isValid = false;
    }

    if (!guests) {
      showError("guests", "Vui lòng chọn số khách");
      isValid = false;
    }

    if (!isValid) return;

    // Thành công
    popup.style.display = "flex";
    form.reset();
  });

  function showError(name, message) {
    const input = form[name];
    input.classList.add("error");
    input.parentElement.querySelector(".error-msg").textContent = message;
  }

  // Đóng popup
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
