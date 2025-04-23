'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const DevNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkAndShowNotification = () => {
      const lastShown = localStorage.getItem('devNotificationLastShown');
      const now = Date.now();
      
      // Show if never shown or if 10 minutes have passed
      if (!lastShown || (now - Number(lastShown)) > 600000) {
        setIsVisible(true);
        localStorage.setItem('devNotificationLastShown', now.toString());
        
        // Auto-hide after 3 seconds
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
        
        return timer;
      }
      return null;
    };

    const timer = checkAndShowNotification();
    
    const interval = setInterval(checkAndShowNotification, 60000);

    return () => {
      if (timer) clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="fixed top-15 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border-l-4 border-orange-500"
    >
      <div className="text-sm text-gray-700">
        Desarrollado por <span className="font-semibold">PetuCode</span>
      </div>
    </motion.div>
  );
};

export default DevNotification;