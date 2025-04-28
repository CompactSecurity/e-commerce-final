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
}

const ViewPedidos = ({ onBack }: { onBack: () => void }) => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch('http://localhost/e-commerce/api/pedidos');
                const data = await response.json();
                setPedidos(data);
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <button
                onClick={onBack}
                className="mb-6 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
            >
                <FaArrowLeft className="mr-2 cursor-pointer" /> Volver al Panel
            </button>
            <h2 className="text-2xl font-semibold mb-4">Pedidos</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID Pedido</th>
                        <th className="py-2 px-4 border-b">ID Usuario</th>
                        <th className="py-2 px-4 border-b">Fecha Pedido</th>
                        <th className="py-2 px-4 border-b">Estado</th>
                        <th className="py-2 px-4 border-b">Total</th>
                        <th className="py-2 px-4 border-b">Dirección de Envío</th>
                        <th className="py-2 px-4 border-b">Método de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido.id_pedido}>
                            <td className="py-2 px-4 border-b">{pedido.id_pedido}</td>
                            <td className="py-2 px-4 border-b">{pedido.id_usuario}</td>
                            <td className="py-2 px-4 border-b">{new Date(pedido.fecha_pedido).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b">{pedido.estado}</td>
                            <td className="py-2 px-4 border-b">S/ {pedido.total.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b">{pedido.direccion_envio}</td>
                            <td className="py-2 px-4 border-b">{pedido.metodo_pago}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewPedidos;