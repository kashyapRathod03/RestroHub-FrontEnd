// src/components/admin/Header.jsx
import { Menu, Bell, Search, User } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 w-80">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-gray-100">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@restrohub.com</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;