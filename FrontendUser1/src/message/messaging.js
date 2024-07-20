import { useEffect, useState } from "react";
import { Header } from "../services";
import { callApi } from "../api";
import { navigate } from "@reach/router";
import CircularProgress from "@material-ui/core/CircularProgress";

const Messaging = () => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [userdetail, setUserdetail] = useState();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [redirectToUpdate, setRedirectToUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await callApi("auth/user");
      if (responseData) {
        if (
          responseData.user &&
          (responseData.user.type === null ||
            (responseData.user.type !== "fondateur" &&
              responseData.user.type !== "investisseur"))
        ) {
          setRedirectToUpdate(true);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (redirectToUpdate) {
      window.open("/updateProfile", "_blank");
    }
  }, [redirectToUpdate]);

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handleSearch = async () => {
    try {
      let response;
      if (query.trim() === "") {
        // Si la requête de recherche est vide, récupérer toutes les personnes
        response = await callApi("auth/getUtilisateurs");
      } else {
        // Sinon, effectuer une recherche
        response = await callApi("auth/search", "GET", null, false, {
          query: query,
        });
        setLoading(false);
      }
      setSearchResult(response);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const getUser = () => {
    callApi("auth/user").then((data) => {
      setUserdetail(data.user);
      setLoading(false);
    });
  };

  const showConversation = (UserId) => {
    callApi(`auth/showConversation/${UserId}`).then((response) => {
      setMessages(response);
    });

    const user = searchResult.find((user) => user.id === UserId); // Correction ici
    setSelectedUser(user);
    setLoading(false);
  };

  const createMessage = (UserId) => {
    if (UserId == null) {
    }
    const formData = new FormData();
    formData.append("content", content);
    formData.append("auth_id", userdetail.id);
    formData.append("receiver_id", selectedUserId);
    formData.append("chat_id", selectedUser.chat_id);
    callApi(`auth/message/${UserId}`, "POST", formData, true);
    setContent("");
    showConversation(UserId);
  };

  const [Users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await callApi("auth/showPersonsConversation");
      setUsers(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  const redirectToProfile = (UserId) => {
    navigate(`/${UserId}`);
  };

  useEffect(() => {
    getUser();
    fetchUsers();
    handleSearch();
  }, [query]);

  return (
    <div>
      {loading ? (
        <div className="col text-center">
          <CircularProgress style={{ marginTop: "200px" }} />
        </div>
      ) : (
        <>
          <Header />
          <br />
          <br />
          <br />
          <main>
            <div className="container mt-4">
              <div className="row gx-0">
                <>
                  <div
                    className="col-lg-4 col-xxl-3"
                    id="chatTabs"
                    role="tablist"
                  >
                    <nav className="navbar navbar-light navbar-expand-lg mx-0">
                      <div
                        className="offcanvas offcanvas-start"
                        tabIndex={-1}
                        id="offcanvasNavbar"
                      >
                        <div className="offcanvas-header">
                          <button
                            type="button"
                            className="btn-close text-reset ms-auto"
                            data-bs-dismiss="offcanvas"
                          />
                        </div>
                        <div className="offcanvas-body p-0">
                          <div className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0">
                            <form className="position-relative">
                              <input
                                className="form-control py-2"
                                type="search"
                                value={query}
                                onChange={(e) => {
                                  setQuery(e.target.value);
                                }}
                                placeholder="Rechercher "
                                aria-label="Rechercher"
                              />
                              <button
                                className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                                type="submit"
                              ></button>
                            </form>
                            <div className="mt-4 h-100">
                              <div className="chat-tab-list custom-scrollbar">
                                <ul className="nav flex-column nav-pills nav-pills-soft  ">
                                  {query.trim() !== "" &&
                                  Array.isArray(searchResult) &&
                                  searchResult.length > 0
                                    ? searchResult.map((result) => (
                                        <li
                                          key={result.id}
                                          onClick={() =>
                                            showConversation(result.id)
                                          }
                                          data-bs-dismiss="offcanvas"
                                        >
                                          <a
                                            href={`#chat-${result.id}`}
                                            className={`nav-link text-start  ${
                                              selectedUserId === result.id
                                                ? "active"
                                                : ""
                                            }`}
                                            id={`chat-${result.id}-tab`}
                                            data-bs-toggle="pill"
                                            role="tab"
                                          >
                                            <div className="d-flex">
                                              <div className="flex-shrink-0 avatar avatar-story me-2 ">
                                                <img
                                                  className="avatar-img rounded-circle"
                                                  src={
                                                    result.image
                                                      ? `http://127.0.0.1:8000/uploads/${result.image}`
                                                      : "assets/images/avatar/no-image-male.jpg"
                                                  }
                                                  alt={result.name}
                                                />
                                              </div>
                                              <div className="flex-grow-1 d-block">
                                                <h6 className="mb-0 mt-1">
                                                  {result.name}
                                                </h6>
                                              </div>
                                            </div>
                                          </a>
                                        </li>
                                      ))
                                    : Users &&
                                      Users.map((user) => (
                                        <li
                                          key={user.id}
                                          onClick={() =>
                                            showConversation(user.id)
                                          }
                                          data-bs-dismiss="offcanvas"
                                        >
                                          <a
                                            href={`#chat-${user.id}`}
                                            className={`nav-link text-start ${
                                              selectedUserId === user.id
                                                ? "active"
                                                : ""
                                            }`}
                                            id={`chat-${user.id}-tab`}
                                            data-bs-toggle="pill"
                                            role="tab"
                                          >
                                            <div className="d-flex">
                                              <div className="flex-shrink-0 avatar avatar-story me-2 ">
                                                <img
                                                  className="avatar-img rounded-circle"
                                                  src={
                                                    user.image
                                                      ? `http://127.0.0.1:8000/uploads/${user.image}`
                                                      : "assets/images/avatar/no-image-male.jpg"
                                                  }
                                                  alt={user.name}
                                                />
                                              </div>
                                              <div className="flex-grow-1 d-block">
                                                <h6 className="mb-0 mt-1">
                                                  {user.name}
                                                </h6>
                                              </div>
                                            </div>
                                          </a>
                                        </li>
                                      ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
                  <div className="col-lg-8 col-xxl-9">
                    <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
                      <div className="card-body h-100">
                        <div
                          className="tab-content py-0 mb-0 h-100"
                          id="chatTabsContent"
                        >
                          {/* Conversation item START */}
                          <div
                            className="fade tab-pane show active h-100"
                            id={`chat-${selectedUserId}`}
                            role="tabpanel"
                            aria-labelledby={`chat-${selectedUserId}-tab`}
                          >
                            <div className="d-sm-flex justify-content-between align-items-center">
                              <div className="d-flex mb-2 mb-sm-0">
                                <div className="flex-shrink-0 avatar me-2">
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={
                                      selectedUser && selectedUser.image
                                        ? `http://127.0.0.1:8000/uploads/${selectedUser.image}`
                                        : "assets/images/avatar/no-image-male.jpg"
                                    }
                                    alt={selectedUser && selectedUser.name}
                                  />
                                </div>
                                <div className="d-block flex-grow-1">
                                  <h6 className="mb-0 mt-1">
                                    {selectedUser && selectedUser.name}
                                  </h6>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <a
                                    className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                                    href="#"
                                    id="chatcoversationDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                  >
                                    <i className="bi bi-three-dots-vertical" />
                                  </a>
                                  <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="chatcoversationDropdown"
                                  >
                                    <li
                                      onClick={() => {
                                        if (selectedUser && selectedUser.id) {
                                          redirectToProfile(selectedUser.id);
                                        }
                                      }}
                                    >
                                      <a className="dropdown-item" href="">
                                        <i className="bi bi-person-check me-2 fw-icon" />
                                        Voir le profil
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div
                              className="chat-conversation-content custom-scrollbar"
                              style={{ maxHeight: "300px", overflowY: "auto" }}
                            >
                              {messages &&
                                messages.map((message, index) => (
                                  <div key={index}>
                                    {/* Chat time */}
                                    {index === 0 ||
                                    new Date(message.created_at).getHours() !==
                                      new Date(
                                        messages[index - 1].created_at
                                      ).getHours() ||
                                    new Date(message.created_at).getDate() !==
                                      new Date(
                                        messages[index - 1].created_at
                                      ).getDate() ||
                                    new Date(message.created_at).getMonth() !==
                                      new Date(
                                        messages[index - 1].created_at
                                      ).getMonth() ||
                                    new Date(
                                      message.created_at
                                    ).getFullYear() !==
                                      new Date(
                                        messages[index - 1].created_at
                                      ).getFullYear() ? (
                                      <div className="text-center small my-2">
                                        {new Date(
                                          message.created_at
                                        ).toLocaleString("en-US", {
                                          month: "short",
                                          day: "2-digit",
                                          year: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </div>
                                    ) : null}
                                    {message.from_user !== userdetail.id ? (
                                      <div className="d-flex mb-1">
                                        <div className="flex-shrink-0 avatar avatar-xs me-2">
                                          <img
                                            className="avatar-img rounded-circle"
                                            src={
                                              selectedUser && selectedUser.image
                                                ? `http://127.0.0.1:8000/uploads/${selectedUser.image}`
                                                : "assets/images/avatar/no-image-male.jpg"
                                            }
                                          />
                                        </div>
                                        <div className="flex-grow-1">
                                          <div className="w-100">
                                            <div className="d-flex flex-column align-items-start">
                                              <div
                                                className={`bg-light text-secondary p-2 px-3 rounded-2 ${
                                                  message.from_user !==
                                                  userdetail.id
                                                    ? "float-start"
                                                    : ""
                                                }`}
                                              >
                                                {message.content}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}
                                    {/* Chat message right */}
                                    {message.from_user === userdetail.id ? (
                                      <div className="d-flex justify-content-end text-end mb-1">
                                        <div className="w-100">
                                          <div className="d-flex flex-column align-items-end">
                                            <div
                                              className={`bg-primary text-white p-2 px-3 rounded-2`}
                                            >
                                              {message.content}
                                            </div>
                                            <div className="d-flex my-2">
                                              <div className="small text-secondary">
                                                {new Date(
                                                  message.created_at
                                                ).toLocaleTimeString([], {
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                })}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-sm-flex align-items-end">
                          <textarea
                            className="form-control mb-sm-0 mb-3"
                            data-autoresize
                            placeholder="Type a message"
                            rows={1}
                            defaultValue={""}
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                          <button
                            className="btn btn-sm btn-primary ms-2"
                            onClick={() => createMessage(selectedUser.id)}
                          >
                            <i className="fa-solid fa-paper-plane fs-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
export default Messaging;
