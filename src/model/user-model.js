const fs = require("fs").promises;
const pathData = "./src/data/user.json";

exports.getUsers = async () => {
    let users;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        users = manipulableData.users
        return users
    }).catch(error => {
        throw new Error("Une erreur est survenue");
    })
    return users
}

exports.getUserbyID = async (id) => {
    let user;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        user = manipulableData.users.find(user => user.id === id);
        return user;
    }).catch(error => {
        throw new Error("Une erreur est survenue 2");
    })
    return user;
}

exports.getUserbyName = async (name) => {
    let user;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        user = manipulableData.users.find(user => user.username === name);
        return user;
    }).catch(error => {
        throw new Error("Une erreur est survenue 2");
    })
    return user;
}

exports.createUser = async (user) => {
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        const lastUser = manipulableData.users[manipulableData.users.length - 1]
        user["id"] = lastUser.id + 1
        manipulableData.users.push(user);
        fs.writeFile(pathData, JSON.stringify(manipulableData)).then(() => {
            console.log("Ok c'est cool ")
        }).catch(error => {
            throw new Error("Erreur pour l'écriture")
        })
    }).catch(error => {
        throw new Error("Erreur au moment de la lecture du produit")
    })
}

exports.deleteUser = async (id) => {
    try {
        const data = await fs.readFile(pathData);
        const manipulableData = JSON.parse(data);
        const index = manipulableData.users.findIndex(user => user.id === id);

        if (index !== -1) {
            manipulableData.users.splice(index, 1);
            await fs.writeFile(pathData, JSON.stringify(manipulableData));
            console.log("Donnée réécrite");
            return manipulableData.users;
        } else {
            throw new Error("User non trouvé");
        }
    } catch (error) {
        throw new Error("Une erreur s'est produite : " + error.message);
    }
}



exports.updateUser = async (id, updatedUser) => {
    try {
        const data = await fs.readFile(pathData);
        const manipulableData = JSON.parse(data);
        const idUser = manipulableData.users.findIndex(user => user.id === id);
        if (idUser !== -1) {
            if (updatedUser.users.UserName) {
                manipulableData.users[idUser].UserName = updatedUser.users.UserName;
            }
            await fs.writeFile(pathData, JSON.stringify(manipulableData));
            console.log("Produit mis à jour");
            return manipulableData;
        } else {
            throw new Error("Produit non trouvé");
        }
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du produit");
    }
}