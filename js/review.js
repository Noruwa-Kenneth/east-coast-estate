/*=========================================
  REVIEW FORM - PART 1
=========================================*/

/*========== API URL ==========*/

const API_URL =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "";

/*========== FORM ELEMENTS ==========*/

const reviewForm = document.getElementById("review-form");

const fullName = document.getElementById("review-name");
const email = document.getElementById("review-email");
const locationInput = document.getElementById("review-location");
const service = document.getElementById("review-service");

const review = document.getElementById("review");

const rating = document.getElementById("rating");

const submitBtn = document.getElementById("submitBtn");

const formMessage = document.getElementById("form-message");

/*========== ERROR ELEMENTS ==========*/

const nameError = document.getElementById("review-name-error");
const emailError = document.getElementById("email-error");
const serviceError = document.getElementById("service-error");
const reviewError = document.getElementById("review-error");
const ratingError = document.getElementById("rating-error");

/*========== STAR RATING ==========*/

const stars = document.querySelectorAll(".star-rating i");

/*=========================================
  HELPER FUNCTIONS
=========================================*/

/* Show Error */

function showError(element, message) {

  element.textContent = message;

}

/* Clear Error */

function clearError(element) {

  element.textContent = "";

}

/* Clear All Errors */

function clearAllErrors() {

  clearError(nameError);
  clearError(emailError);
  clearError(serviceError);
  clearError(reviewError);
  clearError(ratingError);

}

/*=========================================
  FORM MESSAGE
=========================================*/

/* Success Message */

function showSuccessMessage(message) {

  formMessage.className = "success";

  formMessage.textContent = message;

}

/* Error Message */

function showFormError(message) {

  formMessage.className = "error";

  formMessage.textContent = message;

}

/* Hide Message */

function hideFormMessage() {

  formMessage.className = "";

  formMessage.textContent = "";

}

// part2
/*=========================================
  VALIDATE FORM
=========================================*/

function validateForm() {

    let isValid = true;

    clearAllErrors();

    hideFormMessage();

    /* Full Name */

    if (fullName.value.trim() === "") {

        showError(nameError, "Please enter your full name.");

        isValid = false;

    }

    /* Email */

    if (email.value.trim() === "") {

        showError(emailError, "Please enter your email.");

        isValid = false;

    }

    /* Service */

    if (service.value === "") {

        showError(serviceError, "Please choose a service.");

        isValid = false;

    }

    /* Rating */

    if (Number(rating.value) === 0) {

        showError(ratingError, "Please select a rating.");

        isValid = false;

    }

    /* Review */

    if (review.value.trim().length < 10) {

        showError(
            reviewError,
            "Your review must be at least 10 characters."
        );

        isValid = false;

    }

    return isValid;

}

/*=========================================
  SUBMIT REVIEW
=========================================*/

reviewForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (!validateForm()) return;

    submitBtn.disabled = true;

    submitBtn.innerHTML = `
        <span>Submitting...</span>
    `;

    const reviewData = {

        full_name: fullName.value.trim(),

        email: email.value.trim(),

        location: locationInput.value.trim(),

        service: service.value,

        rating: Number(rating.value),

        review: review.value.trim(),

    };

    try {

        const response = await fetch(`${API_URL}/reviews`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify(reviewData),

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

       showSuccessMessage(data.message);

resetReviewForm();

autoHideMessage();

submitBtn.innerHTML = `
    <span>Review Submitted</span>
    <i class="ri-check-line"></i>
`;

setTimeout(() => {

    submitBtn.disabled = false;

    submitBtn.innerHTML = `
        <span>Submit Review</span>
        <i class="ri-send-plane-fill"></i>
    `;

}, 2000);

        /* Reset happens in Part 3 */

    }

    catch (error) {

        console.error(error);

        showFormError(

            error.message ||

            "Something went wrong. Please try again."

        );

        submitBtn.disabled = false;

        submitBtn.innerHTML = `
            <span>Submit Review</span>
            <i class="ri-send-plane-fill"></i>
        `;

    }

});

// part 3
/*=========================================
  RESET STAR RATING
=========================================*/

function resetStars() {

    rating.value = 0;

    document.querySelector(".rating-text").textContent =
        "Tap a star to rate";

    stars.forEach((star) => {

        star.classList.remove("active");

    });

}

/*=========================================
  RESET FORM
=========================================*/

function resetReviewForm() {

    reviewForm.reset();

    resetStars();

    clearAllErrors();

}

/*=========================================
  AUTO HIDE SUCCESS MESSAGE
=========================================*/

function autoHideMessage() {

    setTimeout(() => {

        hideFormMessage();

    }, 5000);

}