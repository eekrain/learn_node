const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.locals.ejs_util = require("./utils/ejs-util");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controller/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

// Jika url tidak ada yang match, maka 404 error
app.use(errorController.get404Error);

app.listen(3000);
