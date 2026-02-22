import { useState } from 'react';
import MenuHeader from './menuCard/MenuHeader';
import BulkActions from './menuCard/BulkActions';
import CategorySidebar from './menuCard/CategorySidebar';
import MenuItemsGrid from './menuCard/MenuItemsGrid';
import MenuFormModal from './menuCard/MenuFormModal';


const Menus = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // ------------------------------------
  // MODAL HANDLERS
  // ------------------------------------
  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // ------------------------------------
  // RENDER
  // ------------------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <MenuHeader onAddItem={openAddModal} />

      {/* Bulk Actions */}
      <BulkActions />

      {/* Main Content: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <MenuItemsGrid
          selectedCategory={selectedCategory}
          onEditItem={openEditModal}
        />
      </div>

      {/* Modal */}
      <MenuFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingItem={editingItem}
      />
    </div>
  );
};

export default Menus;