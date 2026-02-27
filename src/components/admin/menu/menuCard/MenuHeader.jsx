import { Plus } from 'lucide-react';

const MenuHeader = ({ onAddItem }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-gray-500">Add, edit, and manage your menu items</p>
      </div>
      <button
        onClick={onAddItem}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Item
      </button>
    </div>
  );
};

export default MenuHeader;