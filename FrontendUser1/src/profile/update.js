import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../services";
import { callApi } from "../api";

export default function UpdateProfile() {
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await callApi("auth/getUserType", "POST", {
        typePerson: type,
      });
      console.log("Données enregistrées avec succès :", response);
      window.location.href = "/editProfile";
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données :", error);
    }
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />{" "}
      <main>
        <div className="container">
          <br />
          <br />
          <div className="row g-4">
            <div className="col-md-8 col-lg-6 vstack gap-4">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h1 className="h4 card-title mb-0">
                    Personnalisation du profil
                  </h1>
                </div>
                <div className="card-body">
                  <form className="row g-3" onSubmit={handleSave}>
                    <div className="col-sm-6 col-lg-4">
                      <label className="form-label">Type de personne</label>
                      <select
                        className="form-select js-choice"
                        data-search-enabled="true"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        required
                      >
                        <option value="">Sélectionnez le type</option>
                        <option value="fondateur">Fondateur</option>
                        <option value="investisseur">Investisseur</option>
                      </select>
                    </div>
                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-primary mb-0">
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
