'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FloatingWerewolf = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 0.5,
        y: 0,
        transition: { 
          duration: 0.3,
          type: 'spring'
        }
      }}
      whileHover={{ scale: 1.1 }}
      className="fixed top-23 left-4 z-50 cursor-pointer hidden md:block"
      onClick={() => router.push('https://tuempresa.com')}
    >
      <div className="relative w-14 h-14">
        <Image
          src="/wolf.gif"
          alt="Desarrollado por"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </motion.div>
  );
};

export default FloatingWerewolf;