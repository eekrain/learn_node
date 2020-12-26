const fs = require("fs");
const path = require("path");

const cartPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static getCart(cb) {
    fs.readFile(cartPath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

  static addProduct(id, productPrice) {
    console.log("masuk addProduct");
    console.log(
      "🚀 ~ file: cart_model.js ~ line 12 ~ Product ~ addProduct ~ productPrice",
      productPrice
    );
    // fetch previous cart
    fs.readFile(cartPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        (tempProduct) => tempProduct.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      // add new product
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;

      fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(
            "🚀 ~ file: cart_model.js ~ line 39 ~ Product ~ fs.writeFile ~ err",
            err
          );
        }
      });
    });
  }

  static deleteProduct(productId, productPrice) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        return;
      }
      const oldCart = JSON.parse(fileContent);
      const updatedCart = { ...oldCart };

      const product = updatedCart.products.find(
        (prod) => prod.id === productId
      );
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== productId
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => {
        console.log(
          "🚀 ~ file: cart_model.js ~ line 72 ~ Cart ~ fs.writeFile ~ err",
          err
        );
      });
    });
  }
};
