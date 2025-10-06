import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let isSignUpMode = false;

const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const fullNameInput = document.getElementById('full_name');
const fullNameGroup = document.getElementById('full-name-group');
const submitBtn = document.getElementById('submit-btn');
const toggleModeBtn = document.getElementById('toggle-mode');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  successMessage.style.display = 'none';
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = 'block';
  errorMessage.style.display = 'none';
}

function hideMessages() {
  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';
}

function toggleMode() {
  isSignUpMode = !isSignUpMode;

  if (isSignUpMode) {
    fullNameGroup.style.display = 'block';
    fullNameInput.required = true;
    submitBtn.textContent = 'Đăng ký';
    toggleModeBtn.textContent = 'Đã có tài khoản? Đăng nhập';
    document.querySelector('.auth-subtitle').textContent = 'Tạo tài khoản mới';
  } else {
    fullNameGroup.style.display = 'none';
    fullNameInput.required = false;
    submitBtn.textContent = 'Đăng nhập';
    toggleModeBtn.textContent = 'Tạo tài khoản mới';
    document.querySelector('.auth-subtitle').textContent = 'Đăng nhập vào tài khoản của bạn';
  }

  hideMessages();
}

async function handleSignUp(email, password, fullName) {
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      showSuccess('Đăng ký thành công! Đang chuyển hướng...');

      setTimeout(() => {
        window.location.href = 'page1.html';
      }, 1500);
    }
  } catch (error) {
    showError(error.message || 'Đã xảy ra lỗi khi đăng ký');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Đăng ký';
  }
}

async function handleSignIn(email, password) {
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (data.user) {
      showSuccess('Đăng nhập thành công! Đang chuyển hướng...');

      setTimeout(() => {
        window.location.href = 'page1.html';
      }, 1500);
    }
  } catch (error) {
    showError(error.message || 'Email hoặc mật khẩu không đúng');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Đăng nhập';
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideMessages();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const fullName = fullNameInput.value.trim();

  if (isSignUpMode) {
    await handleSignUp(email, password, fullName);
  } else {
    await handleSignIn(email, password);
  }
});

toggleModeBtn.addEventListener('click', toggleMode);

supabase.auth.onAuthStateChange((event, session) => {
  (async () => {
    if (event === 'SIGNED_IN' && session) {
      console.log('User signed in:', session.user.email);
    }
  })();
});

async function checkAuth() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    window.location.href = 'page1.html';
  }
}

checkAuth();
