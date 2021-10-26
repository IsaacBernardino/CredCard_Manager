// FORM html elements
const cardinfos = document.querySelector('#cardinfos');
const form = document.querySelector('#form');
//Cards
const cardsArea = document.querySelector('#cards');
const removeBtn = document.querySelectorAll('#removeCard'); //Button to remove card
const cardsUi = document.querySelectorAll('.card'); // card element on 'cardsArea'

const alertDiv = document.querySelector('#errors')
const alerts = document.querySelector('#err');

let id_f = 0;
const cardsId = [];

window.addEventListener('load', () => {
    App();
});

App = () => {
    // Botão para mostrar formulario
    document.querySelector('#add-button').addEventListener("click", () => {
        console.log('btn ==> Mostrar formulario');
        
        cardinfos.style.visibility = "visible";
    });

    // Botão para adicionar cartão
    document.querySelector('#addCard').addEventListener("click", () => {
        console.log('btn ==> Adicionar Cartão');

        renderCard()
    });
}

// Impedir a pagina de recarregar quando um evento de 'eviar' for emitido
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
    
const renderCard = () => {
    // Area aonde os cartões serão anexados
    const cardsArea = document.querySelector('#cards')

    // elementos de input
    const userName = document.querySelector('#user-info');
    const bankName = document.querySelector('#bank-info');
    const cardNumber = document.querySelector('#number-info');
    const mouth = document.querySelector('#mouth-value');
    const year = document.querySelector('#year-value');

    // retorno para uma variavel dos dados inseridos e validados
    const data = ValidateInputs(userName, bankName, cardNumber, mouth, year);

    // Cria o elemento inicial para o cartão
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // verificação dos dados

    if(data[0].erro == false) {
        cardDiv.innerHTML =
        `
            <h1 id="bankName">${data[0].bankName}</h1>
            <span id="cardNumber">${data[0].cardNumber}</span>
    
            <div id="validade">
                Valido até: <span id="valid">${data[0].mouth}/${data[0].year}</span>
            </div>
            <span id="user">${data[0].userName}</span>
        `;

        // Adicionar o cartão na tela
        cardsArea.appendChild(cardDiv);
        cardDiv.addEventListener("click", deleteCard);
        
        cardinfos.style.visibility = "hidden";
        alertDiv.style.visibility = "hidden";
        
        // zerar inputs
        userName.value = "";
        bankName.value = "";
        cardNumber.value = "";
        mouth.value = "";
        year.value = "";

        cardsId.push(generateId())

        console.log('renderCard ==> Cartão adicionado');

    } else {
        alertDiv.style.visibility = "visible";

        let uiError;
        alerts.innerHTML = '';

        for(let e = 0; e < data[1].length; e++){
            uiError = document.createElement('li');
            uiError.textContent = data[1][e];
            alerts.appendChild(uiError);
            console.log(data[1][e]);
        }
    }

    // Botão de remoção do cartão
    // CRIAR FUNÇÂO SEPARADA
    const removeButton = document.createElement('button');
    removeButton.classList.add('removeCard');
    removeButton.insertAdjacentHTML('beforeend', 'Remover');
    cardDiv.appendChild(removeButton); 
}

function generateId() {
    id_f++;
    return `card + ${id_f}`;
}

function errorOkButton () {
    alertDiv.style.visibility = "hidden";
}

function cancel () {
    cardinfos.style.visibility = "hidden";
    alertDiv.style.visibility = "hidden";
}

// userName, bankName, cardNumber, mouth, year
function ValidateInputs(u_n, b_n, c_n, m, y){
    let data = {
        userName: "",
        bankName: "",
        cardNumber: "",
        mouth: "",
        year: "",
        erro: false,
    }

    const errors = [];
    // Usuario
    if(u_n.value == ""){
        data.erro = true;
        errors.push('Digite um proprietario para o cartão.');
    } else {
        data.userName = u_n.value.toUpperCase();
    }

    // Nome do Banco
    if(b_n.value == ""){
        data.erro = true;
        errors.push('Digite o nome do banco.');
    } else {
        data.bankName = capitalize(b_n.value);
    }
    
    // Numero do cartão Exemplo 555555555555 ==> 5555 5555 5555 5555 
    if(c_n.value == ""){
        data.erro = true;
        errors.push('Numero do cartão invalido.');
    } else {
        if (mcc(c_n.value).length < 19){
            data.erro = true;
            errors.push('Numero do cartão invalido.');
        } else {
            data.cardNumber = mcc(c_n.value);
        }
    }

    // mes e ano
    if(m.value == "" || y.value == ""){
        data.erro = true;
        errors.push('Data invalida');
    } else {
        if (parseInt(m.value,10) > 12){
            data.erro = true;
            data.errors.push('Data invalida');
        }else
        if(parseInt(m.value,10) < 1){
            data.erro = true;
            errors.push('Data invalida');
        } else {
            data.mouth = parseInt(m.value, 10);
            data.year = parseInt(y.value, 10);
        }
    }

    return [data, errors];
}

function capitalize(word) {
    const words = word.split(" ");
    const word_cap = [];
    const first_letter = [];
    const final_ = [];
    
    words.forEach(this_word => {
        word_cap.push(this_word);
    });
    
    word_cap.forEach(wd => {
        first_letter.push(wd.charAt(0).toUpperCase());
    });

    for(let i = 0; i < first_letter.length; i++){
        final_.push(first_letter[i] + word_cap[i].slice(1));
    }

    return final_.join(' ');

  }

  // Formatar numero do cartão com regex
  function mcc(v){
    v = v.replace(/\D/g,"");
    v = v.replace(/^(\d{4})(\d)/g,"$1 $2");
    v = v.replace(/^(\d{4})\s(\d{4})(\d)/g,"$1 $2 $3");
    v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g,"$1 $2 $3 $4");
    return v;
}

function deleteCard(e) {
    const item = e.target;
    //delete card
    if(item.classList[0] === 'removeCard'){
        const card = item.parentElement;
        card.remove();
    }
}

function showAllCards(){
    console.log(cardsSaved);
}

/*
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
*/