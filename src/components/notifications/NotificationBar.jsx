import React, { useEffect, useState } from 'react';
import './NotificationBar.css';

const NotificationBar = ({ title, message, type = 'default', icon = '🔔', duration = 5000, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (title || message) {
            setVisible(true);
            const timer = setTimeout(() => handleClose(), duration);
            return () => clearTimeout(timer);
        }
    }, [title, message]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => {
            if (onClose) onClose();
        }, 300);
    };

    return (
        <div className={`notification-bar ${visible ? 'show' : ''} ${type}`}>
            <div className="notification-content">
                <div className="notification-icon">
                    <span>{icon}</span>
                </div>
                <div className="notification-text">
                    <h4>{title}</h4>
                    <p>{message}</p>
                </div>
            </div>
            <button className="notification-close" onClick={handleClose}>×</button>
        </div>
    );
};

// const showNotification = (title, message, type = 'default', icon = '🔔', duration = 5000) => {
//     setNotification({ title, message, type, icon, duration });
// };

// showNotification('Éxito', 'Tu plan fue guardado', 'success', '✅')

// {notification && (
//     <NotificationBar
//         {...notification}
//         onClose={() => setNotification(null)}
//     />
// )}

export default NotificationBar;