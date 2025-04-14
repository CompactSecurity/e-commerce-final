'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { useParams } from 'next/navigation';

interface BlogDetail {
    id_blog: number;
    titulo: string;
    contenido: string;
    excerpt: string;
    author: string;
    fecha_publicacion: string;
    category: string;
    read_time: string;
    imagen_portada: string;
}

export default function BlogPost() {
    const params = useParams();
    const [blog, setBlog] = useState<BlogDetail | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                const slug = params.slug;
                const response = await fetch(`http://localhost/e-commerce/api/blog/get-by-id/${slug}`);
                if (!response.ok) {
                    throw new Error('Blog no encontrado');
                }
                const data = await response.json();
                if (data.status === 'success') {
                    setBlog(data.data);
                } else {
                    throw new Error(data.mensaje || 'Error al cargar el blog');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError(error instanceof Error ? error.message : 'Error al cargar el blog');
            }
        };

        if (params.slug) {
            fetchBlogDetail();
        }
    }, [params.slug]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <article className="min-h-screen pt-16">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={blog.imagen_portada || '/placeholder-image.jpg'}
                    alt={blog.titulo}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.titulo}</h1>
                        <div className="flex items-center justify-center gap-6 text-sm">
                            <span className="flex items-center gap-2">
                                <Calendar size={16} />
                                {new Date(blog.fecha_publicacion).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2">
                                <User size={16} />
                                {blog.author}
                            </span>
                            <span>{blog.read_time}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blog.contenido }} />
                </div>
            </div>
        </article>
    );
}