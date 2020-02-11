// Your code goes here

let shouldWiggle = false;

function main() {
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("mouseenter", event => {
            event.target.style.opacity = "0.5";
        });
        img.addEventListener("mouseleave", event => {
            event.target.style.opacity = "1.0";
        });
    });

    document.querySelectorAll(".nav-link").forEach(el => {
        el.addEventListener("click", ev => ev.preventDefault());
    });

    // Set up content pick as a drop target
    setupContentPickEl(document.querySelector(".content-pick"));

    // Set up destinations as draggable
    document.querySelectorAll(".content-pick .destination").forEach(setupDestinationEl);

    // Clone content pick!
    document.addEventListener("keydown", event => {
        if (event.key == "n") {
            const pickNode = document.querySelector(".content-pick");
            const cloned = pickNode.cloneNode(true);

            setupContentPickEl(cloned);
            Array.from(cloned.children).forEach(setupDestinationEl);

            document.querySelector(".container.home").appendChild(cloned);
        } else if (event.key == "w") {
            shouldWiggle = !shouldWiggle;
        }
    });

    document.querySelector(".intro h2").addEventListener("wheel", event => {
        event.preventDefault();
        const fontSizeStr = window.getComputedStyle(event.target).fontSize;
        const fontSize = parseFloat(fontSizeStr);
        event.target.style.fontSize = (fontSize - event.deltaY).toString() + "px";
    });

    // Make everything wiggle underneath the mouse
    document.querySelector("body").addEventListener("mousemove", event => {
        if (shouldWiggle) {
            const x = Math.floor(Math.random() * 3);
            const y = Math.floor(Math.random() * 3);
            event.target.style.left = `${x}px`;
            event.target.style.top = `${y}px`;
            event.target.style.position = `relative`;
        }
    });
}

let nextDestId = 0;
function setupDestinationEl(el) {
    el.setAttribute("draggable", true);
    el.id = `dest-${nextDestId++}`;
    el.addEventListener("dragstart", ev => {
        ev.dataTransfer.setData("application/fun-bus", ev.target.id);
        ev.dataTransfer.dropEffect = "move";
    });

    el.addEventListener("dblclick", ev => {
        el.remove();
        ev.stopPropagation();
    });
}


function setupContentPickEl(contentPick) {
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

        const draggedElId = ev.dataTransfer.getData("application/fun-bus");
        const draggedEl = document.getElementById(draggedElId);
        ev.target.appendChild(draggedEl);
    });

    contentPick.addEventListener("dblclick", ev => {
        const newDestination = document.createElement("div");

        const newH4 = document.createElement("h4");
        newH4.textContent = "Destination Paradise";
        newDestination.appendChild(newH4);

        setupDestinationEl(newDestination);
        contentPick.appendChild(newDestination);
    });
}

window.onload = main;
