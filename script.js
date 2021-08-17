// DOM ELEments
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const clipboardEl = document.getElementById('clipboard');
const generateEl = document.getElementById('generate');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Generate event Liistner
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword( hasUpper, hasLower, hasNumber, hasSymbol, length);
    // console.log(typeof length);
});

clipboardEl.addEventListener('click', () => {
   const textarea = document.createElement('textarea');
   const Password = resultEl.innerText;
   
   if(!Password){
       return;
   }
   textarea.value = Password;
   document.body.appendChild(textarea);
   textarea.select();
   document.execCommand('copy');
   textarea.remove();
   alert('Password copied to clipboard!');
});

// Generate Password function
function generatePassword( upper, lower, number, symbol, length){
    // 1. Init pw var
    // 2. Filter out unchecked type
    // 3. Loop over length call generator function for each type
    // 4. Add final pw to the pw var and return

    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    // console.log('typesCount: ', typesCount);

    const typesArr = [ {upper}, {lower}, {number}, {symbol} ].filter(item => Object.values(item)[0]);
    // console.log('typesArr: ', typesArr);

    if(typesCount === 0){
        return '';
    }

    for( let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Generator function: https://www.net-comber.com/charset.html 
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) +97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) +65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) +48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]_-+=<>,.?/;:-*|~`"';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomLower());
// console.log(getRandomUpper());
// console.log(getRandomNumber());
// console.log(getRandomSymbol());