(function () {
    window.onload = function () {
        document.querySelector(".nav-mobile-toggle").onclick = mobileToggleClick;
        checkLayoutBehavior();
    }
    window.onresize = checkLayoutBehavior;
    window.onscroll = scrollFunction;

    /**
     * Enables the mobile/desktop layout behavior depending on screen size.
     */
    function checkLayoutBehavior() {
        const isMobile = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--is-mobile"));
        let navItems = document.querySelectorAll(".nav-item");

        if (isMobile) {
            let navItemsContainer = document.querySelector(".nav-mobile-items");
            if (navItemsContainer.childElementCount === 0) {
                navItemsContainer.append(...navItems);
            }
        } else {
            document.querySelector(".nav-items").append(...navItems);
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
