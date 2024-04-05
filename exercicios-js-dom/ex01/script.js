// Faça um programa que capture o evento de um input na sua tela e mostre automaticamente a tabuada desse número abaixo.

const form = document.querySelector("form");
const tabuadaCampo = document.getElementById("tabuada");

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    tabuadaCampo.innerText = calcularTabuada(form.inNumero.value);
})

function calcularTabuada(numero) {
    let templateTabuada = "";
    for (let i = 1; i <= 10; i++) {
        templateTabuada += `${numero} x ${i} = ${numero*i}\n`;
    }

    return templateTabuada;
}