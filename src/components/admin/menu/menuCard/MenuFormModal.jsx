import { useState, useEffect } from 'react';
import { X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import api from "@services/common/api";

const MenuFormModal = ({ isOpen, onClose, editingItem, allCategories }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageFile: null,    // file for upload
    imageUrl: '',       // preview
    isAvailable: true,
    isVeg: true,
    isDelete: false
  });
  const [submitting, setSubmitting] = useState(false);

  // ------------------------------------
  // Populate form when editing
  // ------------------------------------
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || '',
        description: editingItem.description || '',
        price: editingItem.price?.toString() || '',
        category: editingItem.category || '',
        imageFile: null,
        imageUrl: editingItem.imageUrl || '',
        isAvailable: editingItem.isAvailable ?? true,
        isVeg: editingItem.isVeg ?? true,
        isDelete: editingItem.isDelete ?? false
      });
    } else {
      setFormData(prev => ({ ...prev, imageFile: null, imageUrl: '' }));
    }
    setCategories(allCategories || []);
  }, [editingItem, isOpen, allCategories]);

  // ------------------------------------
  // Handle image selection for preview
  // ------------------------------------
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData(prev => ({
      ...prev,
      imageFile: file,
      imageUrl: URL.createObjectURL(file) // for preview
    }));
  };

  // ------------------------------------
  // Submit form to backend
  // ------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", formData.price.toString());
      payload.append("category", formData.category);
      payload.append("isAvailable", formData.isAvailable ? "true" : "false");
      payload.append("isVeg", formData.isVeg ? "true" : "false");
      payload.append("isDelete", formData.isDelete ? "true" : "false");

      if (formData.imageFile) {
        payload.append("image", formData.imageFile);
      }

      // Axios will auto-set Content-Type to multipart/form-data with boundary
      if (editingItem) {
        await api.put(`/secure/api/v1/foods/${editingItem.foodId}`, payload);
      } else {
        await api.post("/secure/api/v1/foods", payload);
      }
      onClose();
    } catch (err) {
      console.error("Failed to save item:", err.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ------------------------------------
  // Render JSX
  // ------------------------------------
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-gray-100">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </Dialog.Title>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Food description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => updateField('price', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="250"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <label className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all w-full block relative">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Food" className="mx-auto mb-2 w-32 h-32 object-cover rounded-xl" />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ marginLeft: "-25%", height: "15%", width: "50%" }}
                />
              </label>
            </div>

            {/* Veg + Availability */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={formData.isVeg} onChange={(e) => updateField('isVeg', e.target.checked)} />
                Vegetarian
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={formData.isAvailable} onChange={(e) => updateField('isAvailable', e.target.checked)} />
                Available
              </label>
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