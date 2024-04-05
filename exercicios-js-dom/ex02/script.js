// Faça um programa que “pegue” uma lista <ol> no HTML e coloque negrito dinâmicamente a partir de um nome digitado no seu input.

const input = document.getElementById("input");
const listaNomes = document.querySelectorAll("ul li");
let acumuladorLetras = "";

input.addEventListener("keydown", (e)=>{
    const condicaoTeclas = e.key != "Backspace" && e.key != "CapsLock" && e.key != "Dead" && e.key != "Tab" && e.key != "Shift";

    if (condicaoTeclas) {
        acumuladorLetras += e.key;
    }

    listaNomes.forEach((li)=>{
        const nome = li.textContent.trim().toLocaleLowerCase();
        
        if (nome.startsWith(acumuladorLetras.toLocaleLowerCase()) && acumuladorLetras != "") {
            li.style.fontWeight = "bold";
        } else {
            li.style.fontWeight = "500";
        }
    })

    if (e.key === "Backspace") {
        let valorAtual = acumuladorLetras;
        valorAtual = acumuladorLetras.slice(0, -1);
        acumuladorLetras = valorAtual;
    }
})

