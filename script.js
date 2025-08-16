// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
});

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          const itemCategories = item.getAttribute("data-category");
          if (itemCategories && itemCategories.includes(filterValue)) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 10);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        }
      });
    });
  });
}

//play video
document.querySelectorAll(".play-button").forEach((button) => {
  button.addEventListener("click", () => {
    const video = button.parentElement.querySelector("video");
    if (video) {
      video.play();
      button.style.display = "none"; // hide play button
    }
  });
});

/* ----------  validation helpers  ---------- */
function showError(id, msg) {
  const errorElement = document.getElementById(id + "Error");
  if (errorElement) errorElement.textContent = msg;
}
//function to clear message
function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((error) => (error.textContent = ""));
}

//function to validate email
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

//function to validate phone
function isValidPhone(p) {
  return /^\d{10,15}$/.test(p.replace(/\D/g, ""));
}

/* ----------  Web3Forms submission  ---------- */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    /* ---- basic validation  ---- */
    const required = [
      {
        id: "parentName",
        name: "parentName",
        msg: "Parent/Guardian name is required",
      },
      { id: "childName", name: "childName", msg: "Child's name is required" },
      { id: "childAge", name: "childAge", msg: "Please select child's age" },
      { id: "email", name: "email", msg: "Email address is required" },
      {
        id: "inquiryType",
        name: "inquiryType",
        msg: "Please select inquiry type",
      },
      { id: "message", name: "message", msg: "Message is required" },
      {
        id: "privacy",
        name: "privacy",
        msg: "You must agree to the privacy policy",
      },
    ];

    required.forEach((field) => {
      const element = document.getElementById(field.id);
      const value =
        element.type === "checkbox" ? element.checked : element.value.trim();
      if (!value) {
        showError(field.id, field.msg);
        isValid = false;
      }
    });

    const email = document.getElementById("email").value.trim();
    if (email && !isValidEmail(email)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    }

    const phone = document.getElementById("phone").value.trim();
    if (phone && !isValidPhone(phone)) {
      showError("phone", "Please enter a valid phone number");
      isValid = false;
    }

    const message = document.getElementById("message").value.trim();
    if (message && message.length < 10) {
      showError("message", "Message must be at least 10 characters");
      isValid = false;
    }

    if (!isValid) return;

    /* ---- send to Web3Forms ---- */
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = "Sending…";
    btn.disabled = true;

    const formData = new FormData(contactForm);
    formData.append("access_key", "3557ba0f-c17f-470e-9314-19932e23bca3");
    formData.append("subject", "New inquiry from STEM Explorers Club Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (res.ok && result.success) {
        contactForm.style.display = "none";
        formSuccess.style.display = "block";
        formSuccess.scrollIntoView({ behavior: "smooth" });
      } else {
        alert(result.message || "Error sending message");
        btn.textContent = originalText;
        btn.disabled = false;
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error(err);
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}
