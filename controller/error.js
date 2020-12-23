exports.get404Error = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "EKA SHOP | Page Not Found",
    path: "not found",
  });
};
