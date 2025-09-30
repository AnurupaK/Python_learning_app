// document.addEventListener("DOMContentLoaded", async function () {
//     document.querySelectorAll(".content").forEach(item => {
//         item.addEventListener("click", function () {
//             let file = this.getAttribute("data-file");

//             fetch(file)
//                 .then(response => {
//                     if (!response.ok) throw new Error("File not found");
//                     return response.text();
//                 })
//                 .then(data => {
//                     document.querySelector(".lesson-screen").innerHTML = data;
//                 })
//                 .catch(err => {
//                     document.querySelector(".lesson-screen").innerHTML =
//                         `<p style="color:red;">Error loading ${file}</p>`;
//                 });
//         });
//     });
// })



document.addEventListener("DOMContentLoaded", function () {
    let screen = document.querySelector('.screen');
    let contents = document.querySelectorAll(".content");

    contents.forEach(content => {
        content.addEventListener("click", async function () {
            // Load CSS
            let styleHref = this.getAttribute("style-file");
            if (styleHref && !document.querySelector(`link[href="${styleHref}"]`)) {
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = styleHref;
                document.head.appendChild(link);
            }

            // Load HTML
            let html_file = this.getAttribute("html-file");
            if (html_file) {
                try {
                    let response = await fetch(html_file);
                    let htmlContent = await response.text();
                    screen.innerHTML = htmlContent;
                } catch (err) {
                    console.error("Error loading HTML:", err);
                }
            }

            // Load JS
            let scriptFile = this.getAttribute("script-file");
            if (scriptFile && !document.querySelector(`script[src="${scriptFile}"]`)) {
                let script = document.createElement("script");
                script.src = scriptFile;
                script.type = "text/javascript";
                document.body.appendChild(script);
            }
        });
    });

});
