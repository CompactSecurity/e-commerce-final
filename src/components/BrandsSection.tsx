'use client';
//Seccion de marcas asociadas
import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import Image from 'next/image';
import logo3m from '../assets/marcas/3M.png';
import logoTruper from '../assets/marcas/Truper.png';
import logoAsaki from '../assets/marcas/asaki.png';
import logoStanley from '../assets/marcas/stanley.png';
import logoPretrul from '../assets/marcas/pretul.png';
import logoKamasa from '../assets/marcas/kamasa.png';
import logoC from '../assets/marcas/ca.png';
import logoSM from '../assets/marcas/steelpro.png';
import logoXTREME from '../assets/marcas/Bellota.png';
const DMSans = DM_Sans({
    weight: ["900", "800", "700", "600"],
    subsets: ["latin"],
});

const brands = [
    {
        name: "3M",
        image: logo3m,
    },
    {
        name: "Truper",
        image: logoTruper,
    },
    {
        name: "Asaki",
        image: logoAsaki,
    },
    {
        name: "Stanley",
        image: logoStanley,
    },
    {
        name: "Pretrul",
        image: logoPretrul,
    },
    {
        name: "Kamasa",
        image: logoKamasa,
    },
    {
        name: "C&A",
        image: logoC,
    },
    {
        name: "Steelpro",
        image: logoSM,
    },
    {
        name: "Bellota",
        image: logoXTREME,
    }
];

const BrandsSection: React.FC = () => {
    const [position, setPosition] = useState(0);
    const itemWidth = 200;
    const totalWidth = brands.length * itemWidth;

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prev) => {
                const newPosition = prev - 1;
                if (Math.abs(newPosition) >= totalWidth / 2) {
                    return 0;
                }
                return newPosition;
            });
        }, 15);

        return () => clearInterval(interval);
    }, [totalWidth]);

    return (
        <section className={`py-12 bg-white overflow-hidden ${DMSans.className}`}>
            <div className="max-w-[1400px] mx-auto px-8">
                {/* Encabezado */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Marcas Asociadas</h2>
                </motion.div>

                {/* Carrusel */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
                    
                    <div className="relative overflow-hidden">
                        <motion.div
                            className="flex gap-8 py-6"
                            style={{
                                x: position,
                                width: `${totalWidth * 2}px`,
                            }}
                        >
                            {brands.map((brand, index) => (
                                <motion.div
                                    key={`${brand.name}-1-${index}`}
                                    className="flex-shrink-0 w-[250px]"
                                >
                                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 h-[120px] flex items-center justify-center">
                                        <div className="relative w-full h-[200px]">
                                            <Image
                                                src={brand.image}
                                                alt={brand.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {brands.map((brand, index) => (
                                <motion.div
                                    key={`${brand.name}-2-${index}`}
                                    className="flex-shrink-0 w-[200px]"
                                >
                                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 h-[120px] flex items-center justify-center">
                                        <div className="relative w-full h-[250px]">
                                            <Image
                                                src={brand.image}
                                                alt={brand.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandsSection;
