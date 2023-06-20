class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }

  class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(product) {
      // Revisa que el codigo del producto sea unico
      const isCodeUnique = this.products.every((p) => p.code !== product.code);
      if (!isCodeUnique) {
        console.log(`Product code '${product.code}' is not unique. Please provide a unique code.`);
        return;
      }
  
      // Revisa que todos los atributos tengan valores
      const missingAttributes = [];
      for (const key in product) {
        if (product.hasOwnProperty(key) && !product[key]) {
          missingAttributes.push(key);
        }
      }
  
      if (missingAttributes.length > 0) {
        console.log('There are missing values, cant add the product.');
        return;
      }
  
      // Asigna un ID autoincremental al agregar el producto
      product.id = this.nextId;
      this.nextId++;
      this.products.push(product);
    }
  
    getProduct() {
        let productList = '';
        for (const product of this.products) {
          productList += `ID: ${product.id}, Titulo: ${product.title}\n`;
        }
    
        if (productList === '') {
          productList = 'No hay productos disponibles.';
        }
    
        console.log(productList);
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        console.log(product);
      } else {
        console.log("No Encontrado");
      }
    }
  }
  
const manager = new ProductManager();

function promptUser() {
  const choice = prompt(
    "Escoje lo que deseas hacer:\n1. Agregar un Producto\n2. Mostrar todos los productos\n3. Buscar un producto por ID\n\nIngresa 'salir' para finalizar."
  );

  switch (choice) {
    case "1":
      const title = prompt("Ingresa el title:");
      const description = prompt("Ingresa el description:");
      const price = parseFloat(prompt("Ingresa el price:"));
      const thumbnail = prompt("Ingresa el thumbnail:");
      const code = prompt("Ingresa el code:");
      const stock = parseInt(prompt("Ingresa el stock:"));

      const product = new Product(title, description, price, thumbnail, code, stock);
      manager.addProduct(product);
      break;

    case "2":
      manager.getProduct();
      break;

    case "3":
      const id = parseInt(prompt("Ingresa el ID del producto:"));
      manager.getProductById(id);
      break;

    case "salir":
      console.log("Nos vemos.");
      return;

    default:
      console.log("Opcion invalida. Porfavor vuelve a intentar.");
  }

  promptUser();
}

promptUser();
