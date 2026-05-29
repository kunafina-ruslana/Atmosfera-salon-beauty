export const API_URL = process.env.REACT_APP_API_URL || '';

// Для локальной разработки
if (process.env.NODE_ENV === 'development' && !API_URL) {
  export const API_URL = 'http://localhost:5000';
}
