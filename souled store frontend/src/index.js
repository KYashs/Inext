import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { logErrorToServer } from './utils/errorLogger'; // Import your error logger function

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Capture global errors
window.onerror = (message, source, lineno, colno, error) => {
  logErrorToServer({
    message: message || 'Global Error',
    stack: error?.stack || `${source}:${lineno}:${colno}`,
  });
};

// Capture unhandled promise rejections
window.onunhandledrejection = (event) => {
  logErrorToServer({
    message: event.reason?.message || 'Unhandled Promise Rejection',
    stack: event.reason?.stack || 'No stack trace',
  });
};

// Optional: Log performance metrics
reportWebVitals(console.log); // Or customize with a logging function
