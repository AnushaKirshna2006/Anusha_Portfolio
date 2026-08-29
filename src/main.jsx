import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { CursorProvider } from './components/CursorContext.jsx';
import { SoundProvider } from './components/SoundContext.jsx';
import { ThemeProvider } from './components/ThemeContext.jsx';
import './index.css';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <SoundProvider>
          <CursorProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CursorProvider>
        </SoundProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
