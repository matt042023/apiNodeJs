const { getUsers, getUserbyID, createUser, deleteUser, updateUser, getUserbyName } = require("../model/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()


exports.getAllUser = async (request, response) => {
    try {
        const products = await getUsers();
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ error: error });
    }
}

exports.getUsersbyID = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const user = await getUserbyID(id);
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ error: error });
    }
}
exports.createUsers = async (request, response) => {
    try {
        const user = { "username": request.body.username, "password": request.body.password }
        await bcrypt.hash(user.password, 10).then(passwordHashed => {
            user.password = passwordHashed;
            createUser(user);
            response.status(201).json({ message: "L'utilisateur est crée" })
        }).catch(error => {
            response.status(500).json({ message: "une erreur est survenue lors de l'encryptage du mot de passe" });
        })
    } catch (error) {
        response.status(501).json({ error: error })
    }
}
exports.deleteUsers = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        await deleteUser(id); // Supprimez l'utilisateur
        response.status(204).json(); // Réponse sans corps, code de statut 204
    } catch (error) {
        response.status(504).json({ error: "Impossible de supprimer l'utilisateur" });
    }
}

exports.updateUsers = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const updatedUser = request.body;
        await updateUser(id, updatedUser)
        response.status(201).json({ message: "User est modifié" })
    } catch (error) {
        response.status(501).json({ error: "User n'est pas modifié" })
    }
}

exports.loginUser = async (request, response) => {
    try {
        const user = { "name": request.body.username, "password": request.body.password };
        await getUserbyName(user.name).then(userDb => {
            console.log(userDb.password)
            bcrypt.compare(user.password, userDb.password).then(isOk => {
                console.log(isOk)
                if (isOk) {
                    console.log("ok")
                    const token = jwt.sign({ "userId": userDb.id,"role":"admin" }, process.env.JWT_KEY)
                    console.log(token)
                    response.status(200).json({ "token": token });
                } else {
                    console.log("pas ok")
                    response.status(503).json({ message: "le mdp n'est pas valide" });
                }
            }).catch(error => {
                response.status(500).json({ message: "erreur lors de la vérification du mdp" })
            })
        }).catch(error => {
            response.status(404).json({ message: " Cet utilisateur n'existe pas" });
        })
    } catch (error) {
        response.status(500).json({ message: "Une erreur est survenue", error: error })
    }
}