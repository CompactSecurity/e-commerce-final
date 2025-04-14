'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, Calendar, User, Plus, Trash, Edit } from 'lucide-react'
import { StaticImageData } from 'next/image'
import epp01 from '@/assets/carrousel1.png'
import epp02 from '@/assets/carrousel2.png'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface BlogPost {
  id_blog: number
  titulo: string
  excerpt: string
  fecha_publicacion: string
  author: string
  imagen_portada: string
  category: string
  read_time: string
  is_featured: boolean
}

const categories = ['Todos', 'Seguridad Industrial', 'Normativas', 'EPP', 'Consejos Laborales']

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const response = await fetch('http://localhost/e-commerce/api/auth/check-session', {
          credentials: 'include'
        });
        const data = await response.json();
        setIsAdmin(data.rol === 'admin');
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    // Fetch blog posts
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost/e-commerce/api/blog/get-all');
        const data = await response.json();
        if (data.status === 'success') {
          setBlogPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    checkAdmin();
    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory
    const matchesSearch = post.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find(post => post.is_featured)

  // Admin Controls
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este blog?')) {
      try {
        const response = await fetch(`http://localhost/e-commerce/api/blog/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        const data = await response.json();
        if (data.status === 'success') {
          setBlogPosts(blogPosts.filter(post => post.id_blog !== id));
          alert('Blog eliminado exitosamente');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el blog');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-17">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center ">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Nuestro Blog</h1>
          <p className="text-lg text-gray-600">Descubre las últimas noticias y actualizaciones de nuestra empresa.</p>
        </div>
      </div>
        {/* Featured Post */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Admin Controls */}
        {isAdmin && (
          <div className="mb-8 flex gap-4">
            <button
              onClick={() => window.location.href = '/admin/blog/add'}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Nuevo Blog
            </button>
          </div>
        )}

        {/* Search and Categories */}
        <div className="mb-12">
          {/* ... existing search and categories code ... */}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id_blog} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link href={`/blog/${post.id_blog}`} className="block" onClick={(e) => e.stopPropagation()}>
                    <div className="relative h-48">
                        <Image
                            src={post.imagen_portada || '/placeholder-image.jpg'}
                            alt={post.titulo}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {post.category}
                            </span>
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              <Calendar size={16} />
                              {new Date(post.fecha_publicacion).toLocaleDateString()}
                            </span>
                          </div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.titulo}</h2>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <User size={16} />
                              <span>{post.author}</span>
                            </div>
                            <span>{post.read_time}</span>
                          </div>
                          
                          {/* Admin Controls for each post */}
                          {isAdmin && (
                            <div className="mt-4 flex gap-2 justify-end">
                              <button
                                onClick={() => window.location.href = `/admin/blog/edit/${post.id_blog}`}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                              >
                                <Edit size={20} />
                              </button>
                              <button
                                onClick={() => handleDelete(post.id_blog)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash size={20} />
                              </button>
                            </div>
                          )}
                        </div>
                      </Link>
                      {/* Admin controls remain outside the link */}
                      {isAdmin && (
                          <div className="p-6 pt-0 flex gap-2 justify-end">
                              {/* ... admin controls ... */}
                          </div>
                      )}
                </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
