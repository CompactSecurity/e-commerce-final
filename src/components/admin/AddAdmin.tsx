'use client'
import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import ConfirmationModal from '../ui/ConfirmationModal';

interface AddAdminProps {
    onBack: () => void;
}

interface AdminFormData {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    rol: string;
}

const AddAdmin = ({ onBack }: AddAdminProps) => {
    const [formData, setFormData] = useState<AdminFormData>({
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        rol: 'admin'
    });

    // Add modal state
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success' as const
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/e-commerce/api/auth/register-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData,
                    rol: 'admin'
                }),
            });

            const data = await response.json();
            if (data.status === 'success') {
                // Replace alert with modal
                setModalState({
                    isOpen: true,
                    title: '¡Registro Exitoso!',
                    message: 'Administrador registrado exitosamente',
                    type: 'success'
                });
                
                // Reset form data
                setFormData({
                    nombre: '',
                    apellidos: '',
                    email: '',
                    password: '',
                    rol: 'admin'
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setModalState(prev => ({
            ...prev,
            isOpen: false
        }));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Registrar Nuevo Administrador</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Nombre</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Apellidos</label>
                    <input
                        type="text"
                        value={formData.apellidos}
                        onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Contraseña</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <FaUserPlus />
                    Registrar Administrador
                </button>
            </form>

            {/* Add ConfirmationModal component */}
            <ConfirmationModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                message={modalState.message}
                type={modalState.type}
                onConfirm={closeModal}
                onClose={closeModal}
            />
        </div>
    );
};

export default AddAdmin;