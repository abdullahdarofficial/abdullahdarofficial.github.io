// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    /* ------------------------------------------
       Navbar Functionality
    ------------------------------------------ */
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li a");

    // Function to adjust the menu visibility based on screen size
    const adjustMenu = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth > 768) {
            // Large screen: Show nav menu and hide menu button
            navMenu.classList.remove("show");
            navMenu.style.display = "flex";
            menuToggle.style.display = "none";
        } else {
            // Small screen: Hide nav menu and show menu button
            navMenu.classList.remove("show");
            navMenu.style.display = "none";
            menuToggle.style.display = "block";
        }
    };

    // Initialize menu visibility on page load
    adjustMenu();

    // Adjust menu on window resize
    window.addEventListener("resize", adjustMenu);

    // Toggle menu visibility on button click
    menuToggle.addEventListener("click", (event) => {
        navMenu.classList.toggle("show");
        navMenu.style.display = navMenu.classList.contains("show") ? "flex" : "none";
        event.stopPropagation(); // Prevent click from propagating
    });

    // Close menu when clicking outside
    document.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove("show");
            navMenu.style.display = "none";
        }
    });

    // Prevent menu close when clicking inside the menu
    navMenu.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Close menu when navigating to a new page
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove("show");
                navMenu.style.display = "none";
            }
        });
    });

    // Highlight the active navigation link based on the current URL
    const currentPath = window.location.pathname;
    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

    /* ------------------------------------------
       Carousel Functionality
    ------------------------------------------ */
    const carousels = document.querySelectorAll(".carousel");
    const fullscreen = document.createElement("div");
    fullscreen.className = "fullscreen";
    document.body.appendChild(fullscreen);

    carousels.forEach((carousel) => {
        const items = carousel.querySelectorAll(".carousel-item");
        let index = 0;
        let interval;

        // Function to move the carousel
        const moveCarousel = () => {
            if (index >= items.length) {
                index = 0;
            }
            carousel.style.transform = `translateX(-${index * 100}%)`;

            // Pause if the current item is a video
            const currentItem = items[index];
            if (currentItem.querySelector("video")) {
                clearInterval(interval);
                setTimeout(() => {
                    index++;
                    startCarousel(); // Resume after the pause
                }, 5000); // Pause for 5 seconds
            } else {
                index++;
            }
        };

        // Start the carousel
        const startCarousel = () => {
            clearInterval(interval);
            interval = setInterval(moveCarousel, 7000); // Move every 7 seconds
        };

        // Pause the carousel
        const pauseCarousel = () => {
            clearInterval(interval);
        };

        // Add hover event to pause and resume
        carousel.addEventListener("mouseenter", pauseCarousel);
        carousel.addEventListener("mouseleave", startCarousel);

        // Fullscreen functionality for carousel items
        const openFullscreen = (src, isVideo) => {
            fullscreen.innerHTML = isVideo
                ? `<video src="${src}" controls autoplay></video>`
                : `<img src="${src}" alt="Fullscreen Image">`;
            fullscreen.style.display = "flex";
            pauseCarousel();
        };

        // Close fullscreen on click
        fullscreen.addEventListener("click", () => {
            fullscreen.style.display = "none";
            startCarousel();
        });

        // Add click event to carousel items
        items.forEach((item) => {
            const img = item.querySelector("img");
            const vid = item.querySelector("video");

            if (img) {
                img.addEventListener("click", () => openFullscreen(img.src, false));
            }

            if (vid) {
                vid.addEventListener("click", (e) => {
                    e.stopPropagation();
                    openFullscreen(vid.src, true);
                });
            }
        });

        // Start carousel for this instance
        startCarousel();
    });
});