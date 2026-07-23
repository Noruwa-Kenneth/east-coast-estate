/*=========================================
CHECK AUTHENTICATION
=========================================*/

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "admin-login.html";
}

/*=========================================
AUTH HEADERS
=========================================*/

const authHeaders = {
  "Content-Type": "application/json",

  Authorization: `Bearer ${token}`,
};

/*=========================================
UNAUTHORIZED HANDLER
=========================================*/

function handleUnauthorized() {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");

  showToast("Your session has expired. Please login again.", "warning");

  setTimeout(() => {
    window.location.href = "admin-login.html";
  }, 1800);
}

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
CONFIRM MODAL
=========================================*/

const confirmModal = document.getElementById("confirmModal");

const confirmTitle = document.getElementById("confirmTitle");

const confirmMessage = document.getElementById("confirmMessage");

const confirmOk = document.getElementById("confirmOk");

const confirmCancel = document.getElementById("confirmCancel");

let confirmCallback = null;

const adminUsername = document.getElementById("adminUsername");

/*=========================================
LOGOUT
=========================================*/
const logoutBtn = document.getElementById("logoutBtn");



const admin = JSON.parse(localStorage.getItem("admin"));

if (admin) {
    adminUsername.textContent = admin.username;
}

/*=========================================
SHOW CONFIRM MODAL
=========================================*/

function showConfirm({
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  onConfirm = () => {},
}) {
  confirmTitle.textContent = title;

  confirmMessage.textContent = message;

  confirmOk.textContent = confirmText;

  confirmCallback = onConfirm;

  confirmModal.classList.add("active");

  document.body.style.overflow = "hidden";
}

/*=========================================
CONFIRM EVENTS
=========================================*/

confirmCancel.addEventListener("click", () => {
  confirmModal.classList.remove("active");

  document.body.style.overflow = "";
});

confirmModal.addEventListener("click", (e) => {
  if (e.target === confirmModal) {
    confirmModal.classList.remove("active");

    document.body.style.overflow = "";
  }
});

confirmOk.addEventListener("click", () => {
  confirmModal.classList.remove("active");

  document.body.style.overflow = "";

  if (confirmCallback) {
    confirmCallback();
  }
});

/*=========================================
TOAST NOTIFICATIONS
=========================================*/

const toastContainer = document.getElementById("toast-container");

/*=========================================
SHOW TOAST
=========================================*/

