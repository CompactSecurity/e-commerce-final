'use client'
//HeroSection
import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import foto1 from '../assets/carrousel1.png';
import foto2 from '../assets/carrousel2.png';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideData {
  id: number;
  imageUrl: StaticImageData;
  title: string;
  description: string;
  price: number;
}

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const slides: SlideData[] = [
    {
      id: 1,
      imageUrl: foto1,
      title: 'Equipos de Seguridad',
      description: 'Soluciones profesionales para protección industrial',
      price: 299.99
    },
    {
      id: 2,
      imageUrl: foto2,
      title: 'Materiales de Construcción',
      description: 'Productos de alta calidad para sus proyectos',
      price: 199.99
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual navigation
  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden mb-8 mt-16">
      <div className="w-full h-full relative">
        <AnimatePresence initial={false} custom={direction}>
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div 
                key={slide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute top-0 left-0 w-full h-full flex items-center"
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={slide.imageUrl} 
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
                  <motion.div 
                    className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/4 text-white p-8 max-w-md"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <motion.h2 
                      className="text-4xl font-bold mb-3"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.6,
                        delay: 0.4,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p 
                      className="text-lg mb-5"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.6,
                        delay: 0.5,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.p 
                      className="text-2xl font-bold mb-6"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.6,
                        delay: 0.6,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      S/. {slide.price.toFixed(2)}
                    </motion.p>
                    <motion.button 
                      className="px-6 py-3 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors rounded"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.6,
                        delay: 0.7,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver Productos
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-orange-500' : 'bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a la diapositiva ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;