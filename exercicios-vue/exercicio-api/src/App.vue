<template>
  <ul class="list-group text-center container mt-5 shadow">
      <div v-for="item in todos" :key="item.id" >

        <li class="list-group-item list-group-item-action p-2 d-flex justify-content-between" v-if="!item.completed">
          <i class="fa-regular fa-circle-check ms-5" @click="tarefaCompletada(item.id)"></i>
          {{ item.title }}
          <i class="fa-solid fa-trash-can me-5" @click="deletarTarefa(item.id)"></i>
        </li>

        <li class="list-group-item list-group-item-action p-2 list-group-item-success d-flex justify-content-between" v-else>
          <i class="fa-regular fa-circle-check ms-5 i-checked" @click="tarefaCompletada(item.id)"></i>
          {{ item.title }}
          <i class="fa-solid fa-trash-can me-5" @click="deletarTarefa(item.id)"></i>
        </li>
        
      </div>
    </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from './api';

let todos = ref([]);

const pegarTarefas = () => {
  api.get("/todos").then((response) => {
    todos.value = response.data;
  })
  .catch((erro) => console.log(erro))
}

const deletarTarefa = (id) => {
  api.delete(`/todos/${id}`).then(() => {
    todos.value = todos.value.filter((tarefa) => tarefa.id !== id)
  })
  .catch((error) => console.log(error))
}

const tarefaCompletada = (id) => {
  const indiceTarefa = todos.value.findIndex((tarefa) => tarefa.id == id);

  if (indiceTarefa || indiceTarefa == 0) {
    const tarefa = todos.value[indiceTarefa];
    tarefa.completed = !tarefa.completed
  }
}

onMounted(() => {
  pegarTarefas();
})

</script>

<style scoped>
  * {
    padding: 0;
  }

  ul {
    max-width: 600px;
  }

  i {
    cursor: pointer;
    border-radius: 50%;
  }

  .i-checked {
    color: rgb(2, 190, 2);
  }
</style>