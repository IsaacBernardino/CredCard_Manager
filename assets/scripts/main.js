const cardinfos = document.querySelector('#cardinfos');
const cardsArea = document.querySelector('#cards');
const form = document.querySelector('#form');

const removeBtn = document.querySelectorAll('#removeCard');
const cardsUi = document.querySelectorAll('.card');

window.addEventListener('load', () => {
    App();
});

App = () => {
    // Botão para mostrar formulario
    document.querySelector('#showForm').addEventListener("click", () => {
        console.log('btn -- Mostrar formulario');
        
        cardinfos.style.visibility = "visible";
    });

    // Botão para adicionar cartão
    document.querySelector('#addCard').addEventListener("click", () => {
        console.log('btn -- Adicionar Cartão');

        renderCard()

        cardinfos.style.visibility = "hidden";
    });

}

// Impedir a pagina de recarregar quando um evento de 'eviar' for ativado
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
    
const renderCard = () => {

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
        <h3>!!!!</h3>
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

    // zerar inputs
    userName.value = "";
    bankName.value = "";
    cardNumber.value = "";
    mouth.value = "";
    year.value = "";

    console.log('renderCard -- Cartão adicionado');
}

function tip (text) {
    let tip = document.createElement('h2');
    tip.id = 'dica';
    tip.innerText = text; //'Adicione um novo cartão';

    return tip;
}
let text = 'Adicione um novo cartão';
cardsArea.insertAdjacentElement("beforeend", tip(text));

removeTip = () => {
    let tip = document.querySelector('#dica');
    tip.remove();
}

function deleteCard(e) {
    const item = e.target;
    //delete card
    if(item.classList[0] === 'removeCard'){
        const card = item.parentElement;
        card.remove();
    }
}

function showForm(){
}

function showAllCards(){
    console.log(cardsSaved);
}