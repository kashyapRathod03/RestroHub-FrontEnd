import { Plus, Building2 } from 'lucide-react';

const BranchHeader = ({ onAddBranch, totalBranches = 0 }) => {
  return (
    <div
      className="
        flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      {/* Left */}
      <div>
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600 hidden sm:block" />
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Branches
          </h2>
          {totalBranches > 0 && (
            <span
              className="
                rounded-full bg-blue-50 px-2.5 py-0.5
                text-xs font-semibold text-blue-700
              "
            >
              {totalBranches}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Manage your restaurant locations
        </p>
      </div>

      {/* Right */}
      <button
        onClick={onAddBranch}
        className="
          inline-flex items-center justify-center gap-2
          rounded-lg bg-blue-50 px-5 py-2.5
          text-sm font-medium text-blue-700
          border border-blue-200
          hover:bg-blue-100
          transition-colors
          w-full sm:w-auto
        "
      >
        <Plus className="h-4 w-4" />
        Add Branch
      </button>
    </div>
  );
};

export default BranchHeader;