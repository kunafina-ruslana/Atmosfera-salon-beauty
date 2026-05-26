// server/seed.js
import sequelize from './config/database.js';
import { User, Category, Service, Master, Appointment, Review, WorkPhoto, Promotion } from './models/index.js';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('База данных синхронизирована');

    const categories = await Category.bulkCreate([
      { name: 'Стрижка', photo: 'categories/haircut.jpg' },
      { name: 'Окрашивание', photo: 'categories/coloring.jpg' },
      { name: 'Укладка', photo: 'categories/styling.jpg' },
      { name: 'Маникюр', photo: 'categories/manicure.jpg' },
      { name: 'Педикюр', photo: 'categories/pedicure.jpg' },
      { name: 'Массаж', photo: 'categories/massage.jpg' },
      { name: 'Уход за лицом', photo: 'categories/facial.jpg' },
      { name: 'Депиляция', photo: 'categories/depilation.jpg' },
      { name: 'Брови и ресницы', photo: 'categories/brows.jpg' },
      { name: 'СПА-процедуры', photo: 'categories/spa.jpg' }
    ]);
    console.log(`Создано ${categories.length} категорий`);

    const services = await Service.bulkCreate([
      { name: 'Классическая мужская стрижка', description: 'Профессиональная стрижка с использованием ножниц и машинки', duration: 45, price: 1500, categoryId: categories[0].id },
      { name: 'Женская стрижка', description: 'Модельная стрижка любой сложности', duration: 60, price: 2500, categoryId: categories[0].id },
      { name: 'Детская стрижка', description: 'Стрижка для детей до 12 лет', duration: 30, price: 1000, categoryId: categories[0].id },
      { name: 'Окрашивание в один тон', description: 'Равномерное окрашивание волос', duration: 90, price: 3500, categoryId: categories[1].id },
      { name: 'Балаяж', description: 'Техника окрашивания с вытягиванием цвета', duration: 120, price: 5500, categoryId: categories[1].id },
      { name: 'Шатуш', description: 'Мягкое перетекание цвета от темного к светлому', duration: 150, price: 6500, categoryId: categories[1].id },
      { name: 'Укладка феном', description: 'Объемная укладка с использованием фена и брашинга', duration: 40, price: 1200, categoryId: categories[2].id },
      { name: 'Классический маникюр', description: 'Обработка ногтей и кутикулы с покрытием лаком', duration: 60, price: 1500, categoryId: categories[3].id },
      { name: 'Аппаратный маникюр', description: 'Маникюр с использованием аппарата', duration: 50, price: 1800, categoryId: categories[3].id },
      { name: 'Маникюр с дизайном', description: 'Художественная роспись на ногтях', duration: 90, price: 2500, categoryId: categories[3].id },
      { name: 'Педикюр', description: 'Комплексный уход за стопами и ногтями', duration: 75, price: 2200, categoryId: categories[4].id },
      { name: 'Медицинский педикюр', description: 'Лечебный уход за стопами', duration: 90, price: 3500, categoryId: categories[4].id },
      { name: 'Классический массаж спины', description: 'Расслабляющий массаж мышц спины', duration: 60, price: 3000, categoryId: categories[5].id },
      { name: 'Шведский массаж', description: 'Полноценный массаж всего тела', duration: 90, price: 4500, categoryId: categories[5].id },
      { name: 'Антицеллюлитный массаж', description: 'Массаж для коррекции фигуры', duration: 60, price: 3500, categoryId: categories[5].id },
      { name: 'Чистка лица', description: 'Глубокая очистка пор', duration: 60, price: 2800, categoryId: categories[6].id },
      { name: 'Уходовая маска', description: 'Питательная маска для лица', duration: 45, price: 2000, categoryId: categories[6].id },
      { name: 'Ваксация', description: 'Депиляция горячим воском', duration: 40, price: 1800, categoryId: categories[7].id },
      { name: 'Шугаринг', description: 'Депиляция сахарной пастой', duration: 50, price: 2200, categoryId: categories[7].id },
      { name: 'Коррекция бровей', description: 'Оформление бровей пинцетом или нитью', duration: 30, price: 800, categoryId: categories[8].id },
      { name: 'Окрашивание бровей', description: 'Окрашивание бровей хной или краской', duration: 30, price: 1000, categoryId: categories[8].id },
      { name: 'Ламинирование ресниц', description: 'Укрепление и завивка ресниц', duration: 60, price: 2500, categoryId: categories[8].id },
      { name: 'Обертывание шоколадом', description: 'СПА-обертывание для тела', duration: 90, price: 4000, categoryId: categories[9].id },
      { name: 'Криотерапия', description: 'Омолаживающая процедура с жидким азотом', duration: 45, price: 3500, categoryId: categories[9].id }
    ]);
    console.log(`Создано ${services.length} услуг`);

    const users = await User.bulkCreate([
      { email: 'admin@salon.com', password: await bcrypt.hash('admin123', 10), role: 'admin', firstName: 'Анна', lastName: 'Администратор', birthDate: '1985-01-15', phone: '+7 (999) 111-11-11', isBlocked: false },
      { email: 'ivan.petrov@example.com', password: await bcrypt.hash('password123', 10), role: 'master', firstName: 'Иван', lastName: 'Петров', birthDate: '1990-03-20', phone: '+7 (999) 222-22-22', isBlocked: false },
      { email: 'elena.smirnova@example.com', password: await bcrypt.hash('password123', 10), role: 'master', firstName: 'Елена', lastName: 'Смирнова', birthDate: '1988-07-10', phone: '+7 (999) 333-33-33', isBlocked: false },
      { email: 'mikhail.ivanov@example.com', password: await bcrypt.hash('password123', 10), role: 'master', firstName: 'Михаил', lastName: 'Иванов', birthDate: '1992-11-05', phone: '+7 (999) 444-44-44', isBlocked: false },
      { email: 'olga.kuznetsova@example.com', password: await bcrypt.hash('password123', 10), role: 'master', firstName: 'Ольга', lastName: 'Кузнецова', birthDate: '1995-04-18', phone: '+7 (999) 555-55-55', isBlocked: false },
      { email: 'anna.pavlova@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Анна', lastName: 'Павлова', birthDate: '1992-05-12', phone: '+7 (999) 666-66-66', isBlocked: false },
      { email: 'dmitry.sokolov@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Дмитрий', lastName: 'Соколов', birthDate: '1989-08-25', phone: '+7 (999) 777-77-77', isBlocked: false },
      { email: 'ekaterina.volkova@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Екатерина', lastName: 'Волкова', birthDate: '1995-12-03', phone: '+7 (999) 888-88-88', isBlocked: false },
      { email: 'sergey.morozov@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Сергей', lastName: 'Морозов', birthDate: '1987-02-14', phone: '+7 (999) 999-99-99', isBlocked: false },
      { email: 'maria.andreeva@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Мария', lastName: 'Андреева', birthDate: '1993-09-07', phone: '+7 (999) 000-00-00', isBlocked: false },
      { email: 'alexey.nikolaev@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Алексей', lastName: 'Николаев', birthDate: '1991-06-22', phone: '+7 (999) 111-22-33', isBlocked: false },
      { email: 'tatyana.mikhailova@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Татьяна', lastName: 'Михайлова', birthDate: '1994-10-11', phone: '+7 (999) 444-55-66', isBlocked: false },
      { email: 'vladimir.egorov@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Владимир', lastName: 'Егоров', birthDate: '1986-01-30', phone: '+7 (999) 777-88-99', isBlocked: false },
      { email: 'natalia.fedorova@example.com', password: await bcrypt.hash('password123', 10), role: 'user', firstName: 'Наталья', lastName: 'Федорова', birthDate: '1996-04-17', phone: '+7 (999) 333-44-55', isBlocked: false }
    ]);
    console.log(`Создано ${users.length} пользователей`);

    const masters = await Master.bulkCreate([
      { userId: users[1].id, bio: 'Мастер-парикмахер с 8-летним стажем. Специализируюсь на мужских и женских стрижках.', photo: 'masters/ivan.jpg', scheduleSettings: { weekSchedule: { monday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, tuesday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, wednesday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, thursday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, friday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, saturday: { isWorking: true, start: '10:00', end: '16:00', breakStart: '13:00', breakEnd: '14:00' }, sunday: { isWorking: false } }, techBreakMinutes: 15 } },
      { userId: users[2].id, bio: 'Колорист высшей категории. Опыт работы 10 лет.', photo: 'masters/elena.jpg', scheduleSettings: { weekSchedule: { monday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, tuesday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, wednesday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, thursday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, friday: { isWorking: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' }, saturday: { isWorking: true, start: '10:00', end: '16:00', breakStart: '13:00', breakEnd: '14:00' }, sunday: { isWorking: false } }, techBreakMinutes: 20 } },
      { userId: users[3].id, bio: 'Мастер по маникюру и педикюру. Обучалась в лучших школах Европы.', photo: 'masters/mikhail.jpg', scheduleSettings: { weekSchedule: { monday: { isWorking: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' }, tuesday: { isWorking: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' }, wednesday: { isWorking: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' }, thursday: { isWorking: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' }, friday: { isWorking: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' }, saturday: { isWorking: false }, sunday: { isWorking: false } }, techBreakMinutes: 10 } },
      { userId: users[4].id, bio: 'Массажист с медицинским образованием. Стаж 7 лет.', photo: 'masters/olga.jpg', scheduleSettings: { weekSchedule: { monday: { isWorking: true, start: '09:00', end: '20:00', breakStart: '13:00', breakEnd: '14:00' }, tuesday: { isWorking: true, start: '09:00', end: '20:00', breakStart: '13:00', breakEnd: '14:00' }, wednesday: { isWorking: true, start: '09:00', end: '20:00', breakStart: '13:00', breakEnd: '14:00' }, thursday: { isWorking: true, start: '09:00', end: '20:00', breakStart: '13:00', breakEnd: '14:00' }, friday: { isWorking: true, start: '09:00', end: '20:00', breakStart: '13:00', breakEnd: '14:00' }, saturday: { isWorking: true, start: '10:00', end: '18:00', breakStart: '14:00', breakEnd: '15:00' }, sunday: { isWorking: true, start: '10:00', end: '16:00', breakStart: '13:00', breakEnd: '14:00' } }, techBreakMinutes: 15 } }
    ]);
    console.log(`Создано ${masters.length} мастеров`);

 const serviceMasters = await Promise.all([
  Service.findAll({ where: { categoryId: categories[0].id } }).then(services => 
    Promise.all(services.map(service => service.addMaster(masters[0])))
  ),
  Service.findAll({ where: { categoryId: categories[1].id } }).then(services => 
    Promise.all(services.map(service => service.addMaster(masters[1])))
  ),
  Service.findAll({ where: { categoryId: categories[3].id } }).then(services => 
    Promise.all(services.map(service => service.addMaster(masters[2])))
  ),
  Service.findAll({ where: { categoryId: categories[4].id } }).then(services => 
    Promise.all(services.map(service => service.addMaster(masters[2])))
  ),
  Service.findAll({ where: { categoryId: categories[5].id } }).then(services => 
    Promise.all(services.map(service => service.addMaster(masters[3])))
  )
]);
console.log('Услуги назначены мастерам');

    const appointments = [];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const statuses = ['completed', 'completed', 'completed', 'completed', 'confirmed', 'cancelled', 'pending'];
    
    for (let i = 0; i < 500; i++) {
      const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
      const randomMaster = masters[Math.floor(Math.random() * masters.length)];
      const randomService = services[Math.floor(Math.random() * services.length)];
      const randomUser = users[Math.floor(Math.random() * (users.length - 5)) + 5];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      let hour = 9 + Math.floor(Math.random() * 8);
      let minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      randomDate.setHours(hour, minute, 0, 0);
      
      appointments.push({
        userId: randomUser.id,
        serviceId: randomService.id,
        masterId: randomMaster.id,
        dateTime: randomDate,
        status: randomStatus,
        createdAt: randomDate,
        updatedAt: randomDate
      });
    }
    
    appointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    await Appointment.bulkCreate(appointments);
    console.log(`Создано ${appointments.length} записей`);

    const completedAppointments = appointments.filter(a => a.status === 'completed');
    
    const reviews = [];
    const reviewTexts = [
      'Отличный салон! Мастер профессионал своего дела. Очень довольна результатом.',
      'Все понравилось, буду рекомендовать друзьям. Чисто, уютно, приветливый персонал.',
      'Хороший сервис, но немного дороговато. В остальном все отлично.',
      'Мастер учла все пожелания, результат превзошел ожидания!',
      'Очень понравилось отношение к клиентам. Обязательно приду еще.',
      'Качество услуг на высоте. Интерьер приятный, расслабляющая атмосфера.',
      'Сделали все быстро и качественно. Спасибо мастеру за профессионализм.',
      'Немного пришлось подождать, но результат того стоил. Рекомендую!',
      'Отличное место для тех, кто ценит качество и комфорт.',
      'Восторг! Теперь только сюда. Мастер - золотые руки.',
      'Все супер! Уютно, чисто, мастера вежливые. Цены приемлемые.',
      'Результат просто шикарный! Спасибо большое мастеру за красоту.',
      'Хороший салон, но цены кусаются. Качество соответствует цене.',
      'Очень понравилось обслуживание. Атмосфера домашнего уюта.',
      'Профессионалы своего дела. Всегда записываюсь только сюда.'
    ];
    
    for (let i = 0; i < 150 && i < completedAppointments.length; i++) {
      const apt = completedAppointments[i];
      const review = await Review.create({
        userId: apt.userId,
        masterId: apt.masterId,
        text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
        rating: [4, 5, 5, 5, 4, 5, 5, 4][Math.floor(Math.random() * 8)],
        photos: [],
        isModerated: Math.random() > 0.3,
        createdAt: apt.dateTime,
        updatedAt: apt.dateTime
      });
      reviews.push(review);
    }
    console.log(`Создано ${reviews.length} отзывов`);

    const workPhotos = await WorkPhoto.bulkCreate([
      { imageUrl: 'works/haircut1.jpg', masterName: 'Иван Петров', description: 'Мужская стрижка с выбриванием', categoryId: categories[0].id, sortOrder: 1 },
      { imageUrl: 'works/haircut2.jpg', masterName: 'Иван Петров', description: 'Женская стрижка боб', categoryId: categories[0].id, sortOrder: 2 },
      { imageUrl: 'works/coloring1.jpg', masterName: 'Елена Смирнова', description: 'Окрашивание балаяж', categoryId: categories[1].id, sortOrder: 3 },
      { imageUrl: 'works/coloring2.jpg', masterName: 'Елена Смирнова', description: 'Сложное окрашивание', categoryId: categories[1].id, sortOrder: 4 },
      { imageUrl: 'works/manicure1.jpg', masterName: 'Михаил Иванов', description: 'Маникюр с дизайном', categoryId: categories[3].id, sortOrder: 5 },
      { imageUrl: 'works/manicure2.jpg', masterName: 'Михаил Иванов', description: 'Френч с рисунком', categoryId: categories[3].id, sortOrder: 6 },
      { imageUrl: 'works/pedicure1.jpg', masterName: 'Михаил Иванов', description: 'Педикюр с покрытием гель-лак', categoryId: categories[4].id, sortOrder: 7 },
      { imageUrl: 'works/massage1.jpg', masterName: 'Ольга Кузнецова', description: 'Классический массаж', categoryId: categories[5].id, sortOrder: 8 }
    ]);
    console.log(`Создано ${workPhotos.length} фото работ`);

    const promotions = await Promotion.bulkCreate([
      { title: 'Скидка 20% на первое посещение', description: 'Для всех новых клиентов скидка 20% на любую услугу', discount: 20, imageUrl: 'promotions/newclient.jpg', validFrom: new Date('2024-01-01'), validTo: new Date('2024-12-31'), isActive: true },
      { title: 'Комплекс "Красота"', description: 'Маникюр + педикюр + покрытие гель-лак всего за 4000 ₽', discount: 15, imageUrl: 'promotions/complex.jpg', validFrom: new Date('2024-02-01'), validTo: new Date('2024-06-30'), isActive: true },
      { title: 'Счастливые часы', description: 'Стрижка + укладка по специальной цене 2000 ₽ до 12:00', discount: 30, imageUrl: 'promotions/happyhour.jpg', validFrom: new Date('2024-03-01'), validTo: new Date('2024-12-31'), isActive: true },
      { title: 'Подарок имениннику', description: 'Любая услуга в подарок в день рождения', discount: 100, imageUrl: 'promotions/birthday.jpg', validFrom: new Date('2024-01-01'), validTo: new Date('2024-12-31'), isActive: true },
      { title: 'Корпоративным клиентам', description: 'Скидка 10% при заказе от 3 услуг', discount: 10, imageUrl: 'promotions/corporate.jpg', validFrom: new Date('2024-01-01'), validTo: new Date('2024-12-31'), isActive: false },
      { title: 'Летний марафон красоты', description: 'Абонемент на 5 посещений со скидкой 25%', discount: 25, imageUrl: 'promotions/summer.jpg', validFrom: new Date('2024-06-01'), validTo: new Date('2024-08-31'), isActive: true }
    ]);
    console.log(`Создано ${promotions.length} акций`);

    const getMonthlyStats = () => {
      const monthlyData = {};
      completedAppointments.forEach(apt => {
        const month = new Date(apt.dateTime).getMonth();
        if (!monthlyData[month]) {
          monthlyData[month] = { orders: 0, revenue: 0 };
        }
        monthlyData[month].orders++;
        const service = services.find(s => s.id === apt.serviceId);
        monthlyData[month].revenue += parseFloat(service.price);
      });
      return monthlyData;
    };

    const getMasterStats = () => {
      const masterData = {};
      masters.forEach(master => {
        masterData[master.id] = { name: `${master.User.firstName} ${master.User.lastName}`, orders: 0, revenue: 0 };
      });
      completedAppointments.forEach(apt => {
        masterData[apt.masterId].orders++;
        const service = services.find(s => s.id === apt.serviceId);
        masterData[apt.masterId].revenue += parseFloat(service.price);
      });
      return masterData;
    };

    const getServiceStats = () => {
      const serviceData = {};
      services.forEach(service => {
        serviceData[service.id] = { name: service.name, orders: 0, revenue: 0 };
      });
      completedAppointments.forEach(apt => {
        serviceData[apt.serviceId].orders++;
        const service = services.find(s => s.id === apt.serviceId);
        serviceData[apt.serviceId].revenue += parseFloat(service.price);
      });
      return Object.values(serviceData).sort((a, b) => b.orders - a.orders);
    };

    console.log('\n========== СТАТИСТИКА ДЛЯ ОТЧЕТОВ ==========');
    console.log(`\n📊 Общая статистика за 2024 год:`);
    console.log(`   Всего записей: ${appointments.length}`);
    console.log(`   Выполненных записей: ${completedAppointments.length}`);
    console.log(`   Отмененных записей: ${appointments.filter(a => a.status === 'cancelled').length}`);
    console.log(`   Общая выручка: ${completedAppointments.reduce((sum, apt) => {
      const service = services.find(s => s.id === apt.serviceId);
      return sum + parseFloat(service.price);
    }, 0).toFixed(2)} ₽`);
    
    console.log(`\n📈 Выручка по месяцам:`);
    const monthlyStats = getMonthlyStats();
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    for (let i = 0; i < 12; i++) {
      if (monthlyStats[i]) {
        console.log(`   ${monthNames[i]}: ${monthlyStats[i].orders} заказов, ${monthlyStats[i].revenue.toFixed(2)} ₽`);
      } else {
        console.log(`   ${monthNames[i]}: 0 заказов, 0 ₽`);
      }
    }
    
    console.log(`\n👨‍💼 Статистика по мастерам:`);
    const masterStats = getMasterStats();
    Object.values(masterStats).forEach(master => {
      console.log(`   ${master.name}: ${master.orders} заказов, ${master.revenue.toFixed(2)} ₽`);
    });
    
    console.log(`\n💇 Статистика по услугам (ТОП-5):`);
    const serviceStats = getServiceStats();
    serviceStats.slice(0, 5).forEach(service => {
      console.log(`   ${service.name}: ${service.orders} заказов, ${service.revenue.toFixed(2)} ₽`);
    });
    
    console.log(`\n⭐ Отзывы:`);
    console.log(`   Всего отзывов: ${reviews.length}`);
    console.log(`   Опубликованных: ${reviews.filter(r => r.isModerated).length}`);
    console.log(`   Средний рейтинг: ${(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}/5`);
    
    console.log('\n========== ТЕСТОВЫЕ ДАННЫЕ УСПЕШНО ЗАГРУЖЕНЫ ==========');
    console.log('\n👤 Тестовые пользователи:');
    console.log('   Администратор: admin@salon.com / admin123');
    console.log('   Мастер Иван: ivan.petrov@example.com / password123');
    console.log('   Мастер Елена: elena.smirnova@example.com / password123');
    console.log('   Пользователь: anna.pavlova@example.com / password123');
    
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();