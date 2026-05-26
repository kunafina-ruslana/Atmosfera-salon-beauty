import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../../components/modals/Modal';
import { FiEdit2, FiMail, FiPhone, FiUser, FiSave, FiX } from 'react-icons/fi';
import styles from '../AdminPanel.module.css';

const MastersTab = ({ data, onRefresh, showMessage }) => {
  const [masterModal, setMasterModal] = useState({ open: false, editing: null });
  const [masterForm, setMasterForm] = useState({ bio: '', photo: null });
  const [masterCategories, setMasterCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    const response = await axios.get('/api/services/categories');
    setAllCategories(response.data);
  };

  const fetchMasterCategories = async (masterId) => {
    const response = await axios.get(`/api/schedule/masters/${masterId}/categories`);
    setMasterCategories(response.data);
  };

  const openMasterModal = async (master = null) => {
    if (master) {
      setMasterForm({ bio: master.bio || '', photo: null });
      await fetchMasterCategories(master.id);
      setMasterModal({ open: true, editing: master });
    } else {
      setMasterForm({ bio: '', photo: null });
      setMasterCategories([]);
      setMasterModal({ open: true, editing: null });
    }
  };

  const handleMasterSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('bio', masterForm.bio);
      if (masterForm.photo) formData.append('photo', masterForm.photo);
      
      await axios.put(`/api/admin/masters/${masterModal.editing.id}`, formData);
      onRefresh();
      showMessage('Данные мастера обновлены');
      setMasterModal({ open: false, editing: null });
    } catch (err) {
      showMessage('Ошибка обновления мастера', true);
    }
  };

  const assignCategoryToMaster = async (categoryId) => {
    try {
      await axios.post(`/api/schedule/masters/${masterModal.editing.id}/categories/${categoryId}`);
      await fetchMasterCategories(masterModal.editing.id);
      showMessage('Категория назначена мастеру');
    } catch (err) {
      showMessage('Ошибка назначения категории', true);
    }
  };

  const removeCategoryFromMaster = async (categoryId) => {
    if (window.confirm('Удалить эту категорию у мастера?')) {
      try {
        await axios.delete(`/api/schedule/masters/${masterModal.editing.id}/categories/${categoryId}`);
        await fetchMasterCategories(masterModal.editing.id);
        showMessage('Категория удалена у мастера');
      } catch (err) {
        showMessage('Ошибка удаления категории', true);
      }
    }
  };

  return (
    <div>
      <div className={styles.grid}>
        {data.map(master => (
          <div key={master.id} className={styles.master_card}>
            <div className={styles.master_avatar}>
              {master.photo ? (
                <img src={`http://localhost:5000/uploads/${master.photo}`} alt={master.User.firstName} />
              ) : (
                <div className={styles.avatar_placeholder}><FiUser /></div>
              )}
            </div>
            <div className={styles.master_info}>
              <h3>{master.User.firstName} {master.User.lastName}</h3>
              <p><FiMail /> {master.User.email}</p>
              <p><FiPhone /> {master.User.phone}</p>
              <p className={styles.master_bio}>{master.bio || 'Нет информации'}</p>
              <button onClick={() => openMasterModal(master)} className={styles.edit_btn}>
                <FiEdit2 /> Редактировать
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={masterModal.open} onClose={() => setMasterModal({ open: false, editing: null })} title="Редактировать мастера" size="large">
        <form onSubmit={handleMasterSubmit} className={styles.modal_form}>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label>Имя</label>
              <input type="text" value={`${masterModal.editing?.User?.firstName} ${masterModal.editing?.User?.lastName}`} disabled />
            </div>
            <div className={styles.form_group}>
              <label>Email</label>
              <input type="email" value={masterModal.editing?.User?.email} disabled />
            </div>
          </div>
          <div className={styles.form_group}>
            <label>Телефон</label>
            <input type="tel" value={masterModal.editing?.User?.phone} disabled />
          </div>
          <div className={styles.form_group}>
            <label>Описание мастера</label>
            <textarea value={masterForm.bio} onChange={(e) => setMasterForm({ ...masterForm, bio: e.target.value })} rows="4" placeholder="Расскажите о мастере..." />
          </div>
          <div className={styles.form_group}>
            <label>Фото мастера</label>
            {masterModal.editing?.photo && (
              <div className={styles.current_photo}>
                <img src={`http://localhost:5000/uploads/${masterModal.editing.photo}`} alt="Master" />
              </div>
            )}
            <input type="file" onChange={(e) => setMasterForm({ ...masterForm, photo: e.target.files[0] })} accept="image/*" />
          </div>
          <div className={styles.form_group}>
            <label>Категории услуг мастера</label>
            <div className={styles.categories_list}>
              {masterCategories.map(mc => {
                const category = allCategories.find(c => c.id === mc.categoryId);
                return (
                  <div key={mc.id} className={styles.category_tag}>
                    {category?.name}
                    <button type="button" onClick={() => removeCategoryFromMaster(mc.categoryId)}>×</button>
                  </div>
                );
              })}
            </div>
            <select onChange={(e) => { if (e.target.value) assignCategoryToMaster(parseInt(e.target.value)); e.target.value = ''; }} className={styles.select}>
              <option value="">Добавить категорию...</option>
              {allCategories.filter(cat => !masterCategories.some(mc => mc.categoryId === cat.id)).map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.modal_actions}>
            <button type="submit" className={styles.save_btn}>
              <FiSave /> Сохранить
            </button>
            <button type="button" onClick={() => setMasterModal({ open: false, editing: null })} className={styles.cancel_btn}>
              <FiX /> Отмена
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MastersTab;