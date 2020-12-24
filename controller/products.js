const ProductModel = require("../models/product_model");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "EKA SHOP | Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new ProductModel(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("shop", {
      pageTitle: "EKA SHOP | Shop",
      prods: products,
      path: "/",
      hasProducts: products.length > 0,
    });
  });
};
