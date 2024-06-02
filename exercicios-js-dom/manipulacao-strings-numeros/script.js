const btnString = document.getElementById("btnReverterString");
const btnContarVogais = document.getElementById("btnContarVogais");
const btnNumeroPrimo = document.getElementById("btnNumeroPrimo");

function reverterString(string) {
    let stringFormatada = string.split("").reverse().join("");
    return stringFormatada;
}

function contarVogais(string) {
    let contador = 0;
    const stringFormatada = string.toLowerCase();
    const vogais = ["a", "e", "i", "o", "u"];

    for (const letra of stringFormatada) {
        if (vogais.includes(letra)) {
            contador++;
        }
    }

    return contador;
}

function verificarNumero(numero) {
    let contador = 0;
    const numeroInteiro = parseInt(numero);
    for (let i = 1; i < numeroInteiro+1; i++) {
        if (numeroInteiro % i == 0) {
            contador++;
        }  
    }

    return contador > 2 ? `Não é primo` : `É primo`;
}

btnString.addEventListener("click", () => {
    const input = document.getElementById("inString").value;
    if (!input) return;
    document.getElementById("stringNormal").innerText = input;
    document.getElementById("stringReversa").innerText = reverterString(input);
})

btnContarVogais.addEventListener("click", () => {
    const input = document.getElementById("inStringVogal").value;
    if (!input) return;
    document.getElementById("stringDigitada").innerText = input;
    document.getElementById("qtdVogais").innerText = contarVogais(input);
})

btnNumeroPrimo.addEventListener("click", () => {
    const input = document.getElementById("inNumber").value;
    if (!input) return;
    document.getElementById("numero").innerText = input;
    document.getElementById("resultado").innerText = verificarNumero(input);
})

    