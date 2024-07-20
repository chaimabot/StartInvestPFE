import React, { useEffect, useState } from "react";
import { callApi } from "../api";

import { SidebarLeft, Header } from "../services";

const CompteFlouci = () => {
  const [app_secret, setAppSecret] = useState("");
  const [app_public, setAppPublic] = useState("");
  const [amount, setAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const getCompteCorrdonnées = async () => {
    try {
      const response = await callApi("auth/getCompteCorrdonnees");
      setAppSecret(response.app_secret);
      setAppPublic(response.app_public);
      setAmount(response.amount);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  useEffect(() => {
    getCompteCorrdonnées();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSuccessMessage("");
      setShowSuccess(false);

      const formData = new FormData();
      formData.append("app_public", app_public);
      formData.append("app_secret", app_secret);
      formData.append("amount", amount);
      const response = await callApi(
        "auth/createCompte",
        "POST",
        formData,
        true
      );
      setAppSecret("");
      setAppPublic("");
      setAmount(0);
      setSuccessMessage("Coordonnées du compte ajoutées avec succès !");
      setShowSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <br />
        <br />
        <br />
        <main>
          <div className="container">
            <br />
            <br />
            <div className="row g-4">
              <SidebarLeft />

              <div className="col-md-8 col-lg-6 vstack gap-4">
                <div className="card">
                  <div className="card-header border-0 pb-0">
                    <h1 className="h4 card-title mb-0">Gestion du profile</h1>
                  </div>
                  <div className="card-body">
                    <p>
                      Si vous n'avez pas de compte en Flouci, voici le lien :{" "}
                      <a href="https://fr.flouci.com/">flouci.com</a>
                    </p>
                    {showSuccess && (
                      <div className="alert alert-success">
                        {successMessage}
                      </div>
                    )}
                    {!showSuccess && (
                      <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-sm-6 col-lg-4">
                          <label className="form-label">App secrète</label>
                          <input
                            type="text"
                            className="form-control"
                            name="app_secret"
                            value={app_secret}
                            onChange={(e) => {
                              setAppSecret(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-lg-4">
                          <label className="form-label">App publique</label>
                          <input
                            type="text"
                            className="form-control"
                            name="app_public"
                            value={app_public}
                            onChange={(e) => {
                              setAppPublic(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="form-label">
                            Montant à investir (en pourcentage du capital
                            social)
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="amount"
                              placeholder="Montant à investir"
                              value={amount}
                              onChange={(e) => {
                                setAmount(e.target.value);
                              }}
                            />
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                        <div className="col-12 text-end">
                          <button
                            type="submit"
                            className="btn btn-primary mb-0"
                          >
                            Ajouter
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CompteFlouci;
