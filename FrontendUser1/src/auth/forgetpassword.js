import { useState } from "react";
import { callApi } from "../api";

function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await callApi("auth/sendPasswordResetLink", "POST", {
        email,
      });
      if (response.data) {
        setSuccessMessage(response.data);
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100 py-5">
            <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card card-body text-center p-4 p-sm-5">
                {successMessage && (
                  <p style={{ color: "green" }}>{successMessage}</p>
                )}
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <h1 className="mb-2">Trouvez votre compte</h1>
                <form className="mt-sm-4" onSubmit={handleSubmit}>
                  <div className="mb-3 input-group-lg">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-lg btn-primary">
                      Reset Password
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

export default Forgetpassword;
