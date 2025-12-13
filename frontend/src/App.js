import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageEvents from "./admin/ManageEvents";
import Users from "./admin/Users";
import Reports from "./admin/Reports";

function App() {
  return (
    <Router>
      <Routes>
    
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />

    <Route path="/admin" element={<AdminLayout />} />
    <Route index element={<AdminDashboard />} />
    <Route path="events" element={<ManageEvents />} />
    <Route path="users" element={<Users />} />
    <Route path="reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
