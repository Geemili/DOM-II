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
        }
    });

    document.querySelector(".intro h2").addEventListener("wheel", event => {
        event.preventDefault();
        const fontSizeStr = window.getComputedStyle(event.target).fontSize;
        const fontSize = parseFloat(fontSizeStr);
        event.target.style.fontSize = (fontSize - event.deltaY).toString() + "px";
    });
}

let nextDestId = 0;
function setupDestinationEl(el) {
    el.setAttribute("draggable", true);
    const uniqClass = `${el.parentElement.id}-dest-${nextDestId++}`;
    el.classList.add(uniqClass);
    el.addEventListener("dragstart", ev => {
        const uniqRef = `.${uniqClass}`;
        ev.dataTransfer.setData("application/fun-bus", uniqRef);
        ev.dataTransfer.dropEffect = "move";
    });
}

let contentPickNextId = 0;

function setupContentPickEl(contentPick) {
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
        console.log(draggedElRef);
        const draggedEl = document.querySelector(draggedElRef);
        ev.target.appendChild(draggedEl);
    });

}

window.onload = main;
