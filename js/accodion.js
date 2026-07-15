const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        // Close all others
        faqItems.forEach(faq => {
            if(faq !== item){
                faq.classList.remove("active");
            }
        });

        // Toggle current
        item.classList.toggle("active");

    });

});