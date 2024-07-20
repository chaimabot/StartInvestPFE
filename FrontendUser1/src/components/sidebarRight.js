import { useEffect, useState } from "react";
import { callApi } from "../api";
import { Link } from "react-router-dom";
import { navigate } from "@reach/router";

const SidebarRight = () => {
  const [randomFollowers, setRandomFollowers] = useState([]);
  const fetchFollowers = async () => {
    const response = await callApi("auth/getUtilisateurs");
    if (response) {
      const shuffledFollowers = response.sort(() => 0.5 - Math.random());
      const selectedFollowers = shuffledFollowers.slice(0, 1);
      setRandomFollowers(selectedFollowers);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);
  const redirectToProfile = (userId) => {
    navigate(`/${userId}`);
  };

  return (
    <div className="col-lg-3">
      <div className="row g-4">
        {randomFollowers &&
          randomFollowers.map((item, index) => (
            <div key={index} className="col-sm-6 col-lg-12">
              <div className="card">
                <div className="card-header pb-0 border-0">
                  <h5 className="card-title mb-0">Qui suivre ?</h5>
                </div>
                <div className="card-body">
                  <div className="hstack gap-2 mb-3">
                    <div
                      className="avatar"
                      onClick={() => redirectToProfile(item?.id)}
                    >
                      <a href="">
                        {" "}
                        <img
                          className="avatar-img rounded-circle"
                          src={
                            item?.image
                              ? `http://127.0.0.1:8000/uploads/${item.image}`
                              : "assets/images/avatar/no-image-male.jpg"
                          }
                          alt={item?.name}
                        />{" "}
                      </a>
                    </div>
                    <div className="overflow-hidden">
                      <Link
                        to={`/${item?.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <b>{item?.name}</b>
                      </Link>

                      <p className="mb-0 small text-truncate">{item?.type}</p>
                    </div>
                  </div>
                  <div className="d-grid mt-3">
                    <a
                      className="btn btn-sm btn-primary-soft"
                      href="/mynetwork"
                    >
                      Voir plus
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SidebarRight;
