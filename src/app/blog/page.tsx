'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {  Calendar, User, Plus, Trash, Edit } from 'lucide-react'
import imagee from '@/assets/carrousel1.png'
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


export default function Blog() {
  // Removed the unused selectedCategory state
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
    // Removed the matchesCategory check since we're not filtering by category anymore
    const matchesSearch = post.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })


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
    <div className="min-h-screen bg-gray-50 mt-16">
            {/* HeroSection */}
            <section className="relative bg-gray-900 text-white py-24">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent">
                    <div className="absolute inset-0 bg-black/50" />
                    <Image src={imagee} alt="Compact Seguridad y Construcción" fill className="object-cover opacity-40" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Nuestro Blog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Aqui encontraras todo lo relacionado con la seguridad industrial y el EPP. Todo lo que necesitas saber en un solo lugar.
                    </motion.p>
                </div>
            </section>
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
          {/* Add search and category filters to use the state setters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

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
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href = `/admin/blog/edit/${post.id_blog}`;
                                }}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                              >
                                <Edit size={20} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(post.id_blog);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash size={20} />
                              </button>
                            </div>
                          )}
                        </div>
                      </Link>
                      {/* Remove duplicate admin controls */}
                </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
