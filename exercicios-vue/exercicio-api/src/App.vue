<template>
  <main class="text-center container mt-5 1875remshadow">
    <div class="form-floating">
      <input type="text" class="form-control" id="formId1" placeholder="" v-model="tarefaNova"/>
      <label for="formId1">Tarefa</label>
    </div>
    <button class="form-control p-2 mt-1 btn btn-primary mb-3" @click="adicionarTarefa">Adicionar tarefa</button>
    
    <ul class="list-group ">
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
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from './api';

const todos = ref([]);
const tarefaNova = ref('');

const pegarTarefas = async () => {
  try {
    const response = await api.get("/todos")
    todos.value = response.data;
  } catch (error) {
    console.log(error.message);
  }
}

const deletarTarefa = async (id) => {
  try {
    const response = await api.delete(`/todos/${id}`)
    todos.value = todos.value.filter((tarefa) => tarefa.id !== id)
  } catch (error) {
    console.log(error.message);
  }
}

const tarefaCompletada = (id) => {
  const indiceTarefa = todos.value.findIndex((tarefa) => tarefa.id == id);

  if (indiceTarefa || indiceTarefa == 0) {
    const tarefa = todos.value[indiceTarefa];
    tarefa.completed = !tarefa.completed
  }
}

const adicionarTarefa = async () => {
  const response = await api.post('/todos', {
    title: tarefaNova.value,
    completed: false
  })

  tarefaNova.value = '';
  pegarTarefas();
}

onMounted(() => {
  pegarTarefas();
})

</script>

<style scoped>
  * {
    padding: 0;
  }

  main {
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