// Your code goes here

let contentPickNextId = 0;

function main() {
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("mouseenter", event => {
            event.target.style.opacity = "0.5";
        });
        img.addEventListener("mouseleave", event => {
            event.target.style.opacity = "1.0";
        });
    });

    // Set up content pick as a drop target
    const contentPick = document.querySelector(".content-pick");
    contentPick.id = "content-pick-" + contentPickNextId++;
    contentPick.addEventListener("dragover", ev => {
        if (ev.currentTarget != ev.target) return;
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
        ev.target.style.backgroundColor = "red";
    });
    contentPick.addEventListener("dragleave", ev => {
        if (ev.currentTarget != ev.target) return;
        ev.target.style.removeProperty("background-color");
    });
    contentPick.addEventListener("drop", ev => {
        if (ev.currentTarget != ev.target) return;
        ev.target.style.removeProperty("background-color");

        const draggedElRef = ev.dataTransfer.getData("application/fun-bus");
        const draggedEl = document.querySelector(draggedElRef);
        ev.target.appendChild(draggedEl);
    });

    // Clone content pick!
    document.addEventListener("keydown", event => {
        if (event.key == "n") {
            const pickNode = document.querySelector(".content-pick");
            const cloned = pickNode.cloneNode(true);
            cloned.id = "content-pick-" + contentPickNextId++;
            document.querySelector(".container.home").appendChild(cloned);
        }
    });

    // Set up destinations as draggable
    let nextDestId = 0;
    document.querySelectorAll(".content-pick .destination").forEach(el => {
        el.setAttribute("draggable", true);
        const uniqClass = `${el.parentElement.id}-dest-${nextDestId++}`;
        el.classList.add(uniqClass);
        el.addEventListener("dragstart", ev => {
            const uniqRef = `.${uniqClass}`;
            ev.dataTransfer.setData("application/fun-bus", uniqRef);
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
