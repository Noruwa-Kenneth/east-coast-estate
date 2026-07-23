//script.js
(function () {
  emailjs.init("YNGZBdNTHBeyxjMN0"); //replace with your email public key
})();
const submitBtn = document.querySelector(".send-btn");
//Attach event listener to the form
window.onload = function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); //prevent page reload

    //collect form data
    const templateParams = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      service: document.getElementById("service").value,
      message: document.getElementById("message").value,
    };

    //send Email using EmailJS
    submitBtn.disabled = true;

    submitBtn.innerHTML = `
    Sending Message
    <i class="fa-solid fa-spinner fa-spin"></i>
`;
    emailjs.send("service_vet6ant", "template_egca5ob", templateParams).then(
      function (response) {
        showToast("Message sent successfully!", "success");

        form.reset();

        submitBtn.disabled = false;

        submitBtn.innerHTML = `
    Send Message
    <i class="fa-solid fa-paper-plane"></i>
`;
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        showToast("Failed to send message. Please try again.", "error");

        submitBtn.disabled = false;

        submitBtn.innerHTML = `
    Send Message
    <i class="fa-solid fa-paper-plane"></i>
`;
        console.error("FAILED...", error);
      },
    );
  });
};
