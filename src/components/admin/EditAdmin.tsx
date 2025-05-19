'use client'
import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import ConfirmationModal from '../ui/ConfirmationModal';

interface Admin {
    id_usuario: number;
    nombre: string;
    apellidos: string;
    email: string;
}

interface EditAdminProps {
    onBack: () => void;
}

const EditAdmin = ({ onBack }: EditAdminProps) => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
    
    // Modal state
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success' as const
    });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/auth/get-admins', {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setAdmins(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = async () => {
        if (!editingAdmin) return;

        try {
            const response = await fetch(`http://localhost/e-commerce/api/auth/update-admin/${editingAdmin.id_usuario}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(editingAdmin)
            });

            const data = await response.json();
            if (data.status === 'success') {
                setEditingAdmin(null);
                fetchAdmins();
                
                // Show success modal
                setModalState({
                    isOpen: true,
                    title: 'Operación Exitosa',
                    message: 'Administrador actualizado exitosamente',
                    type: 'success'
                });
            } else {
                console.error('Error:', data.mensaje);
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
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Editar Administrador</h2>
            <div className="space-y-4">
                {admins.map(admin => (
                    <div key={admin.id_usuario} className="p-4 border rounded-lg">
                        {editingAdmin?.id_usuario === admin.id_usuario ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={editingAdmin.nombre}
                                    onChange={e => setEditingAdmin({...editingAdmin, nombre: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    placeholder="Nombre"
                                />
                                <input
                                    type="text"
                                    value={editingAdmin.apellidos}
                                    onChange={e => setEditingAdmin({...editingAdmin, apellidos: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    placeholder="Apellidos"
                                />
                                <input
                                    type="email"
                                    value={editingAdmin.email}
                                    onChange={e => setEditingAdmin({...editingAdmin, email: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    placeholder="Email"
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setEditingAdmin(null)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer "
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleEdit}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center cursor-pointer"
                                    >
                                        <FaSave className="mr-2" /> Guardar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{`${admin.nombre} ${admin.apellidos}`}</p>
                                    <p className="text-gray-600 text-sm">{admin.email}</p>
                                </div>
                                <button
                                    onClick={() => setEditingAdmin(admin)}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
                                >
                                    <FaEdit />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
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

export default EditAdmin;