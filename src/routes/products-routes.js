const express = require("express");
const router = express.Router();
const {getAllProducts, getProductbyID, createProduct, deleteProduct, updateProduct} = require("../controller/products-controller");

router.get("/all-products", getAllProducts);
router.get("/by-id/:id", getProductbyID);
router.post("/create-product", createProduct);
router.delete("/delete-product/:id",deleteProduct);
router.put("/update-product/:id",updateProduct);

module.exports = router;