import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Grid3X3,
  Edit2,
  Power,
  ChevronRight,
  MoreVertical,
  Loader2,
  Trash2,
  Copy,
} from 'lucide-react';

const BranchCard = ({ branch, onToggleStatus, onEdit, onDelete }) => {
  const [toggling, setToggling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = async () => {
    try {
      setToggling(true);
      // 🔌 await api.put(`/api/branches/${branch.id}/toggle`);
      await new Promise((r) => setTimeout(r, 400));
      onToggleStatus(branch.id);
    } catch (err) {
      console.error('Toggle failed:', err);
    } finally {
      setToggling(false);
    }
  };

  // Detail items config
  const details = [
    { icon: MapPin, value: branch.address },
    { icon: Phone, value: branch.phone },
    { icon: Clock, value: branch.timing },
    {
      icon: Grid3X3,
      value: `${branch.tables} Tables`,
      badge:
        branch.tables > 15
          ? 'Large'
          : branch.tables > 8
            ? 'Medium'
            : 'Small',
    },
  ];

  return (
    <div
      className={`
        overflow-hidden rounded-2xl border bg-white
        transition-all duration-200
        ${
          branch.isActive
            ? 'border-gray-200 hover:border-blue-200 hover:shadow-lg'
            : 'border-gray-200 opacity-60'
        }
      `}
    >
      {/* ============================= */}
      {/* HEADER                        */}
      {/* ============================= */}
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          {/* Icon + Name + Badge */}
          <div className="flex items-start gap-3">
            <div
              className={`
                flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                sm:h-12 sm:w-12
                ${branch.isActive ? 'bg-blue-50' : 'bg-gray-100'}
              `}
            >
              <MapPin
                className={`
                  h-5 w-5 sm:h-6 sm:w-6
                  ${branch.isActive ? 'text-blue-600' : 'text-gray-400'}
                `}
              />
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                {branch.name}
              </h4>
              <span
                className={`
                  mt-1 inline-flex items-center gap-1.5
                  rounded-full px-2 py-0.5 text-xs font-medium
                  ${
                    branch.isActive
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }
                `}
              >
                <span
                  className={`
                    inline-block h-1.5 w-1.5 rounded-full
                    ${branch.isActive ? 'bg-green-500' : 'bg-gray-400'}
                  `}
                />
                {branch.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                inline-flex h-8 w-8 items-center justify-center
                rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600
                transition-colors
              "
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {menuOpen && (
              <div
                className="
                  absolute right-0 top-full z-30 mt-1
                  w-44 overflow-hidden rounded-lg border border-gray-200
                  bg-white shadow-lg
                "
              >
                <button
                  onClick={() => { onEdit?.(branch); setMenuOpen(false); }}
                  className="
                    flex w-full items-center gap-2.5 px-4 py-2.5
                    text-sm text-gray-700 hover:bg-gray-50 transition-colors
                  "
                >
                  <Edit2 className="h-4 w-4 text-gray-400" />
                  Edit Branch
                </button>
                <button
                  onClick={() => { navigator.clipboard.writeText(branch.phone); setMenuOpen(false); }}
                  className="
                    flex w-full items-center gap-2.5 px-4 py-2.5
                    text-sm text-gray-700 hover:bg-gray-50 transition-colors
                  "
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                  Copy Phone
                </button>
                <div className="border-t border-gray-100" />
                <button
                  onClick={() => { handleToggle(); setMenuOpen(false); }}
                  className={`
                    flex w-full items-center gap-2.5 px-4 py-2.5
                    text-sm transition-colors
                    ${
                      branch.isActive
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-green-600 hover:bg-green-50'
                    }
                  `}
                >
                  <Power className="h-4 w-4" />
                  {branch.isActive ? 'Deactivate' : 'Activate'}
                </button>
                {onDelete && (
                  <button
                    onClick={() => { onDelete?.(branch.id); setMenuOpen(false); }}
                    className="
                      flex w-full items-center gap-2.5 px-4 py-2.5
                      text-sm text-red-600 hover:bg-red-50 transition-colors
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Branch
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================= */}
      {/* BODY - Details                */}
      {/* ============================= */}
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <ul className="space-y-3">
          {details.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                  <Icon className="h-4 w-4 text-blue-500" />
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm leading-relaxed text-gray-700">
                    {item.value}
                  </span>
                  {item.badge && (
                    <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ============================= */}
      {/* FOOTER - Actions              */}
      {/* ============================= */}
      <div className="border-t border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-2">
          {/* Manage Tables - Primary */}
          <Link
            to={`/admin/store/branches/${branch.id}/tables`}
            className="
              inline-flex flex-1 items-center justify-center gap-1.5
              rounded-lg bg-blue-50 px-4 py-2.5
              text-sm font-medium text-blue-700
              hover:bg-blue-100
              transition-colors
            "
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden xs:inline sm:hidden md:inline">Manage</span>
            Tables
            <ChevronRight className="h-4 w-4" />
          </Link>

          {/* Toggle */}
          <button
            onClick={handleToggle}
            disabled={toggling}
            className={`
              inline-flex h-10 w-10 shrink-0 items-center justify-center
              rounded-lg transition-colors
              disabled:cursor-not-allowed disabled:opacity-50
              ${
                branch.isActive
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-green-50 text-green-600 hover:bg-green-100'
              }
            `}
            title={branch.isActive ? 'Deactivate' : 'Activate'}
          >
            {toggling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Power className="h-4 w-4" />
            )}
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit?.(branch)}
            className="
              inline-flex h-10 w-10 shrink-0 items-center justify-center
              rounded-lg bg-gray-50 text-gray-600
              hover:bg-gray-100
              transition-colors
            "
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;