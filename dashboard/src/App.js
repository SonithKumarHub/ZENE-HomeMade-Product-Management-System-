import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./Layouts/Admin/AdminRoutes";
import SellerRoutes from "./Layouts/Seller/SellerRoutes";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Admin/*" element={<AdminRoutes />} />
          <Route exact path="/*" element={<SellerRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
