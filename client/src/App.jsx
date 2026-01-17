import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminPage from "./pages/AdminPage";
import FastFoods from "./pages/FastFoods";
import Chicken from "./pages/Chicken";
import RiceMeals from "./pages/RiceMeals";
import AdminFoodTable from "./pages/AdminFoodTable";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";

// Admin Pages
import AdminHome from "./adminPages/AdminHome";
import Adminff from "./adminPages/Adminff";
import Admincm from "./adminPages/Admincm";
import Adminrm from "./adminPages/Adminrm";
import AdminOrders from "./adminPages/AdminOrders";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />

        {/* User Protected Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />
        <Route path="/foods" element={
          <ProtectedRoute>
            <FastFoods />
          </ProtectedRoute>
        } />
        <Route path="/Cfoods" element={
          <ProtectedRoute>
            <Chicken />
          </ProtectedRoute>
        } />
        <Route path="/Rfoods" element={
          <ProtectedRoute>
            <RiceMeals />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/order-success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />

        {/* Admin Protected Routes */}
        <Route path="/adminhome" element={
          <ProtectedRoute admin={true}>
            <AdminHome />
          </ProtectedRoute>
        } />
        <Route path="/adminPage" element={
          <ProtectedRoute admin={true}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/adminff" element={
          <ProtectedRoute admin={true}>
            <Adminff />
          </ProtectedRoute>
        } />
        <Route path="/admincm" element={
          <ProtectedRoute admin={true}>
            <Admincm />
          </ProtectedRoute>
        } />
        <Route path="/adminrm" element={
          <ProtectedRoute admin={true}>
            <Adminrm />
          </ProtectedRoute>
        } />
        <Route path="/adminTable" element={
          <ProtectedRoute admin={true}>
            <AdminFoodTable />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute admin={true}>
            <AdminOrders />
          </ProtectedRoute>
        } />

        {/* Redirect unknown paths to home or login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
