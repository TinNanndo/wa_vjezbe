<template>
    <div class="bg-white flex flex-col">
        <div class="pt-5 flex-grow">
            <h1 class="text-2xl text-center font-bold text-gray-900">Pizze</h1>
            <div class="mx-auto mt-5 grid grid-cols-3 gap-x-1 gap-y-1 px-8">
                <div v-for="pizza in pizze" :key="pizza.naziv" @click="dodajUKosaricu(pizza)" class="overflow-hidden rounded-lg cursor-pointer p-4 bg-gray-100">
                    <div class="w-35 h-35 mx-auto">
                        <img :src="pizza.slika" alt="Pizza slika" class="h-full w-full object-cover object-center" />
                    </div> 
                    
                    <div class="p-5">
                        <h2 class="text-lg font-medium text-gray-900">{{ pizza.naziv }}</h2>
                        <p class="text-gray-600">{{ pizza.sastojci }}</p>
                        <p class="text-gray-900">{{ pizza.cijena }} €</p>
                    </div>
                </div>
            </div>

            <div class="my-5">
                <h2 class="text-xl font-bold text-center text-gray-900">Kosarica</h2>
                <div class="mx-auto mt-5 grid grid-cols-1 gap-y-1 px-8">
                    <div v-for="item in kosarica" :key="item.naziv" class="p-4 bg-gray-100 rounded-lg flex justify-between">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900">{{ item.naziv }}</h3>
                            <p class="text-gray-600">Količina: {{ item.kolicina }}</p>
                        </div>

                        <div class="flex space-x-2">
                            <button 
                                v-for="velicina in ['mala', 'srednja', 'velika']" 
                                :key="velicina" 
                                @click="updateSize(item, velicina)" 
                                :class="{'bg-blue-500 text-white': item.velicina === velicina, 'bg-gray-200': item.velicina !== velicina}" 
                                class="p-2 border rounded">
                                {{ velicina }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-5 p-2 bg-gray-100 rounded-lg">
                <form class="flex flex-row space-x-4">
                    <input v-model="ime" type="text" placeholder="Ime" class="border rounded p-2 flex-1">
                    <input v-model="adresa" type="text" placeholder="Adresa" class="border rounded p-2 flex-1">
                    <input v-model="telefon" type="text" placeholder="Telefon" class="border rounded p-2 flex-1">
                </form>
            </div>

            <div class="my-5 flex justify-center items-center">
                <button @click="naruciPizze" class="p-5 bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium rounded-2xl">
                    Naruci pizze
                </button>
            </div>
            <div v-if="errorResponse" class="text-red-500 text-center mt-5">
                {{ errorResponse }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pizze = ref([]);
const kosarica = ref([]);
const ime = ref('');
const adresa = ref('');
const telefon = ref('');
const errorResponse = ref('');

onMounted(async () => {
    try{
        const response = await axios.get('http://localhost:3000/pizze');
        pizze.value = response.data;
    } catch(error){
        console.error('Greska u dohvatu podataka: ', error);
    }
});

const dodajUKosaricu = (pizza) => {
    const existingPizza = kosarica.value.find(item => item.naziv === pizza.naziv);
    if (existingPizza) {
        existingPizza.kolicina += 1;
    } else {
        kosarica.value.push({ naziv: pizza.naziv, kolicina: 1, velicina: 'srednja' });
    }
};

const updateSize = (item, velicina) => {
    item.velicina = velicina;
};

const naruciPizze = async () => {
    try {
        const narudzba = {
            ime: ime.value,
            adresa: adresa.value,
            telefon: telefon.value,
            pizza_stavke: kosarica.value
        };
        const response = await axios.post('http://localhost:3000/narudzba', narudzba);
        console.log(response);
        errorResponse.value = '';
    } catch (error) {
        errorResponse.value = error.response.data.error || 'Greška prilikom narudžbe';
    }
};
</script>