import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../api";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useParams();
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [passwordvalider, setPasswordValider] = useState("");

  useEffect(() => {
    console.log("Email:", email);
    console.log("Token:", token);
  }, [email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await callApi("auth/reset-password", "POST", {
      token: token,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    });
    if (responseData) {
      window.location.href = "/login";
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordConfirmed = (e) => {
    setPasswordConfirmation(e.target.value);
    setPasswordConfirm("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordValider("");
  };

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100 py-5">
          <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card card-body text-center p-4 p-sm-5">
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <h1 className="mb-4">Réinitialisation de mot de passe</h1>
              <form onSubmit={handleSubmit}>
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
                      value={password}
                      onChange={handlePassword}
                      placeholder="Nouveau mot de passe"
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
                    {passwordvalider && (
                      <small className="text-danger">{passwordvalider}</small>
                    )}
                  </div>
                </div>
                <div className="mb-3 input-group-lg">
                  <input
                    className="form-control"
                    type="password"
                    value={password_confirmation}
                    onChange={handlePasswordConfirmed}
                    placeholder="Confirmer le mot de passe"
                  />
                  {passwordconfirm && (
                    <small className="text-danger">{passwordconfirm}</small>
                  )}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-lg btn-primary">
                    Réinitialiser le mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Resetpassword;
