function enableSubmitButton(btn) {
  btn.disabled = false;
  btn.classList.remove("btn--disabled");
}

function disableSubmitButton(btn) {
  btn.disabled = true;
  btn.classList.add("btn--disabled");
}

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

if (overlay) {
  // close overlay and menu onclick
  overlay.addEventListener("click", () => {
    removeOverlay();
    hideMenu();
    changeBarsIcon(true);
  });
}

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

function xSVGIcon() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;
}

function BurgerSVGIcon() {
  return `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.625C3 5.32663 3.11853 5.04048 3.3295 4.8295C3.54048 4.61853 3.82663 4.5 4.125 4.5H19.875C20.1734 4.5 20.4595 4.61853 20.6705 4.8295C20.8815 5.04048 21 5.32663 21 5.625C21 5.92337 20.8815 6.20952 20.6705 6.4205C20.4595 6.63147 20.1734 6.75 19.875 6.75H4.125C3.82663 6.75 3.54048 6.63147 3.3295 6.4205C3.11853 6.20952 3 5.92337 3 5.625ZM3 12C3 11.7016 3.11853 11.4155 3.3295 11.2045C3.54048 10.9935 3.82663 10.875 4.125 10.875H19.875C20.1734 10.875 20.4595 10.9935 20.6705 11.2045C20.8815 11.4155 21 11.7016 21 12C21 12.2984 20.8815 12.5845 20.6705 12.7955C20.4595 13.0065 20.1734 13.125 19.875 13.125H4.125C3.82663 13.125 3.54048 13.0065 3.3295 12.7955C3.11853 12.5845 3 12.2984 3 12ZM12 18.375C12 18.0766 12.1185 17.7905 12.3295 17.5795C12.5405 17.3685 12.8266 17.25 13.125 17.25H19.875C20.1734 17.25 20.4595 17.3685 20.6705 17.5795C20.8815 17.7905 21 18.0766 21 18.375C21 18.6734 20.8815 18.9595 20.6705 19.1705C20.4595 19.3815 20.1734 19.5 19.875 19.5H13.125C12.8266 19.5 12.5405 19.3815 12.3295 19.1705C12.1185 18.9595 12 18.6734 12 18.375Z"/>
    </svg>  
  `;
}

function moonSVGIcon() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;
}

