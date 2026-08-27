/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */

const navbar = document.querySelector(".navbar");

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleNavbarScroll);

handleNavbarScroll();


/* ========================================
   MOBILE MENU
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


/* ========================================
   CLOSE MOBILE MENU
======================================== */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


/* ========================================
   SCROLL REVEAL ANIMATION
======================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ========================================
   ACTIVE NAVBAR LINK
======================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* ========================================
   SMOOTH SCROLL
======================================== */

navLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId.startsWith("#")) return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ========================================
   BUTTON SMOOTH SCROLL
======================================== */

const scrollButtons = document.querySelectorAll(
    ".btn[href^='#']"
);

scrollButtons.forEach(button => {

    button.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ========================================
   ESC KEY CLOSE MOBILE MENU
======================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        navMenu.classList.remove("active");
    }

});


/* ========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
======================================== */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedToggle
    ) {
        navMenu.classList.remove("active");
    }

});