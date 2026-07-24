const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const originalButtonHTML = submitBtn.innerHTML;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    service: form.service.value,
    message: form.message.value.trim(),
  };

  try {
    submitBtn.disabled = true;

    submitBtn.innerHTML = `
        <i class="ri-loader-4-line"></i> Sending...
    `;
    const API_URL =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "https://east-coast-estate.onrender.com";

    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      showToast(data.message, "success");

      form.reset();
    } else {
      showToast(data.message, "error");
    }
  } catch (error) {
    console.error(error);

    showToast("Unable to send your message. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message";
    submitBtn.innerHTML = originalButtonHTML;
  }
});
