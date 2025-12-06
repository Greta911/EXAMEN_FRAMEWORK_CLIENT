<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProductList from "@/components/products/ProductList.vue";
import Cart from "@/components/products/Cart.vue";
import { cartStore } from "@/stores/cartStore.js";

function handleAdd(product) {
  cartStore.createItem(product);   // ajout dans le panier
}
</script>

<template>
  <AppHeader />
  <main class="container mx-auto py-8 px-4 flex flex-wrap">
      <ProductList apiURL="https://6932ca7de5a9e342d270dc41.mockapi.io/" @add-to-cart="handleAdd" />
      <Cart />
  </main>
  <AppFooter />
</template>

<style scoped></style>
