/*====================================
        LIGHTBOX GALLERY
====================================*/
console.log("lightbox.js loaded");
const galleryImages = document.querySelectorAll(".gallery-img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const lightboxCaption = document.getElementById("lightbox-caption");

console.log(closeBtn);
console.log(prevBtn);
console.log(nextBtn);

let currentIndex = 0;

/* Open */

function openLightbox(index) {
    currentIndex = index;

    lightboxImg.src = galleryImages[currentIndex].src;

    // Get the figcaption of the clicked image
    const caption =
        galleryImages[currentIndex]
            .closest(".gallery-item")
            .querySelector("figcaption").textContent.trim();

    lightboxCaption.textContent = caption;

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

/* Close */

function closeLightbox(){

    lightbox.classList.remove("show");

    lightboxImg.classList.remove("zoomed");

    document.body.style.overflow = "";

}

/* Next */

function nextImage(){

    lightboxImg.classList.add("lightbox-img-changing");

    setTimeout(() => {

        currentIndex++;

        if(currentIndex >= galleryImages.length){
            currentIndex = 0;
        }

        lightboxImg.src = galleryImages[currentIndex].src;

        const caption =
            galleryImages[currentIndex]
                .closest(".gallery-item")
                .querySelector("figcaption")
                .textContent.trim();

        lightboxCaption.textContent = caption;

        lightboxImg.classList.remove("lightbox-img-changing");

    }, 180);

}

/* Previous */

function prevImage(){

    lightboxImg.classList.add("lightbox-img-changing");

    setTimeout(() => {

        currentIndex--;

        if(currentIndex < 0){
            currentIndex = galleryImages.length - 1;
        }

        lightboxImg.src = galleryImages[currentIndex].src;

        const caption =
            galleryImages[currentIndex]
                .closest(".gallery-item")
                .querySelector("figcaption")
                .textContent.trim();

        lightboxCaption.textContent = caption;

        lightboxImg.classList.remove("lightbox-img-changing");

    }, 180);

}

/* Click Images */

galleryImages.forEach((img,index)=>{

    img.addEventListener("click",()=>{

       console.log("Clicked image:", index);

      console.log("Gallery Images:", galleryImages);

        openLightbox(index);

    });

});

/* Buttons */

closeBtn.addEventListener("click",closeLightbox);

nextBtn.addEventListener("click",nextImage);

prevBtn.addEventListener("click",prevImage);

/* Click Background */

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

lightboxImg.addEventListener("click",()=>{

    lightboxImg.classList.toggle("zoomed");

});

/* Keyboard */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("show")) return;

    if(e.key==="Escape") closeLightbox();

    if(e.key==="ArrowRight") nextImage();

    if(e.key==="ArrowLeft") prevImage();

});

let startX = 0;
let endX = 0;

lightbox.addEventListener("touchstart",(e)=>{

    startX = e.changedTouches[0].clientX;

});

lightbox.addEventListener("touchend",(e)=>{

    endX = e.changedTouches[0].clientX;

    if(startX - endX > 50){

        nextImage();

    }

    if(endX - startX > 50){

        prevImage();

    }

});