
function main() {
    const mainContainer = document.querySelector(".blocks");

    mainContainer.addEventListener("click", ev => {
        if (ev.target.classList.contains("block")) {
            let topRect = mainContainer.children[0].getBoundingClientRect();
            let elRect = ev.target.getBoundingClientRect();
            let tl = gsap.timeline();
            tl.to(ev.target, {
                duration: 1,
                y: topRect.top - elRect.top,
                onComplete: function() {
                    ev.target.remove();
                    mainContainer.prepend(ev.target);
                },
            }).to(ev.target, {duration: 0, y: 9});
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
