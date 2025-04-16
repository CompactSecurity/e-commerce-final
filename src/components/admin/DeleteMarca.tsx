'use client'
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Marca {
    id: number;
    nombre: string;
    descripcion: string;
    logo: string;
}

interface DeleteMarcasProps {
    onBack: () => void;
}

const DeleteMarcas = ({ onBack }: DeleteMarcasProps) => {
    const [marcas, setMarcas] = useState<Marca[]>([]);

    useEffect(() => {
        fetchMarcas();
    }, []);

    const fetchMarcas = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/marcas/get-all');
            const data = await response.json();
            if (data.status === 'success') {
                setMarcas(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro de eliminar esta marca?')) {
            try {
                const response = await fetch(`http://localhost/e-commerce/api/marcas/delete/${id}`, {
                    method: 'POST', // Changed from DELETE to POST
                    credentials: 'include'
                });

                const data = await response.json();
                if (data.status === 'success') {
                    fetchMarcas(); // Refresh the list after deletion
                    alert('Marca eliminada exitosamente');
                } else {
                    alert(data.mensaje || 'Error al eliminar la marca');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar la marca');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Eliminar Marca</h2>
            <div className="space-y-4">
                {marcas.map(marca => (
                    <div key={marca.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                            <h3 className="font-semibold">{marca.nombre}</h3>
                            <p className="text-sm text-gray-600">{marca.descripcion}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(marca.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeleteMarcas;
