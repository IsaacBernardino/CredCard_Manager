const form = document.querySelector('#cardinfos');

const removeBtn = document.querySelectorAll('#removeCard');
const cardsUi = document.querySelectorAll('.card');

let cardsSaved = [];
let idCount = 0;

console.log(cardsSaved.length);

const createCard = () => {
    const cardsArea = document.querySelector('#cards')
    //inputs
    const userName= document.querySelector('#user-info');
    const bankName = document.querySelector('#bank-info');
    const cardNumber = document.querySelector('#number-info');
    const mouth = document.querySelector('#mouth-value');
    const year = document.querySelector('#year-value');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // verificação dos dados

    cardDiv.innerHTML =
    `
        <h1 id="bankName">${bankName.value}</h1>
        <h3>gold</h3>
        <img id="bandeira" src="./assets/images/icons/mastercard.png" alt="bandeira">
        <span id="cardNumber">${cardNumber.value}</span>

        <div id="validade">
            Valido até: <span id="valid">${mouth.value}/${year.value}</span>
        </div>
        <span id="user">${userName.value}</span>
    `;

    const removeButton = document.createElement('button');
    removeButton.classList.add('removeCard');
    removeButton.insertAdjacentHTML('beforeend', 'Remover');
    cardDiv.appendChild(removeButton);

    // Adicionar o cartão na tela
    cardsArea.appendChild(cardDiv);
    cardDiv.addEventListener("click", deleteCard);

    form.style.visibility = "hidden";

    // zerar inputs
    userName.value = "";
    bankName.value = "";
    cardNumber.value = "";
    mouth.value = "";
    year.value = "";
}

function deleteCard(e) {
    const item = e.target;
    //delete card
    if(item.classList[0] === 'removeCard'){
        const card = item.parentElement;
        card.remove();
    }
}

function removeCard() {
    let clickedCard;

    for(let i = 0; i < cardsSaved.length; i++){
        clickedCard = document.querySelector(`#id${cardsSaved[i].cardId}`);
        
        clickedCard.remove()
    }

    console.log(clickedCard);

    //cardsSaved.pop()
}

function removeTip() {
    let tip = document.getElementById('noCard');
    tip == null ? 0 : tip.remove();
}

function showForm(){
    form.style.visibility = "visible";
}



function createCardFn() {

    // remover a dica quando tiver cartoes e voltar a apresentar quando for excluido
    removeTip();

    let cardsArea = document.querySelector('#cards')

    let userNameInput = document.querySelector('#user-info');
    let bankNameInput = document.querySelector('#bank-info');
    let cardNumberInput = document.querySelector('#number-info');
    let mouthInput = document.querySelector('#mouth-value');
    let yearInput = document.querySelector('#year-value');

    let card = new Card();

    card.cardId = idCount;
    card.user = userNameInput.value || "Usuario";
    card.bankName = bankNameInput.value || "Banco";
    card.cardNumber = cardNumberInput.value || "XXXX XXXX XXXX XXXX";
    card.mouth = mouthInput.value || "X0";
    card.year = yearInput.value || "X0X0";

    cardsSaved.push(card);
    console.log(cardsSaved.length);

    card.drawCard(cardsArea);
    
    form.style.visibility = "hidden";
    showAllCards();

    idCount++;
}

function showAllCards(){
    console.log(cardsSaved);
}

// var cardModel =
//     `<div class="card">
//         <div>
//             <h1 id="bankName">Banco Inter</h1>
//         </div>
//         <div>
//             <h3>gold</h3>
//             <img id="bandeira" src="./assets/images/icons/mastercard.png" alt="bandeira">
//         </div>
//         <div>
//             <span id="cardNumber">5117 xxxx xxxx xxxx</span>
//         </div>
//         <div id="validade">
//             Valido até: <span id="valid">07/2023</span>
//         </div>
//         <div>
//         <span id="user">Isaac B Costa</span>
//         </div>
//     </div>`

/*
        `<div id="id${this.cardId}">
            <div class="card">
                <div>
                    <h1 id="bankName">${this.bankName}</h1>
                </div>
                <div>
                    <h3>gold</h3>
                    <img id="bandeira" src="./assets/images/icons/mastercard.png" alt="bandeira">
                </div>
                <div>
                    <span id="cardNumber">${this.cardNumber}</span>
                </div>
                <div id="validade">
                    Valido até: <span id="valid">${this.mouth}/${this.year}</span>
                </div>
                <div>
                <span id="user">${this.user}</span>
                </div>
                <div>
                <button class="removeCard">X</button>
                </div>
            </div>
        </div>
    `
    */