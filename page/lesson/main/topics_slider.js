let screen = document.querySelector('.screen')
let topics = document.querySelectorAll('.topic');

document.addEventListener("click", function (e) {
    if (e.target.id === "bookmark") {
        let screen = document.querySelector(".screen");
        screen.classList.toggle("active");
        
        // Toggle arrow
        if (e.target.textContent === "➾") {
            e.target.textContent = "⇦";
        } else {
            e.target.textContent = "➾";
        }
    }
});




topics.forEach(topic => {
    topic.addEventListener("click", async function () {
        // Load CSS
        let styleHref = this.getAttribute("style-file");
        if (styleHref && !document.querySelector(`link[href="${styleHref}"]`)) {
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = styleHref;
            document.head.appendChild(link);
        }

        // Get or create lesson-screen
        let lesson_screen = screen.querySelector(".lesson-screen");
        if (!lesson_screen) {
            lesson_screen = document.createElement("div");
            lesson_screen.className = "lesson-screen";
            screen.appendChild(lesson_screen);
        }

        // Load HTML
        let html_file = this.getAttribute("html-file");
        if (html_file) {
            try {
                let response = await fetch(html_file);
                let htmlContent = await response.text();
                lesson_screen.innerHTML = htmlContent; // now it always exists
            } catch (err) {
                console.error("Error loading HTML:", err);
            }
        }
    });
});
