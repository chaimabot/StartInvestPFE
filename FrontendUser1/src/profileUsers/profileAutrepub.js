import React, { useEffect, useState } from "react";
import { callApi } from "../api";
import { useParams } from "react-router-dom";
const PublicationsProfile = () => {
  const [publications, setPublications] = useState([]);
  const [userdetail, setUserdetail] = useState();
  const [previewURL, setPreviewURL] = useState(null);
  const [likes, setLikes] = useState(publications.map(() => false));
  const { userId } = useParams();
  const Like = (publicationId, index) => {
    const updatedLikes = [...likes];

    updatedLikes[index] = !updatedLikes[index];

    setLikes(updatedLikes);

    const action = updatedLikes[index] ? "POST" : "PUT";

    callApi(
      `auth/${updatedLikes[index] ? "liked" : "disliked"}/${publicationId}`,
      action
    );
  };

  const getUser = (userId) => {
    callApi(`auth/userById/${userId}`).then((data) => {
      setUserdetail(data);
      setPreviewURL(data.image);
    });
  };

  const fetchPublications = async (userId) => {
    try {
      const data = await callApi(`auth/userProfilePublicationsId/${userId}`);
      setPublications(data.publications);
    } catch (error) {
      console.error("Erreur lors de la récupération des publications :", error);
    }
  };

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPublications(userId);
    };

    fetchData();
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

  return (
    <>
      {publications &&
        publications.map((item, index) => (
          <div>
            <div className="card" key={index}>
              <div className="card-header border-0 pb-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-2">
                      <a href="#">
                        {" "}
                        <img
                          className="avatar-img rounded-circle border border-white border-3"
                          src={
                            userdetail && userdetail.image
                              ? `http://127.0.0.1:8000/uploads/${userdetail.image}`
                              : "assets/images/avatar/no-image-male.jpg"
                          }
                          alt=""
                        />{" "}
                      </a>
                    </div>
                    <div>
                      <h6 className="card-title mb-0">
                        {" "}
                        <a href="#!"> {item.user.name} </a>
                      </h6>
                      <p className="mb-0 small">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pb-0">
                <p>{item.description}</p>
                {item.file &&
                  (item.file.endsWith(".mp4") ? (
                    <div className="card-body pb-0">
                      <video className="video-fluid" controls>
                        <source
                          src={`http://127.0.0.1:8000/uploads/${item.file}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="card-body pb-0">
                      <a
                        href={`http://127.0.0.1:8000/uploads/${item.file}`}
                        data-glightbox
                        data-gallery="image-popup"
                      >
                        <img
                          className="img-fluid"
                          src={`http://127.0.0.1:8000/uploads/${item.file}`}
                          alt="image"
                        />
                      </a>
                    </div>
                  ))}

                <ul className="nav nav-stack pb-2 small">
                  <li className="nav-item">
                    <a
                      href=""
                      className="nav-link active text-secondary"
                      data-bs-toggle="modal"
                      data-bs-target={`#likes-${index}`}
                    >
                      {" "}
                      <i className="bi bi-heart-fill me-1 icon-xs bg-danger text-white rounded-circle"></i>{" "}
                      {item.countLikes}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-footer py-3">
                <ul className="nav nav-fill nav-stack small">
                  <li className="nav-item">
                    <a
                      className="nav-link mb-0 active"
                      onClick={() => Like(item.id, index)}
                    >
                      {" "}
                      <i
                        className={
                          likes[index]
                            ? "bi bi-heart-fill pe-1"
                            : "bi bi-heart pe-1"
                        }
                      ></i>
                      j'aime
                      {likes[index] && (
                        <span
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "0.8rem",
                          }}
                        >
                          Publication aimée
                        </span>
                      )}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="modal fade"
              id={`likes-${index}`}
              tabIndex="-1"
              aria-labelledby="feedActionPhotoLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div>
                      <h5>Personnes qui ont aimé cette publication :</h5>
                      {item.likes &&
                        item.likes.map((like, likeIndex) => (
                          <div className="d-flex mb-3" key={likeIndex}>
                            <div className="hstack gap-2">
                              <div className="d-md-flex align-items-center mb-4">
                                <div className="mb-3">
                                  <div className="d-flex align-items-center">
                                    <div className="avatar me-3">
                                      <a href="#!">
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={
                                            like.user.image
                                              ? `http://127.0.0.1:8000/uploads/${like.user.image}`
                                              : "assets/images/avatar/no-image-male.jpg"
                                          }
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div className="w-100">
                                      <div className="d-sm-flex align-items-start">
                                        <h6 className="mb-0">
                                          <a>{like.user.name}</a>
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="ms-md-auto">
                                      <button className="btn btn-primary-soft btn-sm mb-0">
                                        {" "}
                                        Message{" "}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PublicationsProfile;
