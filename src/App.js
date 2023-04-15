import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Route, Routes } from "react-router-dom";
import Perechin from "./components/Perechin/Perechin";
import Uzhhorod from "./components/Uzhhorod/Uzhhorod";
import Appellate from "./components/Appellate/Appellate";
import GreatBerezny from "./components/GreatBerezny/GreatBerezny";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Perechin />} />
        <Route path={"uzhhorod"} element={<Uzhhorod />} />
        <Route path={"appellate"} element={<Appellate />} />
        <Route path={"greatberezny"} element={<GreatBerezny />} />
      </Routes>
    </div>
  );
}

export default App;
