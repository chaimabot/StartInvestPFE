import { useEffect, useState } from "react";
import { callApi } from "../api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ModelPublication,
  Publications,
  SidebarLeft,
  SidebarRight,
  Header,
} from "../services";

const Publication = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetail = async () => {
      const responseData = await callApi("auth/user");
      if (responseData) {
        setUserDetail(responseData.user);
        setLoading(false);
      }
    };

    getUserDetail();
  }, []);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />

      <main>
        <div className="container">
          <div className="row g-4">
            {loading ? (
              <div className="col text-center">
                <CircularProgress style={{ marginTop: "200px" }} />
              </div>
            ) : (
              <>
                <SidebarLeft />
                <div className="col-md-8 col-lg-6 vstack gap-2">
                  <div className="card card-body rounded-4">
                    <div className="d-flex mb-1 ">
                      <div className="avatar avatar-sm me-2">
                        <img
                          className="avatar-img rounded-circle border border-white border-3"
                          src={
                            userDetail && userDetail.image
                              ? `http://127.0.0.1:8000/uploads/${userDetail.image}`
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
                          <i className="bi bi-image-fill text-success pe-2"></i>
                          Photo
                        </a>
                      </li>
                    </ul>
                  </div>
                  <hr />

                  <Publications />

                  <a
                    href="#!"
                    role="button"
                    className="btn btn-loader btn-primary-soft"
                    data-bs-toggle="button"
                    aria-pressed="true"
                  >
                    <span className="load-text">Charger plus</span>
                    <div className="load-icon">
                      <div
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </a>
                </div>
                <SidebarRight />
              </>
            )}
          </div>
        </div>
      </main>

      <ModelPublication />
    </div>
  );
};

export default Publication;
