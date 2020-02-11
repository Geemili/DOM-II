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

    document.querySelectorAll(".content-pick .destination").forEach(el => {
        el.setAttribute("draggable", true);
        el.addEventListener("dragstart", ev => {
            ev.dataTransfer.setData("application/fun-bus", ev.target.id);
            console.log(ev.target.id);
            ev.dataTransfer.dropEffect = "move";
        });
    });

    document.querySelector(".intro h2").addEventListener("wheel", event => {
        event.preventDefault();
        const fontSizeStr = window.getComputedStyle(event.target).fontSize;
        const fontSize = parseFloat(fontSizeStr);
        event.target.style.fontSize = (fontSize - event.deltaY).toString() + "px";
    });
}

window.onload = main;
