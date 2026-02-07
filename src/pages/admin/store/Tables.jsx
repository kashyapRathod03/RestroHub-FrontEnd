// src/pages/admin/store/Tables.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Plus,
  ArrowLeft,
  QrCode,
  Download,
  Edit2,
  Users,
  Trash2
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { Dialog } from '@headlessui/react';

const Tables = () => {
  const { branchId } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const [tables, setTables] = useState([
    { id: 1, number: 1, capacity: 4, status: 'available' },
    { id: 2, number: 2, capacity: 2, status: 'occupied' },
    { id: 3, number: 3, capacity: 6, status: 'available' },
    { id: 4, number: 4, capacity: 4, status: 'occupied' },
    { id: 5, number: 5, capacity: 8, status: 'reserved' },
    { id: 6, number: 6, capacity: 4, status: 'available' },
    { id: 7, number: 7, capacity: 2, status: 'available' },
    { id: 8, number: 8, capacity: 4, status: 'occupied' },
  ]);

  const [formData, setFormData] = useState({ number: '', capacity: '' });

  const statusColors = {
    available: 'bg-green-100 text-green-700 border-green-200',
    occupied: 'bg-red-100 text-red-700 border-red-200',
    reserved: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTables([
      ...tables,
      {
        id: Date.now(),
        number: Number(formData.number),
        capacity: Number(formData.capacity),
        status: 'available'
      }
    ]);
    setIsAddModalOpen(false);
    setFormData({ number: '', capacity: '' });
  };

  const getQRUrl = (tableNumber) => {
    return `${window.location.origin}/Restrohub/RajkotDhaba/${branchId}?table=${tableNumber}`;
  };

  const openQRModal = (table) => {
    setSelectedTable(table);
    setShowQRModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/store/branches"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tables - Branch #{branchId}</h1>
            <p className="text-gray-500">Manage tables and QR codes</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 transition-colors font-medium">
            <Download className="w-5 h-5" />
            Download All QRs
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Table
          </button>
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-gray-500">Status:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-gray-600">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="text-gray-600">Reserved</span>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => openQRModal(table)}
            className={`bg-white rounded-2xl p-4 shadow-sm border-2 hover:shadow-md transition-all cursor-pointer ${statusColors[table.status]}`}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{table.number}</span>
              </div>
              <p className="font-semibold text-gray-800">Table {table.number}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mt-1">
                <Users className="w-4 h-4" />
                <span>{table.capacity} seats</span>
              </div>
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full capitalize bg-white/50">
                {table.status}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center gap-2 mt-3 pt-3 border-t border-current/10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openQRModal(table);
                }}
                className="p-2 bg-white/50 rounded-lg hover:bg-white transition-colors"
              >
                <QrCode className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/50 rounded-lg hover:bg-white transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/50 rounded-lg hover:bg-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal */}
      <Dialog open={showQRModal} onClose={() => setShowQRModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl text-center">
            <Dialog.Title className="text-xl font-bold text-gray-800 mb-6">
              Table {selectedTable?.number} QR Code
            </Dialog.Title>

            {selectedTable && (
              <>
                <div className="bg-white p-4 rounded-xl inline-block shadow-lg border">
                  <QRCode
                    value={getQRUrl(selectedTable.number)}
                    size={200}
                    level="H"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4 mb-6">
                  Scan to view menu & place order
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="flex-1 px-4 py-2.5 border rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Close
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Add Table Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <Dialog.Title className="text-xl font-bold text-gray-800 mb-6">
              Add New Table
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
                <input
                  type="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="9"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seating Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="4"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                >
                  Add Table
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Tables;