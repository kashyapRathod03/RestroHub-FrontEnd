// src/pages/admin/Menus.jsx
import { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  EyeOff,
  Eye,
  MoreVertical,
  ChevronRight,
  Globe,
  Image as ImageIcon,
  Copy,
  Trash2
} from 'lucide-react';
import { Dialog } from '@headlessui/react';

const Menus = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const categories = [
    { id: 'all', name: 'All Items', count: 24, emoji: '🍽️' },
    { id: 'main-course', name: 'Main Course', count: 12, emoji: '🥘' },
    { id: 'starters', name: 'Starters', count: 8, emoji: '🍛' },
    { id: 'drinks', name: 'Drinks', count: 4, emoji: '🥛' },
  ];

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Paneer Tikka', price: 250, category: 'starters', stock: 25, available: true },
    { id: 2, name: 'Butter Naan', price: 45, category: 'main-course', stock: 100, available: true },
    { id: 3, name: 'Biryani', price: 320, category: 'main-course', stock: 15, available: true },
    { id: 4, name: 'Mango Lassi', price: 90, category: 'drinks', stock: 50, available: true },
    { id: 5, name: 'Undhiyu', price: 280, category: 'main-course', stock: 0, available: false },
    { id: 6, name: 'Gujarati Thali', price: 350, category: 'main-course', stock: 20, available: true },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'main-course',
    stock: ''
  });

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id ? { ...item, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : item
      ));
    } else {
      setMenuItems([...menuItems, {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        available: true
      }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: '', price: '', category: 'main-course', stock: '' });
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      stock: item.stock.toString()
    });
    setIsModalOpen(true);
  };

  const toggleAvailability = (id) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const deleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
          <p className="text-gray-500">Add, edit, and manage your menu items</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Bulk Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-gray-50 text-sm">
          <Copy className="w-4 h-4" />
          Copy Yesterday's Menu
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-gray-50 text-sm">
          <EyeOff className="w-4 h-4" />
          Hide Sold Out
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-orange-500 text-white'
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.emoji}</span>
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${
                      selectedCategory === cat.id ? 'text-white/80' : 'text-gray-400'
                    }`}>
                      {cat.count}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border shadow-sm mb-6">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="bg-transparent outline-none flex-1"
            />
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all ${
                  !item.available ? 'opacity-60' : ''
                }`}
              >
                {/* Item Image */}
                <div className="relative w-full h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <ImageIcon className="w-12 h-12 text-gray-300" />
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">Sold Out</span>
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-lg font-bold text-orange-600">₹{item.price}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Stock */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Stock: {item.stock} units</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.stock > 10 ? 'bg-green-100 text-green-700' :
                    item.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-colors text-sm ${
                      item.available
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {item.available ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {item.available ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Translation Languages */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <div className="flex gap-1">
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">EN 🇺🇸</span>
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">HI 🇮🇳</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">GU 🇮🇳</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <Dialog.Title className="text-xl font-bold text-gray-800 mb-6">
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="250"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="25"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                >
                  <option value="main-course">Main Course</option>
                  <option value="starters">Starters</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Translations</label>
                <div className="flex gap-2">
                  <button type="button" className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm">
                    EN 🇺🇸
                  </button>
                  <button type="button" className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                    + HI 🇮🇳
                  </button>
                  <button type="button" className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                    + GU 🇮🇳
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 border rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                >
                  {editingItem ? 'Update' : 'Add Item'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Menus;