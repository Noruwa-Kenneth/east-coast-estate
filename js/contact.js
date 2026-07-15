const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        service: form.service.value,
        message: form.message.value
    };

    try {

        const response = await fetch("http://localhost:5000/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)

        });

        const data = await response.json();

        alert(data.message);

        form.reset();

    } catch (error) {

        alert("Unable to send message.");

    }

});