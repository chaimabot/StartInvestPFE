import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";
import { callApi } from "../api";
import { Button, Modal } from "react-bootstrap";

import { PublicationsProfile, Connections } from "../services";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [userdetail, setUserdetail] = useState();
  const [startup, setStartup] = useState();
  const [showModal, setShowModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  const getUserAndStartupDetails = async () => {
    try {
      const response = await callApi("auth/user");
      setUserdetail(response.user);
      if (response.startup) {
        setStartup(response.startup);
      }
      setLoading(false);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'utilisateur :",
        error
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAndStartupDetails();
  }, []);
  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setUploadedImage(URL.createObjectURL(selectedFile));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUploadedImage(null);
  };
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await callApi(
        "auth/uploadAvatar",
        "POST",
        formData,
        true
      );
      getUserAndStartupDetails();
      console.log(response);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleSaveImage = () => {
    handleImageUpload();
    handleCloseModal();
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
              <br></br>
              <br></br>
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
                    <div className="d-sm-flex align-items-start text-center text-sm-start">
                      <div className="position-relative d-inline-block">
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
                        <label
                          htmlFor="uploadAvatar"
                          className="btn btn-primary position-absolute bottom-0 end-0 p-0 d-flex align-items-center justify-content-center"
                          style={{
                            zIndex: "1",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        >
                          <i className="bi bi-camera"></i>
                        </label>
                        {/* Input pour sélectionner l'image */}
                        <input
                          id="uploadAvatar"
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </div>
                      {userdetail && (
                        <div className="ms-sm-4 mt-sm-3">
                          {/* Info */}
                          <h1 className="mb-0 h5">{userdetail.name}&nbsp;</h1>
                          <p>{userdetail.type}</p>
                        </div>
                      )}
                      <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                        <Link
                          className="btn btn-danger-soft me-2"
                          to="/editProfile"
                        >
                          <i className="bi bi-pencil-fill pe-1" /> modifier
                          profile
                        </Link>
                      </div>
                    </div>
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Image téléchargée</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="text-center">
                        {/* Afficher l'image téléchargée */}
                        {uploadedImage && (
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="img-fluid"
                          />
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Fermer
                        </Button>
                        <Button variant="primary" onClick={handleSaveImage}>
                          Enregistrer
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {userdetail && (
                      <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                        <li className="list-inline-item">
                          <i className="bi bi-calendar2-plus me-1" /> account
                          compte créé le {formatDate(userdetail.created_at)}
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="card-footer mt-3 pt-2 pb-0">
                    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                      <li
                        className="nav-item"
                        onClick={() => setActiveTab("posts")}
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          className={`nav-link ${
                            activeTab === "posts" ? "active" : ""
                          }`}
                        >
                          Posts
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => setActiveTab("connections")}
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          className={`nav-link ${
                            activeTab === "connections" ? "active" : ""
                          }`}
                        >
                          Connections
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {activeTab === "posts" && <PublicationsProfile />}
                {activeTab === "connections" && <Connections />}
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
        </>
      )}
    </div>
  );
};

export default Profile;
