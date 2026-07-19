//script.js
(function() {
emailjs.init("YNGZBdNTHBeyxjMN0"); //replace with your email public key
})();

//Attach event listener to the form
window.onload = function() {
const form = document.querySelector("form");

form.addEventListener("submit", function(event){
    event.preventDefault(); //prevent page reload

    //collect form data
    const templateParams = {
name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
email: document.getElementById("email").value,
service: document.getElementById("service").value,
message: document.getElementById("message").value
    };

    //send Email using EmailJS
    emailjs.send("service_vet6ant", "template_egca5ob", templateParams)
    .then(function(response){
        alert("Email sent successfully!");
        console.log("SUCCESS!", response.status, response.text);
    }, function(error){
        alert("Failed to send email. Check console for details.");
        console.error("FAILED...", error);
    });
});
};

// review form
/*=============== STAR RATING ===============*/

const stars = document.querySelectorAll(".star-rating i");
const ratingInput = document.getElementById("rating");

let selectedRating = 0;

// Highlight stars
function highlightStars(rating) {
  stars.forEach((star) => {
    if (Number(star.dataset.value) <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

// Hover effect
stars.forEach((star) => {
  star.addEventListener("mouseover", () => {
    highlightStars(Number(star.dataset.value));
  });

  // Click to select
  star.addEventListener("click", () => {
    selectedRating = Number(star.dataset.value);
    ratingInput.value = selectedRating;
    highlightStars(selectedRating);
  });
});

// Restore selected rating when mouse leaves
document
  .querySelector(".star-rating")
  .addEventListener("mouseleave", () => {
    highlightStars(selectedRating);
  });

/*=============== REVIEW FORM ===============*/

const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (selectedRating === 0) {
    alert("Please select a rating.");
    return;
  }

  const reviewData = {
    name: document.getElementById("name").value,
    rating: selectedRating,
    review: document.getElementById("review").value,
  };

  console.log(reviewData);

  alert("Thank you for your review!");

  reviewForm.reset();

  selectedRating = 0;
  ratingInput.value = 0;
  highlightStars(0);
});