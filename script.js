const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const steps = document.querySelectorAll(".process-step");

let currentStep = 1;

// Update UI
function updateProgress() {

    steps.forEach((step, index) => {

        if (index < currentStep) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }

    });

    // Update progress line
    const progressWidth =
        ((currentStep - 1) / (steps.length - 1)) * 100;

    progress.style.width = progressWidth + "%";

    // Enable/Disable buttons
    prev.disabled = currentStep === 1;
    next.disabled = currentStep === steps.length;
}

// Next button
next.addEventListener("click", () => {

    if (currentStep < steps.length) {
        currentStep++;
        updateProgress();
    }

});

// Previous button
prev.addEventListener("click", () => {

    if (currentStep > 1) {
        currentStep--;
        updateProgress();
    }

});

// Initial state
updateProgress();