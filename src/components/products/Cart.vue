<script setup>
import { watch } from 'vue';
import { useCartStore } from "@/stores/cartStore.js";

const cartStore = useCartStore();
watch(() => cartStore.cart, (v) => {}, { deep: true });
</script>

<template>
  <aside class="w-full md:w-1/3 px-4">
    <h2 class="text-xl font-bold mb-4">Votre Panier</h2>

    <div class="cart bg-white rounded-lg shadow animate__animated">
      <!-- LISTE DES ARTICLES -->
      <ul class="divide-y divide-gray-200 space-y-4 p-6">
        <li
          v-for="item in cartStore.cart"
          :key="item.id"
          class="flex justify-between items-center py-3"
        >
          <div class="flex items-center">
            <img
              :src="item.image || `https://picsum.photos/300/200/?random=${item.id}`"
              class="h-12 w-12 rounded-full mr-4 object-cover"
            />
            <div>
              <span class="font-semibold">{{ item.name }}</span>
              <span class="block text-sm text-gray-500">€{{ Number(item.price).toFixed(2) }}</span>
            </div>
          </div>

          <div class="flex items-center">
            <input
              type="number"
              min="0"
              class="form-input mt-1 block w-16 text-center rounded text-gray-700 border-gray-300 border"
              v-model.number="item.quantity"
              @change="cartStore.updateQuantity(item.id, item.quantity)"
            />

            <button
              @click="cartStore.removeProduct(item.id)"
              class="ml-2 text-red-500 hover:text-red-700"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </li>

        <!-- Panier vide -->
        <li v-if="cartStore.cart.length === 0" class="text-center text-gray-500 py-4">
          Votre panier est vide.
        </li>
      </ul>

      <!-- TOTALS + LIVRAISON -->
      <div class="bg-gray-50">
        <div class="p-6">
          <div class="flex justify-between mb-1">
            <span><strong>Total HTVA:</strong></span>
            <span>€{{ cartStore.totalHTVA }}</span>
          </div>

          <div class="flex justify-between mb-1">
            <span><strong>Taxe (20%):</strong></span>
            <span>€{{ cartStore.TVA }}</span>
          </div>

          <div class="flex justify-between items-center my-8">
            <span><strong>Livraison:</strong></span>

            <select
              v-model="cartStore.shippingType"
              class="form-select py-1 px-2 block w-full rounded border border-gray-300 ml-2"
            >
              <option value="standard">Standard - €5</option>
              <option value="express">Express - €15</option>
            </select>
          </div>

          <div class="flex justify-between font-bold mb-1 text-xl">
            <span><strong>Total Général:</strong></span>
            <span>€{{ cartStore.totalTVAC }}</span>
          </div>

          <button
            class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cart-btn"
            @click="alert('Paiement simulé')"
          >
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped></style>
