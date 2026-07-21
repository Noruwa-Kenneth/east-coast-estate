/*=========================================
ADMIN DASHBOARD - PART 1
SETUP & FETCH REVIEWS
=========================================*/

/*=========================================
API URL
=========================================*/

const API_URL =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://east-coast-estate.onrender.com";

/*=========================================
DOM ELEMENTS
=========================================*/

const reviewList = document.getElementById("review-list");

const loading = document.getElementById("loading");

const emptyState = document.getElementById("empty-state");

const pendingCount = document.getElementById("pending-count");

const approvedCount = document.getElementById("approved-count");

const reviewModal = document.getElementById("reviewModal");

const modalContent = document.getElementById("modal-content");

const closeModal = document.getElementById("closeModal");

/*=========================================
HELPER FUNCTIONS
=========================================*/

/* Show Loading */

function showLoading() {

    loading.style.display = "block";

    reviewList.style.display = "none";

    emptyState.style.display = "none";

}

/* Hide Loading */

function hideLoading() {

    loading.style.display = "none";

}

/* Show Empty State */

function showEmptyState() {

    reviewList.style.display = "none";

    emptyState.style.display = "block";

}

/* Show Review List */

function showReviewList() {

    reviewList.style.display = "grid";

    emptyState.style.display = "none";

}

/*=========================================
FETCH PENDING REVIEWS
=========================================*/

async function fetchPendingReviews() {

    showLoading();

    try {

        const response = await fetch(`${API_URL}/reviews/pending`);

        const data = await response.json();

        hideLoading();

        if (!response.ok) {

            throw new Error(data.message);

        }

        console.log("Pending Reviews:", data.reviews);

        return data.reviews;

    }

    catch (error) {

        hideLoading();

        console.error("Failed to fetch reviews:", error);

        reviewList.innerHTML = `
            <div class="error-message">
                <h3>Unable to load reviews.</h3>
                <p>${error.message}</p>
            </div>
        `;

        reviewList.style.display = "block";

        return [];

    }

}

/*=========================================
ADMIN DASHBOARD - PART 2
RENDER REVIEW CARDS
=========================================*/

/*=========================================
GENERATE STAR RATING
=========================================*/

function generateStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars += i <= rating
            ? `<i class="ri-star-fill"></i>`
            : `<i class="ri-star-line"></i>`;

    }

    return stars;

}

/*=========================================
CREATE REVIEW CARD
=========================================*/

function createReviewCard(review) {

    return `

        <div class="review-card">

            <div class="review-card-header">

                <div>

                    <h3>${review.full_name}</h3>

                    <small>${review.email}</small>

                </div>

                <span class="review-status">
                    ${review.status}
                </span>

            </div>

            <div class="review-stars">

                ${generateStars(review.rating)}

                <span>${review.rating}.0</span>

            </div>

            <p class="review-service">

                <strong>Service:</strong>

                ${review.service}

            </p>

            <p class="review-location">

                <strong>Location:</strong>

                ${review.location || "Not provided"}

            </p>

            <p class="review-text">

                ${
                    review.review.length > 140
                        ? review.review.substring(0, 140) + "..."
                        : review.review
                }

            </p>

            <div class="review-actions">

                <button
                    class="view-btn"
                    data-id="${review.id}"
                >
                    <i class="ri-eye-line"></i>
                    View
                </button>

                <button
                    class="approve-btn"
                    data-id="${review.id}"
                >
                    <i class="ri-check-line"></i>
                    Approve
                </button>

                <button
                    class="delete-btn"
                    data-id="${review.id}"
                >
                    <i class="ri-delete-bin-line"></i>
                    Delete
                </button>

            </div>

        </div>

    `;

}

/*=========================================
DISPLAY REVIEWS
=========================================*/

async function displayPendingReviews() {

    const reviews = await fetchPendingReviews();

    pendingCount.textContent = reviews.length;

    if (reviews.length === 0) {

        showEmptyState();

        return;

    }

    showReviewList();

    reviewList.innerHTML = reviews
        .map(createReviewCard)
        .join("");

}

/*=========================================
ADMIN DASHBOARD - PART 3
VIEW REVIEW MODAL
=========================================*/

/*=========================================
OPEN MODAL
=========================================*/

document.addEventListener("click", (e) => {

    const button = e.target.closest(".view-btn");

    if (!button) return;

    const card = button.closest(".review-card");

    const name = card.querySelector("h3").textContent;
    const email = card.querySelector("small").textContent;
    const status = card.querySelector(".review-status").textContent;
    const stars = card.querySelector(".review-stars").innerHTML;
    const service = card.querySelector(".review-service").innerHTML;
    const location = card.querySelector(".review-location").innerHTML;
    const review = card.querySelector(".review-text").textContent;

    modalContent.innerHTML = `

        <div class="modal-header">

            <h2>${name}</h2>

            <span class="modal-status">${status}</span>

        </div>

        <p class="modal-email">${email}</p>

        <div class="modal-stars">

            ${stars}

        </div>

        <div class="modal-info">

            <p>${service}</p>

            <p>${location}</p>

        </div>

        <hr>

        <p class="modal-review">

            ${review}

        </p>

    `;

    reviewModal.classList.add("active");

    document.body.style.overflow = "hidden";

});
/*=========================================
CLOSE MODAL
=========================================*/

closeModal.addEventListener("click", () => {

    reviewModal.classList.remove("active");

    document.body.style.overflow = "";

});

/* Close Outside */

reviewModal.addEventListener("click", (e) => {

    if (e.target === reviewModal) {

        reviewModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});

/* ESC Key */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        reviewModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});

/*=========================================
ADMIN DASHBOARD - PART 4
APPROVE REVIEW
=========================================*/

document.addEventListener("click", async (e) => {

    const button = e.target.closest(".approve-btn");

    if (!button) return;

    const reviewId = button.dataset.id;

    if (!confirm("Approve this review?")) return;

    try {

        button.disabled = true;

        button.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Approving...
        `;

        const response = await fetch(
            `${API_URL}/reviews/${reviewId}/approve`,
            {
                method: "PATCH"
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        await displayPendingReviews();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

        button.disabled = false;

        button.innerHTML = `
            <i class="ri-check-line"></i>
            Approve
        `;

    }

});
/*=========================================
DELETE REVIEW
=========================================*/

document.addEventListener("click", async (e) => {

    const button = e.target.closest(".delete-btn");

    if (!button) return;

    const reviewId = button.dataset.id;

    if (!confirm("Delete this review permanently?")) return;

    try {

        button.disabled = true;

        button.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Deleting...
        `;

        const response = await fetch(
            `${API_URL}/reviews/${reviewId}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        await displayPendingReviews();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

        button.disabled = false;

        button.innerHTML = `
            <i class="ri-delete-bin-line"></i>
            Delete
        `;

    }

});
displayPendingReviews();