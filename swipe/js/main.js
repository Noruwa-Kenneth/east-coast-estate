let swiperTestimonial;

function initTestimonialSwiper(reviewCount) {
  if (swiperTestimonial) {
    swiperTestimonial.destroy(true, true);
  }

      // Hide controls if only one review
    const prevBtn = document.querySelector(".swiper-button-prev");
    const nextBtn = document.querySelector(".swiper-button-next");
    const pagination = document.querySelector(".swiper-pagination");

    if (reviewCount <= 1) {

        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        pagination.style.display = "none";

    } else {

        prevBtn.style.display = "";
        nextBtn.style.display = "";
        pagination.style.display = "";

    }


  swiperTestimonial = new Swiper(".testimonial__swiper", {

    loop: reviewCount >= 3,

    autoplay: reviewCount >= 3 ? {
        delay: 3000,
        disableOnInteraction: false,
    } : false,

    navigation: reviewCount > 1 ? {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    } : false,

    pagination: reviewCount > 1 ? {
        el: ".swiper-pagination",
        clickable: true,
    } : false,

    slidesPerView: "auto",

    centeredSlides: true,

    spaceBetween: 16,

    grabCursor: true,

    speed: 600,

});
}
