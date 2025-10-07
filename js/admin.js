
const SESSION_KEY = 'coffee_admin_session';

// Check session on page load
function checkSession() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  
  if (!sessionData) {
    // No session found, redirect to login
    window.location.href = 'login.html';
    return null;
  }
  
  try {
    const session = JSON.parse(sessionData);
    
    // Check if session is valid
    if (!session.isAdmin || !session.email) {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = 'login.html';
      return null;
    }
    
    return session;
  } catch (e) {
    // Invalid session data
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
    return null;
  }
}

// Display admin name
function displayAdminInfo(session) {
  const adminNameEl = document.getElementById('admin-name');
  if (adminNameEl && session) {
    adminNameEl.textContent = session.displayName || session.email;
  }
}

// Logout function
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'login.html';
}

// Initialize
const session = checkSession();
if (session) {
  displayAdminInfo(session);
}

// Add logout event listener
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
