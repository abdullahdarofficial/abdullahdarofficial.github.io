document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel"); // Select all carousels
    const fullscreen = document.createElement("div");
    fullscreen.className = "fullscreen";
    document.body.appendChild(fullscreen);

    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav-links li a");

    // Get the current URL path
    const currentPath = window.location.pathname;

    // Highlight the active link
    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

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

        // Fullscreen functionality
        const openFullscreen = (src, isVideo) => {
            fullscreen.innerHTML = isVideo
                ? `<video src="${src}" controls autoplay></video>`
                : `<img src="${src}" alt="Fullscreen Image">`;
            fullscreen.style.display = "flex";
            pauseCarousel();
        };

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


