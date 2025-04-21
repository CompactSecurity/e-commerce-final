'use client'
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

interface Marca {
    id: number;
    nombre: string;
    descripcion: string;
    logo: string;
}

interface EditMarcasProps {
    onBack: () => void;
}

const EditMarcas = ({ onBack }: EditMarcasProps) => {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [selectedMarca, setSelectedMarca] = useState<Marca | null>(null);

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

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMarca) return;

        try {
            const response = await fetch(`http://localhost/e-commerce/api/marcas/update/${selectedMarca.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(selectedMarca),
            });

            const data = await response.json();
            if (data.status === 'success') {
                alert('Marca actualizada exitosamente');
                setSelectedMarca(null);
                fetchMarcas();
            } else {
                alert(data.mensaje || 'Error al actualizar la marca');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar la marca');
        }
    };

    if (selectedMarca) {
        return (
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Editar Marca</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            value={selectedMarca.nombre}
                            onChange={(e) => setSelectedMarca({...selectedMarca, nombre: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            value={selectedMarca.descripcion}
                            onChange={(e) => setSelectedMarca({...selectedMarca, descripcion: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Logo (URL)</label>
                        <input
                            type="text"
                            value={selectedMarca.logo}
                            onChange={(e) => setSelectedMarca({...selectedMarca, logo: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setSelectedMarca(null)}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
                        >
                            Actualizar Marca
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Editar Marca</h2>
            <div className="space-y-4">
                {marcas.map(marca => (
                    <div key={marca.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                            <h3 className="font-semibold">{marca.nombre}</h3>
                            <p className="text-sm text-gray-600">{marca.descripcion}</p>
                        </div>
                        <button
                            onClick={() => setSelectedMarca(marca)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                        >
                            <FaEdit />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditMarcas;
