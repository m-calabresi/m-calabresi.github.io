(function () {
    window.onload = checkMobileBehavior;
    window.onresize = checkMobileBehavior;

    /**
     * Enables the mobile/desktop behavior depending on screen size.
     */
    function checkMobileBehavior() {
        let isMobile = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--is-mobile"));
        let navItems = document.querySelectorAll(".nav-item");

        document.querySelector(".nav-mobile-toggle").onclick = mobileToggleClick;
        window.onscroll = scrollFunction;

        if (isMobile) {
            document.querySelector(".nav-mobile-items").append(...navItems);
        } else {
            let navItemsContainer = document.querySelector(".nav-items");
            if (navItemsContainer.childElementCount === 2) {
                navItemsContainer.append(...navItems);
            }
        }
    }

    /**
     * On mobile-toggle click, show menu (if on top of the page),
     * or nothing (if not at the top)
     */
    function mobileToggleClick() {
        document.querySelector(".nav-mobile-items").classList.toggle("visible");
        document.querySelector(".nav-mobile-toggle").classList.toggle("active");
    }

    /**
     * When the user scrolls down from the top of the document:
     * - resize the navbar's padding and the logo's font size
     */
    function scrollFunction() {
        document.querySelector(".nav-logo img").classList.toggle("shrink", isPageScrolled());
    }

    /**
     * Whether or not the visible portion of the screen is far
     * from the top part of the page.
     */
    function isPageScrolled() {
        return document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;
    }
})();
