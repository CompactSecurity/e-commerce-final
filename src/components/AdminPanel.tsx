'use client'
import React, { useState } from 'react';
import { FaUserPlus, FaUserMinus, FaUserEdit, FaArrowLeft, FaBlog } from 'react-icons/fa';
import AddAdmin from './admin/AddAdmin';
import DeleteAdmin from './admin/DeleteAdmin';
import EditAdmin from './admin/EditAdmin';
import AddBlog from './admin/AddBlog';
import DeleteBlog from './admin/DeleteBlog';
import EditBlog from './admin/EditBlog';

interface AdminFormData {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    rol: string;
}

const AdminPanel = () => {
    const [formData, setFormData] = useState<AdminFormData>({
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        rol: 'admin' // Setting default role
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
                    rol: 'admin' // Explicitly setting role as admin
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

    const [currentView, setCurrentView] = useState<string>('main');

    const renderView = () => {
        switch(currentView) {
            case 'add':
                return <AddAdmin onBack={() => setCurrentView('main')} />;
            case 'delete':
                return <DeleteAdmin onBack={() => setCurrentView('main')} />;
            case 'edit':
                return <EditAdmin onBack={() => setCurrentView('main')} />;
            case 'add-blog':
                return <AddBlog onBack={() => setCurrentView('main')} />;
            case 'delete-blog':
                return <DeleteBlog onBack={() => setCurrentView('main')} />;
            case 'edit-blog':
                return <EditBlog onBack={() => setCurrentView('main')} />;
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button
                            onClick={() => setCurrentView('add')}
                            className="p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors flex flex-col items-center gap-4"
                        >
                            <FaUserPlus className="text-4xl text-blue-600" />
                            <span className="text-lg font-medium text-blue-800">Agregar Administrador</span>
                        </button>
                        <button
                            onClick={() => setCurrentView('delete')}
                            className="p-6 bg-red-100 rounded-lg hover:bg-red-200 transition-colors flex flex-col items-center gap-4"
                        >
                            <FaUserMinus className="text-4xl text-red-600" />
                            <span className="text-lg font-medium text-red-800">Eliminar Administrador</span>
                        </button>
                        <button
                            onClick={() => setCurrentView('edit')}
                            className="p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors flex flex-col items-center gap-4"
                        >
                            <FaUserEdit className="text-4xl text-green-600" />
                            <span className="text-lg font-medium text-green-800">Editar Administrador</span>
                        </button>

                        {/* Blog management buttons */}
                        <button
                            onClick={() => setCurrentView('add-blog')}
                            className="p-6 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors flex flex-col items-center gap-4"
                        >
                            <FaBlog className="text-4xl text-purple-600" />
                            <span className="text-lg font-medium text-purple-800">Agregar Blog</span>
                        </button>
                        <button
                            onClick={() => setCurrentView('delete-blog')}
                            className="p-6 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors flex flex-col items-center gap-4"
                        >
                            <FaBlog className="text-4xl text-orange-600" />
                            <span className="text-lg font-medium text-orange-800">Eliminar Blog</span>
                        </button>
                        <button
                            onClick={() => setCurrentView('edit-blog')}
                            className="p-6 bg-teal-100 rounded-lg hover:bg-teal-200 transition-colors flex flex-col items-center gap-4"
                        >
                            <FaBlog className="text-4xl text-teal-600" />
                            <span className="text-lg font-medium text-teal-800">Editar Blog</span>
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="p-6">
            {currentView !== 'main' && (
                <button
                    onClick={() => setCurrentView('main')}
                    className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
                >
                    <FaArrowLeft className="mr-2" /> Volver al Panel
                </button>
            )}
            {renderView()}
        </div>
    );
};

export default AdminPanel;