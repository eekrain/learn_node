const ProductModel = require("../models/product_model");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "EKA SHOP | Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new ProductModel(title, imageUrl, description, price);
  product.save();
  res.redirect("/products");
};

exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "EKA SHOP | Admin Products",
      prods: products,
      path: "/admin/products",
    });
  });
};
