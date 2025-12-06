export default class DB {
  static setApiURL(url) {
    this.apiURL = url;
  }

  // GET /products
  static async findAll() {
    const response = await fetch(this.apiURL + "products");
    return response.json();
  }

  // GET /products/:id
  static async findOneById(id) {
    const response = await fetch(this.apiURL + "products/" + id);
    return response.json();
  }

  // POST /products
  static async create(product) {
    const response = await fetch(this.apiURL + "products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        picture: product.picture,
      }),
    });
    return response.json();
  }

  // PUT /products/:id
  static async updateOne(product) {
    const response = await fetch(this.apiURL + "products/" + product.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        picture: product.picture,
      }),
    });
    return response.json();
  }

  // DELETE /products/:id
  static async deleteOneById(id) {
    const response = await fetch(this.apiURL + "products/" + id, {
      method: "DELETE",
    });
    return response.json();
  }
}
