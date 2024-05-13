const bars = document.getElementById("bars");
const navigation = document.getElementById("navigation");
const overlay = document.getElementById("overlay");

function setOverlay() {
  overlay.classList.add("overlay--active");
}

function removeOverlay() {
  overlay.classList.remove("overlay--active");
}

function showMenu() {
  navigation.classList.add("navigation--active");
}

function hideMenu() {
  navigation.classList.remove("navigation--active");
}

// close overlay and menu onclick
overlay.addEventListener('click', () => {
  removeOverlay();
  hideMenu();
  changeBarsIcon(true);
});

if (bars) {
  bars.addEventListener("click", () => {
    if (navigation.className.includes("navigation--active")) {
      changeBarsIcon(true);
      removeOverlay();
      hideMenu();
    } else {
      changeBarsIcon(false);
      setOverlay();
      showMenu();
    }
  });
}

function changeBarsIcon(isNavigationActive) {
  if (isNavigationActive) {
    return (bars.className = "fa fa-bars");
  }
  return (bars.className = "fa fa-times");
}

// === login and register page === //
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

if (signInButton) {
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  if (open === "login") container.classList.remove("right-panel-active");
  else container.classList.add("right-panel-active");
}

// theme change
const themeToggleBtn = document.querySelectorAll('.theme-toggle');
const logoIcon = document.querySelector('#logo');
const body = document.body;


// Function to toggle between dark and light themes
function toggleTheme() {
  if (document.body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    setDarkVariables();
    setLogoDarkTheme();
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light-theme');
    setLightVariables();
    setLogoLightTheme();
    localStorage.setItem('theme', 'light');
  }
}

function setLightVariables() {
  document.documentElement.style.setProperty('--bg-color', '#ffffff');
  document.documentElement.style.setProperty('--bg-secondary-color', '#f6f8fa');
  document.documentElement.style.setProperty('--bg-tertiary-color', '#d0d7de');
  document.documentElement.style.setProperty('--text-color', '#1f2328');
  document.documentElement.style.setProperty('--text-secondary-color', '#6e7781');
  document.documentElement.style.setProperty('--accent-color', '#10a37f');
}

function setDarkVariables() {
  document.documentElement.style.setProperty('--bg-color', '#151518');
  document.documentElement.style.setProperty('--bg-secondary-color', '#31323a');
  document.documentElement.style.setProperty('--text-color', '#d8d8d8');
  document.documentElement.style.setProperty('--text-secondary-color', '#8a8a8a');
  document.documentElement.style.setProperty('--accent-color', '#299950');
}

// Function to set initial theme based on user preference or default to light theme
function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    setLightVariables()
    setLogoLightTheme();
    document.body.classList.add('light-theme');
  }
}

themeToggleBtn.forEach(btn => {
  btn.addEventListener('click', toggleTheme);
});

function setLogoDarkTheme() {
  logoIcon.src = "/img/logo-light.svg";
}

function setLogoLightTheme() {
  logoIcon.src = "/img/logo-dark.svg";
}

// Set initial theme when the page loads
setInitialTheme();