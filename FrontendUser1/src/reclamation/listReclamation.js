import { useState, useEffect } from "react";
import { callApi } from "../api";
import { Header, SidebarLeft } from "../services";

const ListReclamation = () => {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedReclamation, setExpandedReclamation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApi("auth/listReclamation", "GET");
        setReclamations(response.reclamations);
        setLoading(false);
      } catch (error) {
        setError(
          "Une erreur s'est produite lors du chargement des réclamations."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReclamationClick = (reclamationId) => {
    setExpandedReclamation(
      expandedReclamation === reclamationId ? null : reclamationId
    );
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <main>
        <div className="container mt-5">
          <div className="row g-4">
            <SidebarLeft />
            <div className="col">
              <br></br>
              <h1 className="text-center mb-4">Liste des Réclamations</h1>
              <div className="list-group">
                {loading ? (
                  <div className="text-center">Chargement en cours...</div>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : reclamations.length === 0 ? (
                  <div className="alert alert-info">
                    Aucune réclamation trouvée.
                  </div>
                ) : (
                  reclamations.map((reclamation) => (
                    <div key={reclamation.id}>
                      <div
                        className="list-group-item list-group-item-action mb-3"
                        onClick={() => handleReclamationClick(reclamation.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <h5 className="mb-3">{reclamation.sujet}</h5>
                        <p className="mb-1">
                          {expandedReclamation === reclamation.id
                            ? reclamation.description
                            : `${reclamation.description.substring(0, 100)}...`}
                        </p>{" "}
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            className={`badge ${
                              reclamation.statut === "en_attente"
                                ? "bg-warning"
                                : reclamation.statut === "en_traitement"
                                ? "bg-primary"
                                : reclamation.statut === "resolue"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {reclamation.statut}
                          </span>
                          <button className="btn btn-link">Voir plus</button>{" "}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListReclamation;
