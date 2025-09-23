const listBanner = document.querySelector('.list-banner');
let banner = document.querySelectorAll('.banner');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
let current = 0;
let width = banner[0].offsetWidth;
listBanner.style.transform = `translateX(${-width * current}px)`;
function handleChangeSlide() {
    if (current == banner.length - 1) {
        current = 0;
        listBanner.style.transform = `translateX(0px)`;
        document.querySelector('.active').classList.remove('active');
        document.querySelector('.index-item-' + current).classList.add('active');
    }
    else {
        current++;
        width = banner[0].offsetWidth;
        listBanner.style.transform = `translateX(${-width * current}px)`;
        document.querySelector('.active').classList.remove('active');
        document.querySelector('.index-item-' + current).classList.add('active');
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
        current = banner.length - 1;
        let width = banner[0].offsetWidth;
        listBanner.style.transform = `translateX(${-width * current}px)`;
        document.querySelector('.active').classList.remove('active');
        document.querySelector('.index-item-' + current).classList.add('active');
    }
    else {
        current--;
        let width = banner[0].offsetWidth;
        listBanner.style.transform = `translateX(${-width * current}px)`;
        document.querySelector('.active').classList.remove('active');
        document.querySelector('.index-item-' + current).classList.add('active');
    }
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000);
});