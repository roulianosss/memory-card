const cards = document.querySelectorAll('.carte')
const displayCount = document.querySelector('p span')
const h4 = document.querySelector('h4')

let cardFlipped = []
let verouillage =  false
let count = 0

cards.forEach(card => card.addEventListener('click', handleClick))

function handleClick(e) {
    if (verouillage) return
    e.target.firstElementChild.classList.add('active')
    if (!cardFlipped.length){
        cardFlipped.push(this)
    }else if (cardFlipped.length === 1 && cardFlipped[0] !== this) {
        cardFlipped.push(this)
        correspondance()
    }
}

function correspondance() {
    verouillage = true
    displayCount.textContent = ++count
    if (cardFlipped[0].getAttribute(`data-attr`) !== cardFlipped[1].getAttribute(`data-attr`)){
        setTimeout(()=> {
            cardFlipped[0].firstElementChild.classList.remove('active')
            cardFlipped[1].firstElementChild.classList.remove('active')
            cardFlipped = []
            verouillage = false
        }, 1000) 
    } else {
        cardFlipped[0].removeEventListener('click', handleClick)
        cardFlipped[1].removeEventListener('click', handleClick)
        cardFlipped = []
        verouillage = false
    }

    if ([...cards].every(card => card.firstElementChild.classList.contains('active'))) {
        h4.textContent = 'Vous avez gagné !!! Pressez espace pour recommencer'
        document.addEventListener('keypress', (e) => e.code === "Space" ? location.reload() : "")
    }

}

function randomize() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    })
}

randomize()

