import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callApi } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSumit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    try {
      const data = await callApi("auth/login", "POST", { email, password });

      localStorage.setItem("token", data.access_token);

      const userType = await getUserType();
      if (userType === "fondateur" || userType === "investisseur") {
        window.location.href = "/StartInvest";
      } else {
        window.location.href = "/updateProfile";
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Une erreur s'est produite. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserType = async () => {
    try {
      // Appeler l'API pour récupérer le type d'utilisateur
      const response = await callApi("auth/user", "GET", null, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      return response.user.type;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du type d'utilisateur:",
        error
      );
      throw error;
    }
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:8000/auth/google/redirect";
  };

  const handleFacebook = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:8000/auth/facebook/redirect";
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100 py-5">
          <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card card-body text-center p-4 p-sm-5">
              <h1 className="mb-2">Connexion</h1>
              {error && <p className="text-danger mb-3">{error}</p>}
              <form className="mt-sm-4" onSubmit={handleSumit}>
                <div className="mb-3 input-group-lg">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre email"
                  />
                </div>
                <div className="mb-3 position-relative">
                  <div className="input-group input-group-lg">
                    <input
                      className="form-control fakepassword"
                      type={showPassword ? "text" : "password"}
                      id="psw-input"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Entrez votre nouveau mot de passe"
                    />
                    <span
                      className="input-group-text p-0"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        className={`fa-solid ${
                          showPassword ? "fa-eye" : "fa-eye-slash"
                        } cursor-pointer p-2 w-40px`}
                      />
                    </span>
                  </div>
                </div>
                <div className="mb-3 d-sm-flex justify-content-between">
                  <Link to="/forgot-password">Mot de passe oublié?</Link>
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Connexion en cours..." : "Se connecter"}
                  </button>
                </div>
                <br />
                <div className="text-center">
                  <p>
                    Vous n'avez pas de compte?{" "}
                    <Link to="/register">S'inscrire</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
