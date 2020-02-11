// Your code goes here

function main() {
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("mouseenter", event => {
            event.target.style.opacity = "0.5";
        });
        img.addEventListener("mouseleave", event => {
            event.target.style.opacity = "1.0";
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key == "n") {
            const pickNode = document.querySelector(".content-pick");
            const cloned = pickNode.cloneNode(true);
            document.querySelector(".container.home").appendChild(cloned);
        }
    });
}

window.onload = main;
