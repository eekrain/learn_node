const fs = require("fs");
const path = require("path");

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
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(productsPath, JSON.stringify(products), (err) => {
        console.log(
          "🚀 ~ file: product_model.js ~ line 23 ~ Product ~ fs.writeFile ~ err",
          err
        );
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
