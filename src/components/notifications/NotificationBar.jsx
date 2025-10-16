import React, { useEffect, useState } from 'react';
import './NotificationBar.css';

let externalSetNotification; // 🔑 acá guardamos el setter

export const setNotification = (notif) => {
  if (externalSetNotification) {
    externalSetNotification(notif);
  } else {
    console.warn("NotificationBar aún no está montado");
  }
};

const NotificationBarWrapper = () => {
  const [notification, setNotificationState] = useState(null);

  useEffect(() => {
    // guardamos el setter en la variable global
    externalSetNotification = setNotificationState;
    return () => {
      externalSetNotification = null;
    };
  }, []);

  if (!notification) return null;

  return (
    <NotificationBar
      {...notification}
      onClose={() => setNotificationState(null)}
    />
  );
};

const NotificationBar = ({ title, message, type = 'default', icon = '🔔', duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (title || message) {
      setVisible(true);
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [title, message, duration]);

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

export default NotificationBarWrapper;
