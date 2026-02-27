import { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Building2 } from 'lucide-react';
import BranchCard from './BranchCard';

// ============================================
// SKELETON - TailAdmin card skeleton
// ============================================
const BranchSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
    {/* Header skeleton */}
    <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 sm:h-12 sm:w-12" />
        <div className="flex-1">
          <div className="h-5 w-32 rounded bg-gray-100 mb-2" />
          <div className="h-4 w-16 rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
    {/* Body skeleton */}
    <div className="px-4 py-4 sm:px-6 sm:py-5 animate-pulse">
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-gray-100" />
            <div className="h-4 w-44 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
    {/* Footer skeleton */}
    <div className="border-t border-gray-100 px-4 py-3 sm:px-6 sm:py-4 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-10 flex-1 rounded-lg bg-gray-100" />
        <div className="h-10 w-10 rounded-lg bg-gray-100" />
        <div className="h-10 w-10 rounded-lg bg-gray-100" />
      </div>
    </div>
  </div>
);

// ============================================
// MAIN
// ============================================
const BranchesGrid = ({ onEdit, onCountChange }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackBranches = [
    {
      id: 1, name: 'Main Branch', address: 'Kalawad Road, Rajkot, Gujarat',
      phone: '9876543210', tables: 12, timing: '10:00 AM - 11:00 PM', isActive: true,
    },
    {
      id: 2, name: 'City Center', address: '150 Feet Ring Road, Rajkot',
      phone: '9876543211', tables: 20, timing: '11:00 AM - 10:00 PM', isActive: true,
    },
    {
      id: 3, name: 'Airport Road', address: 'Near Airport, Rajkot',
      phone: '9876543212', tables: 8, timing: '9:00 AM - 9:00 PM', isActive: false,
    },
  ];

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      setError(null);
      // 🔌 const response = await api.get('/api/branches');
      // setBranches(response.data);
      await new Promise((r) => setTimeout(r, 600));
      setBranches(fallbackBranches);
      onCountChange?.(fallbackBranches.length);
    } catch (err) {
      console.error('Fetch failed:', err);
      setError('Failed to load branches');
      setBranches(fallbackBranches);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (id) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this branch?')) return;
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  // LOADING
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => <BranchSkeleton key={i} />)}
      </div>
    );
  }

  // ERROR
  if (error && branches.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center sm:py-16">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-300 sm:h-16 sm:w-16" />
        <p className="text-sm font-medium text-red-600 sm:text-base">{error}</p>
        <button
          onClick={fetchBranches}
          className="
            mt-4 inline-flex items-center gap-2 rounded-lg
            bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700
            hover:bg-blue-100 transition-colors
          "
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  // EMPTY
  if (branches.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center sm:py-16">
        <Building2 className="mx-auto mb-4 h-12 w-12 text-blue-200 sm:h-16 sm:w-16" />
        <p className="font-medium text-gray-700">No branches yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Add your first branch to get started
        </p>
      </div>
    );
  }

  // GRID
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {branches.map((branch) => (
        <BranchCard
          key={branch.id}
          branch={branch}
          onToggleStatus={handleToggle}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BranchesGrid;