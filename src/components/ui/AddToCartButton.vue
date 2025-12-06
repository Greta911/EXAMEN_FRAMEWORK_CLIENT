<script setup>
const emit = defineEmits(['click']); 
</script>

<template>
  <button
    @click="$emit('click')"
    class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
  >
    <slot name="icon"><i class="fa-solid fa-cart-plus"></i></slot>
    <slot>Ajouter au panier</slot>
  </button>
</template>
