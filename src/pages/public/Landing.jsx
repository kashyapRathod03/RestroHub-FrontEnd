// src/pages/public/Landing.jsx
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  QrCode,
  Smartphone,
  CreditCard,
  BarChart3,
  MessageSquare,
  Check,
  ArrowRight,
  Star,
  Play
} from 'lucide-react';

const Landing = () => {
  const features = [
    { icon: QrCode, title: 'QR Code Menu', desc: 'Digital menu with QR codes for each table' },
    { icon: Smartphone, title: 'Mobile Orders', desc: 'Receive orders directly on your phone' },
    { icon: CreditCard, title: 'UPI Payments', desc: 'Accept payments via UPI instantly' },
    { icon: MessageSquare, title: 'WhatsApp Alerts', desc: 'Automatic order notifications' },
    { icon: BarChart3, title: 'Analytics', desc: 'Track revenue and insights' },
  ];

  const pricing = [
    {
      name: 'Basic',
      price: '₹499',
      period: '/month',
      features: ['2 branches', '15 tables', '500 WhatsApp/month', 'Basic analytics'],
      popular: false
    },
    {
      name: 'Pro',
      price: '₹999',
      period: '/month',
      features: ['5 branches', 'Unlimited tables', '2000 WhatsApp/month', 'Advanced analytics', 'Integrations'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Unlimited', 'Priority support', 'Custom integrations', 'Dedicated manager'],
      popular: false
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">RestroHub</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link
                to="/admin"
                className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-orange-500" />
            Trusted by 500+ restaurants
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Restaurant<br />
            with <span className="text-orange-500">Digital Menu</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            QR code menus, WhatsApp orders, UPI payments - everything you need to run a modern restaurant.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-colors text-lg font-semibold shadow-lg shadow-orange-500/30"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors text-lg font-semibold border">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">Powerful features to digitize your restaurant</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Start free, upgrade when you need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <div
                key={i}
                className={`bg-white p-8 rounded-2xl ${
                  plan.popular ? 'ring-2 ring-orange-500 shadow-xl scale-105' : 'border'
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="px-4 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 text-center">{plan.name}</h3>
                <div className="text-center my-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  plan.popular ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Digitize Your Restaurant?
          </h2>
          <p className="text-xl text-white/90 mb-8">Join 500+ restaurants already using RestroHub</p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-2xl hover:bg-gray-100 transition-colors text-lg font-semibold"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">RestroHub</span>
          </div>
          <div className="flex items-center gap-8 text-gray-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <p className="text-gray-400">© 2024 RestroHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;