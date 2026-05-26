import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../../../components/modals/Modal';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import styles from '../AdminPanel.module.css';

const CategoriesTab = ({ data, onRefresh, showMessage }) => {
  const [categoryModal, setCategoryModal] = useState({ open: false, editing: null });
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [categoryPhoto, setCategoryPhoto] = useState(null);

  const openCategoryModal = (category = null) => {
    if (category) {
      setCategoryForm({ name: category.name || '' });
      setCategoryModal({ open: true, editing: category });
    } else {
      setCategoryForm({ name: '' });
      setCategoryModal({ open: true, editing: null });
    }
    setCategoryPhoto(null);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', categoryForm.name);
      if (categoryPhoto) formData.append('photo', categoryPhoto);
      
      if (categoryModal.editing) {
        await axios.put(`/api/admin/categories/${categoryModal.editing.id}`, formData);
        showMessage('Категория обновлена');
      } else {
        await axios.post('/api/admin/categories', formData);
        showMessage('Категория добавлена');
      }
      
      onRefresh();
      setCategoryModal({ open: false, editing: null });
      setCategoryForm({ name: '' });
      setCategoryPhoto(null);
    } catch (err) {
      showMessage('Ошибка сохранения категории', true);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Удалить эту категорию?')) {
      try {
        await axios.delete(`/api/admin/categories/${id}`);
        onRefresh();
        showMessage('Категория удалена');
      } catch (err) {
        showMessage('Ошибка удаления категории', true);
      }
    }
  };

  return (
    <div>
      <div className={styles.add_button_wrapper}>
        <button onClick={() => openCategoryModal()} className={styles.add_btn}>
          <FiPlus /> Добавить категорию
        </button>
      </div>
      <div className={styles.grid}>
        {data.map(category => (
          <div key={category.id} className={styles.card}>
            {category.photo && (
              <div className={styles.card_image_small}>
                <img src={`http://localhost:5000/uploads/${category.photo}`} alt={category.name} />
              </div>
            )}
            <div className={styles.card_content}>
              <h3>{category.name}</h3>
              <div className={styles.card_actions}>
                <button onClick={() => openCategoryModal(category)} className={styles.edit_btn}>
                  <FiEdit2 /> Редактировать
                </button>
                <button onClick={() => deleteCategory(category.id)} className={styles.delete_btn}>
                  <FiTrash2 /> Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={categoryModal.open} onClose={() => setCategoryModal({ open: false, editing: null })} title={categoryModal.editing ? 'Редактировать категорию' : 'Добавить категорию'} size="small">
        <form onSubmit={handleCategorySubmit} className={styles.modal_form}>
          <div className={styles.form_group}>
            <label>Название</label>
            <input type="text" value={categoryForm.name} onChange={(e) => setCategoryForm({ name: e.target.value })} required />
          </div>
          <div className={styles.form_group}>
            <label>Фото</label>
            <input type="file" onChange={(e) => setCategoryPhoto(e.target.files[0])} accept="image/*" />
            {categoryModal.editing?.photo && (
              <div className={styles.current_photo}>
                <img src={`http://localhost:5000/uploads/${categoryModal.editing.photo}`} alt={categoryModal.editing.name} />
              </div>
            )}
          </div>
          <div className={styles.modal_actions}>
            <button type="submit" className={styles.save_btn}>
              <FiSave /> Сохранить
            </button>
            <button type="button" onClick={() => setCategoryModal({ open: false, editing: null })} className={styles.cancel_btn}>
              <FiX /> Отмена
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesTab;