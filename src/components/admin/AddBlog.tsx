'use client'
import React, { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

interface AddBlogProps {
    onBack: () => void;
}

const AddBlog = ({ onBack }: AddBlogProps) => {
    const [blogData, setBlogData] = useState({
        titulo: '',
        excerpt: '',
        contenido: '',
        author: '',
        category: '',
        read_time: '',
        imagen_portada: '',
        is_featured: false
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update the handleFileSelect function
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setBlogData(prev => ({
                ...prev,
                imagen_portada: `/e-commerce/api/uploads/blog/${file.name}`
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            
            Object.entries(blogData).forEach(([key, value]) => {
                if (key !== 'imagen_portada') {
                    formData.append(key, value.toString());
                }
            });

            if (selectedFile) {
                formData.append('imagen_portada', selectedFile);
                formData.append('upload_path', 'api/uploads/blog'); // Ruta actualizada
            }

            const response = await fetch('http://localhost/e-commerce/api/blog/create', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.status === 'success') {
                alert('Blog creado exitosamente');
                onBack();
            } else {
                alert(data.mensaje || 'Error al crear el blog');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    };

    // En la parte del render, actualizar el componente Image
    {previewUrl && (
        <div className="relative w-24 h-24">
            <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded"
                unoptimized
                loader={({ src }) => src.startsWith('blob') ? src : `http://localhost${src}`}
            />
        </div>
    )}
    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Agregar Nuevo Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        value={blogData.titulo}
                        onChange={(e) => setBlogData({...blogData, titulo: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Extracto</label>
                    <textarea
                        value={blogData.excerpt}
                        onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Contenido</label>
                    <textarea
                        value={blogData.contenido}
                        onChange={(e) => setBlogData({...blogData, contenido: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={6}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Autor</label>
                    <input
                        type="text"
                        value={blogData.author}
                        onChange={(e) => setBlogData({...blogData, author: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <select
                        value={blogData.category}
                        onChange={(e) => setBlogData({...blogData, category: e.target.value})}
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
                        value={blogData.read_time}
                        onChange={(e) => setBlogData({...blogData, read_time: e.target.value})}
                        placeholder="Ej: 5 min lectura"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Imagen de portada</label>
                    <div className="mt-1 flex items-center gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                        {previewUrl && (
                            <div className="relative w-24 h-24">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={blogData.is_featured}
                        onChange={(e) => setBlogData({...blogData, is_featured: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Destacar este blog</label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Crear Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;