'use client'
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

interface BlogPost {
    id_blog: number;
    titulo: string;
    excerpt: string;
    contenido: string;
    author: string;
    category: string;
    read_time: string;
    imagen_portada: string;
    is_featured: boolean;
}

interface EditBlogProps {
    onBack: () => void;
}

const EditBlog = ({ onBack }: EditBlogProps) => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/blog/get-all');
            const data = await response.json();
            if (data.status === 'success') {
                setBlogs(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBlog) return;

        try {
            const response = await fetch(`http://localhost/e-commerce/api/blog/update/${selectedBlog.id_blog}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(selectedBlog),
            });

            const data = await response.json();
            if (data.status === 'success') {
                alert('Blog actualizado exitosamente');
                setSelectedBlog(null);
                fetchBlogs();
            } else {
                alert(data.mensaje || 'Error al actualizar el blog');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el blog');
        }
    };

    if (selectedBlog) {
        return (
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Editar Blog</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            value={selectedBlog.titulo}
                            onChange={(e) => setSelectedBlog({...selectedBlog, titulo: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Extracto</label>
                        <textarea
                            value={selectedBlog.excerpt}
                            onChange={(e) => setSelectedBlog({...selectedBlog, excerpt: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contenido</label>
                        <textarea
                            value={selectedBlog.contenido}
                            onChange={(e) => setSelectedBlog({...selectedBlog, contenido: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows={6}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Autor</label>
                        <input
                            type="text"
                            value={selectedBlog.author}
                            onChange={(e) => setSelectedBlog({...selectedBlog, author: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoría</label>
                        <select
                            value={selectedBlog.category}
                            onChange={(e) => setSelectedBlog({...selectedBlog, category: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="Seguridad Industrial">Seguridad Industrial</option>
                            <option value="Normativas">Normativas</option>
                            <option value="EPP">EPP</option>
                            <option value="Consejos Laborales">Consejos Laborales</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiempo de lectura</label>
                        <input
                            type="text"
                            value={selectedBlog.read_time}
                            onChange={(e) => setSelectedBlog({...selectedBlog, read_time: e.target.value})}
                            placeholder="Ej: 5 min lectura"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL de la imagen</label>
                        <input
                            type="text"
                            value={selectedBlog.imagen_portada}
                            onChange={(e) => setSelectedBlog({...selectedBlog, imagen_portada: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedBlog.is_featured}
                            onChange={(e) => setSelectedBlog({...selectedBlog, is_featured: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">Destacar este blog</label>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setSelectedBlog(null)}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Actualizar Blog
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Editar Blog</h2>
            <div className="space-y-4">
                {blogs.map(blog => (
                    <div key={blog.id_blog} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                            <h3 className="font-semibold">{blog.titulo}</h3>
                            <p className="text-sm text-gray-600">{blog.excerpt}</p>
                        </div>
                        <button
                            onClick={() => setSelectedBlog(blog)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                            <FaEdit />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditBlog;