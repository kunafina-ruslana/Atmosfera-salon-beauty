import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { FaVk, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const { isDark } = useTheme();
  
  const logoSrc = isDark ? '/icons/logo-dark.svg' : '/icons/logo-light.svg';

  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.footer_content}>
          <div className={styles.footer_column}>
            <div className={styles.logo_section}>
              <Link to="/" className={styles.logo_link}>
                <img src={logoSrc} alt="Логотип салона красоты Atmosfera" className={styles.logo} />
              </Link>
              <p className={styles.description}>Салон красоты "Atmosfera" — место, где создаётся атмосфера красоты и гармонии. Профессиональный уход, качественные услуги и индивидуальный подход к каждому клиенту.</p>
            </div>
          </div>

          <div className={styles.footer_column}>
            <h3 className={styles.column_title}>Информация</h3>
            <ul className={styles.links_list}>
              <li><Link to="/about" className={styles.link}>О салоне</Link></li>
              <li><Link to="/catalog" className={styles.link}>Услуги и цены</Link></li>
              <li><Link to="/masters" className={styles.link}>Наши мастера</Link></li>
              <li><Link to="/reviews" className={styles.link}>Отзывы</Link></li>
            </ul>
          </div>

          <div className={styles.footer_column}>
            <h3 className={styles.column_title}>Контакты</h3>
            <div className={styles.contacts}>
              <div className={styles.contact_item}>
                <span className={styles.contact_label}>Адрес:</span>
                <p className={styles.contact_text}>г. Оренбург, Южный переулок, 35 (1 этаж)</p>
              </div>
              <div className={styles.contact_item}>
                <span className={styles.contact_label}>Телефон:</span>
                <a href="tel:+74951234567" className={styles.contact_link}>+7 987 857 74 74</a>
              </div>
               <div className={styles.contact_item}>
                <span className={styles.contact_label}>Режим работы:</span>
                <p className={styles.contact_text}>C 10:00 до 20:00 (Пн-Вс)<br />по предварительной записи</p>
              </div>
            </div>

            <div className={styles.social_section}>
              <h4 className={styles.social_title}>Мы в соцсетях</h4>
              <div className={styles.social_links}>
                <a href="https://vk.com/atmosfera" target="_blank" rel="noopener noreferrer" className={styles.social_link} aria-label="ВКонтакте"> <FaVk size={24} /> </a>
                <a href="https://instagram.com/atmosfera" target="_blank" rel="noopener noreferrer" className={styles.social_link} aria-label="Instagram"> <FaInstagram size={24} /> </a>
              </div>
              <p className={styles.social_warning}> *Instagram — соц. сеть, принадлежащая компании Meta, признана экстремистской и запрещенной на территории России. </p>
            </div>
          </div>
        </div>

        <div className={styles.copyright}> <p>© 2026 Atmosfera - Все права защищены</p> </div>
      </div>
    </footer>
  );
};

export default Footer;