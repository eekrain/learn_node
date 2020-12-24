const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const productsPath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );
    fs.readFile(productsPath, (err, fileContent) => {
      let products = [];

      if (!err) {
        products = JSON.parse(fileContent);
      }
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
    const productsPath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    fs.readFile(productsPath, (err, fileContent) => {
      if (err) {
        callback([]);
      }
      callback(JSON.parse(fileContent));
    });
  }
};
