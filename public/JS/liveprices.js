const combo = document.getElementById('combo')
const card = document.querySelector('#prices')
const arrow = document.querySelector('#arrow')
const liveCard = document.querySelector('#prices .liveCard')
let title = document.getElementById('titlePrices')
let bidValues = document.getElementById('bid')
let askValues = document.getElementById('ask')

var myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-abvpot18l04gjpyt-io");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

arrow.addEventListener('click', () => {
    if (card.style.left === '-300px') {
        liveCard.style.removeProperty('left')
        liveCard.style.removeProperty('transform')
        setTimeout(() => {
            card.style.removeProperty('left')
            arrow.style.removeProperty('top')
            arrow.style.removeProperty('transform')
        }, 800);
    } else {
        card.style.left = '-300px'
        setTimeout(() => {
            arrow.style.top = '40px'
            arrow.style.transform = 'translateX(320px) rotate(-90deg)'
            liveCard.style.left = '20px'
            liveCard.style.transform = 'scale(1.1)'
        }, 400);
    }
})

combo.addEventListener('change', () => {
    if (parseFloat(combo.value) === 1) {
        Gold()
    } else {
        Silver()
    }
})

  
async function Gold() {
    try {
        const respuesta = await fetch('https://www.goldapi.io/api/XAU/USD', requestOptions)
        const resultado = await respuesta.json()
        title.innerHTML = `<span class="iconify" data-icon="ant-design:gold-filled" style="color: #f3cf02;"></span> GOLD / ${resultado.metal}`
        bidValues.textContent = resultado.bid
        askValues.textContent = resultado.ask
    }
    catch(error) {
        console.log(error)
    }
}

async function Silver() {
    try {
        const respuesta = await fetch('https://www.goldapi.io/api/XAG/USD', requestOptions)
        const resultado = await respuesta.json()
        title.innerHTML = `<span class="iconify" data-icon="ant-design:gold-filled" style="color: lightgray;"></span> SILVER / ${resultado.metal}`
        bidValues.textContent = resultado.bid
        askValues.textContent = resultado.ask
    }
    catch(error) {
        console.log(error)
    }
}