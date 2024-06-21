const buttons = document.querySelectorAll(".buttons > button");
const resultado = document.getElementById("resultado");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const valor = button.value;

        if (valor == "=") {
            resultado.innerText = calcular(resultado.innerText);
        } else if (valor != "ac" && valor != "del") {
            resultado.innerText += valor;
        } else if (valor == "del") {
            let textoAtual = resultado.innerText;
            resultado.innerText = textoAtual.substring(0, textoAtual.length -1);
        } else if (valor == "ac") {
            resultado.innerText = "";
        }
    })
})

function calcular(equacao) {
    return eval(equacao);
}