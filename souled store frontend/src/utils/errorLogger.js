// src/utils/errorLogger.js
import axios from 'axios';

export const logErrorToServer = (error, errorInfo) => {
  axios.post('http://localhost:5000/log/frontend-error', {
    message: error.message || 'Unknown error',
    stack: error.stack,
    componentStack: errorInfo?.componentStack || '',
    userAgent: navigator.userAgent,
    url: window.location.href,
  }).catch(err => {
    console.error('Failed to log error to server:', err);
  });
};
