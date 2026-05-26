import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiBarChart2 } from 'react-icons/fi';
import TabsNav from './components/TabsNav';
import SearchBar from './components/SearchBar';
import UsersTab from './components/UsersTab';
import ServicesTab from './components/ServicesTab';
import CategoriesTab from './components/CategoriesTab';
import MastersTab from './components/MastersTab';
import AppointmentsTab from './components/AppointmentsTab';
import ReviewsTab from './components/ReviewsTab';
import WorkPhotosTab from './components/WorkPhotosTab';
import PromotionsTab from './components/PromotionsTab';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [masters, setMasters] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [workPhotos, setWorkPhotos] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchWorkPhotos();
    fetchPromotions();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      fetchUsers(),
      fetchServices(),
      fetchCategories(),
      fetchMasters(),
      fetchAppointments(),
      fetchReviews()
    ]);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const response = await axios.get('/api/admin/users');
    setUsers(response.data);
  };

  const fetchServices = async () => {
    const response = await axios.get('/api/services');
    setServices(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get('/api/services/categories');
    setCategories(response.data);
  };

  const fetchMasters = async () => {
    const response = await axios.get('/api/admin/masters');
    setMasters(response.data);
  };

  const fetchAppointments = async () => {
    const response = await axios.get('/api/admin/appointments');
    setAppointments(response.data);
  };

  const fetchReviews = async () => {
    const response = await axios.get('/api/reviews/all');
    setReviews(response.data);
  };

  const fetchWorkPhotos = async () => {
    const response = await axios.get('/api/admin/work-photos');
    setWorkPhotos(response.data);
  };

  const fetchPromotions = async () => {
    const response = await axios.get('/api/admin/promotions');
    setPromotions(response.data);
  };

  const showMessage = (text, isError = false) => {
    if (isError) {
      setError(text);
      setTimeout(() => setError(''), 3000);
    } else {
      setMessage(text);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const tabs = [
    { id: 'users', label: 'Пользователи', count: users.length },
    { id: 'services', label: 'Услуги', count: services.length },
    { id: 'categories', label: 'Категории', count: categories.length },
    { id: 'masters', label: 'Мастера', count: masters.length },
    { id: 'appointments', label: 'Записи', count: appointments.length },
    { id: 'reviews', label: 'Отзывы', count: reviews.length },
    { id: 'workPhotos', label: 'Фото работ', count: workPhotos.length },
    { id: 'promotions', label: 'Акции', count: promotions.length }
  ];

  const getFilteredData = () => {
    const term = searchTerm.toLowerCase();
    switch (activeTab) {
      case 'users':
        return users.filter(u => 
          u.firstName.toLowerCase().includes(term) ||
          u.lastName.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
        );
      case 'services':
        return services.filter(s =>
          s.name.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term)
        );
      case 'categories':
        return categories.filter(c => c.name.toLowerCase().includes(term));
      case 'masters':
        return masters.filter(m =>
          `${m.User.firstName} ${m.User.lastName}`.toLowerCase().includes(term) ||
          m.User.email.toLowerCase().includes(term)
        );
      case 'appointments':
        return appointments.filter(a =>
          a.Service?.name?.toLowerCase().includes(term) ||
          a.User?.firstName?.toLowerCase().includes(term) ||
          a.User?.lastName?.toLowerCase().includes(term)
        );
      case 'reviews':
        return reviews.filter(r =>
          r.text?.toLowerCase().includes(term) ||
          r.User?.firstName?.toLowerCase().includes(term) ||
          r.User?.lastName?.toLowerCase().includes(term)
        );
      case 'workPhotos':
        return workPhotos.filter(p =>
          p.masterName?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
        );
      case 'promotions':
        return promotions.filter(p =>
          p.title?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
        );
      default:
        return [];
    }
  };

  const handleRefresh = () => {
    fetchData();
    fetchWorkPhotos();
    fetchPromotions();
  };

  if (loading) return (
    <div className={styles.container}>
      <div className={styles.loading}>Загрузка...</div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Панель администратора</h2>
        <Link to="/admin/reports" className={styles.reports_link}>
          <FiBarChart2 /> Отчеты
        </Link>
        <Link to="/admin/schedule">Расписание мастеров</Link>
      </div>
      
      {message && <div className={styles.success}>{message}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <TabsNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} activeTab={activeTab} tabs={tabs} />
      
      {activeTab === 'users' && (
        <UsersTab 
          data={getFilteredData()} 
          onRefresh={handleRefresh}
          showMessage={showMessage}
        />
      )}
      
      {activeTab === 'services' && (
        <ServicesTab 
          data={getFilteredData()} 
          categories={categories}
          onRefresh={handleRefresh}
          showMessage={showMessage}
        />
      )}
      
      {activeTab === 'categories' && (
        <CategoriesTab 
          data={getFilteredData()} 
          onRefresh={handleRefresh}
          showMessage={showMessage}
        />
      )}
      
      {activeTab === 'masters' && (
        <MastersTab 
          data={getFilteredData()} 
          onRefresh={handleRefresh}
          showMessage={showMessage}
        />
      )}
      
      {activeTab === 'appointments' && (
        <AppointmentsTab 
          data={getFilteredData()} 
          onRefresh={handleRefresh}
          showMessage={showMessage}
        />
      )}
      
      {activeTab === 'reviews' && (
        <ReviewsTab 
          data={getFilteredData()} 
          onRefresh={handleRefresh}
          showMessage={showMessage}
        />
      )}
      
      {activeTab === 'workPhotos' && (
        <WorkPhotosTab 
          data={getFilteredData()} 
          categories={categories}
          onRefresh={handleRefresh}
          showMessage={showMessage}
        />
      )}
      
      {activeTab === 'promotions' && (
        <PromotionsTab 
          data={getFilteredData()} 
          onRefresh={handleRefresh}
          showMessage={showMessage}
        />
      )}
    </div>
  );
};

export default AdminPanel;