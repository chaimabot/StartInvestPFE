import { useEffect, useState } from "react";
import Header from "../components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import { callApi } from "../api";
import { PublicationsAutrePub, ModelPublication } from "../services";
import { useParams } from "react-router-dom";
import "./profileAutre.css";

const Profile = () => {
  const [previewURL, setPreviewURL] = useState(null);
  const [userdetail, setUserdetail] = useState();
  const [startup, setStartup] = useState();
  const { userId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [idStartup, setIdStartup] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [flouciExists, setFlouciExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStartup(userId);
    getUser(userId);
    handleCheckFollow();
    checkFlouciExistence();
  }, [userId]);

  useEffect(() => {
    if (idStartup) {
      checkFlouciExistence();
    }
  }, [idStartup]);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getUser = (userId) => {
    callApi(`auth/userById/${userId}`).then((data) => {
      setUserdetail(data);
      setPreviewURL(data.image);
      setLoading(false);
    });
  };

  const getStartup = async (userId) => {
    await callApi(`auth/startup/${userId}`, "GET").then((response) => {
      setStartup(response);
      setIdStartup(response.id);
    });
  };

  const handleFollow = () => {
    if (!userId) {
      return;
    }

    callApi(`auth/follow`, "POST", {
      follower_id: userId,
    })
      .then((response) => {
        setIsFollowing(true);
      })
      .catch((error) => {
        console.error("Error following user:", error);
      });
  };

  const handleUnfollow = () => {
    if (!userId) {
      return;
    }

    callApi(`auth/unfollow/${userId}`, "DELETE")
      .then((response) => {
        setIsFollowing(false);
      })
      .catch((error) => {
        console.error("Error unfollowing user:", error);
      });
  };

  const handleCheckFollow = () => {
    if (!userId) {
      return;
    }

    callApi(`auth/checkFollow/${userId}`, "GET")
      .then((response) => {
        setIsFollowing(response.isFollowing);
      })
      .catch((error) => {
        console.error("Error checking follow status:", error);
      });
  };

  const checkFlouciExistence = async () => {
    try {
      const response = await callApi("auth/checkFlouciExistence", "POST", {
        id_startup: idStartup,
      });
      setFlouciExists(response.exists);
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'existence de Flouci:",
        error
      );
    }
  };

  const handleInvestment = async () => {
    setLoading(true);
    try {
      const paymentResponse = await callApi("auth/generate-payment", "POST", {
        id_startup: idStartup,
      });

      if (paymentResponse.result && paymentResponse.result.link) {
        window.location.href = paymentResponse.result.link;
      } else {
        console.error(
          "Erreur lors de la génération du paiement:",
          paymentResponse
        );
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error("Erreur lors de la génération du paiement:", error);
      }
    } finally {
      setLoading(false); // Arrêter le chargement après l'appel API
    }
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />{" "}
      {loading ? (
        <div className="col text-center">
          <CircularProgress style={{ marginTop: "200px" }} />
        </div>
      ) : (
        <>
          <div className="container">
            <div className="row g-4">
              <br />
              <br />

              <div className="col-lg-8 vstack gap-4">
                <div className="card">
                  <div
                    className="h-200px rounded-top"
                    style={{
                      backgroundImage: "url(assets/images/bg/05.jpg)",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="card-body py-0">
                    <div className="d-flex align-items-start text-center text-sm-start">
                      <div className="position-relative d-inline-block me-4">
                        <div className="avatar avatar-xxl mt-n5 mb-3 position-relative">
                          <img
                            className="avatar-img rounded-circle border border-white border-3"
                            src={
                              userdetail && userdetail.image
                                ? `http://127.0.0.1:8000/uploads/${userdetail.image}`
                                : "assets/images/avatar/no-image-male.jpg"
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      {userdetail && (
                        <div className="flex-grow-1">
                          {/* Info */}
                          <h1 className="mb-0 h5">{userdetail.name}&nbsp;</h1>
                          <p>{userdetail.type}</p>
                          <div className=" rounded px-2 py-1 d-inline-block float-end">
                            <button
                              className={`btn btn-link ${
                                isFollowing ? "text-muted" : ""
                              } me-2`}
                              title={
                                isFollowing ? "Se désabonner" : "S'abonner"
                              }
                              onClick={
                                isFollowing ? handleUnfollow : handleFollow
                              }
                            >
                              <i
                                className={`bi ${
                                  isFollowing
                                    ? "bi-check-square-fill"
                                    : "bi-plus-square-fill"
                                }`}
                                alt={
                                  isFollowing ? "Se désabonner" : "S'abonner"
                                }
                              ></i>{" "}
                              {isFollowing ? "Suivi(e)" : "Suivre"}
                            </button>
                            {flouciExists &&
                              userdetail &&
                              userdetail.type === "fondateur" && (
                                <button
                                  className="btn btn-primary"
                                  onClick={handleInvestment}
                                  disabled={loading}
                                >
                                  {loading ? "Loading..." : "Investir"}
                                </button>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                    <br></br>
                    {errorMessage && (
                      <div className="error-message" role="alert">
                        {errorMessage}
                      </div>
                    )}
                    {userdetail && (
                      <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                        <li className="list-inline-item">
                          <i className="bi bi-calendar2-plus me-1" />
                          compte créé le {formatDate(userdetail.created_at)}
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="card-footer mt-3 pt-2 pb-0">
                    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                      <li className="nav-item">
                        {" "}
                        <a className="nav-link active"> Posts </a>{" "}
                      </li>
                    </ul>
                  </div>
                </div>

                <PublicationsAutrePub />
              </div>

              <div className="col-lg-4">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-12">
                    <div className="card">
                      <div className="card-header border-0 pb-0">
                        <h5 className="card-title">About</h5>
                      </div>
                      {userdetail && (
                        <div className="card-body position-relative pt-0">
                          {startup && <p>{startup.description}</p>}
                          <ul className="list-unstyled mt-3 mb-0">
                            <li className="mb-2">
                              {" "}
                              <i className="bi bi-telephone fa-fw pe-1" />{" "}
                              Télephone: <strong> {userdetail.numero} </strong>{" "}
                            </li>
                            <li>
                              {" "}
                              <i className="bi bi-envelope fa-fw pe-1" /> Email:{" "}
                              <strong> {userdetail.email} </strong>{" "}
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ModelPublication />
        </>
      )}
    </div>
  );
};

export default Profile;
