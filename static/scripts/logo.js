function setTextAnimation(delay, duration, strokeWidth, timingFunction, strokeColor, direction = "forwards") {
    let paths = document.querySelectorAll("path");
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const length = path.getTotalLength();
        path.style["stroke-dashoffset"] = `${length}px`;
        path.style["stroke-dasharray"] = `${length}px`;
        path.style["stroke-width"] = `${strokeWidth}px`;
        path.style["stroke"] = `${strokeColor}`;
        path.style["animation"] = `${duration}s svg-text-anim ${direction} ${timingFunction}`;
        path.style["animation-delay"] = `${i * delay}s`;
    }
}
document.documentElement.style.setProperty('--animate-duration', '2s');
function endAnimation() {
    document.getElementById("svg-logo").remove();
    document.getElementById("home").style.display = "block";
    for (const element of document.getElementById("home").children) {
        element.classList.add("animate__animated", "animate__fadeInDown");
    }
}

window.addEventListener("load", () => {
    setTextAnimation(0.1, 2.6, 1, "linear", "#ffffff");
    const params = new URL(document.location).searchParams;
    const showAnim = params.get("loadAnimation");
    if (showAnim !== null && showAnim.toLowerCase() == "false") {
        endAnimation();
        return;
    }
    let timer = setTimeout(() => {
        let paths = document.querySelectorAll("path");
        let duration = 1000;
        let steps = 100;
        let currentStep = steps;
        let initialOpacity = 1;
        const timer = setInterval(() => {
            currentStep--;
            let opacity = currentStep / steps;
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                path.style.opacity = initialOpacity * opacity;
            }
            if (currentStep <= 0) {
                endAnimation();
                clearInterval(timer);
            }
        }, duration / steps);
    }, 3000);
});