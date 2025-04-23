'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const DevNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isAdminPanel = pathname.startsWith('/admin');
    const wasShown = localStorage.getItem('devNotificationShown');

    console.log('DevNotification useEffect ejecutado', { isMobile, isAdminPanel, wasShown, isVisible });

    if (!isMobile && !isAdminPanel && !wasShown) {
      setIsVisible(true);
      localStorage.setItem('devNotificationShown', 'true');
      console.log('Notificación mostrada');

      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
        console.log('Notificación oculta por timeout');
      }, 3000);

      return () => {
        clearTimeout(hideTimeout);
        console.log('Timeout limpiado');
      };
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="notification"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            mass: 0.5
          }}
          className="fixed top-15 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border-l-4 border-orange-500"
        >
          <div className="text-sm text-gray-700">
            Desarrollado por <span className="font-semibold">PetuCode</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevNotification;