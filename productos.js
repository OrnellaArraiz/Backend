class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }

    //Agregar un producto nuevo
    addProduct(title, description, price, thumbnail, code, stock) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].code === code) {
          throw new Error(`El código ${code} ya existe.`);
        }
      }
  
      const newProduct = {
        id: this.nextId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      if (!Object.values(newProduct).every((value) => value !== undefined)) {
        throw new Error("Todos los campos son requeridos");
      }
  
      this.products.push(newProduct);
      return newProduct;
    }

    //Obtener todos los productos
    getProducts() {
      return this.products;
    }
  
    FoundIt(id) {
      return this.products.find((existingProduct) => existingProduct.id === id);
    }
  
    //Obtener un solo producto
    getProductById(id) {
      const product = this.FoundIt(id);
  
      if (!product) {
        throw new Error("Producto no encontrado");
      }
  
      console.log(`Producto encontrado: ${JSON.stringify(product)}`);
      return product;
    }
  }

  //Caso de prueba
  const productCreated = new ProductManager();
  
  console.log(productCreated.getProducts());
  
  productCreated.addProduct(
    "Producto de prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
    
  console.log(productCreated.getProducts());
  
  try {
    console.log(productCreated.getProductById(1));
    console.log(productCreated.getProductById(3));
  
    productCreated.addProduct(
      "Nuevo producto de prueba",
      "Este es otro producto de prueba",
      700,
      "Sin imagen2",
      "abc123",
      45
    );
  } catch (error) {
    console.error(error.message);
  }
  
  try {
    productCreated.addProduct(
      "Producto de Prueba",
      "Este es un producto de prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    );
  } catch (error) {
    console.error(error.message);
  }