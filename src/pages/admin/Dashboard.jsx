// src/pages/admin/Dashboard.jsx
import { useState } from 'react';
import {
  IndianRupee,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Plus,
  CheckCheck,
  Edit3,
  Clock,
  ChefHat,
  CheckCircle2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: "Today's Revenue",
      value: '₹45,230',
      change: '+24%',
      positive: true,
      icon: IndianRupee,
      color: 'green'
    },
    {
      title: 'Live Orders',
      value: '12',
      subtitle: 'active',
      icon: ShoppingCart,
      color: 'orange',
      pulse: true
    },
    {
      title: 'WhatsApp Messages',
      value: '156/1000',
      progress: 15.6,
      icon: MessageSquare,
      color: 'emerald'
    },
    {
      title: 'UPI Success',
      value: '89%',
      subtitle: '(78/89)',
      icon: CreditCard,
      color: 'purple'
    }
  ];

  const revenueData = [
    { day: '1', revenue: 24000 },
    { day: '5', revenue: 32000 },
    { day: '10', revenue: 28000 },
    { day: '15', revenue: 45000 },
    { day: '20', revenue: 38000 },
    { day: '25', revenue: 52000 },
    { day: '30', revenue: 45230 },
  ];

  const liveOrders = [
    { id: 123, table: 4, amount: 450, status: 'cooking', items: '2x Paneer, 1x Lassi' },
    { id: 124, table: 7, amount: 320, status: 'ready', items: '1x Biryani, 2x Roti' },
    { id: 125, table: 2, amount: 780, status: 'cooking', items: '3x Thali' },
    { id: 126, table: 9, amount: 190, status: 'pending', items: '2x Lassi' },
  ];

  const getStatusBadge = (status) => {
    const config = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
      cooking: { bg: 'bg-blue-100', text: 'text-blue-700', icon: ChefHat, label: 'Cooking' },
      ready: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Ready' },
    };
    const { bg, text, icon: Icon, label } = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.change && (
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              )}
              {stat.pulse && (
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              )}
            </div>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800">
              {stat.value}
              {stat.subtitle && (
                <span className="text-sm font-normal text-gray-400 ml-1">
                  {stat.subtitle}
                </span>
              )}
            </p>
            {stat.progress !== undefined && (
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium">
            <Plus className="w-4 h-4" />
            New Order
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium">
            <CheckCheck className="w-4 h-4" />
            Mark All Ready
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
            <Edit3 className="w-4 h-4" />
            Menu Editor
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Live Orders Feed</h2>
            <a href="/admin/orders" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All →
            </a>
          </div>
          <div className="space-y-4">
            {liveOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-orange-600">#{order.id}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">Table {order.table}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{order.items}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-800">₹{order.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Revenue (30 Days)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;