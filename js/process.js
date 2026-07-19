const progress = document.getElementById("progress");

const steps = document.querySelectorAll(".process-step");
const icons = document.querySelectorAll(".process-icon");
const progressContainer = document.querySelector(".progress-container");

let currentStep = 1;

// Update UI
function updateProgress() {
    // Highlight active steps
    steps.forEach((step, index) => {
        step.classList.toggle("active", index < currentStep);
    });

    // Update blue line
    if (currentStep === 1) {
        progress.style.width = "0px";
    } else {
        const containerRect = progressContainer.getBoundingClientRect();

        const firstRect = icons[0].getBoundingClientRect();
        const currentRect = icons[currentStep - 1].getBoundingClientRect();

        const start =
            firstRect.left + firstRect.width / 2 - containerRect.left;

        const end =
            currentRect.left + currentRect.width / 2 - containerRect.left;

        progress.style.width = (end - start) + "px";
    }

    // Scroll ONLY the horizontal container on mobile
    if (window.innerWidth <= 865) {
        const step = steps[currentStep - 1];

        progressContainer.scrollTo({
            left: step.offsetLeft - 20,
            behavior: "smooth"
        });
    }
}

// Auto move every 5 seconds
function nextStep() {
    currentStep++;

    if (currentStep > steps.length) {
        currentStep = 1;
    }

    updateProgress();
}

// Recalculate on resize
window.addEventListener("resize", updateProgress);

// Initial state
updateProgress();

// Auto play every 5 seconds
let autoPlay = setInterval(nextStep, 5000);

// Swipe support
let startX = 0;

progressContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

progressContainer.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const distance = startX - endX;

    if (distance > 50 && currentStep < steps.length) {
        currentStep++;
        updateProgress();
    }

    if (distance < -50 && currentStep > 1) {
        currentStep--;
        updateProgress();
    }

    // Restart autoplay
    clearInterval(autoPlay);
    autoPlay = setInterval(nextStep, 5000);
});