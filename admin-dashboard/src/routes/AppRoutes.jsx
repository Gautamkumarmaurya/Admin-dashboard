import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/dashboard/Dashboard";

import Products from "../pages/products/Products";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProduct";

import Categories from "../pages/categories/Categories";

import Orders from "../pages/orders/Orders";
import OrderDetailsPage from "../pages/orders/OrderDetailsPage";

import Customers from "../pages/customers/Customers";
import CustomerDetailsPage from "../pages/customers/CustomerDetailsPage";

import Analytics from "../pages/analytics/Analytics";
import Payments from "../pages/payments/Payments";
import Coupons from "../pages/coupons/Coupons";
import Reviews from "../pages/reviews/Reviews";
import Notifications from "../pages/notifications/Notifications";
import Settings from "../pages/settings/Settings";

import NotFound from "../pages/NotFound";

// Application routes
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Protected application routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/add"
          element={<AddProduct />}
        />

        <Route
          path="/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/orders/:id"
          element={<OrderDetailsPage />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/customers/:id"
          element={<CustomerDetailsPage />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/payments"
          element={<Payments />}
        />

        <Route
          path="/coupons"
          element={<Coupons />}
        />

        <Route
          path="/reviews"
          element={<Reviews />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>

      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" />}
      />

      {/* 404 route */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}