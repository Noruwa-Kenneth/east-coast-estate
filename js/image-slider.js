const compare = document.getElementById("beforeAfter");

const after = compare.querySelector(".after-wrapper");

const line = compare.querySelector(".slider-line");

let dragging = false;

function updateSlider(x){

    const rect = compare.getBoundingClientRect();

    let position = x - rect.left;

    if(position < 0) position = 0;

    if(position > rect.width) position = rect.width;

    after.style.width = position + "px";

    line.style.left = position + "px";

}

compare.addEventListener("pointerdown",(e)=>{

    dragging = true;

    updateSlider(e.clientX);

});

window.addEventListener("pointermove",(e)=>{

    if(!dragging) return;

    updateSlider(e.clientX);

});

window.addEventListener("pointerup",()=>{

    dragging = false;

});