'use client'
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../ui/ConfirmationModal';

interface Admin {
    id_usuario: number;
    nombre: string;
    apellidos: string;
    email: string;
}

interface DeleteAdminProps {
    onBack: () => void;
}

const DeleteAdmin = ({  }: DeleteAdminProps) => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
    
    // Modal states
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'warning' as const
    });
    
    const [resultModal, setResultModal] = useState({
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

    const initiateDelete = (id: number) => {
        const admin = admins.find(a => a.id_usuario === id);
        if (!admin) return;
        
        setSelectedAdminId(id);
        setConfirmModal({
            isOpen: true,
            title: 'Confirmar Eliminación',
            message: `¿Está seguro de eliminar al administrador ${admin.nombre} ${admin.apellidos}?`,
            type: 'warning'
        });
    };

    const handleDelete = async () => {
        if (!selectedAdminId) return;
        
        try {
            const response = await fetch(`http://localhost/e-commerce/api/auth/delete-admin/${selectedAdminId}`, {
                method: 'GET', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            if (data.status === 'success') {
                setResultModal({
                    isOpen: true,
                    title: 'Operación Exitosa',
                    message: 'Administrador eliminado exitosamente',
                    type: 'success'
                });
                // Refrescar la lista de administradores después de eliminar
                fetchAdmins();
            } else {
               console.error('Error:', data.mensaje); 
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const closeConfirmModal = () => {
        setConfirmModal(prev => ({...prev, isOpen: false}));
        setSelectedAdminId(null);
    };

    const closeResultModal = () => {
        setResultModal(prev => ({...prev, isOpen: false}));
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Eliminar Administrador</h2>
            <div className="space-y-4">
                {admins.map(admin => (
                    <div key={admin.id_usuario} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">{`${admin.nombre} ${admin.apellidos}`}</p>
                            <p className="text-gray-600 text-sm">{admin.email}</p>
                        </div>
                        <button
                            onClick={() => initiateDelete(admin.id_usuario)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors cursor-pointer"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={handleDelete}
                onCancel={closeConfirmModal}
                onClose={closeConfirmModal}
            />

            {/* Result Modal */}
            <ConfirmationModal
                isOpen={resultModal.isOpen}
                title={resultModal.title}
                message={resultModal.message}
                type={resultModal.type}
                onConfirm={closeResultModal}
                onClose={closeResultModal}
            />
        </div>
    );
};

export default DeleteAdmin;