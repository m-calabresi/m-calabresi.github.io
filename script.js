(function () {
    window.onload = checkMobileBehavior;
    window.onresize = checkMobileBehavior;

    let showMenu = false;

    /**
     * Enables the mobile/desktop behavior depending on screen size.
     */
    function checkMobileBehavior() {
        let isMobile = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--is-mobile"));
        let mobileToggle = document.querySelector(".nav-mobile-toggle");
        let navItems = document.querySelectorAll(".nav-item");

        if (isMobile) {
            mobileToggle.onclick = toggleClick;
            window.onscroll = mobileScrollFunction;
            
            document.querySelector(".nav-mobile-items").append(...navItems);
        } else {
            mobileToggle.onclick = null;
            window.onscroll = desktopScrollFunction;

            let navItemsContainer = document.querySelector(".nav-items");
            if (navItemsContainer.childElementCount === 1) {
                navItemsContainer.append(...navItems);
            }
        }
    }

    /**
     * On mobile-toggle click, show menu (if on top of the page),
     * or nothing (if not at the top)
     */
    function toggleClick() {
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (isPageScrolled()) {
            showMenu = true;
        } else {
            document.querySelector(".nav-mobile-items").classList.toggle("visible");
        }
    }

    /**
     * When the user scrolls down from the top of the document:
     *  - resize the navbar's padding and the logo's font size
     *  - collapse hamburger menu (if expanded)
     *  - scroll to top and expand hamburger menu (if user clicked on it and he is not at the page top)
     */
    function mobileScrollFunction() {
        let navLogoImg = document.querySelector(".nav-logo img");
        let navItems = document.querySelector(".nav-mobile-items");

        if (isPageScrolled()) {
            navLogoImg.classList.add("shrink");

            if (!showMenu) {
                navItems.classList.remove("visible");
            }
        } else {
            navLogoImg.classList.remove("shrink");

            if (showMenu) {
                showMenu = false;
                navItems.classList.add("visible");
            }
        }
    }

    /**
     * When the user scrolls down from the top of the document:
     * - resize the navbar's padding and the logo's font size
     */
    function desktopScrollFunction() {
        let logoImg = document.querySelector(".nav-logo img");
        isPageScrolled() ? logoImg.classList.add("shrink") : logoImg.classList.remove("shrink")
    }

    /**
     * Whether or not the visible portion of the screen is far from the top part of the page.
     */
    function isPageScrolled() {
        return document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;
    }
})();
