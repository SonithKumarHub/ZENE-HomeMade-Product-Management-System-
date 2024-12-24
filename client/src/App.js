import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyerRoutes from "./Layouts/Buyer/BuyerRoutes";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<BuyerRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
