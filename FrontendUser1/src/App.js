import { BrowserRouter } from "react-router-dom";

import AuthentificatedRouter from "./routes/AuthentificatedRouter";
import NoAuthentificatedRouter from "./routes/NoAuthentificatedRouter";
import { UserProvider } from "./context/UserContext";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <UserProvider>
        {token ? <AuthentificatedRouter /> : <NoAuthentificatedRouter />}
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
