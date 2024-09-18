const { getProducts, getProductbyID, createProduct, deleteProduct, updateProduct } = require("../model/products-model");
exports.getAllProducts = async (request, response) => {
    try {
        const products = await getProducts();
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ error: error });

    }
}
exports.getProductbyID = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const product = await getProductbyID(id);
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ error: error });

    }
}
exports.createProduct = async (request, response) => {
    try {
        const product = request.body.product
        await createProduct(product)
        response.status(201).json({message: "Le produit crée"})
    } catch (error) {
        response.status(501).json({error: error})
    }
}
exports.deleteProduct = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        console.log(id);
        const product = await deleteProduct(id);
        response.status(204).json(product);
    } catch (error) {
        response.status(504).json({ error: "impossible de supprimer le produit" });

    }
}

exports.updateProduct = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const updatedProduct = request.body;
        await updateProduct(id, updatedProduct)
        response.status(201).json({message: "Le produit est modifié"})
    } catch (error) {
        response.status(501).json({error: "le produit n'est pas modifié"})
    }
}