import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import AppTheme from './theme/AppTheme.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppTheme>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppTheme>
    </React.StrictMode>
);
