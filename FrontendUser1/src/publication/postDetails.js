import React, { useEffect, useState } from "react";
import { callApi } from "../api";

import Header from "../components/header";
export default function PostDetails() {
  const [userdetail, setUserdetail] = useState();
  const [previewURL, setPreviewURL] = useState(null);
  const getUser = () => {
    callApi("auth/user").then((data) => {
      setUserdetail(data);
      setPreviewURL(data.image);
      console.log(data.name);
    });
  };
  return (
    <div>
      <Header />
      <main>
        {/* Container START */}
        <div>
          <br></br>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="card card-body">
                  {/* Fees images */}
                  {/* Feed meta START */}
                  <div className="d-flex align-items-center justify-content-between my-3">
                    <div className="d-flex align-items-center">
                      {/* Avatar */}
                      <div className="avatar avatar-story me-2">
                        <a href="#!">
                          <div className="avatar avatar-xs me-2">
                            <img
                              className="avatar-img rounded-circle border border-white border-3"
                              src={
                                userdetail && userdetail.image
                                  ? `http://127.0.0.1:8000/uploads/${userdetail.image}`
                                  : "assets/images/avatar/no-image-male.jpg"
                              }
                              alt=""
                            />
                          </div>
                        </a>
                      </div>
                      {/* Info */}
                      <div>
                        <div className="nav nav-divider">
                          <h6 className="nav-item card-title mb-0">
                            {" "}
                            <a href="#!"> Lori Ferguson </a>
                          </h6>
                          <span className="nav-item small"> 2hr</span>
                        </div>
                        <p className="mb-0 small">fondator</p>
                      </div>
                    </div>
                    {/* Card feed action dropdown START */}
                    <div className="dropdown">
                      <a
                        href="#"
                        className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                        id="cardFeedAction"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots" />
                      </a>
                      {/* Card feed action dropdown menu */}
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="cardFeedAction"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            {" "}
                            <i className="bi bi-x-circle fa-fw pe-2" />
                            Delte this post
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* Card feed action dropdown END */}
                  </div>
                  {/* Feed meta Info */}
                  <h1 className="h4">Post for fondator</h1>
                  <p>Descriptino for post here </p>
                  <img
                    className="card-img rounded"
                    src="assets/images/post/16by9/big/01.jpg"
                    alt
                  />
                  {/* Feed react START */}
                  <ul className="nav nav-stack flex-wrap small mb-3">
                    <li className="nav-item">
                      <a className="nav-link" href="#!">
                        {" "}
                        <i className="bi bi-hand-thumbs-up-fill pe-1" />
                        (56)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#!">
                        {" "}
                        <i className="bi bi-chat-fill pe-1" />
                        (12)
                      </a>
                    </li>
                    {/* Card share action START */}
                    <li className="nav-item dropdown ms-sm-auto">
                      {/* Card share action dropdown menu */}
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="cardShareAction"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            {" "}
                            <i className="bi bi-envelope fa-fw pe-2" />
                            Send via Direct Message
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            {" "}
                            <i className="bi bi-bookmark-check fa-fw pe-2" />
                            Bookmark{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            {" "}
                            <i className="bi bi-link fa-fw pe-2" />
                            Copy link to post
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* Card share action END */}
                  </ul>
                  {/* Feed react END */}
                  {/* Comment wrap START */}
                  <ul className="comment-wrap list-unstyled">
                    {/* Comment item START */}
                    {/* Comment item END */}
                    {/* Comment item START */}
                    <li className="comment-item">
                      <div className="d-flex">
                        {/* Avatar */}
                        <div className="avatar avatar-xs">
                          <a href="#!">
                            <img
                              className="avatar-img rounded-circle"
                              src="assets/images/avatar/05.jpg"
                              alt
                            />
                          </a>
                        </div>
                        {/* Comment by */}
                        <div className="ms-2">
                          <div className="bg-light p-3 rounded">
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-1">
                                {" "}
                                <a href="#!"> Frances Guerrero </a>{" "}
                              </h6>
                              <small className="ms-2">4min</small>
                            </div>
                            <p className="small mb-0">Comment here.</p>
                          </div>
                          {/* Comment react */}
                          <ul className="nav nav-divider pt-2 small">
                            <li className="nav-item">
                              <a className="nav-link" href="#!">
                                {" "}
                                Like (1)
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    {/* Comment item END */}
                  </ul>
                  {/* Comment wrap END */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Container END */}
      </main>
    </div>
  );
}
