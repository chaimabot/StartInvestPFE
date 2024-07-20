import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../api";
import { ModalNotification, ModalSearch } from "../services";
import "./header.css";
function Header() {
  const [userdetail, setUserdetail] = useState();

  const getUser = async () => {
    const responseData = await callApi("auth/user");
    if (responseData) {
      setUserdetail(responseData.user);
    }
  };

  const handleLogout = async () => {
    const responseData = await callApi("auth/logout", "POST");
    if (responseData) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <header className="navbar-light fixed-top header-static bg-mode">
        <nav className="navbar">
          <div className="container">
            <Link className="navbar-brand" to="/StartInvest">
              <img
                className="light-mode-item navbar-brand-item"
                src="assets/images/logo.png"
                alt="logo"
                style={{ width: "100px", height: "auto" }}
              />
              <img
                className="dark-mode-item navbar-brand-item"
                src="assets/images/logo.png"
                alt="logo"
                style={{ width: "100px", height: "auto" }}
              />
            </Link>

            <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
              <div className="nav-item w-100">
                <form className="rounded position-relative">
                  <input
                    className="form-control ps-5 bg-light rounded-pill border-0"
                    type="search"
                    placeholder="Recherche..."
                    aria-label="Search"
                    data-bs-toggle="modal"
                    data-bs-target="#search"
                  />
                  <button
                    className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                    type="submit"
                  >
                    <i className="bi bi-search fs-5"> </i>
                  </button>
                </form>
              </div>
            </div>

            <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
              <li className="nav-item ms-2">
                <Link
                  className="nav-link  icon-md btn btn-light p-0"
                  to="/messaging"
                >
                  <i className="bi bi-chat-left-text-fill fs-6"> </i>
                </Link>
              </li>
              <ModalNotification />

              <li className="nav-item ms-2 dropdown">
                <a
                  className="nav-link btn icon-md p-0"
                  href="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-auto-close="outside"
                  data-bs-display="static"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="avatar-img rounded-circle border border-white border-3"
                    src={
                      userdetail && userdetail.image
                        ? `http://127.0.0.1:8000/uploads/${userdetail.image}`
                        : "assets/images/avatar/no-image-male.jpg"
                    }
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
                  aria-labelledby="profileDropdown"
                >
                  {/* Profile info */}
                  <li className="px-3">
                    <div className="d-flex align-items-center position-relative">
                      {/* Avatar */}
                      <div className="avatar me-3">
                        <img
                          className="avatar-img rounded-circle border border-white border-3"
                          src={
                            userdetail && userdetail.image
                              ? `http://127.0.0.1:8000/uploads/${userdetail.image}`
                              : "assets/images/avatar/no-image-male.jpg"
                          }
                        />
                      </div>
                      <div>
                        <div>
                          <Link className="h6 stretched-link" to="/profile">
                            {userdetail && (
                              <>
                                <p>{userdetail.name}</p>
                                <p className="small m-0">{userdetail.email}</p>
                              </>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="dropdown-divider" />
                  <li>
                    <Link
                      className="dropdown-item bg-danger-soft-hover"
                      to="/reclamation"
                    >
                      <i className="bi bi-envelope-exclamation-fill" />
                      &nbsp;&nbsp; Reclamation
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item bg-danger-soft-hover"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-power fa-fw me-2" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <ModalSearch />
    </>
  );
}

export default Header;
