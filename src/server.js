const cors = require("cors");
const express = require("express");
const app = express();
const baseRoutes = require('./routes/base-routes');
const productsRoutes = require('./routes/products-routes');
const UserRoutes = require('./routes/user-routes');
const HaloRoutes = require('./routes/halo-routes');
const bodyParser =  require("body-parser")
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json()); 
app.use("/base",baseRoutes);
app.use("/products",productsRoutes);
app.use("/users",UserRoutes);
app.use("/halo",HaloRoutes);


app.listen(process.env.PORT, () => {
    console.log("l'application tourne sur le port 3000")
});