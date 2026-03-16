import { useRef, useState } from 'react';
import MenuHeader from './menuCard/MenuHeader';
import BulkActions from './menuCard/BulkActions';
import CategorySidebar from './menuCard/CategorySidebar';
import MenuItemsGrid from './menuCard/MenuItemsGrid';
import MenuFormModal from './menuCard/MenuFormModal';
import CategoryFormModal from './menuCard/CategoryFormModal';


const Menus = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const menuGridRef = useRef(null);

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

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    menuGridRef.current?.refreshFoods();
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
          onAddCategory={openCategoryModal}
          setAllCategories={setAllCategories}
        />
        <MenuItemsGrid
          ref={menuGridRef}
          selectedCategory={selectedCategory}
          onEditItem={openEditModal}
        />
      </div>

      {/* Modal */}
      <MenuFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingItem={editingItem}
        allCategories={allCategories}
      />

      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
      />
    </div>
  );
};

export default Menus;