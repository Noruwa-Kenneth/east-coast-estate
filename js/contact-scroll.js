window.addEventListener("load", () => {
    if (window.location.hash === "#contact") {

        const section = document.querySelector("#contact");

        if (!section) return;

        setTimeout(() => {

            const offset = 90; // height of sticky navbar

            const top =
                section.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({
                top,
                behavior: "smooth"
            });

        }, 100);
    }
});

// 
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearError(id) {
    document.getElementById(id).textContent = "";
}

function clearAllErrors() {

    const errors = document.querySelectorAll(".error");

    errors.forEach(error => {
        error.textContent = "";
    });

    document
        .querySelectorAll("input, textarea, select")
        .forEach(field => {
            field.classList.remove("invalid");
        });

}