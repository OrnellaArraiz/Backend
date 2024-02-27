const fs = require("fs");

// Ruta del archivo donde se guardarán los productos
class ProductsManager {
  constructor() {
    this.path = "products.json";
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  // Guardar los productos en el archivo
  async saveProducts() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.error("Error al guardar los productos:", error);
    }
  }

  // Agregar un nuevo producto
  async addProduct(title, description, price, thumbnail, code, stock) {
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;

    const addNewProduct = {
      id: newId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(addNewProduct);
    console.log("Producto agregado:", addNewProduct);

    await this.saveProducts();
  }

  // Obtener todos los productos
  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  }

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      const productId = parseInt(id);
      
      const product = this.products.find((product) => product.id === productId);
      if (product) {
        
        console.log(`Producto encontrado con ID ${id}:`, product);
        return product;
      } else {
        
        console.error(`Producto no encontrado con ID ${id}`);
        return null;
      }
    } catch (error) {
      console.error("Error al buscar producto:", error);
      return null;
    }
  }

  // Eliminar un producto por ID
  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      console.error("Producto no encontrado con ID:", id);
      return;
    }

    this.products.splice(index, 1);
    await this.saveProducts();
    console.log(`Producto con ID ${id} eliminado correctamente`);
  }

  // Actualizar un producto por ID
  async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      console.error("Producto no encontrado con ID:", id);
      return;
    }

    const updatedProduct = {
      ...this.products[index],
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products[index] = updatedProduct;

    await this.saveProducts();
    console.log("Producto actualizado correctamente:", updatedProduct);
  }
}

// Ejemplo de uso
(async () => {
    const products = new ProductsManager();
   
    // Muestra los productos actuales
    console.log(await products.getProducts());
    
    // Agrega dos productos nuevos
    await products.addProduct("Titulo4", "Description4", 400, "Imagen4", "abc444", 40);
  })();
  