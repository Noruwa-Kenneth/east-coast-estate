async function loadComponent(id, file) {

    const response = await fetch(file);

    if (!response.ok) return;

    document.getElementById(id).innerHTML = await response.text();

    if (id === "navbar") {
        initializeNavbar();
        initializeStickyNavbar();
    }

}

loadComponent("navbar", "navbar.html");
loadComponent("footer", "footer.html");


// 
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    // Prevent multiple animations at once
    if (counter.classList.contains("counting")) return;

    counter.classList.add("counting");

    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";

    let current = 0;
    const duration = 3000;
    const increment = target / (duration / 16);

    function updateCounter() {

        current += increment;

        if (current >= target) {

            counter.textContent = target + suffix;
            counter.classList.remove("counting");

        } else {

            counter.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);

        }

    }

    updateCounter();

}

/* Scroll Animation */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            animateCounter(entry.target);

        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {

    observer.observe(counter);

    // Replay on hover (desktop)
    counter.parentElement.addEventListener("mouseenter", () => {

        animateCounter(counter);

    });

});

// timeline

const steps = document.querySelectorAll(".process-step");
const arrows = document.querySelectorAll(".process-arrow");

steps.forEach((step, index) => {

    step.addEventListener("mouseenter", () => {

        arrows.forEach(arrow => arrow.classList.remove("active"));

        for(let i = 0; i < index; i++){
            arrows[i].classList.add("active");
        }

    });

});