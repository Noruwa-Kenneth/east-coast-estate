//script.js
(function() {
emailjs.init("YNGZBdNTHBeyxjMN0"); //replace with your email public key
})();

//Attach event listener to the form
window.onload = function() {
const form = document.querySelector("contact-form");
 if (!form) return;

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
