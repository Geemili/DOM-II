
function main() {
    const mainContainer = document.querySelector(".blocks");
    mainContainer.addEventListener("click", ev => {
        if (ev.target.classList.contains("block")) {
            ev.target.remove();
            mainContainer.prepend(ev.target);
        }
    });
}

window.onload = main;
