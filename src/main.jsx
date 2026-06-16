import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CursorProvider } from './components/CursorContext.jsx';
import { SoundProvider } from './components/SoundContext.jsx';
import { ThemeProvider } from './components/ThemeContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SoundProvider>
        <CursorProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CursorProvider>
      </SoundProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
