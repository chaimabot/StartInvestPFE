import { useEffect, useState } from "react";
import { callApi } from "../api";
import { navigate } from "@reach/router";
const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [redirectToUpdate, setRedirectToUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await callApi("auth/user");
      if (responseData) {
        if (
          responseData.user &&
          (responseData.user.type === null ||
            (responseData.user.type !== "fondateur" &&
              responseData.user.type !== "investisseur"))
        ) {
          setRedirectToUpdate(true);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (redirectToUpdate) {
      window.open("/updateProfile", "_blank");
    }
  }, [redirectToUpdate]);

  const [likes, setLikes] = useState(
    publications && publications.map(() => false)
  );
  const Like = async (publicationId, index) => {
    const updatedLikes = [...likes];

    updatedLikes[index] = !updatedLikes[index];

    setLikes(updatedLikes);

    const action = updatedLikes[index] ? "POST" : "PUT";

    await callApi(
      `auth/${updatedLikes[index] ? "liked" : "disliked"}/${publicationId}`,
      action
    );

    await fetchPublications();
  };
  const fetchPublications = async () => {
    const responseData = await callApi("auth/publications");
    if (responseData) {
      setPublications(responseData.publications);
    }
  };

  useEffect(() => {
    fetchPublications();
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

  const excludePublication = (index) => {
    const updatedPublications = publications.filter((_, i) => i !== index);
    setPublications(updatedPublications);
  };

  const redirectToProfile = (userId) => {
    navigate(`/${userId}`);
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
                    <div
                      className="avatar me-2"
                      onClick={() => redirectToProfile(item.user.id)}
                    >
                      <a href="">
                        {" "}
                        <img
                          className="avatar-img rounded-circle"
                          src={
                            item.user.image
                              ? `http://127.0.0.1:8000/uploads/${item.user.image}`
                              : "assets/images/avatar/no-image-male.jpg"
                          }
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
                  <ul aria-labelledby="cardShareAction5">
                    <button
                      className="dropdown-item"
                      onClick={() => excludePublication(index)}
                    >
                      <i className="bi bi-x-circle fa-fw pe-2 fs-3"></i>
                    </button>
                  </ul>
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
                      style={{ cursor: "pointer" }}
                      className="nav-link mb-0 active"
                      onClick={() => Like(item.id, index)}
                    >
                      {" "}
                      <i
                        className={
                          likes && likes[index]
                            ? "bi bi-heart-fill pe-1"
                            : "bi bi-heart pe-1"
                        }
                      ></i>
                      j'aime
                      {likes && likes[index] && (
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
                                      <a href="#">
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={
                                            like.user.image
                                              ? `http://127.0.0.1:8000/uploads/${like.user.image}`
                                              : "assets/images/avatar/no-image-male.jpg"
                                          }
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

export default Publications;
