'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FiMapPin, 
    FiPhone, 
    FiMail, 
    FiClock,
    FiSend,
    FiFacebook,
    FiInstagram,
    FiYoutube
} from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';
import Image from 'next/image';
import imagee from '../../assets/carrousel1.png';

const DMSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario enviado:', formData);
        // Resetear el formulario
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: <FiMapPin className="w-6 h-6" />,
            title: 'Dirección',
            content: 'Av. Las Americas N° 316 JLO - Chiclayo, Perú',
            link: 'https://maps.google.com/?q=Av.+Las+Americas+316+JLO,+Chiclayo,+Peru'
        },
        {
            icon: <FiPhone className="w-6 h-6" />,
            title: 'Teléfono',
            content: '976 687 566',
            link: 'tel:976687566'
        },
        {
            icon: <FiMail className="w-6 h-6" />,
            title: 'Email',
            content: 'ventas@compactseguridadindustrial.com',
            link: 'mailto:ventas@compactseguridadindustrial.com'
        },
        {
            icon: <FiClock className="w-6 h-6" />,
            title: 'Horario de Atención',
            content: 'Lun - Vie: 8:00 AM - 18:00 PM',
            link: '#'
        }
    ];

    const socialLinks = [
        { icon: <FiFacebook className="w-5 h-5" />, href: 'https://facebook.com/compactseguridad', label: 'Facebook' },
        { icon: <FiInstagram className="w-5 h-5" />, href: 'https://instagram.com/compactepp/', label: 'Instagram' },
        { icon: <FiYoutube className="w-5 h-5" />, href: 'https://www.youtube.com/@Compactepp', label: 'YouTube' }
    ];

    return (

        <main className={`min-h-screen ${DMSans.className}`}>
            <div className="h-[65px]"></div>
            {/* HeroSection */}
            <section className="relative bg-gray-900 text-white py-24">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent">
                    <div className="absolute inset-0 bg-black/50" />
                    <Image src={imagee} alt="Compact Seguridad y Construcción" fill className="object-cover opacity-40" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Contáctanos
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Estamos aquí para responder tus preguntas y ayudarte a encontrar
                        las mejores soluciones en equipos de protección industrial.
                    </motion.p>
                </div>
            </section>

            {/* Seccion de Contacto */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Formulario de Contacto */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Envíanos un mensaje
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre completo
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Asunto
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="cotizacion">Solicitar cotización</option>
                                            <option value="informacion">Información de productos</option>
                                            <option value="soporte">Soporte técnico</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                    <FiSend className="w-5 h-5" />
                                    Enviar mensaje
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Información de Contacto */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Información de contacto
                                </h2>
                                <div className="grid gap-8">
                                    {contactInfo.map((item, index) => (
                                        <motion.a
                                            key={index}
                                            href={item.link}
                                            target={item.link.startsWith('http') ? '_blank' : '_self'}
                                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                                        >
                                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {item.content}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            

                            {/* Mapa de la empresa */}
                            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.6297835198218!2d-79.84112530485433!3d-6.760521953606065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904cef9963844393%3A0xc89078e378873b22!2sCOMPACT%20SEGURIDAD%20Y%20CONSTRUCCI%C3%93N!5e0!3m2!1ses-419!2spe!4v1744048855486!5m2!1ses-419!2spe"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            {/* Redes Sociales */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Síguenos en redes sociales
                                </h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div> 
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage; 