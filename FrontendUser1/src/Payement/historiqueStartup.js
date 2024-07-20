import { useState, useEffect, useRef } from "react";
import "./InvestmentHistoryPage.css";
import { callApi } from "../api";
import Chart from "chart.js/auto";
import moment from "moment";
import Select from "react-select";
import { SidebarLeft, Header } from "../services";

const InvestmentHistoryPage = () => {
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [filteredInvestmentHistory, setFilteredInvestmentHistory] = useState(
    []
  );
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const chartRef = useRef(null);
  const fetchInvestmentHistory = async () => {
    const data = await callApi("auth/investorsTransactions");
    if (data) {
      setInvestmentHistory(data);
      filterInvestmentHistory(data, selectedMonth, selectedInvestor);
      renderChart(data);
    }
  };

  useEffect(() => {
    fetchInvestmentHistory();
  }, [selectedMonth, selectedInvestor]);

  const handleMonthChange = (increment) => {
    setSelectedMonth(
      moment(selectedMonth).add(increment, "months").format("YYYY-MM")
    );
  };

  const handleInvestorChange = (selectedOption) => {
    setSelectedInvestor(selectedOption);
  };

  const filterInvestmentHistory = (data, month, investor) => {
    let filteredData = data.filter((investment) => {
      const transactionDate = moment(investment.transaction_date);
      const investmentMonth = transactionDate.isValid()
        ? transactionDate.format("YYYY-MM")
        : null;
      return (
        investmentMonth === month &&
        (!investor ||
          investor.value === "all" ||
          investment.investor_name === investor.value)
      );
    });
    setFilteredInvestmentHistory(filteredData);
  };

  const renderChart = (data) => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const monthlyData = data.reduce((acc, investment) => {
      const transactionDate = moment(investment.transaction_date);
      if (transactionDate.isValid()) {
        const monthYear = transactionDate.format("YYYY-MM");
        if (!acc[monthYear]) {
          acc[monthYear] = {
            count: 0,
            investors: new Set(),
          };
        }
        acc[monthYear].count++;
        if (investment.investor_name) {
          acc[monthYear].investors.add(investment.investor_name);
        }
      }
      return acc;
    }, {});

    const months = Object.keys(monthlyData);
    const investmentsCount = months.map((month) => monthlyData[month].count);
    const investorsCount = months.map(
      (month) => monthlyData[month].investors.size
    );

    const ctx = document.getElementById("investmentChart");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Nombre d'investissements",
            data: investmentsCount,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "Nombre d'investisseurs",
            data: investorsCount,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const investors = [
    ...new Set(investmentHistory.map((investment) => investment.investor_name)),
  ];

  const investorOptions = investors.map((investor) => ({
    value: investor,
    label: investor,
  }));

  investorOptions.unshift({ value: "all", label: "Tous les investisseurs" });

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <main>
        <div className="container">
          <br />
          <br />
          <div className="row g-4">
            <SidebarLeft />
            <div className="investment-history">
              <h1 className="page-title">Historique des Investissements</h1>
              <div className="calendar">
                <button
                  className="nav-button"
                  onClick={() => handleMonthChange(-1)}
                >
                  Mois précédent
                </button>
                <h2 className="month">
                  {moment(selectedMonth).format("MMMM YYYY")}
                </h2>
                <button
                  className="nav-button"
                  onClick={() => handleMonthChange(1)}
                >
                  Mois suivant
                </button>
              </div>
              <div className="filter">
                <Select
                  className="investor-dropdown"
                  options={investorOptions}
                  value={selectedInvestor}
                  onChange={handleInvestorChange}
                  placeholder="Sélectionnez un investisseur..."
                  isClearable
                />
              </div>
              <div className="chart-container">
                <canvas id="investmentChart"></canvas>
              </div>
              <div className="investment-list">
                {filteredInvestmentHistory.length > 0 ? (
                  filteredInvestmentHistory.map((investment, index) => (
                    <div key={index} className="investment-item">
                      <div className="investment-info">
                        <div className="investment-id">ID: {index + 1}</div>
                        {/* Vérification de la nullité de investor_name */}
                        {investment.investor_name && (
                          <div className="investment-investor">
                            Investisseur : {investment.investor_name}
                          </div>
                        )}
                        {/* Vérification de la nullité de transaction_date */}
                        {investment.transaction_date && (
                          <div className="investment-date">
                            Date de transaction : {investment.transaction_date}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Aucune transaction trouvée.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestmentHistoryPage;
