'use client'
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

interface BlogPost {
    id_blog: number;
    titulo: string;
    excerpt: string;
    fecha_publicacion: string;
}

interface DeleteBlogProps {
    onBack: () => void;
}

const DeleteBlog = ({ onBack }: DeleteBlogProps) => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

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

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro de eliminar este blog?')) {
            try {
                const response = await fetch(`http://localhost/e-commerce/api/blog/delete/${id}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (data.status === 'success') {
                    setBlogs(blogs.filter(blog => blog.id_blog !== id));
                    alert('Blog eliminado exitosamente');
                } else {
                    alert(data.mensaje || 'Error al eliminar el blog');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el blog');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Eliminar Blog</h2>
            <div className="space-y-4">
                {blogs.map(blog => (
                    <div key={blog.id_blog} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                            <h3 className="font-semibold">{blog.titulo}</h3>
                            <p className="text-sm text-gray-600">{blog.excerpt}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(blog.fecha_publicacion).toLocaleDateString()}
                            </p>
                        </div>
                        <button
                            onClick={() => handleDelete(blog.id_blog)}
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

export default DeleteBlog;