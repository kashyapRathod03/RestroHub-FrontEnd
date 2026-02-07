// src/pages/admin/UPILinks.jsx
import { useState } from 'react';
import {
  Plus,
  CreditCard,
  Check,
  Copy,
  Trash2,
  TestTube,
  Star
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { Dialog } from '@headlessui/react';

const UPILinks = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const [upiLinks, setUpiLinks] = useState([
    { id: 1, name: 'Main Account', upiId: 'restaurant@paytm', isDefault: true, transactions: 89, revenue: 45230 },
    { id: 2, name: 'Backup Account', upiId: 'restaurant@upi', isDefault: false, transactions: 12, revenue: 5670 },
  ]);

  const [formData, setFormData] = useState({ name: '', upiId: '' });

  const handleCopy = (upiId, id) => {
    navigator.clipboard.writeText(upiId);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpiLinks([
      ...upiLinks,
      { id: Date.now(), ...formData, isDefault: false, transactions: 0, revenue: 0 }
    ]);
    setIsAddModalOpen(false);
    setFormData({ name: '', upiId: '' });
  };

  const setDefault = (id) => {
    setUpiLinks(upiLinks.map(link => ({
      ...link,
      isDefault: link.id === id
    })));
  };

  const deleteLink = (id) => {
    setUpiLinks(upiLinks.filter(link => link.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">UPI Links</h1>
          <p className="text-gray-500">Manage your payment UPI IDs</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add UPI Link
        </button>
      </div>

      {/* UPI Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upiLinks.map((link) => (
          <div
            key={link.id}
            className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${
              link.isDefault ? 'border-green-500' : 'border-gray-100'
            }`}
          >
            {link.isDefault && (
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  Default Payment
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{link.name}</h3>
                  <p className="text-sm text-gray-500">{link.upiId}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(link.upiId, link.id)}
                className={`p-2 rounded-lg transition-colors ${
                  copiedId === link.id ? 'bg-green-100 text-green-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {copiedId === link.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Transactions</p>
                <p className="text-xl font-bold text-gray-800">{link.transactions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-xl font-bold text-gray-800">₹{link.revenue.toLocaleString()}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowTestModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                <TestTube className="w-4 h-4" />
                Test ₹1
              </button>
              {!link.isDefault && (
                <button
                  onClick={() => setDefault(link.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  <Star className="w-4 h-4" />
                  Set Default
                </button>
              )}
              {!link.isDefault && (
                <button
                  onClick={() => deleteLink(link.id)}
                  className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add UPI Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <Dialog.Title className="text-xl font-bold text-gray-800 mb-6">
              Add UPI Link
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="e.g., Main Account"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="yourname@paytm"
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
                  Add UPI Link
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Test Payment Modal */}
      <Dialog open={showTestModal} onClose={() => setShowTestModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl text-center">
            <Dialog.Title className="text-xl font-bold text-gray-800 mb-4">
              Test Payment - ₹1
            </Dialog.Title>

            <div className="bg-white p-4 rounded-xl inline-block shadow-lg border mb-4">
              <QRCode
                value="upi://pay?pa=restaurant@paytm&pn=RestroHub&am=1&cu=INR"
                size={180}
                level="H"
              />
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Scan with any UPI app to test
            </p>

            <button
              onClick={() => setShowTestModal(false)}
              className="w-full px-4 py-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default UPILinks;