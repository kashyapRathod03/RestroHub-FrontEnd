// src/pages/admin/marketing/QRDisplay.jsx
import { useState } from 'react';
import { Download, Eye, Palette, Layout, Image as ImageIcon } from 'lucide-react';
import QRCode from 'react-qr-code';

const QRDisplay = () => {
  const [selectedStyle, setSelectedStyle] = useState('minimal');
  const [qrColor, setQrColor] = useState('#000000');

  const styles = [
    { id: 'minimal', name: 'Minimal', desc: 'Clean and simple QR code' },
    { id: 'branded', name: 'Branded', desc: 'With restaurant logo' },
    { id: 'decorative', name: 'Decorative', desc: 'With borders and patterns' },
  ];

  const sampleUrl = `${window.location.origin}/Restrohub/RajkotDhaba/1?table=1`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">QR Display Settings</h1>
          <p className="text-gray-500">Customize how your QR codes look</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium">
          <Download className="w-5 h-5" />
          Download All QRs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Style Options */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Layout className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">QR Style</h2>
              <p className="text-sm text-gray-500">Choose your QR code style</p>
            </div>
          </div>

          <div className="space-y-3">
            {styles.map((style) => (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedStyle === style.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium text-gray-800">{style.name}</h3>
                <p className="text-sm text-gray-500">{style.desc}</p>
              </div>
            ))}
          </div>

          {/* Color Picker */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">QR Color</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="px-4 py-2 border rounded-xl w-32 uppercase"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">Center Logo</span>
            </div>
            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Upload logo (optional)</p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-800">Preview</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
              <Eye className="w-4 h-4" />
              Full Preview
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg border">
              <QRCode
                value={sampleUrl}
                size={200}
                fgColor={qrColor}
                level="H"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">Table 1 - Sample QR</p>

            <div className="flex gap-3 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                PNG
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                SVG
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRDisplay;