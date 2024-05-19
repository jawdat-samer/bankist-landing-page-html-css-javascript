'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
    btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// btn Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    // console.log(s1coords);

    // console.log(e.target.getBoundingClientRect());

    // console.log('Current Scroll (x/y)', window.pageXOffset, window.pageYOffset);
    // console.log('New Current Scroll (x/y)', window.scrollX, window.scrollY);
    // console.log(
    //     'height/width viewport',
    //     document.documentElement.clientHeight,
    //     document.documentElement.clientWidth
    // );

    // scrolling
    // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

    // window.scrollTo({
    //     left: s1coords.left + window.screenX,
    //     top: s1coords.top + window.scrollY,
    //     behavior: 'smooth',
    // });

    section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//     el.addEventListener('click', function (e) {
//         e.preventDefault();
//         const sectionID = this.getAttribute('href');
//         document.querySelector(sectionID)?.scrollIntoView({ behavior: 'smooth' });
//     });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
    // const clicked =
    //     e.target.classList.contains('operations__tab') ||
    //     e.target.parentElement.classList.contains('operations__tab');
    const clicked = e.target.closest('.operations__tab');

    // Guard Clause
    if (!clicked) return;

    tabs.forEach(function (tab) {
        tab.classList.remove('operations__tab--active');
    });
    clicked.classList.add('operations__tab--active');

    tabsContent.forEach(function (tab) {
        tab.classList.remove('operations__content--active');
    });
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

// Menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e, hov) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(function (el) {
            if (el !== link) {
                el.style.opacity = hov ? 0.5 : 1;
            }
        });

        logo.style.opacity = hov ? 0.5 : 1;
    }
};

nav.addEventListener('mouseover', function (e) {
    handleHover(e, true);
});

nav.addEventListener('mouseout', function (e) {
    handleHover(e, false);
});

// Sticky navigation
// window.addEventListener('scroll', function (e) {
//     const initCoords = section1.getBoundingClientRect();

//     if (window.scrollY > initCoords.top) {
//         nav.classList.add('sticky');
//     } else {
//         nav.classList.remove('sticky');
//     }
// });

// Sticky navigation: Intersection Observer API

// const observer = new IntersectionObserver(
//     function (entries, observer) {
//         entries.forEach(function (entry) {
//             console.log(entry);
//         });
//     },
//     {
//         root: null,
//         threshold: [0, 0.2],
//     }
// );
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                nav.classList.add('sticky');
            } else {
                nav.classList.remove('sticky');
            }
        });
    },
    {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`,
    }
);
headerObserver.observe(header);

// Reveal sections
const allSection = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(
    function (entries, observer) {
        const [entry] = entries;

        if (entry.isIntersecting) {
            entry.target.classList.remove('section--hidden');
            observer.unobserve(entry.target);
        }
    },
    {
        root: null,
        threshold: 0.15,
    }
);
allSection.forEach(function (section) {
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver(
    function (entries, observer) {
        const [entry] = entries;
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;

            entry.target.addEventListener('load', function () {
                entry.target.classList.remove('lazy-img');
            });
            observer.unobserve(entry.target);
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: '200px',
    }
);
imgTargets.forEach(function (img) {
    imgObserver.observe(img);
});

// Slider
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length - 1;

    // slides.forEach(function (slide, index) {
    //     slide.style.transform = `translateX(${100 * index}%)`;
    // });

    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };
    createDots();

    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(function (dot) {
            dot.classList.remove('dots__dot--active');
        });

        // console.log(document.querySelector(`.dots__dot[data-slide="${slide}"]`));
        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(function (s, index) {
            s.style.transform = `translateX(${100 * (index - slide)}%)`;
        });

        activateDot(slide);
    };
    goToSlide(0);

    const nextSlide = function () {
        if (curSlide === maxSlide) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide;
        } else {
            curSlide--;
        }

        goToSlide(curSlide);
    };

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    setInterval(function () {
        nextSlide();
    }, 5000);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        }
        if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const slide = e.target.dataset.slide;
            goToSlide(slide);
        }
    });
};
slider();
