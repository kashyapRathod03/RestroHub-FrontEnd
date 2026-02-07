// src/pages/admin/marketing/Website.jsx
import { useState } from 'react';
import { Palette, Layout, Check, Eye, Save } from 'lucide-react';

const Website = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedTheme, setSelectedTheme] = useState('orange');

  const templates = [
    { id: 'modern', name: 'Modern Clean', desc: 'Minimalist design with focus on food images' },
    { id: 'classic', name: 'Classic Restaurant', desc: 'Traditional elegant restaurant look' },
    { id: 'vibrant', name: 'Vibrant & Fun', desc: 'Colorful and energetic for cafes' },
  ];

  const themes = [
    { id: 'orange', name: 'Sunset Orange', primary: '#f97316', secondary: '#ea580c' },
    { id: 'green', name: 'Fresh Green', primary: '#22c55e', secondary: '#16a34a' },
    { id: 'blue', name: 'Ocean Blue', primary: '#3b82f6', secondary: '#2563eb' },
    { id: 'purple', name: 'Royal Purple', primary: '#8b5cf6', secondary: '#7c3aed' },
    { id: 'red', name: 'Classic Red', primary: '#ef4444', secondary: '#dc2626' },
    { id: 'teal', name: 'Teal Fresh', primary: '#14b8a6', secondary: '#0d9488' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Website Customization</h1>
          <p className="text-gray-500">Choose templates and color themes for your menu website</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Templates */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Layout className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Templates</h2>
              <p className="text-sm text-gray-500">Choose your menu layout</p>
            </div>
          </div>

          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.desc}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-400">Template Preview</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Themes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Color Theme</h2>
              <p className="text-sm text-gray-500">Match your brand colors</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTheme === theme.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg"
                    style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                  />
                  <span className="font-medium text-gray-800 text-sm">{theme.name}</span>
                  {selectedTheme === theme.id && (
                    <Check className="w-4 h-4 text-gray-900 ml-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Colors */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium text-gray-800 mb-3">Custom Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Primary</label>
                <input type="color" defaultValue="#f97316" className="w-full h-10 rounded-lg cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Secondary</label>
                <input type="color" defaultValue="#ea580c" className="w-full h-10 rounded-lg cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-800">Live Preview</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
            <Eye className="w-4 h-4" />
            Open in New Tab
          </button>
        </div>
        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
          <p className="text-gray-500">Menu Website Preview</p>
        </div>
      </div>
    </div>
  );
};

export default Website;