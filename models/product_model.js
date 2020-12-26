const e = require("express");
const fs = require("fs");
const path = require("path");

const CartModel = require("./cart_model");

const productsPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(productsPath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

const randStr = (length) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = parseInt(price);
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
          console.log(
            "🚀 ~ file: product_model.js ~ line 47 ~ Product ~ fs.writeFile ~ err",
            err
          );
        });
      } else {
        this.id = randStr(8);
        products.push(this);
        fs.writeFile(productsPath, JSON.stringify(products), (err) => {
          console.log(
            "🚀 ~ file: product_model.js ~ line 56 ~ Product ~ fs.writeFile ~ err",
            err
          );
        });
      }
    });
  }

  static deleteById(productId) {
    getProductsFromFile((products) => {
      const productToDelete = products.find((prod) => prod.id === productId);
      const updatedProducts = products.filter((prod) => prod.id !== productId);
      fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          CartModel.deleteProduct(productId, productToDelete.price);
        }
        console.log(
          "🚀 ~ file: product_model.js ~ line 69 ~ Product ~ fs.writeFile ~ err",
          err
        );
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((tempProduct) => tempProduct.id === id);
      callback(product);
    });
  }
};
