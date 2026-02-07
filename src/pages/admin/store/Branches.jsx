// src/pages/admin/store/Branches.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  MapPin,
  Phone,
  Clock,
  Grid3X3,
  Edit2,
  Power,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { Dialog } from '@headlessui/react';

const Branches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Main Branch',
      address: 'Kalawad Road, Rajkot, Gujarat',
      phone: '9876543210',
      tables: 12,
      timing: '10:00 AM - 11:00 PM',
      isActive: true
    },
    {
      id: 2,
      name: 'City Center',
      address: '150 Feet Ring Road, Rajkot',
      phone: '9876543211',
      tables: 20,
      timing: '11:00 AM - 10:00 PM',
      isActive: true
    },
    {
      id: 3,
      name: 'Airport Road',
      address: 'Near Airport, Rajkot',
      phone: '9876543212',
      tables: 8,
      timing: '9:00 AM - 9:00 PM',
      isActive: false
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    tables: '',
    timing: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setBranches([
      ...branches,
      { id: Date.now(), ...formData, tables: Number(formData.tables), isActive: true }
    ]);
    setIsModalOpen(false);
    setFormData({ name: '', address: '', phone: '', tables: '', timing: '' });
  };

  const toggleStatus = (id) => {
    setBranches(branches.map(b =>
      b.id === id ? { ...b, isActive: !b.isActive } : b
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Branches</h1>
          <p className="text-gray-500">Manage your restaurant branches</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Branch
        </button>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className={`bg-white rounded-2xl p-6 shadow-sm border-2 hover:shadow-md transition-all ${
              branch.isActive ? 'border-gray-100' : 'border-gray-200 opacity-60'
            }`}
          >
            {/* Branch Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  branch.isActive ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <MapPin className={`w-6 h-6 ${branch.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{branch.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    branch.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Branch Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">{branch.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{branch.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{branch.timing}</p>
              </div>
              <div className="flex items-center gap-3">
                <Grid3X3 className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{branch.tables} Tables</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Link
                to={`/admin/store/branches/${branch.id}/tables`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                <Grid3X3 className="w-4 h-4" />
                Manage Tables
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => toggleStatus(branch.id)}
                className={`p-2.5 rounded-xl transition-colors ${
                  branch.isActive
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                <Power className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Branch Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <Dialog.Title className="text-xl font-bold text-gray-800 mb-6">
              Add New Branch
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="e.g., Main Branch"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                  placeholder="Full address"
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="9876543210"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tables</label>
                  <input
                    type="number"
                    value={formData.tables}
                    onChange={(e) => setFormData({ ...formData, tables: e.target.value })}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timing</label>
                <input
                  type="text"
                  value={formData.timing}
                  onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="10:00 AM - 11:00 PM"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                >
                  Add Branch
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Branches;