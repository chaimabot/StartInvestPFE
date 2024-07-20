import React, { useState } from "react";
import Header from "../components/header";
import { SidebarLeft } from "../services";
import { callApi } from "../api";
import { Link } from "react-router-dom";

export default function Reclamation() {
  const [formData, setFormData] = useState({
    sujet: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await callApi("auth/reclamation", "POST", formData);

      setSuccessMessage("Réclamation soumise avec succès !");
      setFormData({
        sujet: "",
        description: "",
      });
    } catch (error) {
      setErrorMessage(
        error.message ||
          "Une erreur s'est produite lors de la soumission de la réclamation. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
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
            <SidebarLeft />
            <div className="col-md-8 col-lg-6 vstack gap-4">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h1 className="h4 card-title mb-0">
                    Formulaire de Réclamation
                  </h1>
                </div>
                <div className="card-body">
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sujet"
                        name="sujet"
                        value={formData.sujet}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        rows={5}
                        placeholder="Message"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 text-end">
                      <button
                        type="submit"
                        className="btn btn-primary mb-0"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                      </button>
                      <Link
                        to="/listReclamation"
                        className="btn btn-secondary ms-2"
                      >
                        Liste des Réclamations
                      </Link>{" "}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </main>
    </div>
  );
}
