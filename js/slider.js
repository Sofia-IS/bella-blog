const slidesBox = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const dotsBox = document.querySelector(".slider-dots");

let current = 0;          // номер текущего слайда
let autoPlay;             // таймер автопрокрутки

// Создаём точки-переключатели по количеству слайдов
slideItems.forEach(function (slide, index) {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Показать фото " + (index + 1));
    dot.addEventListener("click", function () {
        showSlide(index);
        restartAutoPlay();
    });
    dotsBox.appendChild(dot);
});

const dots = dotsBox.querySelectorAll("button");


function showSlide(index) {
    
    if (index < 0) index = slideItems.length - 1;
    if (index >= slideItems.length) index = 0;

    current = index;
    slidesBox.style.transform = "translateX(-" + current * 100 + "%)";

    dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === current);
    });
}

prevBtn.addEventListener("click", function () {
    showSlide(current - 1);
    restartAutoPlay();
});

nextBtn.addEventListener("click", function () {
    showSlide(current + 1);
    restartAutoPlay();
});

// Автопрокрутка каждые 4 секунды
function restartAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(function () {
        showSlide(current + 1);
    }, 4000);
}

showSlide(0);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    restartAutoPlay();
}
