import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget';
import './index.css';

// Create a unique container for the widget
const widgetId = 'amazonia-chat-widget-root';

// Prevent duplicate mounting
if (!document.getElementById(widgetId)) {
    const widgetRoot = document.createElement('div');
    widgetRoot.id = widgetId;
    document.body.appendChild(widgetRoot);

    const root = ReactDOM.createRoot(widgetRoot);
    root.render(
        <React.StrictMode>
            <ChatWidget />
        </React.StrictMode>
    );
}
