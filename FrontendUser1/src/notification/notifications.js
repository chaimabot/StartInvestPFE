import { useEffect, useState } from "react";
import { Header, SidebarLeft } from "../services";
import { callApi } from "../api";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const markAsRead = (notificationId) => {
    try {
      callApi(`auth/markAsRead/${notificationId}`);
      getNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const getNotifications = () => {
    callApi("auth/notifications")
      .then((data) => {
        const parsedNotifications = data.notifications.map((notification) => ({
          ...notification,
          data: JSON.parse(notification.data),
        }));

        const uniqueNotifications = [];
        const seenData = new Set();

        parsedNotifications.forEach((notification) => {
          const notificationData = JSON.stringify(notification.data);
          if (!seenData.has(notificationData)) {
            uniqueNotifications.push(notification);
            seenData.add(notificationData);
          }
        });

        setNotifications(uniqueNotifications);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des notifications :",
          error
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);
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
              <div className="col-lg-8 mx-auto">
                {/* Card START */}
                <div className="card">
                  <div className="card-header py-3 border-0 d-flex align-items-center justify-content-between">
                    <h1 className="h5 mb-0">Notifications</h1>
                  </div>
                  <div className="card-body p-2">
                    <ul className="list-unstyled">
                      {notifications.map(
                        (notification) =>
                          !notification.read_at && (
                            <li key={notification.id}>
                              <div className="rounded d-sm-flex border-0 mb-1 p-3 position-relative">
                                {/* Avatar */}
                                <div className="avatar text-center">
                                  <img
                                    src={
                                      notification.data.image
                                        ? `http://127.0.0.1:8000/uploads/${notification.data.image}`
                                        : "assets/images/avatar/no-image-male.jpg"
                                    }
                                    alt="Image"
                                    className="rounded-circle"
                                  />
                                </div>

                                <div className="mx-sm-3 my-2 my-sm-0">
                                  <p className="small mb-0">
                                    <b> {notification.data.user}</b>{" "}
                                  </p>
                                  <p className="small mb-0">
                                    <b>{notification.data.user}</b>{" "}
                                    {notification.data.title === "a abonné vous"
                                      ? "a abonné  vous"
                                      : "a aimé votre publication"}{" "}
                                    : {notification.data.description}{" "}
                                    {notification.created_at}
                                  </p>
                                  <p className="text-primary ">
                                    {" "}
                                    <u> {notification.created_at}</u>
                                  </p>
                                </div>
                                {/* Action */}
                                <div className="d-flex ms-auto">
                                  <div className="dropdown position-absolute end-0 top-0 mt-3 me-3">
                                    <a
                                      href="#"
                                      className="z-index-1 text-secondary btn position-relative py-0 px-2"
                                      id="cardNotiAction8"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="bi bi-three-dots" />
                                    </a>
                                    <ul
                                      className="dropdown-menu dropdown-menu-end"
                                      aria-labelledby="cardNotiAction8"
                                    >
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() =>
                                            markAsRead(notification.id)
                                          }
                                        >
                                          {" "}
                                          <i className="bi bi-trash fa-fw pe-2" />
                                          Supprimer la notification
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </>
      )}
    </div>
  );
}
