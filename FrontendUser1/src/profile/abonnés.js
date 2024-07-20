import { useEffect, useState } from "react";
import { callApi } from "../api";
import { SidebarLeft, Header } from "../services";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Abonnes() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [totalUtilisateursChargees, setTotalUtilisateursChargees] = useState(5);
  const [followingStatus, setFollowingStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApi(`auth/getUtilisateurs`, "GET")
      .then((response) => {
        console.log("Utilisateurs récupérés avec succès :", response);
        setUtilisateurs(response);
        setLoading(false);
        const initialFollowingStatus = {};
        response.forEach((user) => {
          initialFollowingStatus[user.id] = user.is_following;
        });
        setFollowingStatus(initialFollowingStatus);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
        setLoading(false);
      });
  }, []);

  const handleFollow = (userId) => {
    if (!userId) {
      return;
    }

    callApi(`auth/follow`, "POST", {
      follower_id: userId,
    })
      .then((response) => {
        console.log("User followed successfully");
        setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: true,
        }));
      })
      .catch((error) => {
        console.error("Error following user:", error);
      });
  };

  const handleUnfollow = (userId) => {
    if (!userId) {
      return;
    }

    callApi(`auth/unfollow/${userId}`, "DELETE")
      .then((response) => {
        console.log("User unfollowed successfully");
        setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: false,
        }));
      })
      .catch((error) => {
        console.error("Error unfollowing user:", error);
      });
  };

  const chargerPlusUtilisateurs = () => {
    setTotalUtilisateursChargees(totalUtilisateursChargees + 5);
  };

  const handleCheckFollow = (userId) => {
    if (!userId) {
      return;
    }

    callApi(`auth/checkFollow/${userId}`, "GET")
      .then((response) => {
        setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: response.isFollowing,
        }));
      })
      .catch((error) => {
        console.error("Error checking follow status:", error);
      });
  };

  useEffect(() => {
    utilisateurs.forEach((user) => {
      handleCheckFollow(user.id);
    });
  }, [utilisateurs]);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />

      {loading ? (
        <div className="col text-center">
          <CircularProgress style={{ marginTop: "200px" }} />
        </div>
      ) : (
        <>
          <div className="container">
            <div className="row g-4">
              <SidebarLeft />

              <div className="col-md-8 col-lg-6 vstack gap-4">
                <div className="card card-body">
                  <div className="col-lg-12 mx-auto">
                    <div className="card-header py-3 border-0 d-flex align-items-center justify-content-between">
                      <h1 className="h5 mb-0">Relations </h1>
                    </div>
                    <div className="card-body p-2">
                      <ul className="list-unstyled">
                        {utilisateurs &&
                          utilisateurs
                            .slice(0, totalUtilisateursChargees)
                            .map((user, index) => (
                              <li key={index}>
                                <div className="rounded d-sm-flex border-0 mb-1 p-3 position-relative">
                                  <div className="avatar text-center">
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={
                                        user && user.image
                                          ? `http://127.0.0.1:8000/uploads/${user.image}`
                                          : "assets/images/avatar/no-image-male.jpg"
                                      }
                                      alt={user.name}
                                    />
                                  </div>
                                  <div className="mx-sm-3 my-2 my-sm-0">
                                    <p className="small mb-2">
                                      <Link
                                        to={`/${user.id}`}
                                        style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                        }}
                                      >
                                        <b>{user.name}</b>
                                      </Link>
                                    </p>
                                  </div>
                                  <div className="d-flex ms-auto">
                                    <a
                                      className="btn btn-primary-soft rounded-circle icon-md d-flex justify-content-center align-items-center"
                                      href="#"
                                      title={
                                        followingStatus[user.id]
                                          ? "Se désabonner"
                                          : "S'abonner"
                                      }
                                      onClick={() =>
                                        followingStatus[user.id]
                                          ? handleUnfollow(user.id)
                                          : handleFollow(user.id)
                                      }
                                    >
                                      <i
                                        className={`bi ${
                                          followingStatus[user.id]
                                            ? "bi-person-x-fill"
                                            : "bi-person-plus-fill"
                                        }`}
                                        style={{ fontSize: "20px" }}
                                        alt={
                                          followingStatus[user.id]
                                            ? "Se désabonner"
                                            : "S'abonner"
                                        }
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                              </li>
                            ))}
                      </ul>
                    </div>
                    <div className="card-footer border-0 py-3 text-center position-relative d-grid pt-0">
                      <button
                        className="btn btn-loader btn-primary-soft"
                        onClick={chargerPlusUtilisateurs}
                      >
                        Charger plus des personnes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
