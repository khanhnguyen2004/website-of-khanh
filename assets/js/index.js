const listBanner = document.querySelector('.list-banner');
let banner = document.querySelectorAll('.banner');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const firstClone = banner[0].cloneNode(true);
listBanner.appendChild(firstClone);
const lastClone = banner[banner.length - 1].cloneNode(true);
listBanner.insertBefore(lastClone, banner[0]);
banner = document.querySelectorAll('.banner');
let current = 1;
let width = banner[0].offsetWidth;
listBanner.style.transform = `translateX(${-width * current}px)`;
const dot = document.querySelectorAll('.index-item');
dot[0].classList.add('active');
function updateDot() {
    document.querySelector('.active').classList.remove('active');
    let dotIndex = current - 1;
    if (current == 0) {
        dotIndex = dot.length - 1;
    }
    if (current == banner.length - 1) {
        dotIndex = 0;
    }
    dot[dotIndex].classList.add('active');
}
function handleChangeSlide() {
    if (current == banner.length - 1) {
        setTimeout(() => {
            width = banner[0].offsetWidth;
            listBanner.style.transition = 'none';
            current = 1;
            listBanner.style.transform = `translateX(${-width * current}px)`;
            updateDot();
        }, 20);
    }
    else {
        current++;
        width = banner[0].offsetWidth;
        listBanner.style.transition = "transform 0.5s ease";
        listBanner.style.transform = `translateX(${-width * current}px)`;
        updateDot();
    }
}
let handleEventChangeSlide = setInterval(handleChangeSlide, 4000);
btnRight.addEventListener("click", () => {
    clearInterval(handleEventChangeSlide);
    handleChangeSlide();
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000);
});
btnLeft.addEventListener("click", () => {
    clearInterval(handleEventChangeSlide);
    if (current == 0) {
        setTimeout(() => {
            width = banner[0].offsetWidth;
            listBanner.style.transition = 'none';
            current = banner.length - 2;
            listBanner.style.transform = `translateX(${-width * current}px)`;
            updateDot();
        }, 20);
    }
    else {
        current--;
        width = banner[0].offsetWidth;
        listBanner.style.transition = "transform 0.5s ease";
        listBanner.style.transform = `translateX(${-width * current}px)`;
        updateDot();
    }
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000);
});
window.addEventListener("resize", () => {
    width = banner[0].offsetWidth;
    listBanner.style.transition = "none"; // bỏ hiệu ứng để không bị giật
    listBanner.style.transform = `translateX(${-width * current}px)`;
});
// slide show 2
const listReview = document.querySelector('.list-review');
let reviewCard = document.querySelectorAll('.review-card');
const btnLefts = document.querySelector('.btn-left');
const btnRights = document.querySelector('.btn-right');
// const firstClones=reviewCard[0].cloneNode(true);
// listReview.appendChild(firstClones);
// const lastClones=reviewCard[reviewCard.length-1].cloneNode(true);
// listReview.insertBefore(lastClones, reviewCard[0]);
// reviewCard=document.querySelectorAll('.review-card');
let currents = 0;
let widths = reviewCard[0].offsetWidth;
listReview.style.transform = `translateX(${-width * currents}px)`;
btnRights.addEventListener("click", () => {
    if (currents == reviewCard.length - 1) {
        currents = 0;
        listReview.style.transform="transform 0.5s ease";
        listReview.style.transform = `translateX(${-width * currents}px)`;
    }
    else {
        currents++;
        listReview.style.transform="transform 0.5s ease";
        listReview.style.transform = `translateX(${-width * currents}px)`;
    }
})