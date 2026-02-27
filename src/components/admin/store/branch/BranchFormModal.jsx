import { useState, useEffect } from 'react';
import { X, Loader2, MapPin } from 'lucide-react';
import { Dialog } from '@headlessui/react';

const BranchFormModal = ({ isOpen, onClose, editingBranch }) => {
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', tables: '', timing: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingBranch) {
      setFormData({
        name: editingBranch.name,
        address: editingBranch.address,
        phone: editingBranch.phone,
        tables: editingBranch.tables.toString(),
        timing: editingBranch.timing,
      });
    } else {
      setFormData({ name: '', address: '', phone: '', tables: '', timing: '' });
    }
  }, [editingBranch, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // 🔌 API call here
      await new Promise((r) => setTimeout(r, 500));
      onClose();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const inputClass = `
    w-full rounded-lg border border-gray-200 bg-white
    px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400
    outline-none transition-all
    focus:border-blue-300 focus:ring-2 focus:ring-blue-100
  `;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className="
            w-full max-w-md overflow-hidden rounded-2xl
            border border-gray-200 bg-white shadow-xl
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <Dialog.Title className="text-lg font-bold text-gray-900">
                {editingBranch ? 'Edit Branch' : 'Add New Branch'}
              </Dialog.Title>
            </div>
            <button
              onClick={onClose}
              className="
                inline-flex h-8 w-8 items-center justify-center
                rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600
                transition-colors
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 px-5 py-5 sm:px-6">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-800">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputClass}
                  placeholder="e.g., Main Branch"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-800">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Full address"
                  rows={2}
                  required
                />
              </div>

              {/* Phone + Tables */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-800">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={inputClass}
                    placeholder="9876543210"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-800">
                    Tables
                  </label>
                  <input
                    type="number"
                    value={formData.tables}
                    onChange={(e) => updateField('tables', e.target.value)}
                    className={inputClass}
                    placeholder="12"
                    required
                  />
                </div>
              </div>

              {/* Timing */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-800">
                  Timing
                </label>
                <input
                  type="text"
                  value={formData.timing}
                  onChange={(e) => updateField('timing', e.target.value)}
                  className={inputClass}
                  placeholder="10:00 AM - 11:00 PM"
                  required
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 border-t border-gray-100 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="
                  flex-1 rounded-lg border border-gray-200 px-4 py-2.5
                  text-sm font-medium text-gray-700
                  hover:bg-gray-50 transition-colors
                  disabled:opacity-50
                "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="
                  flex-1 inline-flex items-center justify-center gap-2
                  rounded-lg bg-blue-50 px-4 py-2.5
                  text-sm font-medium text-blue-700
                  border border-blue-200
                  hover:bg-blue-100 transition-colors
                  disabled:opacity-50
                "
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingBranch ? 'Update' : 'Add Branch'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BranchFormModal;