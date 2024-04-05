// Faça um programa que:

// a) colete do usuário duas datas (usando inputs de data) e altere a cor do “quadrado” dessa data no calendário dinamicamente. Por exemplo, se o usuário escolher a data 01/10/2022 – o quadrado da com o dia 1 (quarta-feira) deve mudar de cor.

// b) colete do usuário duas datas (usando inputs de data), a seguir faça: 1) calcule quantos dias existem entre elas e exiba na tela (por exemplo, entre 05/04/2022 – 10/04/2022 → 5 dias); 2) mude a cor dos dias entre as datas selecionadas para a cor azul e as datas selecionadas para a cor laranja.

const dias = document.querySelectorAll(".dias");
const mostrarDia = document.getElementById("mostrarDia");
const calcularDia = document.getElementById("calcularDia");

mostrarDia.addEventListener("click", () => {
    const data1 = new Date(document.getElementById("dataId1").value);
    const data2 = new Date(document.getElementById("dataId2").value);

    let diaInput1 = data1.getDate() + 1;
    let diaInput2 = data2.getDate() + 1;

    if (diaInput1 == 32) {
        diaInput1 = 1;
    } else if (diaInput2 == 32){
        diaInput2 = 1; 
    }

    dias.forEach((dia) => {
        if (dia.textContent == diaInput1) {
            dia.style.backgroundColor = "blue";
            dia.style.color = "white";
        } else if (dia.textContent == diaInput2) {
            dia.style.backgroundColor = "blue";
            dia.style.color = "white";
        } else {
            dia.style.backgroundColor = "white";
            dia.style.color = "black";
        }
    })
})

calcularDia.addEventListener("click", () => {
    const data1 = new Date(document.getElementById("dataId1").value);
    const data2 = new Date(document.getElementById("dataId2").value);
    const diaInput1 = data1.getDate() + 1;
    const diaInput2 = data2.getDate() + 1;

    let entreDias;
    let maiorData;
    let menorData;

    if (diaInput1 > diaInput2) {
        entreDias = diaInput1 - diaInput2;
        maiorData = diaInput1;
        menorData = diaInput2
    } else {
        entreDias = diaInput2 - diaInput1;
        maiorData = diaInput2;
        menorData = diaInput1
    }

    document.getElementById("entreDias").innerText = `${entreDias} dias`;

    dias.forEach((dia) => {
        if (dia.textContent == diaInput1) {
            dia.style.backgroundColor = "orange";
        } else if (dia.textContent == diaInput2) {
            dia.style.backgroundColor = "orange";
        } else if (dia.textContent > menorData && dia.textContent < maiorData) {
            dia.style.backgroundColor = "blue";
            dia.style.color = "white";
        } else {
            dia.style.backgroundColor = "white";
            dia.style.color = "black";
        }
    })
})
