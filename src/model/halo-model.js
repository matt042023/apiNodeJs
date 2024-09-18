const fs = require("fs").promises;
const pathData = "./src/data/halo.json";

exports.getAllShipInformation = async () => {
    let infos;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        infos = manipulableData
        return infos
    }).catch(error => {
        throw new Error("Une erreur est survenue");
    })
    return infos
}

exports.getInformationDetail = async (id) => {
    let information;
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        information = manipulableData.ship.equipage.officiers[id];
        return information;
    }).catch(error => {
        throw new Error("Une erreur est survenue 2");
    })
    return information;
}

exports.createOfficierMember = async (member) => {
    await fs.readFile(pathData).then(data => {
        const manipulableData = JSON.parse(data);
        const lastMember = manipulableData.ship.equipage.officiers[manipulableData.ship.equipage.officiers.length - 1]
        member["id"] = lastMember.id + 1
        manipulableData.ship.equipage.officiers.push(member);
        fs.writeFile(pathData, JSON.stringify(manipulableData)).then(() => {
            console.log("Ok c'est cool ")
        }).catch(error => {
            throw new Error("Erreur pour l'écriture")
        })
    }).catch(error => {
        throw new Error("Erreur au moment de la lecture du produit")
    })
}

exports.deleteMember = async (id) => {
    try {
        const data = await fs.readFile(pathData);
        const manipulableData = JSON.parse(data);
        if (id !== -1) {
            manipulableData.ship.equipage.officiers.splice(id, 1);
            await fs.writeFile(pathData, JSON.stringify(manipulableData));
            console.log("Donnée réécrite");
            return manipulableData.ship.equipage.officiers;
        } else {
            throw new Error("User non trouvé");
        }
    } catch (error) {
        throw new Error("Une erreur s'est produite : " + error.message);
    }
}



exports.updateMember = async (id, updatedOfficer) => {
    try {
        const data = await fs.readFile(pathData);
        const manipulableData = JSON.parse(data);
        manipulableData.ship.equipage.officiers[id] = updatedOfficer
        await fs.writeFile(pathData, JSON.stringify(manipulableData));
        console.log("Produit mis à jour");
        return manipulableData;
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du produit");
    }
}