const hamburgerBtn = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".vert-menu");

    hamburgerBtn.addEventListener("click", function(e) {
        e.preventDefault();

        let className = hamburgerBtn.getAttribute("class");

        if (className == "hamburger") {
            hamburgerMenu.classList.add("vert-menu--open");
            hamburgerBtn.classList.add("hamburger__link--active");

                } else {
            hamburgerBtn.classList.remove("hamburger__link--active");
            hamburgerMenu.classList.remove("vert-menu--open");
        }
    });