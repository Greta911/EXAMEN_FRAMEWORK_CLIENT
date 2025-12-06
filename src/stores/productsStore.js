import { reactive, computed } from "vue";
import DB from "@/services/DB";

// Produits
const products = reactive([]);

// computed : nombre de produits
const totalProducts = computed(() => products.length);

// init(apiURL)
const init = async (apiURL) => {
  DB.setApiURL(apiURL);

  // Remplit le tableau en conservant la réactivité
  products.splice(products.length, 0, ...(await DB.findAll()));
};

// CRUD FUNCTIONS 

// createItem(product)
const createItem = async (product) => {
  const created = await DB.create(product);
  products.push(created);
};

// updateItem(product)
const updateItem = async (product) => {
  const updated = await DB.updateOne(product);

  const index = products.findIndex((p) => p.id === product.id);
  if (index !== -1) products[index] = updated;
};

// deleteOneById(id)
const deleteOneById = async (id) => {
  await DB.deleteOneById(id);

  products.splice(
    products.findIndex((p) => p.id === id),
    1
  );
};

// EXPORT STORE
export const productsStore = reactive({
  init,
  products,
  totalProducts,
  createItem,
  updateItem,
  deleteOneById,
});