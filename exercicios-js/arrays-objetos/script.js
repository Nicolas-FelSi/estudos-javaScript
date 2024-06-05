const arrayNumeros = [3, 7, 3, 7, 4, 6, 8, 12, 743, 74];
const arrayObjetos = [{nome: 'Nicolas', idade: 21}, {nome: 'Jane', idade: 20}, {nome: 'Jim', idade: 30}]

function maiorNumero(array) {
    // let maiorNumero = 0;
    // for (let i = 0; i < array.length; i++) {
    //     if (i == 0) {
    //         maiorNumero = array[0];
    //     } else if (array[i] > maiorNumero) {
    //         maiorNumero = array[i];
    //     }
    // }

    return Math.max(...array);
}

function removerValoresDuplicados(array) {
    const arrayComValoresUnicos = new Set(array);
    return arrayComValoresUnicos;
}

function ordenarObjetos(array, prop) {
    let arrayOrdenado = array.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
    return arrayOrdenado;
}

console.log(`Array: ${arrayNumeros}`);
console.log(`Maior número do array: ${maiorNumero(arrayNumeros)}`);
console.log(removerValoresDuplicados(arrayNumeros));

console.log(ordenarObjetos(arrayObjetos, "idade"));
