'use client'
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface Pedido {
    id_pedido: number;
    id_usuario: number | null;
    fecha_pedido: string;
    estado: string;
    total: number;
    direccion_envio: string;
    metodo_pago: string;
    nombre?: string;
    apellidos?: string;
    email?: string;
}

const ViewPedidos = ({ onBack }: { onBack: () => void }) => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [filteredPedidos, setFilteredPedidos] = useState<Pedido[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedStatus, setSelectedStatus] = useState<string>('todos');

    const estadosPedido = ['todos', 'pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch('http://localhost/e-commerce/api/pedidos/get-all', {
                    credentials: 'include'
                });
                const data = await response.json();
                
                if (data.status === 'success') {
                    setPedidos(data.data);
                    setFilteredPedidos(data.data);
                } else {
                    console.error('Error en la respuesta:', data.message);
                    setPedidos([]);
                    setFilteredPedidos([]);
                }
            } catch (error) {
                console.error('Error fetching pedidos:', error);
                setPedidos([]);
                setFilteredPedidos([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    useEffect(() => {
        if (selectedStatus === 'todos') {
            setFilteredPedidos(pedidos);
        } else {
            setFilteredPedidos(pedidos.filter(pedido => pedido.estado === selectedStatus));
        }
    }, [selectedStatus, pedidos]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(e.target.value);
    };

    const updateOrderStatus = async (id: number, newStatus: string) => {
        try {
            const response = await fetch(`http://localhost/e-commerce/api/pedidos/update-status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ estado: newStatus })
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                // Update the local state
                const updatedPedidos = pedidos.map(pedido => 
                    pedido.id_pedido === id ? { ...pedido, estado: newStatus } : pedido
                );
                setPedidos(updatedPedidos);
                
                // Apply the filter again
                if (selectedStatus === 'todos' || selectedStatus === newStatus) {
                    setFilteredPedidos(updatedPedidos.filter(pedido => 
                        selectedStatus === 'todos' || pedido.estado === selectedStatus
                    ));
                } else {
                    setFilteredPedidos(updatedPedidos.filter(pedido => pedido.estado === selectedStatus));
                }
                
                alert('Estado del pedido actualizado correctamente');
            } else {
                alert('Error al actualizar el estado del pedido: ' + data.message);
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Error al actualizar el estado del pedido');
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Pedidos</h2>
                <div className="flex items-center">
                    <label htmlFor="statusFilter" className="mr-2 text-gray-700">Filtrar por estado:</label>
                    <select
                        id="statusFilter"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {estadosPedido.map(estado => (
                            <option key={estado} value={estado}>
                                {estado.charAt(0).toUpperCase() + estado.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredPedidos.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No hay pedidos por hoy</h3>
                    <p className="text-gray-600">No se encontraron pedidos con el estado seleccionado. Intentalo mas tarde.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método de Pago</th>
                                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPedidos.map((pedido) => (
                                <tr key={pedido.id_pedido} className="hover:bg-gray-50">
                                    <td className="py-4 px-4 whitespace-nowrap">{pedido.id_pedido}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        {pedido.nombre && pedido.apellidos 
                                            ? `${pedido.nombre} ${pedido.apellidos}` 
                                            : `Usuario ID: ${pedido.id_usuario}`}
                                        <div className="text-xs text-gray-500">{pedido.email}</div>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">{new Date(pedido.fecha_pedido).toLocaleString()}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${pedido.estado === 'entregado' ? 'bg-green-100 text-green-800' : ''}
                                            ${pedido.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${pedido.estado === 'procesando' ? 'bg-blue-100 text-blue-800' : ''}
                                            ${pedido.estado === 'enviado' ? 'bg-purple-100 text-purple-800' : ''}
                                            ${pedido.estado === 'cancelado' ? 'bg-red-100 text-red-800' : ''}
                                        `}>
                                            {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">S/ {pedido.total.toFixed(2)}</td>
                                    <td className="py-4 px-4">{pedido.direccion_envio}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">{pedido.metodo_pago}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <select 
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                            value={pedido.estado}
                                            onChange={(e) => updateOrderStatus(pedido.id_pedido, e.target.value)}
                                        >
                                            {estadosPedido.filter(estado => estado !== 'todos').map(estado => (
                                                <option key={estado} value={estado}>
                                                    {estado.charAt(0).toUpperCase() + estado.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewPedidos;