const config = {
  development: {
    API_URL: 'http://localhost:5000'
  },
  production: {
    API_URL: ''
  }
};

const environment = process.env.NODE_ENV || 'development';
export const API_URL = config[environment].API_URL;

export default config;
