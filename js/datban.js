// Booking Form JavaScript
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("bookingForm");
  const popup = document.getElementById("successModal");
  const closePopup = document.getElementById("closeModal");
  
  if (!form) {
    console.error("Booking form not found");
    return;
  }
  
  // Set minimum date to today
  const dateInput = form.querySelector('input[name="date"]');
  const timeInput = form.querySelector('input[name="time"]');
  
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Set time constraints
    dateInput.addEventListener('change', function() {
      if (timeInput) {
        if (this.value === today) {
          const now = new Date();
          const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                             now.getMinutes().toString().padStart(2, '0');
          timeInput.min = currentTime;
        } else {
          timeInput.min = '07:00';
        }
        timeInput.max = '21:30'; // Last booking at 21:30
      }
    });
  }

  // Form submission
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      showSuccessModal();
      form.reset();
    }
  });

  function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();

    const formData = {
      name: form.name ? form.name.value.trim() : '',
      phone: form.phone ? form.phone.value.trim() : '',
      email: form.email ? form.email.value.trim() : '',
      date: form.date ? form.date.value : '',
      time: form.time ? form.time.value : '',
      guests: form.guests ? form.guests.value : '',
      note: form.note ? form.note.value.trim() : ''
    };

    // Validate name
    if (!formData.name || formData.name.length < 2) {
      showError("name", "Vui lòng nhập họ tên (ít nhất 2 ký tự)");
      isValid = false;
    }

    // Validate phone
    const phonePattern = /^(0|\+84)[0-9]{9,10}$/;
    if (!formData.phone) {
      showError("phone", "Vui lòng nhập số điện thoại");
      isValid = false;
    } else if (!phonePattern.test(formData.phone)) {
      showError("phone", "Số điện thoại không hợp lệ");
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      showError("email", "Vui lòng nhập email");
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      showError("email", "Email không hợp lệ");
      isValid = false;
    }

    // Validate date
    if (!formData.date) {
      showError("date", "Vui lòng chọn ngày");
      isValid = false;
    }

    // Validate time
    if (!formData.time) {
      showError("time", "Vui lòng chọn giờ");
      isValid = false;
    }

    // Validate guests
    if (!formData.guests) {
      showError("guests", "Vui lòng chọn số khách");
      isValid = false;
    }

    return isValid;
  }

  function clearErrors() {
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => {
      input.classList.remove('error');
    });
    
    const errorMsgs = form.querySelectorAll('.error-msg');
    errorMsgs.forEach(msg => {
      msg.textContent = '';
    });
  }

  function showError(fieldName, message) {
    const input = form[fieldName];
    if (input) {
      input.classList.add("error");
      const errorMsg = input.parentElement.querySelector(".error-msg");
      if (errorMsg) {
        errorMsg.textContent = message;
      }
    }
  }

  function showSuccessModal() {
    if (popup) {
      popup.style.display = "flex";
    }
  }

  // Đóng popup
  if (closePopup && popup) {
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // Click outside popup to close
  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }
});

// Nút quay lại trang chủ
document.addEventListener("DOMContentLoaded", function() {
  const backHomeBtn = document.getElementById("back-home-btn");
  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      window.location.href = "../index.html"; // chuyển hướng về trang chủ
    });
  }
});
