const fs = require("fs").promises;
const pathData = "./src/data/cafe.json";
exports.getProducts = async () => {
    let products;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        products = manipulableData.products
        return products
    }).catch(error => {
        throw new Error("Une erreur est survenue");
    })
    return products
}

exports.getProductbyID = async (id) => {
    let product;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        product = manipulableData.products.find(product => product.id === id);
        return product;
    }).catch(error => {
        throw new Error("Une erreur est survenue 2");
    })
    return product
}

exports.createProduct = async (product) => {
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        const lastProduct = manipulableData.products[manipulableData.products.length - 1]
        product["id"] = lastProduct.id + 1
        manipulableData.products.push(product);
        fs.writeFile(pathData, JSON.stringify(manipulableData)).then(() => {
            console.log("Ok c'est cool ")
        }).catch(error => {
            throw new Error("Erreur pour l'écriture")
        })
    }).catch(error => {
        throw new Error("Erreur au moment de la lecture du produit")
    })
}

exports.deleteProduct = async (id) => {
    let product;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        const index = manipulableData.products.findIndex(product => product.id === id);
        if (index !== -1) {
            product = manipulableData.products.splice(index, 1)[0];
            fs.writeFile(pathData, JSON.stringify(manipulableData)).then(() => {
                console.log("Produit bien supprimé");
            }).catch(error => {
                throw new Error("Erreur lors de l'écriture après la suppression");
            });
        } else {
            throw new Error("Produit non trouvé");
        }
    }).catch(error => {
        throw new Error("Erreur lors de la lecture du produit");
    });
    return product;
}
exports.updateProduct = async (id, updatedProduct) => {
    try {
        const data = await fs.readFile(pathData);
        const manipulableData = JSON.parse(data);
        const idProduct = manipulableData.products.findIndex(product => product.id === id);
        if (idProduct !== -1) {
            if (updatedProduct.name) {
                manipulableData.products[idProduct].name = updatedProduct.name;
            } else if (updatedProduct.price) {
                manipulableData.products[idProduct].price = updatedProduct.price;
            }
            await fs.writeFile(pathData, JSON.stringify(manipulableData));
            console.log("Produit mis à jour");
            return updatedProduct;
        } else {
            throw new Error("Produit non trouvé");
        }
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du produit");
    }
}

/*exports.updateProduct = async (id, body) => {
    let updateProduct;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        const index = manipulableData.products.findIndex(product => product.id === id);
        if (index !== -1) {
            manipulableData.products[index] = body;
            fs.writeFile(pathData, JSON.stringify(manipulableData)).then(() => {
                console.log("Produit mis à jour");
            }).catch(error => {
                throw new Error("Erreur");
            });
        } else {
            throw new Error("Produit non trouvé");
        }
    }).catch(error => {
        throw new Error("Erreur lors de la lecture du produit");
    });
    return body;
}*/