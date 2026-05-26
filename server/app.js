import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import sequelize, { testConnection } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import masterRoutes from './routes/masterRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import scheduleManagementRoutes from './routes/scheduleManagementRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import {
  User,
  Category,
  Service,
  Master,
  ServiceMaster,
  Appointment,
  Favorite,
  Review,
  ScheduleOverride
} from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const uploadsDir = path.join(__dirname, 'uploads');
const worksDir = path.join(__dirname, 'uploads', 'works');
const promotionsDir = path.join(__dirname, 'uploads', 'promotions');

if (!fs.existsSync(worksDir)) {
  fs.mkdirSync(worksDir, { recursive: true });
  console.log('Создана директория для фото работ');
}

if (!fs.existsSync(promotionsDir)) {
  fs.mkdirSync(promotionsDir, { recursive: true });
  console.log('Создана директория для акций');
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Создана директория для загрузок');
}

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/masters', masterRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/schedule-management', scheduleManagementRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Сервер работает' });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err);
  res.status(500).json({ error: err.message });
});

const seedDatabase = async () => {
  try {
    const userCount = await User.count();
    if (userCount > 0) {
      console.log('База данных уже содержит данные, пропускаем заполнение');
      return;
    }
    
    console.log('Начальное заполнение базы данных...');
    
    const categories = await Category.bulkCreate([
      { name: 'Стрижка' },
      { name: 'Окрашивание' },
      { name: 'Укладка' },
      { name: 'Маникюр' },
      { name: 'Педикюр' },
      { name: 'Массаж' },
      { name: 'Уход за лицом' },
      { name: 'Депиляция' }
    ]);
    
    console.log(`Создано ${categories.length} категорий`);
    
    await Service.bulkCreate([
      { name: 'Классическая стрижка', description: 'Профессиональная стрижка и укладка', duration: 45, price: 30, categoryId: categories[0].id },
      { name: 'Женская стрижка', description: 'Стрижка с укладкой', duration: 60, price: 45, categoryId: categories[0].id },
      { name: 'Полное окрашивание', description: 'Полное окрашивание волос', duration: 120, price: 80, categoryId: categories[1].id },
      { name: 'Классический маникюр', description: 'Базовый маникюр с покрытием', duration: 45, price: 25, categoryId: categories[3].id },
      { name: 'Шведский массаж', description: 'Расслабляющий массаж всего тела', duration: 60, price: 70, categoryId: categories[5].id }
    ]);
    
    await User.create({
      email: 'admin@salon.com',
      password: 'admin123',
      firstName: 'Админ',
      lastName: 'Системный',
      birthDate: '1990-01-01',
      phone: '+7 (999) 999-99-99',
      role: 'admin'
    });
    
    console.log('База данных успешно заполнена');
    console.log('Администратор: admin@salon.com / admin123');
    
  } catch (error) {
    console.error('Ошибка заполнения базы данных:', error.message);
  }
};

const startServer = async () => {
  const isConnected = await testConnection();
  
  if (!isConnected) {
    console.error('Невозможно запустить сервер без подключения к базе данных');
    process.exit(1);
  }
  
  try {
    await sequelize.sync({ alter: true });
    console.log('Синхронизация моделей завершена');
    
    await seedDatabase();
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('\nСервер запущен\n');
    });
    
    server.timeout = 120000;
    server.keepAliveTimeout = 120000;
    
  } catch (error) {
    console.error('Ошибка синхронизации базы данных:', error.message);
    process.exit(1);
  }
};

startServer();