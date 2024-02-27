class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    // Agregar un producto nuevo
    addProduct(newProduct) {
      const { title, description, price, thumbnail, code, stock } = newProduct;
  
      const product = {
        id: this.nextId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      if (!Object.values(product).every((value) => value !== undefined && value !== null)) {
        throw new Error("Todos los campos son requeridos");
      }
  
      this.products.push(product);
      return product;
    }
  
    // Obtener todos los productos
    getProducts() {
      return this.products;
    }
  
    FoundIt(id) {
      return this.products.find((existingProduct) => existingProduct.id === id);
    }
  
    // Obtener un solo producto
    getProductById(id) {
      const product = this.FoundIt(id);
  
      if (!product) {
        throw new Error("Producto no encontrado");
      }
  
      console.log(`Producto encontrado: ${JSON.stringify(product)}`);
      return product;
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  const productData = {
    title: "papa",
    description: "Papa blanca x kg",
    price: 600,
    thumbnail: "sin imagen",
    code: "abc456",
    stock: 60
  };
  
  productManager.addProduct(productData);
  
  
  console.log(productManager.getProducts());
  
  productManager.addProduct({
    title: "Producto de prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen1",
    code: "abc123",
    stock: 25
  });
  
  console.log(productManager.getProducts());
  
  productManager.addProduct({
    title: "Otro producto de prueba",
    description: "Este es otro producto de prueba",
    price: 300,
    thumbnail: "Sin imagen2",
    code: "xyz789",
    stock: 35
  });
  
  try {
    console.log(productManager.getProductById(1));
    const product3 = productManager.getProductById(3);
    if (product3) {
      console.log(product3);
    } else {
      console.log("No se encontró ningún producto con ID 3");
    }
  
    productManager.addProduct({
      title: "Nuevo producto de prueba",
      description: "Este es otro producto de prueba",
      price: 700,
      thumbnail: "Sin imagen3",
      code: "abc123",
      stock: 45
    });
  } catch (error) {
    console.error(error.message);
  }
  
  try {
    productManager.addProduct({
      title: "Producto de Prueba",
      description: "Este es un producto de prueba",
      price: 200,
      thumbnail: "Sin imagen4",
      code: "abc123",
      stock: 25
    });
  } catch (error) {
    console.error(error.message);
  }
  