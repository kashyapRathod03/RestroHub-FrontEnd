// src/pages/admin/Orders.jsx
import { useState } from 'react';
import {
  Search,
  Clock,
  ChefHat,
  CheckCircle2,
  Receipt,
  CreditCard,
  Phone,
  MoreVertical
} from 'lucide-react';

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const [orders, setOrders] = useState([
    {
      id: 123,
      table: 4,
      amount: 450,
      status: 'cooking',
      customer: 'John Doe',
      phone: '9876543210',
      items: [
        { name: 'Paneer Tikka', qty: 2, price: 180 },
        { name: 'Lassi', qty: 1, price: 90 }
      ],
      time: '5 mins ago'
    },
    {
      id: 124,
      table: 7,
      amount: 320,
      status: 'ready',
      customer: 'Priya Sharma',
      phone: '9876543211',
      items: [
        { name: 'Biryani', qty: 1, price: 220 },
        { name: 'Roti', qty: 2, price: 50 }
      ],
      time: '12 mins ago'
    },
    {
      id: 125,
      table: 2,
      amount: 780,
      status: 'pending',
      customer: 'Amit Kumar',
      phone: '9876543212',
      items: [{ name: 'Special Thali', qty: 3, price: 260 }],
      time: '2 mins ago'
    },
    {
      id: 126,
      table: 9,
      amount: 190,
      status: 'billed',
      customer: 'Sara Khan',
      phone: '9876543213',
      items: [{ name: 'Sweet Lassi', qty: 2, price: 95 }],
      time: '25 mins ago'
    },
  ]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'cooking', label: 'Cooking' },
    { id: 'ready', label: 'Ready' },
    { id: 'billed', label: 'Billed' },
  ];

  const filteredOrders = activeFilter === 'all'
    ? orders
    : orders.filter(o => o.status === activeFilter);

  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
  };

  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
    cooking: { bg: 'bg-blue-100', text: 'text-blue-700', icon: ChefHat, label: 'Cooking' },
    ready: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Ready' },
    billed: { bg: 'bg-purple-100', text: 'text-purple-700', icon: Receipt, label: 'Billed' },
  };

  const getNextAction = (status) => {
    const actions = {
      pending: { label: 'Start Cooking', next: 'cooking', icon: ChefHat, color: 'bg-blue-500 hover:bg-blue-600' },
      cooking: { label: 'Mark Ready', next: 'ready', icon: CheckCircle2, color: 'bg-green-500 hover:bg-green-600' },
      ready: { label: 'Generate Bill', next: 'billed', icon: Receipt, color: 'bg-purple-500 hover:bg-purple-600' },
      billed: { label: 'Complete Payment', next: 'complete', icon: CreditCard, color: 'bg-gray-700 hover:bg-gray-800' },
    };
    return actions[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500">Manage and track all your orders</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border shadow-sm flex-1">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer..."
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => {
            const count = filter.id === 'all'
              ? orders.length
              : orders.filter(o => o.status === filter.id).length;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border'
                }`}
              >
                {filter.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-gray-500">Status:</span>
        {Object.entries(statusConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <config.icon className={`w-4 h-4 ${config.text}`} />
            <span className="text-gray-600">{config.label}</span>
          </div>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredOrders.map((order) => {
          const status = statusConfig[order.status];
          const action = getNextAction(order.status);
          const StatusIcon = status.icon;
          const ActionIcon = action?.icon;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-orange-600">#{order.id}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">Table {order.table}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {order.customer.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{order.customer}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Phone className="w-3 h-3" />
                    {order.phone}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.qty}x {item.name}</span>
                    <span className="text-gray-800 font-medium">₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-lg text-gray-800">₹{order.amount}</span>
                </div>
              </div>

              {/* Action Button */}
              {action && (
                <button
                  onClick={() => updateStatus(order.id, action.next)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-xl transition-colors text-sm font-medium ${action.color}`}
                >
                  <ActionIcon className="w-4 h-4" />
                  {action.label}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;