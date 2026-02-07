// src/components/admin/Sidebar.jsx
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  Store,
  Megaphone,
  CreditCard,
  ChevronDown,
  ChevronRight,
  X,
  Building2,
  Grid3X3,
  Globe,
  QrCode
} from 'lucide-react';

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    store: false,
    marketing: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const mainNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Menus', path: '/admin/menus', icon: UtensilsCrossed },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  ];

  const storeSubItems = [
    { name: 'Branches', path: '/admin/store/branches', icon: Building2 },
  ];

  const marketingSubItems = [
    { name: 'Website', path: '/admin/marketing/website', icon: Globe },
    { name: 'QR Display', path: '/admin/marketing/qr-display', icon: QrCode },
  ];

  const NavItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
        }`
      }
    >
      <item.icon className="w-5 h-5" />
      <span className="font-medium">{item.name}</span>
    </NavLink>
  );

  const ExpandableMenu = ({ title, icon: Icon, items, menuKey }) => {
    const isExpanded = expandedMenus[menuKey];
    const isActive = items.some(item => location.pathname.startsWith(item.path));

    return (
      <div>
        <button
          onClick={() => toggleMenu(menuKey)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
            isActive
              ? 'bg-orange-100 text-orange-600'
              : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span className="font-medium">{title}</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {isExpanded && (
          <div className="ml-4 mt-1 pl-4 border-l-2 border-orange-200 space-y-1">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl 
          transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">RestroHub</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {mainNavItems.map((item) => (
              <NavItem 
                key={item.path} 
                item={item} 
                onClick={() => setOpen(false)} 
              />
            ))}

            <ExpandableMenu
              title="Store"
              icon={Store}
              items={storeSubItems}
              menuKey="store"
            />

            <ExpandableMenu
              title="Marketing"
              icon={Megaphone}
              items={marketingSubItems}
              menuKey="marketing"
            />

            <NavItem
              item={{ name: 'UPI Links', path: '/admin/upi-links', icon: CreditCard }}
              onClick={() => setOpen(false)}
            />
          </nav>

          {/* Restaurant Info */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">Rajkot Dhaba</p>
                <p className="text-xs text-gray-500">Main Branch</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;