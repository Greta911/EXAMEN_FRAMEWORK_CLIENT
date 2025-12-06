<script setup>
import { useCartStore } from "@/stores/cartStore.js";

const props = defineProps({
  product: Object
});

const cartStore = useCartStore();

function addToCart() {
  cartStore.addProduct(props.product);
}
</script>

<template>
  <article class="bg-white rounded-lg overflow-hidden shadow-md">
    <img :src="product.picture || 'https://picsum.photos/300/200?random=1'" class="w-full"/>
    <div class="p-4">
      <h2 class="font-bold text-lg mb-2">{{ product.name }}</h2>
      <p class="text-gray-700">€{{ product.price }}</p>
      <button @click="addToCart" class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Ajouter
      </button>
    </div>
  </article>
</template>

<style scoped></style>