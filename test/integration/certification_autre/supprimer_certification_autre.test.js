const setupTestDB = require("../../utils/setupTestDB");
const { Utilisateur } = require("../../../src/models");
const CertificationMetier = require("../../../src/models/certification_autre.model");
const app = require("../../../src/app");
const request = require("supertest");
setupTestDB();

describe("Certification Autre routes", () => {
  describe("DELETE /v1/certification_autre/:id", () => {
    // Initiation de la création d'une certification autre
    let supprimerCertificationAutre;

    beforeEach(async () => {
      supprimerCertificationAutre = {
        nom: "certification 1",
        description: "description",
        id_utilisateur: "",
        id_statut: "",
        date_validite: "",
      };
    });

    // test succès 200 => suppression d'une certification autre
    test("devrait retourner 200 et supprimer avec succès une certification autre si les données sont correctes.", async () => {
      const res = await request(app)
        .delete("/v1/certification_autre/:id")
        .send(supprimerCertificationAutre);

      // vérifie si ça renvoie bien une 200
      expect(res.status).toEqual(200);

      // vérifie que la réponse du res.body.message correspond bien avec la certification autre qui a été crée dans le supprimerCertificationAutre
      expect(res.body.message).toEqual({
        id: expect.anything(),
        nom: supprimerCertificationAutre.nom,
        description: supprimerCertificationAutre.description,
        id_utilisateur: supprimerCertificationAutre.id_utilisateur,
        id_statut: supprimerCertificationAutre.id_utilisateur,
        date_validite: supprimerCertificationAutre.date_validite,
      });
    });

    // test erreur 400 => un champs est manquant
    test("devrait retourner 400 => element manquant / joi validation error", async () => {
      const res = await request(app)
        .delete("/v1/certification_autre/:id")
        .send({
          nom: "certification 1",
          id_utilisateur: "",
          id_statut: "",
          date_validite: "",
        });

      // vérifie si ça renvoie bien une erreur 400
      expect(res.status).toEqual(400);
    });

    // test erreur 404 => url non trouvé
    test("devrait retourner 404 => url non trouvé", async () => {
      const res = await request(app).delete("/v1/certification_autrerr").send({
        nom: "certification 1",
        description: "description",
        id_utilisateur: "",
        id_statut: "",
        date_validite: "",
      });

      // vérifie si ça renvoie bien une erreur 404
      expect(res.status).toEqual(404);
    });

    // test erreur 400 => un champs est déjà existant
    test("devrait retourner 400 => element déjà existant", async () => {
      const res = await request(app)
        .delete("/v1/certification_autre/:id")
        .send({
          nom: "certification 1",
          description: "description",
          id_utilisateur: "",
          id_statut: "",
          date_validite: "",
        });

      // vérifie si ça renvoie bien une erreur 400
      expect(res.status).toEqual(400);
    });
  });
});
