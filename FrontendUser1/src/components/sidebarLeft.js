import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../api";

const SidebarLeft = () => {
  const [userdetail, setUserdetail] = useState();
  const [startup, setStartup] = useState();

  const [nbposts, setNbposts] = useState(null);
  const getUserAndStartupDetails = () => {
    callApi("auth/user").then((response) => {
      setUserdetail(response.user);

      if (response.startup) {
        setStartup(response.startup);
      }
      if (response.countPosts) {
        setNbposts(response.countPosts);
      }
    });
  };

  useEffect(() => {
    getUserAndStartupDetails();
  }, []);
  return (
    <>
      <div className="col-lg-3">
        <div className="d-flex align-items-center d-lg-none">
          <button
            className="border-0 bg-transparent"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSideNavbar"
            aria-controls="offcanvasSideNavbar"
          >
            <span className="btn btn-primary">
              <i className="fa-solid fa-sliders-h"></i>
            </span>
            <span className="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
          </button>
        </div>

        <nav className="navbar navbar-expand-lg mx-0">
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasSideNavbar"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close text-reset ms-auto"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body d-block px-2 px-lg-0">
              <div className="card overflow-hidden">
                <div
                  className="h-50px "
                  style={{
                    backgroundImage: "url(assets/images/bg/01.jpg)",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="card-body pt-0">
                  <div className="text-center">
                    <div className="avatar avatar-lg mt-n5 mb-3">
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
                    {userdetail && (
                      <>
                        <h5 className="mb-0">
                          <Link to={`/profile?${userdetail.name}`}>
                            {userdetail.name}{" "}
                          </Link>
                        </h5>
                        <small>{userdetail.type}</small>
                      </>
                    )}
                    {startup && (
                      <>
                        <p className="mt-3">{startup.nom}</p>
                      </>
                    )}

                    <div className="hstack gap-2 gap-xl-3 justify-content-center">
                      <div>
                        <h6 className="mb-0">{nbposts}</h6>
                        <small>Post</small>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        {" "}
                        <img
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/home-outline-filled.svg"
                          alt=""
                        />
                        <span>profile </span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/notifications">
                        {" "}
                        <img
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/notification-outlined-filled.svg"
                          alt=""
                        />
                        <span>Notifications </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/calendar">
                        {" "}
                        <img
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/calendar-outline-filled.svg"
                          alt=""
                        />
                        <span>Calendrier </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link class="nav-link" to="/mynetwork">
                        <img
                          class="me-2 h-20px fa-fw"
                          src="assets/images/icon/person-outline-filled.svg"
                          alt=""
                        />
                        <span>Réseaux </span>
                      </Link>
                    </li>
                    {userdetail && userdetail.type === "fondateur" && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/compteFlouci">
                          <img
                            className="me-2 h-20px fa-fw"
                            src="assets/images/icon/money.svg"
                            alt=""
                          />
                          <span>Compte Flouci </span>
                        </Link>
                      </li>
                    )}
                    {userdetail && userdetail.type === "investisseur" && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/investFormation">
                          <i className="bi bi-cash-stack me-2"></i>{" "}
                          <span>Historique </span>
                        </Link>
                      </li>
                    )}
                    {userdetail && userdetail.type === "fondateur" && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/investStartup">
                          <i className="bi bi-graph-up me-2"></i>{" "}
                          <span>Historique startup</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SidebarLeft;
