'use client'
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Admin {
    id_usuario: number;
    nombre: string;
    apellidos: string;
    email: string;
}

interface DeleteAdminProps {
    onBack: () => void;
}

const DeleteAdmin = ({ onBack }: DeleteAdminProps) => {
    const [admins, setAdmins] = useState<Admin[]>([]);

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

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro de eliminar este administrador?')) {
            try {
                const response = await fetch(`http://localhost/e-commerce/api/auth/delete-admin/${id}`, {
                    method: 'GET', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                if (data.status === 'success') {
                    alert('Administrador eliminado exitosamente');
                    // Refrescar la lista de administradores después de eliminar
                    fetchAdmins();
                } else {
                    alert(data.mensaje || 'Error al eliminar administrador');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        }
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
                            onClick={() => handleDelete(admin.id_usuario)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors cursor-pointer"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeleteAdmin;