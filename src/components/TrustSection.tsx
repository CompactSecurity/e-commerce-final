'use client'
//Componente que muestra las ventajas de la empresa (confianza)
import React from 'react';
import { FaTruck, FaShieldAlt, FaTags } from 'react-icons/fa';

const TrustSection = () => {
    const trustItems = [
        {
            icon: <FaTags className="text-3xl text-orange-500" />,
            title: "LAS MEJORES OFERTAS",
            description: "En todas nuestras líneas"
        },
        {
            icon: <FaShieldAlt className="text-3xl text-orange-500" />,
            title: "TODO EN SEGURIDAD",
            description: "El mejor equipamiento"
        },
        {
            icon: <FaTruck className="text-3xl text-orange-500" />,
            title: "LLEGAMOS A TODO PERÚ",
            description: "Donde tú estás"
        },
        {
            icon: <FaShieldAlt className="text-3xl text-orange-500" />,
            title: "PAGO SEGURO",
            description: "Siempre preocupados"
        }
    ];
    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trustItems.map((item, index) => (
                        <div 
                            key={index}
                            className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 "
                        >
                            <div className="mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Barra de separación */}
            <div className="w-full h-0.5 bg-gray-100 my-8">
                
            </div>
        </div>

        

        
    );
};

export default TrustSection; 