function sunSVGIcon() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  `;
}

function changeThemeIcon(isDarkThemeActive) {
  const themeIcon = document.getElementById("theme-toggle");

  if (isDarkThemeActive) {
    themeIcon.innerHTML = moonSVGIcon();
  } else {
    themeIcon.innerHTML = sunSVGIcon();
  }
}

function changeBarsIcon(isNavigationActive) {
  if (isNavigationActive) {
    return (bars.innerHTML = BurgerSVGIcon());
  }
  bars.innerHTML = xSVGIcon();
}

// theme change
const themeToggleBtn = document.querySelectorAll(".theme-toggle");
const body = document.body;

// Function to toggle between dark and light themes
function toggleTheme() {
  if (document.body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    setDarkVariables();
    changeThemeIcon(true);
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light-theme");
    setLightVariables();
    changeThemeIcon(false);
    localStorage.setItem("theme", "light");
  }
}

function setLightVariables() {
  document.documentElement.style.setProperty("--bg-color", "#ffffff");
  document.documentElement.style.setProperty(
    "--transparentize-bg-color",
    "#ffffffaf"
  );
  document.documentElement.style.setProperty("--bg-secondary-color", "#f6f8fa");
  document.documentElement.style.setProperty("--bg-tertiary-color", "#d0d7de");
  document.documentElement.style.setProperty("--text-color", "#1f2328");
  document.documentElement.style.setProperty(
    "--text-secondary-color",
    "#6e7781"
  );
  document.documentElement.style.setProperty("--accent-color", "#10a37f");
}

function setDarkVariables() {
  document.documentElement.style.setProperty("--bg-color", "#151518");
  document.documentElement.style.setProperty("--bg-secondary-color", "#31323a");
  document.documentElement.style.setProperty("--text-color", "#d8d8d8");
  document.documentElement.style.setProperty(
    "--text-secondary-color",
    "#8a8a8a"
  );
  document.documentElement.style.setProperty("--accent-color", "#10a37f");
}

// Function to set initial theme based on user preference or default to light theme
function setInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    setLightVariables();
    changeThemeIcon(false);
    document.body.classList.add("light-theme");
  }
}

themeToggleBtn.forEach((btn) => {
  btn.addEventListener("click", toggleTheme);
});

// Set initial theme when the page loads
setInitialTheme();

// === header Animation on scroll === //
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const isScrolledToTop = window.scrollY > 0;
  const isScrolledToBottom = window.scrollY > window.innerHeight;

  if (header) {
    if (isScrolledToTop && !isScrolledToBottom) {
      header.classList.add("header--inactive");
    } else {
      header.classList.remove("header--inactive");
    }

    if (isScrolledToBottom) {
      header.classList.add("header--fixed");
    } else {
      header.classList.remove("header--fixed");
    }
  }
});

//
const scrollers = document.querySelectorAll(".scroller");

// Check if the user prefers reduced motion
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // Add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it,
    // add aria-hidden to it,
    // and add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// === toast notification === //
const toast = document.querySelector("#toast");

if (toast) {
  showToast(toast);
}

function createToast(type, msg) {
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.classList.add("toast", `toast--${type}`);
  toast.innerHTML = `
    <div class="toast__body">
      ${msg}
    </div>

    <div class="toast__progress"></div>
  `;
  document.body.appendChild(toast);

  showToast(toast);

  return toast;
}

function showToast(toast) {
  toast.classList.add(`toast--active`);

  setTimeout(() => {
    hideToast(toast);
  }, 5000);
}

function hideToast(toast) {
  toast.classList.remove("toast--active");

  setTimeout(() => {
    removeToast(toast);
  }, 1000);
}

function removeToast(toast) {
  toast.remove();
}

// === form validation === //
const form = document.querySelector("#newsletter-form");
const emailInput = document.querySelector("#email");
const newsletterSubmitBtn = document.querySelector("#newsletter-submit");

function verifyEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isEmailValid(email) {
  if (!verifyEmail(email)) {
    return disableSubmitButton(newsletterSubmitBtn);
  }

  enableSubmitButton(newsletterSubmitBtn);
}

if (emailInput) {
  emailInput.addEventListener("input", (e) => {
    isEmailValid(e.target.value);
  });
}

if (newsletterSubmitBtn) {
  newsletterSubmitBtn.addEventListener("click", async (e) => {
    console.log("clicked");
    const email = emailInput.value;
    const errors = [];

    if (!email) {
      errors.push("Please let us know your email. 😊");
    }

    if (errors.length > 0) {
      createToast("error", errors);
    } else {
      const response = await fetch("/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (response.ok) {
        createToast("success", data.msg);
      } else {
        createToast("error", data.msg);
      }
    }
  });
}

// === docs === //
// Function to add active class to the sidebar item
function setActiveLink() {
  var currentUrl = window.location.href;
  var sidebarLinks = document.querySelectorAll(".sidebar__item a");

  sidebarLinks.forEach(function (link) {
    if (link.href === currentUrl) {
      link.parentElement.classList.add("sidebar__item--active");
    } else {
      link.parentElement.classList.remove("sidebar__item--active");
    }
  });
}

// Call the function on page load
window.onload = setActiveLink;
window.addEventListener("popstate", setActiveLink);

// === validate login and register forms === //

// Sign-Up Form Validation
const signUpForm = document.getElementById("signUpForm");
const signUpButton = document.getElementById("signUpButton");
const agreementCheckbox = document.getElementById("agreement");

// Sign-In Form Validation
const signInForm = document.getElementById("signInForm");
const signInButton = document.getElementById("signInButton");

function isFormValid(form) {
  return Array.from(form.elements).every((input) => input.checkValidity());
}

function setInputErrorClass(input) {
  console.log(input.validity.valid);
  input.classList.add("input--error");
}

function removeInputErrorClass(input) {
  input.classList.remove("input--error");
}

function isRegisterFormValid() {
  if (!agreementCheckbox.checked) {
    return disableSubmitButton(signUpButton);
  }

  if (!isFormValid(signUpForm)) disableSubmitButton(signUpButton);
  else enableSubmitButton(signUpButton);
}

function isSignInFormValid() {
  if (!isFormValid(signInForm)) disableSubmitButton(signInButton);
  else enableSubmitButton(signInButton);
}

if (signUpForm) {
  signUpForm.addEventListener("input", function () {
    isRegisterFormValid();
  });

  document.addEventListener("DOMContentLoaded", () => {
    disableSubmitButton(signUpButton);
  });
}

if (signInForm) {
  signInForm.addEventListener("input", function () {
    isSignInFormValid();
  });

  document.addEventListener("DOMContentLoaded", () => {
    disableSubmitButton(signInButton);
  });
}

// === update user info === //
const updateForm = document.getElementById("updateForm");
const updateButton = document.getElementById("updateButton");

function isUpdateFormValid() {
  if (!isFormValid(updateForm)) disableSubmitButton(updateButton);
  else enableSubmitButton(updateButton);
}

if (updateForm) {
  updateForm.addEventListener("input", function () {
    isUpdateFormValid();
  });

  document.addEventListener("DOMContentLoaded", () => {
    disableSubmitButton(updateButton);
  });
}

// === delete user account === //
const deleteForm = document.getElementById("deleteAccountForm");
const deleteButton = document.getElementById("deleteAccountButton");

function confirmModalDeleteAccount() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <header class="modal__header">
      <h2 class="modal__header-title">Delete account</h2>
      <button class="modal__header-close">
        <i class="fa fa-times" id="closeModal"></i>
      </button> 
    </header>

    <p class="modal__text">Are you sure you want to delete your account? Please be sure this action cannot be undone.</p>


    <div class="modal__actions">
      <button class="btn btn--secondary" id="cancelDelete">Cancel</button>
      <button class="btn btn--danger" id="confirmDelete">Delete</button>
    </div>
  `;

  document.body.appendChild(modal);
  setOverlay();

  return modal;
}

