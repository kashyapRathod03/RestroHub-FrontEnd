import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X, Loader2 } from "lucide-react";
import api from "@services/common/api";

const CategoryFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
debugger
    try {
      setSubmitting(true);

      const payload = {
        name: formData.name,
        description: formData.description,
        isDelete: false
      };

      await api.post("/secure/api/v1/categories/addCategory", payload);

      onClose();
      setFormData({ name: "", description: "" });

    } catch (err) {
      console.error("Category create failed:", err.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">

      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">

        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold">
              Add Category
            </Dialog.Title>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Category Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5"
                placeholder="e.g. Starters"
                required
                minLength={2}
                maxLength={50}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5"
                rows={3}
                maxLength={255}
              />
            </div>

            <div className="flex gap-3 pt-4">

              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-200 rounded-xl py-2.5"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white rounded-xl py-2.5 flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Add Category
              </button>

            </div>

          </form>

        </Dialog.Panel>

      </div>
    </Dialog>
  );
};

export default CategoryFormModal;