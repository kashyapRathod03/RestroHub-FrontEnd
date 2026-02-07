// src/routes/index.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Landing from '../pages/public/Landing';

// Customer Pages
import RestaurantMenu from '../pages/customer/RestaurantMenu';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import Menus from '../pages/admin/Menus';
import Orders from '../pages/admin/Orders';
import Branches from '../pages/admin/store/Branches';
import Tables from '../pages/admin/store/Tables';
import Website from '../pages/admin/marketing/Website';
import QRDisplay from '../pages/admin/marketing/QRDisplay';
import UPILinks from '../pages/admin/UPILinks';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========== PUBLIC ROUTES ========== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>

      {/* ========== CUSTOMER ROUTES ========== */}
      <Route element={<CustomerLayout />}>
        <Route 
          path="/Restrohub/:restaurantName/:branchId" 
          element={<RestaurantMenu />} 
        />
      </Route>

      {/* ========== ADMIN ROUTES ========== */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menus" element={<Menus />} />
        <Route path="orders" element={<Orders />} />
        <Route path="store/branches" element={<Branches />} />
        <Route path="store/branches/:branchId/tables" element={<Tables />} />
        <Route path="marketing/website" element={<Website />} />
        <Route path="marketing/qr-display" element={<QRDisplay />} />
        <Route path="upi-links" element={<UPILinks />} />
      </Route>

      {/* ========== 404 FALLBACK ========== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;