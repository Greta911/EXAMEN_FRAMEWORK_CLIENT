<script setup>
import { onMounted } from "vue"; 
import { productsStore } from "@/stores/productsStore.js";
import ProductCard from "./ProductCard.vue";

const props = defineProps({
  apiURL: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);

onMounted(async () => {
  productsStore.init(props.apiURL);
});

function forwardAdd(product) {
  emit("add-to-cart", product);
}

</script>

<template>
  <section class="w-full md:w-2/3 px-4 mb-8">
    <h1 class="text-3xl font-bold mb-4">Nouveaux produits</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <ProductCard 
      v-for="product in productsStore.products" 
      :key="product.id" 
      :product="product"
      @add-to-cart="forwardAdd" 
    />
    </div>
  </section>
</template>

<style scoped>
</style>



