import { useState } from 'react';
import BranchHeader from './BranchHeader';
import BranchesGrid from './BranchesGrid';
import BranchFormModal from './BranchFormModal';

const Branches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [totalBranches, setTotalBranches] = useState(0);

  const openAdd = () => { setEditingBranch(null); setIsModalOpen(true); };
  const openEdit = (branch) => { setEditingBranch(branch); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingBranch(null); };

  return (
    <div className="space-y-5 sm:space-y-6">
      <BranchHeader onAddBranch={openAdd} totalBranches={totalBranches} />
      <BranchesGrid onEdit={openEdit} onCountChange={setTotalBranches} />
      <BranchFormModal isOpen={isModalOpen} onClose={closeModal} editingBranch={editingBranch} />
    </div>
  );
};

export default Branches;