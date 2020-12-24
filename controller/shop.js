const ProductModel = require("../models/product_model");

exports.getIndex = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "EKA SHOP | Shop",
      prods: products,
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "EKA SHOP | All Products",
      prods: products,
      path: "/products",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "EKA SHOP | Your Cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "EKA SHOP | Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/cart",
    pageTitle: "EKA SHOP | Checkout",
  });
};
