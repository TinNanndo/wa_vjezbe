<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- Header -->
    <header
      class="flex justify-between items-center bg-white p-4 shadow rounded-md mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Task Manager</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Dodaj zadatak
      </button>
    </header>
    <!--/Header-->

    <!-- Task List -->
    <div class="bg-white p-4 shadow rounded-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Vaši zadaci</h2>
      <ul class="space-y-4">
      <Task v-for="task in tasks" :key="task.id" :id="task._id" :naslov="task.naslov" :zavrsen="task.zavrsen" :opis="task.opis" :tags="task.tags" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Task from './components/Task.vue';

let tasks = ref([]);

onMounted(async () =>{
  let response = await axios.get('http://localhost:8000/tasks');
  console.log(response);
  let podaci = response.data;
  tasks.value = podaci;
  console.log('task.value', tasks.value);
});
</script>

<style scoped></style>
