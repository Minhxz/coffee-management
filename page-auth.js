import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const profileBtn = document.querySelector('.profile-btn');
const profileImg = document.querySelector('.profile-btn img');

async function updateProfileButton() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();

    const initials = profile?.full_name
      ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : user.email[0].toUpperCase();

    profileBtn.title = `Đăng xuất (${user.email})`;

    profileBtn.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--accent);color:#fff;font-weight:700;font-size:14px;">${initials}</div>`;

    profileBtn.onclick = handleProfileClick;
  } else {
    profileBtn.onclick = () => {
      window.location.href = 'login.html';
    };
  }
}

function handleProfileClick() {
  const dropdown = document.createElement('div');
  dropdown.className = 'profile-dropdown';
  dropdown.innerHTML = `
    <button class="dropdown-item" id="logout-btn">Đăng xuất</button>
  `;

  dropdown.style.cssText = `
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 150px;
    z-index: 1000;
  `;

  const dropdownItem = dropdown.querySelector('.dropdown-item');
  dropdownItem.style.cssText = `
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    color: var(--dark);
    font-weight: 500;
  `;

  dropdownItem.onmouseover = () => {
    dropdownItem.style.background = 'rgba(0,0,0,0.04)';
  };
  dropdownItem.onmouseout = () => {
    dropdownItem.style.background = 'transparent';
  };

  const existingDropdown = document.querySelector('.profile-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
    return;
  }

  profileBtn.style.position = 'relative';
  profileBtn.appendChild(dropdown);

  dropdown.querySelector('#logout-btn').addEventListener('click', async (e) => {
    e.stopPropagation();
    await supabase.auth.signOut();
    window.location.href = 'login.html';
  });

  setTimeout(() => {
    document.addEventListener('click', function closeDropdown(e) {
      if (!profileBtn.contains(e.target)) {
        dropdown.remove();
        document.removeEventListener('click', closeDropdown);
      }
    });
  }, 0);
}

supabase.auth.onAuthStateChange((event) => {
  (async () => {
    if (event === 'SIGNED_OUT') {
      window.location.href = 'login.html';
    } else if (event === 'SIGNED_IN') {
      updateProfileButton();
    }
  })();
});

updateProfileButton();
