const fs = require("fs");

class ProductManager {
    constructor() {
        this.path = "./ProductManager.json";
        this.products = [];
        this.leerJson();
    }

    leerJson = () => {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(data);
        }
    };

    guardarJson = () => {
        const data = JSON.stringify(this.products, null, 4);
        fs.writeFileSync(this.path, data);
    };

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        if (this.products.some((product) => product.code === code)) {
            console.log("El codigo ya esta en uso");
            return;
        }
        thumbnail = thumbnail || "Sin Imagen";

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        this.products.push(product);
        this.guardarJson();
    };

    getProducts = () => {
        return this.products;
    };

    getProductById = (id) => {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.log("No encontrado");
        }
        return product;
    };

    updateProduct = (id, productoActualizado) => {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            console.log("No encontrado");
            return;
        }
        this.products[index] = {
            ...this.products[index],
            ...productoActualizado,
        };
        this.guardarJson();
    };

    deleteProduct = (id) => {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            console.log("No encontrado");
            return;
        }
        this.products.splice(index, 1);
        console.log("Producto Eliminado");
        this.guardarJson();
    };
}

const productManager = new ProductManager(); // se crea instancia
// console.log(productManager.getProducts()); // se verifica que recien creada devuelva un array vacio
// productManager.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     200,
//     "",
//     "abc123",
//     25
// ); //se agrega un producto
// console.log(productManager.getProducts()); // se muestra el producto agregado
// productManager.getProductById(5); // se verifica al buscar por un id inexistente que arroje error
// console.log(productManager.getProductById(1)); // se muestra un producto existente encontrado por el id
// productManager.updateProduct(1, {
//     title: "producto prueba actualizado",
//     code: "jwp234",
// }); // se actualizado un producto por su id(manteniendo el mismo)
// console.log(productManager.getProducts()); // se comprueba que el producto se actualizo correctamente
// productManager.deleteProduct(1); // se elimina un producto por el id
// productManager.deleteProduct(5); // se verifica que si el id no existe arroje un error
// console.log(productManager.getProducts()); // se comprueba que el producto se elimino correctamente

console.log(productManager.getProducts());

productManager.addProduct(
    "producto prueba5",
    "Este es un producto prueba",
    200,
    "",
    "abc1235",
    25
);

productManager.addProduct(
    "producto prueba6",
    "Este es un producto prueba",
    200,
    "",
    "abc1236",
    25
);

productManager.addProduct(
    "producto prueba7",
    "Este es un producto prueba",
    200,
    "",
    "abc1237",
    25
);

// productManager.addProduct(
//     "producto prueba4",
//     "Este es un producto prueba",
//     200,
//     "",
//     "abc1234",
//     25
// );

console.log(productManager.getProducts());
