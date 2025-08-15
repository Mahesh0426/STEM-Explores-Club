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

function showError(id, msg) {
  const el = document.getElementById(id + "Error");
  if (el) el.textContent = msg;
}
function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.textContent = ""));
}
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
function isValidPhone(p) {
  return /^\d{10,15}$/.test(p.replace(/\D/g, ""));
}

// Contact Form Validation and Submission
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate form
    let isValid = true;

    // Required field validation
    const requiredFields = [
      { id: "parentName", message: "Parent/Guardian name is required" },
      { id: "childName", message: "Child's name is required" },
      { id: "childAge", message: "Please select child's age" },
      { id: "email", message: "Email address is required" },
      { id: "inquiryType", message: "Please select inquiry type" },
      { id: "message", message: "Message is required" },
      { id: "privacy", message: "You must agree to the privacy policy" },
    ];

    requiredFields.forEach((field) => {
      const element = document.getElementById(field.id);
      const value =
        element.type === "checkbox" ? element.checked : element.value.trim();

      if (!value) {
        showError(field.id, field.message);
        isValid = false;
      }
    });

    // Email validation
    const email = document.getElementById("email").value.trim();
    if (email && !isValidEmail(email)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Phone validation (if provided)
    const phone = document.getElementById("phone").value.trim();
    if (phone && !isValidPhone(phone)) {
      showError("phone", "Please enter a valid phone number");
      isValid = false;
    }

    // Message length validation
    const message = document.getElementById("message").value.trim();
    if (message && message.length < 10) {
      showError("message", "Message must be at least 10 characters long");
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      setTimeout(() => {
        contactForm.style.display = "none";
        formSuccess.style.display = "block";

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: "smooth" });

        // Reset form after showing success
        setTimeout(() => {
          contactForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 3000);
      }, 2000);
    }
  });
}
