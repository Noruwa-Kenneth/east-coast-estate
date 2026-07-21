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
        : "";

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
fetchPendingReviews();