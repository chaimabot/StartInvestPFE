import { useState, useEffect } from "react";
import { callApi } from "../api";

const ModelPublication = () => {
  const [userdetail, setUserdetail] = useState();
  const [previewURL, setPreviewURL] = useState(null);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [publications, setPublications] = useState([]);

  const getUser = async () => {
    const responseData = await callApi("auth/user");
    setUserdetail(responseData.user);
    // setPreviewURL(responseData.image);
  };
  useEffect(() => {
    getUser();
  }, []);
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

export default ModelPublication;
