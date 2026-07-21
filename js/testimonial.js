/*=========================================
  TESTIMONIALS - PART 1
=========================================*/

/*========== API URL ==========*/

const API_URL =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "";

/*========== ELEMENTS ==========*/

const testimonialWrapper = document.getElementById("testimonial-wrapper");

/*=========================================
FETCH APPROVED REVIEWS
=========================================*/

async function fetchTestimonials() {
  try {
    const response = await fetch(`${API_URL}/reviews`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("Approved Reviews:", data.reviews);

    return data.reviews;
  } catch (error) {
    console.error("Error loading testimonials:", error);

    testimonialWrapper.innerHTML = `
            <div class="testimonial-empty">
                <p>Unable to load reviews at the moment.</p>
            </div>
        `;

    return [];
  }
}

/*=========================================
  TESTIMONIALS - PART 2
=========================================*/

/*=========================================
GENERATE STARS
=========================================*/

function generateStars(rating) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += `<i class="ri-star-fill"></i>`;
    } else {
      stars += `<i class="ri-star-line"></i>`;
    }
  }

  return stars;
}

/*=========================================
CREATE TESTIMONIAL CARD
=========================================*/

function createTestimonialCard(review) {
  return `

        <article class="testimonial__card swiper-slide">

            <h3 class="testimonial__name">

                ${review.full_name}

            </h3>

            <div class="testimonial__rating">

                <div class="testimonial__stars">

                    ${generateStars(review.rating)}

                </div>

                <h3 class="testimonial__number">

                    ${Number(review.rating).toFixed(1)}

                </h3>

            </div>

            <p class="testimonial__description">

                ${review.review}

            </p>

            <button
    class="read-more-btn"
    data-name="${review.full_name}"
    data-service="${review.service}"
    data-location="${review.location || ""}"
    data-rating="${review.rating}"
    data-review="${review.review}"
>

    Read More

</button>

        </article>

    `;
}

/*=========================================
DISPLAY TESTIMONIALS
=========================================*/

/*=========================================
DISPLAY TESTIMONIALS
=========================================*/

async function displayTestimonials() {
  /* Loading */

  testimonialWrapper.innerHTML = `
        <div class="testimonial-loading">
            <p>Loading testimonials...</p>
        </div>
    `;

  const reviews = await fetchTestimonials();

  /* No Reviews */

  if (reviews.length === 0) {
    testimonialWrapper.innerHTML = `
            <div class="swiper-slide testimonial-empty">
                <p>No reviews available yet.</p>
            </div>
        `;

    return;
  }

  /* Create Cards */

  testimonialWrapper.innerHTML = reviews.map(createTestimonialCard).join("");

  /* Start Swiper */

  /* Start Swiper */

initTestimonialSwiper(reviews.length);
}

displayTestimonials();

/*=========================================
REVIEW MODAL
=========================================*/

const reviewModal = document.getElementById("reviewModal");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.querySelector(".close-modal");

/* Open Modal */

document.addEventListener("click", (e) => {
console.log(e.target);
    if (!e.target.classList.contains("read-more-btn")) return;

    const button = e.target;

    const name = button.dataset.name;
    const service = button.dataset.service;
    const location = button.dataset.location;
    const rating = Number(button.dataset.rating);
    const review = button.dataset.review;

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars += i <= rating
            ? `<i class="ri-star-fill"></i>`
            : `<i class="ri-star-line"></i>`;

    }

    modalContent.innerHTML = `

        <div class="modal-rating">

            ${stars}

            <span>${rating.toFixed(1)}</span>

        </div>

        <h2>${name}</h2>

        <p class="modal-service">

            ${service}

            ${location ? " • " + location : ""}

        </p>

        <p class="modal-review">

            ${review}

        </p>

    `;

    reviewModal.classList.add("active");
    document.body.style.overflow = "hidden";
});

/* Close Button */

closeModalBtn.addEventListener("click", () => {

    reviewModal.classList.remove("active");
    document.body.style.overflow = "";
});

/* Close when clicking outside */

reviewModal.addEventListener("click", (e) => {

    if (e.target === reviewModal) {

        reviewModal.classList.remove("active");
        document.body.style.overflow = "";
    }

});

/* Close with ESC */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        reviewModal.classList.remove("active");

    }

});