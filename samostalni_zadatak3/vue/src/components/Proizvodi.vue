<template>
  <div class="bg-white min-h-screen flex flex-col">
    <div class="pt-6 flex-grow">
      <h1 class="text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-3xl">Proizvodi</h1>
      <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-1 lg:gap-y-1 lg:px-8">
        <div v-for="proizvod in proizvodi" :key="proizvod.id" @click="goToProizvod(proizvod.id)" class="overflow-hidden rounded-lg cursor-pointer p-4 bg-gray-100">
          <div class="w-32 h-32 mx-auto">
            <img :src="proizvod.slike[0]" alt="Product image" class="h-full w-full object-cover object-center" />
          </div>
          <div class="p-4">
            <h2 class="text-lg font-medium text-gray-900">{{ proizvod.naziv }}</h2>
            <p class="text-sm text-gray-500">{{ proizvod.opis }}</p>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <p class="text-lg font-medium text-gray-900">Broj proizvoda u košarici: {{ kosarica.length }}</p>
        <button @click="naruciProizvode" class="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Naruči proizvode
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const proizvodi = ref([]);
const kosarica = ref(JSON.parse(localStorage.getItem('kosarica')) || []);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/proizvodi');
    proizvodi.value = response.data;
  } catch (error) {
    console.error('Greška u dohvatu podataka:', error);
  }
});

const goToProizvod = (id) => {
  router.push(`/${id}`);
};

const naruciProizvode = async () => {
  try {
    const response = await axios.post('http://localhost:3000/narudzbe', { naruceni_proizvodi: kosarica.value });
    console.log(response);
    localStorage.removeItem('kosarica');
    kosarica.value = [];
  } catch (error) {
    console.error('Greška u dohvatu podataka:', error);
  }
};
</script>