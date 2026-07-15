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