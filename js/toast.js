const toastContainer = document.createElement("div");
toastContainer.id = "toast-container";
document.body.appendChild(toastContainer);

function showToast(message, type = "success") {
    const icons = {
        success: "ri-checkbox-circle-fill",
        error: "ri-close-circle-fill",
        warning: "ri-error-warning-fill",
        info: "ri-information-fill"
    };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <i class="${icons[type]}"></i>
        <div class="toast-message">${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "toastOut .35s forwards";

        setTimeout(() => {
            toast.remove();
        }, 350);
    }, 4000);
}