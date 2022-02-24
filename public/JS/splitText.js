// Split Text Animation
const split = document.querySelector('.textSplit');
const strText = split.textContent;
const spliText = strText.split("")
split.textContent = "";

for (let i = 0; i < spliText.length; i++) {
    split.innerHTML += "<span>" + spliText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 80);

function onTick() {
    const span = split.querySelectorAll('span')[char];
    span.classList.add("fade");
    char++;
    if(char === spliText.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer)
    timer = null;
}