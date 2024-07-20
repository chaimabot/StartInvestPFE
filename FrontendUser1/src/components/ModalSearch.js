import { useEffect, useState } from "react";
import { callApi } from "../api";
import { navigate } from "@reach/router";

const ModalSearch = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await callApi("auth/search", "GET", null, false, {
        query: query,
      });
      setSearchResult(response);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    if (query.trim !== "") {
      handleSearch();
    }
  }, [query]);
  const redirectToProfile = (userId) => {
    navigate(`/${userId}`);
  };
  return (
    <>
      <div
        className="modal fade"
        id="search"
        tabIndex="-1"
        aria-labelledby="feedActionPhotoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <div className="nav-item w-100">
                <div className="rounded position-relative">
                  <input
                    className="form-control ps-5 bg-light rounded-pill border-0"
                    type="search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    placeholder="Recherche..."
                    aria-label="Search"
                  />
                  <button
                    className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                    type="submit"
                  >
                    <i className="bi bi-search fs-5"> </i>
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              {Array.isArray(searchResult) && searchResult.length > 0 ? (
                searchResult.map((user, index) => (
                  <div className="d-flex mb-3">
                    <div className="hstack gap-2">
                      <div className="d-md-flex align-items-center mb-4">
                        <div key={index} className="mb-3">
                          <div className="d-flex align-items-center">
                            <div
                              className="avatar me-3"
                              onClick={() => redirectToProfile(user.id)}
                            >
                              <a href="">
                                {" "}
                                <img
                                  className="avatar-img rounded-circle"
                                  src={
                                    user?.image
                                      ? `http://127.0.0.1:8000/uploads/${user.image}`
                                      : "assets/images/avatar/no-image-male.jpg"
                                  }
                                />{" "}
                              </a>
                            </div>
                            <div className="w-100">
                              <div className="d-sm-flex align-items-start">
                                <h6 className="mb-0">
                                  <a>{user?.name}</a>
                                  <p>{user?.type}</p>
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
                ))
              ) : (
                <p>Aucun résultat trouvé</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSearch;
