import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../api";

function PageHome() {
  const [countStartup, setCountStartup] = useState(null);
  const [countInvestisseur, setCountInvestisseur] = useState(null);

  const countNumber = async () => {
    const responseData = await callApi("auth/count");
    if (responseData) {
      setCountStartup(responseData.nbStartups);
      setCountInvestisseur(responseData.nbInvestisseur);
    }
  };
  useEffect(() => {
    countNumber();
  });

  return (
    <>
      <div>
        <header
          id="header"
          className="navbar navbar-expand-lg navbar-end navbar-absolute-top navbar-light navbar-show-hide"
          data-hs-header-options='{
      "fixMoment": 1000,
      "fixEffect": "slide"
    }'
        >
          <div className="container navbar-topbar">
            <nav className="js-mega-menu navbar-nav-wrap">
              {/* Toggler */}
              <button
                className="navbar-toggler ms-auto"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#topbarNavDropdown"
                aria-controls="topbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="d-flex justify-content-between align-items-center small">
                  <span className="navbar-toggler-text">Topbar</span>
                  <span className="navbar-toggler-default">
                    <i className="bi-chevron-down ms-2" />
                  </span>
                  <span className="navbar-toggler-toggled">
                    <i className="bi-chevron-up ms-2" />
                  </span>
                </span>
              </button>
              {/* End Toggler */}
              <div
                id="topbarNavDropdown"
                className="navbar-nav-wrap-collapse collapse navbar-collapse navbar-topbar-collapse"
              >
                <div className="navbar-toggler-wrapper">
                  <div className="navbar-topbar-toggler d-flex justify-content-between align-items-center">
                    <span className="navbar-toggler-text small">Topbar</span>
                    {/* Toggler */}
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#topbarNavDropdown"
                      aria-controls="topbarNavDropdown"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <i className="bi-x" />
                    </button>
                    {/* End Toggler */}
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {/* End Topbar */}
          <div className="container">
            <nav className="js-mega-menu navbar-nav-wrap">
              {/* Default Logo */}
              <a className="navbar-brand" href="index.html" aria-label="Front">
                <img
                  className="navbar-brand-logo"
                  src="assets1home/svg/logos/logo.svg"
                  alt="Logo"
                />
              </a>
              {/* End Default Logo */}
              {/* Toggler */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-default">
                  <i className="bi-list" />
                </span>
                <span className="navbar-toggler-toggled">
                  <i className="bi-x" />
                </span>
              </button>
              {/* End Toggler */}
              {/* Collapse */}
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <div className="navbar-absolute-top-scroller">
                  <ul className="navbar-nav">
                    {/* Button */}
                    <li className="nav-item">
                      <Link
                        to="/login"
                        className="btn btn-primary btn-transition"
                      >
                        S'inscrire
                      </Link>
                    </li>
                    {/* End Button */}
                  </ul>
                </div>
              </div>
              {/* End Collapse */}
            </nav>
          </div>
        </header>
        {/* ========== MAIN CONTENT ========== */}
        <main id="content" role="main">
          {/* Hero */}
          <div className="d-lg-flex position-relative">
            <div className="container d-lg-flex align-items-lg-center content-space-t-3 content-space-lg-0 min-vh-lg-100">
              {/* Heading */}
              <div className="w-100">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="mb-5">
                      <h1 className="display-4 mb-3">
                        Investissez dans des
                        <span className="text-primary text-highlight-warning">
                          <span
                            className="js-typedjs"
                            data-hs-typed-options='{
            "strings": ["startups.", "avenir.", "opportunités."],
            "typeSpeed": 90,
            "loop": true,
            "backSpeed": 30,
            "backDelay": 2500
          }'
                          >
                            {" "}
                            opportunités.
                          </span>
                        </span>
                      </h1>
                      <p className="lead">
                        Investir dans des start-ups peut être un défi, mais avec
                        une plateforme transparente et efficace, tout devient
                        plus simple !
                      </p>
                    </div>
                    <div className="d-grid d-sm-flex gap-3">
                      <a
                        className="btn btn-primary btn-transition px-6"
                        href="/login"
                      >
                        Commencer
                      </a>
                    </div>
                  </div>
                  {/* End Col */}
                </div>
                {/* End Row */}
              </div>
              {/* End Title & Description */}
              {/* SVG Shape */}
              <div
                className="col-lg-7 col-xl-6 d-none d-lg-block position-absolute top-0 end-0 pe-0"
                style={{ marginTop: "6.75rem" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1137.5 979.2"
                >
                  <path
                    fill="#F9FBFF"
                    d="M565.5,957.4c81.1-7.4,155.5-49.3,202.4-115.7C840,739.8,857,570,510.7,348.3C-35.5-1.5-4.2,340.3,2.7,389
        c0.7,4.7,1.2,9.5,1.7,14.2l29.3,321c14,154.2,150.6,267.8,304.9,253.8L565.5,957.4z"
                  />
                  <defs>
                    <path
                      id="mainHeroSVG1"
                      d="M1137.5,0H450.4l-278,279.7C22.4,430.6,24.3,675,176.8,823.5l0,0C316.9,960,537.7,968.7,688.2,843.6l449.3-373.4V0z"
                    />
                  </defs>
                  <clipPath id="mainHeroSVG2">
                    <use xlinkHref="#mainHeroSVG1" />
                  </clipPath>
                  <g
                    transform="matrix(1 0 0 1 0 0)"
                    clipPath="url(#mainHeroSVG2)"
                  >
                    <image
                      width={750}
                      height={750}
                      xlinkHref="assets1home\img\business-person-futuristic-business-environment (1).jpg"
                      transform="matrix(1.4462 0 0 1.4448 52.8755 0)"
                    />
                  </g>
                </svg>
              </div>
              {/* End SVG Shape */}
            </div>
          </div>
          {/* End Hero */}
          <div className="container content-space-2 content-space-t-xl-3 content-space-b-lg-3">
            <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5">
              <h2>Notre mission est claire </h2>
            </div>
            <div className="text-center mb-10">
              {/* List Checked */}
              <ul className="list-inline list-checked list-checked-primary">
                <li className="list-inline-item">
                  Connecter les entrepreneurs avec des investisseurs potentiels
                  en offrant une plateforme où les start-ups peuvent présenter
                  leurs projets, permettant ainsi aux investisseurs de découvrir
                  et de choisir les opportunités d'investissement les plus
                  prometteuses.
                </li>
              </ul>
              {/* End List Checked */}
            </div>
            <div className="row mb-5 mb-md-0">
              <div className="col-sm-6 col-lg-4 mb-4 mb-lg-0">
                <div className="card card-sm h-100">
                  <div className="p-2">
                    <img
                      className="card-img"
                      src="assets1home/img/person-using-tablet.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Startups</h4>
                    <p className="card-text">
                      Découvrez les investisseurs qui soutiennent votre vision
                      entrepreneuriale et propulsez votre start-up vers de
                      nouveaux horizons.
                    </p>
                    <ul className="list-pointer mb-0">
                      <li className="list-pointer-item">
                        financement sur mesure
                      </li>
                      <li className="list-pointer-item">
                        accès à un réseau d'experts
                      </li>
                      <li className="list-pointer-item">
                        une visibilité accrue
                      </li>
                    </ul>
                    {/* End List Pointer */}
                  </div>
                </div>
                {/* End Card */}
              </div>
              {/* End Col */}
              <div className="col-sm-6 col-lg-4 mb-4 mb-lg-0">
                {/* Card */}
                <div className="card card-sm h-100">
                  <div className="p-2">
                    <img
                      className="card-img"
                      src="assets1home/img/businessmen-elegant-suits-business-meeting-discussing-new-project-office.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Investisseurs</h4>
                    <p className="card-text">
                      Accès à une variété de start-ups prometteuses à différents
                      stades de développement, ouvrant ainsi des opportunités
                      d'investissement potentiellement rentables et la capacité
                      à participer à leur expansion.
                    </p>
                    {/* List Pointer */}
                    <ul className="list-pointer mb-0">
                      <li className="list-pointer-item">
                        Rendement potentiel élevé.
                      </li>
                      <li className="list-pointer-item">
                        Contribution à l'innovation.
                      </li>
                      <li className="list-pointer-item">
                        Découverte simplifiée de start-ups
                      </li>
                    </ul>
                    {/* End List Pointer */}
                  </div>
                </div>
                {/* End Card */}
              </div>
              {/* End Col */}
            </div>
            <div className="container content-space-2 content-space-lg-3">
              <div className="row align-items-md-center">
                <div className="col-md-5 d-none d-md-block">
                  <img
                    className="img-fluid rounded-2"
                    src="assets1home/img/750x750/start-up-project.jpg"
                    alt="Image Description"
                  />
                </div>
                {/* End Col */}
                <div className="col-md-7">
                  {/* Blockquote */}
                  <figure className="pe-md-7">
                    <div className="mb-4">
                      <blockquote className="blockquote blockquote-lg">
                        Pourquoi StartInvest ?{" "}
                      </blockquote>
                    </div>
                    <blockquote className="blockquote blockquote-lg">
                      "Nous facilitons la collaboration entre startups et
                      investisseurs en créant un écosystème transparent et
                      efficace."
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 d-md-none">
                          <img
                            className="avatar avatar-circle"
                            src="assets1home/img/160x160/img4.jpg"
                            alt="Image Description"
                          />
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                  {/* End Blockquote */}
                </div>
                {/* End Col */}
              </div>
              {/* End Row */}
            </div>
            <div className="bg-light rounded-2 mx-3 mx-lg-10">
              <div className="container content-space-2">
                <div className="row justify-content-center">
                  <div className="col-sm-6 col-md-4 mb-7 mb-md-0">
                    {/* Stats */}
                    <div className="text-center">
                      <h2 className="display-4">
                        <i className="bi-arrow-down-short text-danger" />
                        {countStartup}
                      </h2>
                      <p className="mb-0">Startups inscrites</p>
                    </div>
                    {/* End Stats */}
                  </div>
                  {/* End Col */}
                  <div className="col-sm-6 col-md-4 mb-7 mb-md-0">
                    {/* Stats */}
                    <div className="text-center">
                      <h2 className="display-4">
                        <i className="bi-arrow-up-short text-success" />
                        {countInvestisseur}
                      </h2>
                      <p className="mb-0">Investisseurs actifs</p>
                    </div>
                    {/* End Stats */}
                  </div>
                </div>
                {/* End Row */}
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-light">
          <div className="container pb-1 pb-lg-7">
            <div className="row content-space-t-2">
              <div className="col-lg-3 mb-7 mb-lg-0">
                {/* Logo */}
                <div className="mb-5">
                  <a
                    className="navbar-brand"
                    href="index.html"
                    aria-label="Space"
                  >
                    <img
                      className="navbar-brand-logo"
                      src="assets1home/svg/logos/logo.svg"
                      alt="Image Description"
                    />
                  </a>
                </div>
                {/* End Logo */}
                {/* List */}
                <ul className="list-unstyled list-py-1">
                  <li>
                    <a className="link-sm link-secondary" href="#">
                      <i className="bi-geo-alt-fill me-1" />
                      Tunis
                    </a>
                  </li>
                  <li>
                    <a
                      className="link-sm link-secondary"
                      href="tel:1-062-109-9222"
                    >
                      <i className="bi-telephone-inbound-fill me-1" /> +216
                      58043132
                    </a>
                  </li>
                </ul>
                {/* End List */}
              </div>
            </div>
            {/* End Row */}
          </div>
        </footer>
      </div>
    </>
  );
}

export default PageHome;