function removeModal() {
  const modal = document.querySelector(".modal");
  removeOverlay();
  modal.remove();
}

document.addEventListener("click", (e) => {
  if (e.target.id === "cancelDelete") {
    removeModal();
  }

  if (e.target.id === "closeModal") {
    removeModal();
  }

  if (e.target.id === "confirmDelete") {
    deleteForm.submit();
  }

  if (e.target.id === "overlay") {
    removeModal();
  }
});

if (deleteForm) {
  deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    removeModal();
  });
}

if (deleteButton) {
  deleteButton.addEventListener("click", (e) => {
    confirmModalDeleteAccount();
  });
}

// === Change password validation === //
const changePasswordForm = document.getElementById("changePasswordForm");
const changePasswordButton = document.getElementById("changePasswordButton");

function isChangePasswordFormValid() {
  if (!isFormValid(changePasswordForm))
    disableSubmitButton(changePasswordButton);
  else enableSubmitButton(changePasswordButton);
}

if (changePasswordForm) {
  changePasswordForm.addEventListener("input", function () {
    isChangePasswordFormValid();
  });

  document.addEventListener("DOMContentLoaded", () => {
    disableSubmitButton(changePasswordButton);
  });
}

// === Copy API key to clipboard === //
const copyButton = document.getElementById("copyButton");
const apiKey = document.getElementById("apiKey");

if (copyButton) {
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(apiKey.textContent);
    createToast("success", "API key copied to clipboard");
  });
}
