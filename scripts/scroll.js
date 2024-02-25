let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Faites défiler vers le bas
        document.getElementById("header").style.position = "unset";
    } else {
        // Faites défiler vers le haut
        document.getElementById("header").style.position = "sticky";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);
