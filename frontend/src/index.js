import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

// Ensure that the root element is present in your public/index.html
const rootElement = document.getElementById('root');

// Check if the root element exists and is a valid DOM element
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    // Render your app
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} 

