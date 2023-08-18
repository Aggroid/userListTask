import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HomeScreen />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
