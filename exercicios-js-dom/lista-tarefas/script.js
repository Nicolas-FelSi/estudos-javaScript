const form = document.querySelector("form");
const ulTarefas = document.querySelector(".lista-tarefas");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let tarefaTexto = form.inTarefa.value;

    if (tarefaTexto.trim() == "") {
        alert("Digite uma tarefa no input.");
    } else {
        renderizarTarefa(tarefaTexto);
        form.inTarefa.value = ""
    }

})

function renderizarTarefa(texto) {
    const template = `
    <li>
        <span>${texto}</span>
        <a href="#">
            <i class="fa-solid fa-trash"></i>
        </a>
    </li>
    `;

    const parser = new DOMParser();
    const templateHtml = parser.parseFromString(template, 'text/html');
    const tarefaDom = templateHtml.querySelector("li");
    ulTarefas.appendChild(tarefaDom);
}