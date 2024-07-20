import { useEffect, useState } from "react";
import { callApi } from "../api";

const ModalNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const markAllRead = async () => {
    const responseData = await callApi("auth/markAllRead");
    if (responseData) {
      getNotifications();
    }
  };
  const markAsRead = async (notificationId) => {
    const responseData = await callApi(`auth/markAsRead/${notificationId}`);
    if (responseData) {
      getNotifications();
    }
  };
  const getNotifications = async () => {
    const responseData = await callApi("auth/notifications");
    if (responseData) {
      const parsedNotifications =
        responseData.notifications &&
        responseData.notifications.map((notification) => ({
          ...notification,
          data: JSON.parse(notification.data),
        }));

      if (parsedNotifications) {
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
        setNotificationCount(responseData.count);
      } else {
        console.error("parsedNotifications est undefined");
      }
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <li className="nav-item dropdown ms-2">
        <a
          className="nav-link  icon-md btn btn-light p-0"
          href="#"
          id="notifDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          <span className="badge-notif animation-blink" />
          <i className="bi bi-bell-fill fs-6"> </i>
        </a>
        <div
          className="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0 "
          aria-labelledby="notifDropdown"
        >
          <div className="card">
            {notificationCount > 0 && (
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="m-0">
                  Notifications{" "}
                  {notificationCount > 0 && (
                    <span className="badge bg-danger bg-opacity-10 text-danger ms-2">
                      {notificationCount} nouvelle
                    </span>
                  )}
                </h6>

                <a className="small" onClick={() => markAllRead()}>
                  {" "}
                  <i className="bi bi-check-lg fa-fw pe-2"></i>
                  Tout Marquer comme lu
                </a>
              </div>
            )}
            {notificationCount > 0 ? (
              <div
                className="card-body p-0 "
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                <ul className="list-group list-group-flush list-unstyled p-2">
                  {notifications &&
                    notifications.map(
                      (notification) =>
                        !notification.read_at && (
                          <li key={notification.id}>
                            <a className="list-group-item list-group-item-action rounded d-flex border-0 mb-1 p-3">
                              <div className="avatar text-center d-none d-sm-inline-block me-3">
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
                              </div>
                              <div
                                className="flex-grow-1"
                                style={{ minWidth: "300px" }}
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <a
                                      className="btn"
                                      href={
                                        notification.data.title.includes(
                                          "a envoyer un message"
                                        )
                                          ? "/messaging"
                                          : notification.data.title.includes(
                                              "a abonné vous"
                                            )
                                          ? "/mynetwork"
                                          : notification.data.title.includes(
                                              "a aime ce publication"
                                            )
                                          ? "/StartInvest"
                                          : null
                                      }
                                    >
                                      <p className="small mb-0">
                                        <b>{notification.data.user}</b>{" "}
                                        {notification.data.title}:{" "}
                                        {notification.data.description ? (
                                          <>
                                            {notification.data.description
                                              .split(" ")
                                              .slice(0, 3)
                                              .join(" ")}
                                            ...
                                          </>
                                        ) : (
                                          <>Pas de description disponible...</>
                                        )}
                                        {notification.created_at}
                                      </p>
                                    </a>
                                  </div>
                                  <div className="dropdown">
                                    <a
                                      className="btn btn-sm btn-light"
                                      href="/messaging"
                                      role="button"
                                      id={`dropdownMenuLink${notification.id}`}
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul
                                      className="dropdown-menu dropdown-menu-end"
                                      aria-labelledby={`dropdownMenuLink${notification.id}`}
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
                                          <i className="bi bi-check-lg fa-fw pe-2"></i>
                                          Marquer comme lu
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </li>
                        )
                    )}
                </ul>
              </div>
            ) : (
              <div className="card-body text-center">
                <p>Aucune notification</p>
              </div>
            )}

            <div className="card-footer text-center">
              <a href="/notifications" className="btn btn-sm btn-primary-soft">
                Voir tous
              </a>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ModalNotification;
