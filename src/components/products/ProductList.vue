<script setup>
import { onMounted, watch } from "vue";
import ProductCard from "./ProductCard.vue"; 
import { useProductsStore } from "@/stores/productsStore.js";
const props = defineProps({
  apiURL: {
    type: String,
    required: true,
  },
});

const productsStore = useProductsStore();

onMounted(async () => {


  // configurer l’URL dans le store
  productsStore.setApiURL(props.apiURL);

  // Charger les produits depuis MockAPI
  await productsStore.fetchProducts();
});

watch(() => props.apiURL, async (newUrl) => {
  if (newUrl) await productsStore.fetchProducts(newUrl);
});
</script>

<template>
  <section class="w-full px-4 py-6">
    <h1 class="text-3xl font-bold mb-4">Nouveaux produits</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <ProductCard 
      v-for="product in productsStore.products" 
      :key="product.id" 
      :product="product" 
    />
    </div>
  </section>
</template>

<style scoped>
</style>



