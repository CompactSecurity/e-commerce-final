'use client'
import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

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
                alert('Administrador registrado exitosamente');
                setFormData({
                    nombre: '',
                    apellidos: '',
                    email: '',
                    password: '',
                    rol: 'admin'
                });
            } else {
                alert(data.mensaje || 'Error al registrar administrador');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
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
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                    <FaUserPlus />
                    Registrar Administrador
                </button>
            </form>
        </div>
    );
};

export default AddAdmin;