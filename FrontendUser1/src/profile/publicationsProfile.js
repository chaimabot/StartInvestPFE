import { useEffect, useState } from "react";
import { callApi } from "../api";

const PublicationsProfile = () => {
  const [publications, setPublications] = useState([]);
  const [userdetail, setUserdetail] = useState();
  const [previewURL, setPreviewURL] = useState(null);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [likes, setLikes] = useState(publications.map(() => false));

  const Like = (publicationId, index) => {
    const updatedLikes = [...likes];

    updatedLikes[index] = !updatedLikes[index];

    setLikes(updatedLikes);

    const action = updatedLikes[index] ? "POST" : "PUT";

    callApi(
      `auth/${updatedLikes[index] ? "liked" : "disliked"}/${publicationId}`,
      action
    );
    fetchPublications();
  };

  const getUser = async () => {
    const responseData = await callApi("auth/user");
    if (responseData) {
      setUserdetail(responseData.user);

      setPreviewURL(responseData.user.image);
      fetchPublications();
    }
  };

  const handleDelete = (publicationId) => {
    const responseData = callApi(
      `auth/publications/${publicationId}`,
      "DELETE"
    );

    console.log("Publication supprimée avec succès");
    setPublications((prevPublications) =>
      prevPublications.filter((pub) => pub.id !== publicationId)
    );
  };

  useEffect(() => {
    getUser();
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };
  const fetchPublications = async () => {
    const data = await callApi("auth/publicationsUser");
    setPublications(data.publications);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("file", file);

    const response = await callApi("auth/publication", "POST", formData, true);

    console.log(response);
    setDescription("");
    setFile("");
    fetchPublications();
  };

  return (
    <>
      <div className="card card-body rounded-4">
        <div className="d-flex mb-1 ">
          <div className="avatar avatar-sm me-2">
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
          <form className="w-100">
            <textarea
              className="form-control rounded-pill pe-4 border-0"
              rows="2"
              data-autoresize
              placeholder="Partage tes pensées..."
              data-bs-toggle="modal"
              data-bs-target="#feedActionPhoto"
            ></textarea>
          </form>
        </div>
        <ul className="nav nav-pills nav-stack small fw-normal">
          <li className="nav-item">
            <a
              className="nav-link bg-light py-1 px-2 mb-0"
              href="#!"
              data-bs-toggle="modal"
              data-bs-target="#feedActionPhoto"
            >
              {" "}
              <i className="bi bi-image-fill text-success pe-2" />
              Photo
            </a>
          </li>
        </ul>
      </div>
      {publications &&
        publications.map((item, index) => (
          <div key={index}>
            <div className="card">
              <div className="card-header border-0 pb-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-2">
                      <a href="#!">
                        <img
                          className="avatar-img rounded-circle border border-white border-3"
                          src={
                            userdetail && userdetail.image
                              ? `http://127.0.0.1:8000/uploads/${userdetail.image}`
                              : "assets/images/avatar/no-image-male.jpg"
                          }
                          alt=""
                        />
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
                  <a
                    href=""
                    className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                    id="cardShareAction5"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="cardShareAction5"
                  >
                    <li key={item.id}>
                      <a
                        href=""
                        className="dropdown-item"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        {" "}
                        <i className="bi bi-slash-circle fa-fw pe-2"></i>
                        Efface post
                      </a>
                    </li>
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

      <div
        className="modal fade"
        id="feedActionPhoto"
        tabIndex="-1"
        aria-labelledby="feedActionPhotoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabelCreateFeed">
                Créer une publication
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <div className="d-flex mb-3">
                <div className="avatar avatar-sm me-2">
                  <img
                    className="avatar-img rounded-circle"
                    src={
                      userdetail && userdetail.image
                        ? `http://127.0.0.1:8000/uploads/${userdetail.image}`
                        : "assets/images/avatar/no-image-male.jpg"
                    }
                    alt="User Avatar"
                  />
                </div>

                <form className="w-100" onSubmit={handleSubmit}>
                  <textarea
                    className="form-control pe-4 fs-3 lh-1 border-0"
                    rows={4}
                    placeholder="Partage tes pensées..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    autoFocus
                  />
                  <div className="hstack gap-2">
                    <label
                      htmlFor="uploadImage"
                      className="icon-md bg-success bg-opacity-10 text-success rounded-circle"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Ajouter un média "
                    >
                      <input
                        type="file"
                        id="uploadImage"
                        name="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <i className="bi bi-camera-fill" />
                    </label>
                    {previewURL && (
                      <img
                        src={previewURL}
                        alt="Preview"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </div>

                  <div className="modal-footer row justify-content-between">
                    <div className="col-lg-8 text-sm-end">
                      <button
                        type="submit"
                        className="btn btn-success-soft"
                        data-bs-dismiss="modal"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicationsProfile;
