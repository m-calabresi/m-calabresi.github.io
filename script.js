(function () {
    window.onload = checkMobileBehavior;
    window.onresize = checkMobileBehavior;

    let showMenu = false;

    /**
     * Enables the mobile/desktop behavior depending on screen size.
     */
    function checkMobileBehavior() {
        let isMobile = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--is-mobile"));

        if (isMobile) {
            document.querySelector("nav .nav-collapse").onclick = hamburgerClick;
            window.onscroll = mobileScrollFunction;
        } else {
            document.querySelector("nav .nav-collapse").onclick = null;
            window.onscroll = desktopScrollFunction;
        }
    }

    /**
     * On hamburger-menu click, show menu (if on top of the page),
     * or nothing (if not at the top)
     */
    function hamburgerClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (isPageScrolled()) {
            showMenu = true;
        } else {
            toggleMenu();
        }
    }

    /**
     * When the user scrolls down from the top of the document:
     *  - resize the navbar's padding and the logo's font size
     *  - collapse hamburger menu (if expanded)
     *  - scroll to top and expand hamburger menu (if user clicked on it and he is not at the page top)
     */
    function mobileScrollFunction() {
        if (isPageScrolled()) {
            document.querySelector(".nav-logo img").classList.add("shrink");

            if (!showMenu) {
                collapseMenu();
            }
        } else {
            document.querySelector(".nav-logo img").classList.remove("shrink");

            if (showMenu) {
                showMenu = false;
                expandMenu();
            }
        }
    }

    /**
     * When the user scrolls down from the top of the document:
     * - resize the navbar's padding and the logo's font size
     */
    function desktopScrollFunction() {
        if (isPageScrolled()) {
            document.querySelector(".nav-logo img").classList.add("shrink");
        } else {
            document.querySelector(".nav-logo img").classList.remove("shrink");
        }
    }

    /**
     * Whether or not the visible portion of the screen is far from the top part of the page.
     */
    function isPageScrolled() {
        return document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;
    }

    /**
     * Expands the hamburger menu.
     */
    function expandMenu() {
        document.querySelector(".nav-collapse-items").classList.add("visible");
    }

    /**
     * Collapses the hamburger menu.
     */
    function collapseMenu() {
        document.querySelector(".nav-collapse-items").classList.remove("visible");
    }

    /**
     * Toggles the hamburger menu.
     */
    function toggleMenu() {
        let menu = document.querySelector(".nav-collapse-items");

        if (menu.classList.contains("visible")) {
            menu.classList.remove("visible");
        } else {
            menu.classList.add("visible");
        }
    }
})();
