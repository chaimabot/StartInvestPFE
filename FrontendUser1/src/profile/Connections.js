import { useEffect, useState } from "react";
import { callApi } from "../api";

const Connections = () => {
  const [followers, setFollowers] = useState([]);

  const fetchFollowers = async () => {
    try {
      const response = await callApi("auth/followerPersonns");
      console.log(response);
      setFollowers(response);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  const handleUnfollow = (userId) => {
    if (!userId) {
      return;
    }

    callApi(`auth/unfollow/${userId}`, "DELETE")
      .then((response) => {
        console.log("User unfollowed successfully");
        fetchFollowers();
      })
      .catch((error) => {
        console.error("Error unfollowing user:", error);
      });
  };

  return (
    <>
      <div className="card">
        <div className="card-header border-0 pb-0">
          <h5 className="card-title">Connections</h5>
        </div>
        {followers &&
          followers.map((item, index) => (
            <div className="card-body" key={index}>
              <div className="d-md-flex align-items-center mb-4">
                <div className="avatar me-3 mb-3 mb-md-0">
                  <a href="#!">
                    <img
                      className="avatar-img rounded-circle"
                      src={
                        item.image
                          ? `http://127.0.0.1:8000/uploads/${item.image}`
                          : "assets/images/avatar/no-image-male.jpg"
                      }
                      alt={item.name}
                    />
                  </a>
                </div>
                {/* Info */}
                <div className="w-100">
                  <div className="d-sm-flex align-items-start">
                    <h6 className="mb-0">
                      <a href="#!">{item.name}</a>
                    </h6>
                  </div>
                  <ul className="avatar-group mt-1 list-unstyled align-items-sm-center">
                    <li className="small">{item.type} </li>
                  </ul>
                </div>

                <div className="dropdown">
                  <a
                    href="#"
                    className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                    id="cardNotiAction"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots" />
                  </a>
                  {/* Card share action dropdown menu */}
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="cardNotiAction"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleUnfollow(item.id)}
                      >
                        {" "}
                        <i className="bi bi-check-lg fa-fw pe-2" />
                        désabonner
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        <div className="d-grid">
          <a
            href="#!"
            role="button"
            className="btn btn-sm btn-loader btn-primary-soft"
            data-bs-toggle="button"
            aria-pressed="true"
          >
            <span className="load-text">Charger plus de connexions</span>
            <div className="load-icon">
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Connections;
