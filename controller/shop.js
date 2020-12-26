const ProductModel = require("../models/product_model");
const CartModel = require("../models/cart_model");

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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  ProductModel.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      path: "/products",
      product: product,
      pageTitle: `EKA SHOP | ${product.title}`,
    });
  });
};

exports.getCart = (req, res, next) => {
  CartModel.getCart((cart) => {
    ProductModel.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "EKA SHOP | Your Cart",
        cartProducts: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("🚀 ~ file: shop.js ~ line 44 ~ prodId", prodId);
  ProductModel.findById(prodId, (product) => {
    CartModel.addProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product) => {
    CartModel.deleteProduct(prodId, product.price);
    res.redirect("/cart");
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
