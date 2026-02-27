import { useState, useEffect } from 'react';
import { Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import api from "@services/common/api";


const MenuFormModal = ({ isOpen, onClose, editingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'main-course',
    stock: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // ------------------------------------
  // POPULATE FORM WHEN EDITING
  // ------------------------------------
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || '',
        price: editingItem.price?.toString() || '',
        category: editingItem.category || 'main-course',
        stock: editingItem.stock?.toString() || '',
      });
    } else {
      setFormData({ name: '', price: '', category: 'main-course', stock: '' });
    }
  }, [editingItem, isOpen]);

  // ------------------------------------
  // SUBMIT
  // ------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name,
        description: "", // Add field later if needed
        price: Number(formData.price),
        category: formData.category,
        imageUrl: "",
        isAvailable: true,
        isVeg: true,
        isDelete: false
      };


      if (editingItem) {
        const response = await api.put(
          `/secure/api/v1/foods/${editingItem.id}`,
          payload
        );

        console.log('Update item:', editingItem.id, payload);
      } else {
        const response = await api.post(
          "/secure/api/v1/foods",
          payload
        );

        console.log('Add new item:', payload);
      }
     onClose();
    } catch (err) {
      console.error("Failed to save item:", err.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  };

  // ------------------------------------
  // FORM FIELD HELPER
  // ------------------------------------
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ------------------------------------
  // RENDER
  // ------------------------------------
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="250"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => updateField('stock', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="25"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="main-course">Main Course</option>
                <option value="starters">Starters</option>
                <option value="drinks">Drinks</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                <ImageIcon className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload image</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            {/* Translations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Translations
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                >
                  EN 🇺🇸
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  + HI 🇮🇳
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  + GU 🇮🇳
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingItem ? 'Update' : 'Add Item'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MenuFormModal;