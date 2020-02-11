
function main() {
    const mainContainer = document.querySelector(".blocks");

    mainContainer.addEventListener("click", ev => {
        if (ev.target.classList.contains("block")) {
            ev.target.remove();
            mainContainer.prepend(ev.target);
        }
    });

    let mouseDownTimer = undefined;
    mainContainer.addEventListener("mousedown", ev => {
        if (ev.target.classList.contains("block")) {
            mouseDownTimer = setInterval(() => {
                const curMargin = parseInt(window.getComputedStyle(ev.target).marginLeft);
                ev.target.style.marginLeft = `${curMargin + 5}px`;
            }, 20);
        }
    });

    mainContainer.addEventListener("mouseup", ev => {
        clearInterval(mouseDownTimer);
    });
}

window.onload = main;
