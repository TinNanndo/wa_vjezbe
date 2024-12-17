
<template>
    <li class="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow">
        <div>
            <p class="text-lg font-medium text-gray-800">{{ naslov }}</p>
            <p class="text-sm text-gray-600">{{ opis }}</p>
            <div class="mt-2">
                <Tag v-for="tag in tags" :key="tag" :tag="tag" />
            </div>
        </div>
        <!-- Task Actions -->
        <div class="flex space-x-2">
            <button class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
              Dovršeno
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              Obriši
            </button>
        </div>
    </li>
</template>

<script setup>
import Tag from '../components/Tag.vue';
import { onMounted } from 'vue';

defineProps({
    id: String,
    naslov: String,
    opis: String,
    zavrsen: Boolean,
    tags: Array
});
</script>

<style scoped></style>