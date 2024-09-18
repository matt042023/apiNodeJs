exports.welcome = (request, response) => {
    response.status(200).json({ message: "Bienvenue sur l'application café" });
};