<template>
    <span :class="tagMapping[tag]" class="text-sm px-2 py-1 mr-2 rounded-2xl " >{{ tag }}</span>
</template>

<script setup>
defineProps({
    tag: Object,
})

let tagMapping = {
    "hitno" : "bg-red-100 font-bold",
    "faks" : "bg-blue-100",
    "polako" : "bg-green-100"
}

</script>