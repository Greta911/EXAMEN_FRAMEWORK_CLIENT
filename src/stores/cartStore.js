import { reactive, computed, watch } from "vue";

// Panier (réactif)
const cart = reactive([]);

// Shipping type
const shippingType = reactive({value: null});

watch(
  () => shippingType.value,
  () => persist()
);

// Prix livraison selon type 0 par défaut
const shippingPrice = computed(() =>{
  if (shippingType.value === "express") return 15;
  if (shippingType.value === "standard") return 5;
  return 0; 
});

// TOTALS
const totalHTVA = computed(() => {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  return total.toFixed(2);
});

const TVA = computed(() => (Number(totalHTVA.value) * 0.2).toFixed(2));

const totalTVAC = computed(() =>
  (
    Number(totalHTVA.value) +
    Number(TVA.value) +
    Number(shippingPrice.value)
  ).toFixed(2)
);


// Sauvegarde interne
const persist = () => {
  localStorage.setItem("eafc_cart", JSON.stringify({
    cart,
    shippingType: shippingType.value,})
  );
};
// INIT pour charger localStorage
const init = () => {
  const saved = localStorage.getItem("eafc_cart");
  if (!saved) return;
    const parsed = JSON.parse(saved);
    cart.splice(0, cart.length, ...(parsed.cart || []));
    shippingType.value = parsed.shippingType || null;
};
// CRUD PANIER 

// createItem(product)
// ajoute 1 produit ou incrémente
const createItem = (product) => {
  const existing = cart.find((p) => p.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      picture: product.picture || null,
      quantity: 1,
    });
  }
  persist();
};

// deleteOneById(id)
// → supprime du panier
const deleteOneById = (id) => {
  cart.splice(
    cart.findIndex(item => item.id === id),
    1
  );

  if (cart.length === 0) {
    shippingType.value = null;
  }

  persist();
};

// updateItem(item)
// → met à jour quantité
const updateItem = (item) => {
  const target = cart.find((p) => p.id === item.id);
  if (!target) return;

  if (item.quantity <= 0) {
    cart.splice(cart.indexOf(target), 1);

  if (cart.length === 0) {
      shippingType.value = null;
    }
    persist();
    return;
  }
  target.quantity = Number(item.quantity);
  persist();
};

// SET shipping
const setShipping = (type) => {
  shippingType.value = type;
  persist();
};

// EXPORT DU STORE
export const cartStore = reactive({
  init,
  cart,
  shippingType,
  shippingPrice,
  totalHTVA,
  TVA,
  totalTVAC,
  createItem,
  deleteOneById,
  updateItem,
  setShipping,
});