function showToast(message, type = "success") {
  const icons = {
    success: "ri-checkbox-circle-fill",
    error: "ri-close-circle-fill",
    warning: "ri-error-warning-fill",
    info: "ri-information-fill",
  };

  const toast = document.createElement("div");

  toast.className = `toast ${type}`;

  toast.innerHTML = `
        <i class="${icons[type]}"></i>

        <div class="toast-message">

            ${message}

        </div>
    `;

  toastContainer.appendChild(toast);

  /* Auto remove after 4 seconds */

  setTimeout(() => {
    toast.style.animation = "toastOut .35s forwards";

    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 4000);
}

/*=========================================
TAB ELEMENTS
=========================================*/

const pendingTab = document.getElementById("pending-tab");

const approvedTab = document.getElementById("approved-tab");

/*=========================================
CURRENT TAB
=========================================*/

let currentTab = "pending";

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
    const response = await fetch(`${API_URL}/reviews/pending`, {
      headers: authHeaders,
    });

    const data = await response.json();

    hideLoading();

    if (response.status === 401) {
      handleUnauthorized();
      return [];
    }

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("Pending Reviews:", data.reviews);

    return data.reviews;

  } catch (error) {

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
RENDER REVIEW CARDS GENERATE STAR RATING
=========================================*/

function generateStars(rating) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    stars +=
      i <= rating
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
    data-name="${review.full_name}"
    data-email="${review.email}"
    data-service="${review.service}"
    data-location="${review.location || ""}"
    data-rating="${review.rating}"
    data-review="${review.review}"
    data-status="${review.status}"
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
CREATE APPROVED REVIEW CARD
=========================================*/

function createApprovedReviewCard(review) {
  return `

    <article class="review-card">

        <div class="review-header">

            <h3>${review.full_name}</h3>

            <span class="rating">

                ⭐ ${review.rating}/5

            </span>

        </div>

        <p class="service">

            ${review.service}

        </p>

        <p class="review-preview">

            ${review.review.substring(0, 140)}...

        </p>

        <div class="review-actions">

            <button
    class="view-btn"
    data-id="${review.id}"
    data-name="${review.full_name}"
    data-email="${review.email}"
    data-service="${review.service}"
    data-location="${review.location || ""}"
    data-rating="${review.rating}"
    data-review="${review.review}"
    data-status="${review.status}"
>

                <i class="ri-eye-line"></i>

                View

            </button>

            <button
                 class="feature-btn ${review.is_featured ? "featured" : ""}"
                data-id="${review.id}"
            >

                <i class="${review.is_featured ? "ri-star-fill" : "ri-star-line"}"></i>

               ${review.is_featured ? "Featured" : "Feature"}

            </button>

            <button
                class="delete-btn"
                data-id="${review.id}"
            >

                <i class="ri-delete-bin-line"></i>

                Delete

            </button>

        </div>

    </article>

    `;
}

/*=========================================
DISPLAY REVIEWS
=========================================*/

async function displayPendingReviews() {
  const pendingReviews = await fetchPendingReviews();

  if (pendingReviews.length === 0) {
    showEmptyState();

    return;
  }

  showReviewList();

  reviewList.innerHTML = pendingReviews.map(createReviewCard).join("");
}

/*=========================================
DISPLAY APPROVED REVIEWS
=========================================*/

async function displayApprovedReviews() {
  const reviews = await fetchApprovedReviews();

  if (reviews.length === 0) {
    showEmptyState();

    return;
  }

  showReviewList();

  reviewList.innerHTML = reviews.map(createApprovedReviewCard).join("");
}

/*=========================================
FETCH APPROVED REVIEWS
=========================================*/

async function fetchApprovedReviews() {
  showLoading();

  try {
    const response = await fetch(`${API_URL}/reviews`);

    const data = await response.json();

    hideLoading();

    if (response.status === 401) {
    handleUnauthorized();
    return [];
}

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("Approved Reviews:", data.reviews);

    return data.reviews;
  } catch (error) {
    hideLoading();

    console.error("Failed to fetch approved reviews:", error);

    reviewList.innerHTML = `
            <div class="error-message">
                <h3>Unable to load approved reviews.</h3>
                <p>${error.message}</p>
            </div>
        `;

    reviewList.style.display = "block";

    return [];
  }
}
/*=========================================
LOAD DASHBOARD STATS
=========================================*/

async function loadDashboardStats() {
  const pendingReviews = await fetchPendingReviews();

  const approvedReviews = await fetchApprovedReviews();

  pendingCount.textContent = pendingReviews.length;

  approvedCount.textContent = approvedReviews.length;
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

  const name = button.dataset.name;
  const email = button.dataset.email;
  const service = button.dataset.service;
  const location = button.dataset.location;
  const review = button.dataset.review;
  const rating = Number(button.dataset.rating);
  const status = button.dataset.status;

  let stars = "";

  for (let i = 1; i <= 5; i++) {
    stars +=
      i <= rating
        ? `<i class="ri-star-fill"></i>`
        : `<i class="ri-star-line"></i>`;
  }

  modalContent.innerHTML = `

        <div class="modal-header">

            <h2>Name: ${name}</h2>

            <span class="modal-status">${status}</span>

        </div>

        <p class="modal-email">Email: ${email}</p>

        <div class="modal-stars">

            <span>Rating: ${rating.toFixed(1)}</span>

             ${stars}

        </div>

        <div class="modal-info">

            <p><strong>Service:</strong> ${service}</p>

            <p><strong>Location:</strong> ${location || "Not provided"}</p>

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

  showConfirm({
    title: "Approve Review",

    message: "This review will become visible on the website.",

    confirmText: "Approve",

    onConfirm: async () => {
      try {
        button.disabled = true;

        button.innerHTML = `
                <i class="ri-loader-4-line ri-spin"></i>
                Approving...
            `;

       const response = await fetch(
    `${API_URL}/reviews/${reviewId}/approve`,
    {
        method: "PATCH",
         headers: authHeaders
    }
);

        const data = await response.json();

        if (response.status === 401) {
    handleUnauthorized();
    return [];
}

        if (!response.ok) {
          throw new Error(data.message);
        }

        await displayPendingReviews();

        showToast("Review approved successfully!", "success");
      } catch (error) {
        console.error(error);

        showToast(error.message, "error");

        button.disabled = false;

        button.innerHTML = `
                <i class="ri-check-line"></i>
                Approve
            `;
      }
    },
  });

  return;

  try {
    button.disabled = true;

    button.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Approving...
        `;

    const response = await fetch(`${API_URL}/reviews/${reviewId}/approve`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    await displayPendingReviews();
    showToast("Review approved successfully!", "success");
  } catch (error) {
    console.error(error);

    showToast(error.message, "error");

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

  showConfirm({
    title: "Delete Review",

    message: "This action cannot be undone.",

    confirmText: "Delete",

    onConfirm: async () => {
      try {
        button.disabled = true;

        button.innerHTML = `
                <i class="ri-loader-4-line ri-spin"></i>
                Deleting...
            `;

        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: authHeaders
});
        const data = await response.json();

        if (response.status === 401) {
    handleUnauthorized();
    return;
}

        if (!response.ok) {
          throw new Error(data.message);
        }

        if (currentTab === "pending") {
          await displayPendingReviews();
        } else {
          await displayApprovedReviews();
        }

        showToast("Review deleted successfully!", "success");
      } catch (error) {
        console.error(error);

        showToast(error.message, "error");

        button.disabled = false;

        button.innerHTML = `
                <i class="ri-delete-bin-line"></i>
                Delete
            `;
      }
    },
  });

  return;

  try {
    button.disabled = true;

    button.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Deleting...
        `;

    const response = await fetch(
    `${API_URL}/reviews/${reviewId}`,
    {
        method: "DELETE",

        headers: authHeaders
    }
);

    const data = await response.json();

    if (response.status === 401) {
    handleUnauthorized();
    return [];
}

    if (!response.ok) {
      throw new Error(data.message);
    }

    await displayPendingReviews();
    showToast("Review deleted successfully!", "success");
  } catch (error) {
    console.error(error);

    showToast(error.message, "error");

    button.disabled = false;

    button.innerHTML = `
            <i class="ri-delete-bin-line"></i>
            Delete
        `;
  }
});

/*=========================================
SET ACTIVE TAB
=========================================*/

function setActiveTab(tab) {
  currentTab = tab;

  pendingTab.classList.remove("active");

  approvedTab.classList.remove("active");

  if (tab === "pending") {
    pendingTab.classList.add("active");
  } else {
    approvedTab.classList.add("active");
  }
}

/*=========================================
TAB EVENTS
=========================================*/

pendingTab.addEventListener("click", () => {
  setActiveTab("pending");

  displayPendingReviews();
});

approvedTab.addEventListener("click", () => {
  setActiveTab("approved");

  displayApprovedReviews();
});

/*=========================================
FEATURE REVIEW
=========================================*/
document.addEventListener("click", async (e) => {
  const button = e.target.closest(".feature-btn");

  if (!button) return;

  console.log("Feature button clicked");

  const reviewId = button.dataset.id;

  try {
    button.disabled = true;

    button.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Updating...
        `;

   const response = await fetch(
    `${API_URL}/reviews/${reviewId}/feature`,
    {
        method: "PATCH",

        headers: authHeaders
    }
);

    const data = await response.json();

    if (response.status === 401) {
    handleUnauthorized();
    return;
}

    if (!response.ok) {
      throw new Error(data.message);
    }

    await displayApprovedReviews();
    showToast(data.message, "success");
  } catch (error) {
    console.error(error);

    showToast(error.message, "error");

    button.disabled = false;

    button.innerHTML = `
            <i class="ri-star-line"></i>
            Feature
        `;
  }
});

/*=========================================
LOGOUT
=========================================*/

logoutBtn.addEventListener("click", () => {

    showConfirm({

        title: "Logout",

        message: "Are you sure you want to log out?",

        confirmText: "Logout",

        onConfirm: () => {

            localStorage.removeItem("token");

            localStorage.removeItem("admin");

            window.location.href = "admin-login.html";

        }

    });

});

async function initDashboard() {
  await loadDashboardStats();

  displayPendingReviews();
}

initDashboard();
