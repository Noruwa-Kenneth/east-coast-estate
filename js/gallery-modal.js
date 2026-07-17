
/*======================================
        ELEMENTS
======================================*/

const modal = document.getElementById("galleryModal");

const modalGrid = document.getElementById("galleryGrid");

const modalTitle = document.getElementById("galleryTitle");

const modalCount = document.getElementById("galleryCount");

const closeModal = document.querySelector(".gallery-modal-close");


/*======================================
        OPEN MODAL
======================================*/

function openGallery(category){

    const images = galleryData[category];

    if(!images) return;

    modalGrid.innerHTML = "";

    modalTitle.textContent = category.replace(/-/g," ");

    modalCount.textContent =
        `${images.length} ${images.length===1?"Image":"Images"}`;

    images.forEach(image=>{

        const figure = document.createElement("figure");

        figure.className = "gallery-modal-item";

       figure.innerHTML = `
    <img src="${image.src}" alt="${image.title || ''}">
    ${image.title ? `<figcaption>${image.title}</figcaption>` : ""}
`;

        modalGrid.appendChild(figure);

    });

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/*======================================
        CLOSE
======================================*/

function closeGallery(){

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


/*======================================
        CLICK CAPTION
======================================*/

document.querySelectorAll(".gallery-caption").forEach(caption=>{

    caption.addEventListener("click",()=>{

        const category =
            caption.parentElement.dataset.category;

        openGallery(category);

    });

});


/*======================================
        CLOSE BUTTON
======================================*/

closeModal.addEventListener("click",closeGallery);


/*======================================
        CLICK BACKDROP
======================================*/

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        closeGallery();

    }

});


/*======================================
        ESC KEY
======================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeGallery();

    }

});