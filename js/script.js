/* ==========================================
   EAST COAST ESTATES & STAGING
   Main JavaScript
========================================== */

// ===============================
// Mobile Navigation
// ===============================

function initializeNavbar() {

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

}

// ===============================
// Sticky Navbar Shadow
// ===============================

function initializeStickyNavbar() {

    const navbar = document.querySelector(".header");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,.12)";
        } else {
            navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,.06)";
        }

    });

}

// ===============================
// Smooth Scrolling
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ===============================
// Reveal Elements on Scroll
// ===============================

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// ===============================
// Hero Button Hover Effect
// ===============================

const buttons = document.querySelectorAll(".primary-btn, .secondary-btn");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-3px) scale(1.03)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0) scale(1)";

    });

});

// ===============================
// Current Year in Footer
// ===============================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

function initializeStickyNavbar() {

    const header = document.getElementById("header");

    if (!header) return;

    function updateSticky() {
        if (window.scrollY > 40) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    updateSticky(); // Apply immediately

    window.addEventListener("scroll", updateSticky);

}

