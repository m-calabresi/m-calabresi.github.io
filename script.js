(function () {
    window.onload = function () {
        document.querySelector(".nav-mobile-toggle").onclick = mobileToggleClick;
        checkLayoutBehavior();
        hideLoadScreen();
    }
    window.onresize = checkLayoutBehavior;
    window.onscroll = scrollFunction;

    /**
     * Waits for an extra "loadExtraDuration" ms, then starts the fade animation that will last for "loadFadeDuration".
     * After that, remove the load screen from the DOM.
     */
    function hideLoadScreen() {
        const loadExtraDuration = getCssProperty("--load-duration");
        const loadFadeDuration = getCssProperty("--load-fade-duration");
        let loadScreen = document.querySelector(".load-screen");
        setTimeout(() => {
            loadScreen.style.opacity = 0;
            setTimeout(() => {
                loadScreen.remove();
            }, loadFadeDuration);
        }, loadExtraDuration);
    }

    /**
     * Enables the mobile/desktop layout behavior depending on screen size.
     */
    function checkLayoutBehavior() {
        const isMobile = getCssProperty("--is-mobile", false);
        let navItems = document.querySelectorAll(".nav-item");

        if (isMobile) {
            let navItemsContainer = document.querySelector(".nav-mobile-items");
            if (navItemsContainer.childElementCount === 0) {
                navItemsContainer.append(...navItems);
            }
        } else {
            document.querySelector(".nav-items").append(...navItems);
        }
        updateTabIndexBehavior();
    }

    /**
     * On mobile-toggle click, show menu (if on top of the page), or nothing (if not at the top).
     */
    function mobileToggleClick() {
        document.querySelector(".nav-mobile-items").classList.toggle("visible");
        document.querySelector(".nav-mobile-toggle").classList.toggle("active");
        updateTabIndexBehavior();
    }

    /**
     * On mobile, set tabindex=0 when menu is expanded (allowing tab navigation). Set tabindex=-1 when
     * collapsed to prevent navigtion on hidden menu items.
     */
    function updateTabIndexBehavior() {
        document.querySelectorAll(".nav-mobile-items .nav-item").forEach(item => item.setAttribute("tabindex", "-1"));
        document.querySelectorAll(".nav-mobile-items.visible .nav-item").forEach(item => item.setAttribute("tabindex", "0"));
        document.querySelectorAll(".nav-items .nav-item").forEach(item => item.setAttribute("tabindex", "0"));
    }

    /**
     * When the user scrolls down from the top of the document:
     * - resize the navbar's padding and the logo's font size
     */
    function scrollFunction() {
        document.querySelector(".nav-logo img").classList.toggle("shrink", isPageScrolled());
    }

    /**
     * Whether or not the visible portion of the screen is far from the top part of the page.
     * 
     * @returns true if the visible portion of the screen is far from the top part of the page, false otherwise.
     */
    function isPageScrolled() {
        return document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;
    }

    /**
     * Returns the CSS property associated to the given propertyName.
     * Optionally it can remove the measurement unit for correct parting.
     * 
     * @param {string} propertyName the name of the property to be returned.
     * @param {boolean} removeUnit true if the property needs the measurement unit to be removed, false otherwise.
     * @returns the CSS property as an integer value.
     */
    function getCssProperty(propertyName, removeUnit = true) {
        let property = getComputedStyle(document.documentElement).getPropertyValue(propertyName);
        property = removeUnit ? property.substring(0, 4) : property;
        return parseInt(property, 10);
    }
})();
