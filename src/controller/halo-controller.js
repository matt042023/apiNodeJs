const { getAllShipInformation, getInformationDetail, createOfficierMember, deleteMember, updateMember } = require("../model/halo-model");

exports.getAllShipInformations = async (request, response) => {
    try {
        const infos = await getAllShipInformation();
        response.status(200).json(infos);
    } catch (error) {
        response.status(500).json({ error: error });
    }
}

exports.getInformationsdetails = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const info = await getInformationDetail(id);
        response.status(200).json(info);
    } catch (error) {
        response.status(500).json({ error: error });
    }
}
exports.createOfficiersMember = async (request, response) => {
    try {
        const member = request.body
        await createOfficierMember(member)
        response.status(201).json({ message: "L'officier est crée" })
    } catch (error) {
        response.status(501).json({ error: error })
    }
}
exports.deleteMembers = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        await deleteMember(id);
        response.status(204).json();
    } catch (error) {
        response.status(504).json({ error: "Impossible de supprimer l'utilisateur" });
    }
}

exports.updateMembers = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const updatedOfficer = request.body;
        await updateMember(id, updatedOfficer)
        response.status(201).json({ message: "User est modifié" })
    } catch (error) {
        response.status(501).json({ error: "User n'est pas modifié" })
    }
}