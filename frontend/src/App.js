import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import AdminStats from "./admin/AdminStats";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageEvents from "./admin/ManageEvents";
import Users from "./admin/Users";
import Reports from "./admin/Reports";

import AdminRoute from "./admin/AdminRoute";


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
    <Route path="/admin/dashboard" element={<AdminStats />} />

    <Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminStats />
    </AdminRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;


