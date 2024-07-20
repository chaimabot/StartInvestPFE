import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { callApi } from "../api";
import { Header, SidebarLeft } from "../services";

const Failed = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");

    callApi(`auth/verify/${paymentId}`, "POST")
      .then((response) => {
        if (response.success && response.result.status === "FAILED") {
          setPaymentData(response.result.details);
        } else {
          console.error(
            "Erreur lors de la vérification du paiement :",
            response
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification du paiement :", error);
        setLoading(false);
      });
  }, [location.search]);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />{" "}
      <main>
        <div className="container">
          <br />
          <br />
          <div className="row g-4">
            <SidebarLeft />
            <div className="col-md-8 col-lg-6 vstack gap-6">
              <div className="col-md-12">
                <div className="bg-gray-100">
                  <div className="bg-white p-6 md:mx-auto">
                    <div className="text-center">
                      <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Échec de paiement!
                      </h3>
                      <p className="text-gray-600 my-2">
                        Le paiement sécurisé en ligne a échoué. Veuillez
                        réessayer ou contacter le support pour plus
                        d'informations.
                      </p>
                      <p>Merci!</p>
                      <div>
                        {paymentData && (
                          <table className="table table-bordered mt-4">
                            <thead>
                              <tr>
                                <th>Clé</th>
                                <th>Valeur</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Numéro de commande</td>
                                <td>{paymentData.order_number}</td>
                              </tr>
                              <tr>
                                <td>Nom</td>
                                <td>{paymentData.name}</td>
                              </tr>
                              <tr>
                                <td>Numéro de téléphone</td>
                                <td>{paymentData.phone_number}</td>
                              </tr>
                              <tr>
                                <td>Email</td>
                                <td>{paymentData.email}</td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Failed;
