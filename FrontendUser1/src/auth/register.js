import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callApi } from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [passwordvalider, setPasswordValider] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);

    const responseData = await callApi("auth/register", "POST", formData, true);

    if (responseData) {
      if (responseData[1] && responseData[1].errors.email) {
        setLoading(false);
        setEmailExistsError(
          "Ce nom d'utilisateur est déjà utilisé.Essayez un autre nom. "
        );
      } else if (responseData[1] && responseData[1].errors.password) {
        setLoading(false);
        setPasswordConfirm(
          "Ces mots de passe ne correspondent pas. Veuillez réessayer."
        );
      } else {
        setLoading(false);
        navigate("/login");
      }
    }
    if (
      password.length < 8 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(password)
    ) {
      setLoading(false);
      setPasswordValider(
        "Veuillez choisir un mot de passe plus sûr. Essayez un mélange de lettres, de chiffres et de symboles avec au moins 8 caractères."
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [emailExistsError, setEmailExistsError] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailExistsError("");
  };
  const handlePasswordConfirmed = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordConfirm("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordValider("");
  };
  return (
    <>
      <main>
        {/* Container START */}
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100 py-5">
            {/* Main content START */}
            <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
              {/* Sign up START */}
              <div className="card card-body rounded-3 p-4 p-sm-5">
                <div className="text-center">
                  {/* Title */}
                  <h1 className="mb-2">Inscription</h1>
                  <span className="d-block">
                    Déjà membre ? <Link to="/login">Connectez-vous ici</Link>
                  </span>
                </div>
                {/* Form START */}
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="mb-3 input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder="Entrez votre nom"
                      required
                    />
                    <small>
                      Nous ne partagerons jamais votre nom avec qui que ce soit.
                    </small>
                  </div>

                  {/* Email */}
                  <div className="mb-3 input-group-lg">
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleEmailChange}
                      placeholder="Entrez votre email"
                      required
                    />
                    {emailExistsError && (
                      <small className="text-danger">{emailExistsError}</small>
                    )}
                  </div>

                  {/* New password */}
                  <div className="mb-3 position-relative">
                    <div className="input-group input-group-lg">
                      <input
                        className="form-control fakepassword"
                        type={showPassword ? "text" : "password"}
                        id="psw-input"
                        onChange={handlePassword}
                        placeholder="Entrez votre nouveau mot de passe"
                        required
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
                  {/* Confirm password */}
                  <div className="mb-3 input-group-lg">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Confirmer votre mot de passe"
                      value={confirmPassword}
                      onChange={handlePasswordConfirmed}
                      required
                    />
                    {passwordconfirm && (
                      <small className="text-danger">{passwordconfirm}</small>
                    )}
                  </div>
                  {/* Keep me signed in */}

                  {/* Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Inscrire en cours..." : "Inscrire"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
