'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, Calendar, User } from 'lucide-react'
import { StaticImageData } from 'next/image'
import epp01 from '@/assets/carrousel1.png'
import epp02 from '@/assets/carrousel2.png'
import { motion } from 'framer-motion'
interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  image: StaticImageData
  category: string
  readTime: string
  isFeatured?: boolean
}

const categories = ['Todos', 'Seguridad Industrial', 'Normativas', 'EPP', 'Consejos Laborales']

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Guía básica de EPP para nuevos trabajadores",
    excerpt: "Descubre qué equipos de protección personal son esenciales en distintos entornos laborales.",
    date: "Marzo 20, 2024",
    author: "Jose Edgardo",
    image: epp01,
    category: "EPP",
    readTime: "4 min lectura",
    isFeatured: true
  },
  {
    id: 2,
    title: "5 errores comunes al usar cascos de seguridad",
    excerpt: "Evita estos errores frecuentes y mantén tu seguridad en todo momento.",
    date: "Marzo 18, 2024",
    author: "Pedro Céspedes",
    image: epp02,
    category: "Seguridad Industrial",
    readTime: "5 min lectura"
  },
  {
    id: 3,
    title: "Nuevas normativas sobre protección ocular en 2025",
    excerpt: "Actualízate con las últimas regulaciones para el uso correcto de gafas y visores.",
    date: "Marzo 15, 2024",
    author: "José Edgardo",
    image: epp01,
    category: "Normativas",
    readTime: "6 min lectura"
  },
  {
    id: 4,
    title: "Consejos para un entorno de trabajo más seguro",
    excerpt: "Pequeñas acciones pueden generar grandes diferencias en seguridad laboral.",
    date: "Marzo 12, 2024",
    author: "Alex",
    image: epp02,
    category: "Consejos Laborales",
    readTime: "5 min lectura"
  },
  {
    id: 5,
    title: "Cómo elegir el calzado de seguridad adecuado",
    excerpt: "Conoce los tipos de calzado y cuál es el ideal según tu tipo de trabajo.",
    date: "Marzo 10, 2024",
    author: "Jose Edgardo",
    image: epp02,
    category: "EPP",
    readTime: "7 min lectura"
  },
  {
    id: 6,
    title: "Cómo elegir el calzado de seguridad adecuado",
    excerpt: "Conoce los tipos de calzado y cuál es el ideal según tu tipo de trabajo.",
    date: "Marzo 10, 2024",
    author: "Alex",
    image: epp01,
    category: "EPP",
    readTime: "7 min lectura"
  }


]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find(post => post.isFeatured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 mt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent">
                    <Image
                        src={epp01}
                        alt="Compact Seguridad y Construcción"
                        fill
                        className="object-cover opacity-40"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl"
                    >
                       Información actualizada sobre protección laboral, normativas, EPP y consejos para un entorno de trabajo seguro.
                    </motion.p>
                </div>
            </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Categories */}
        <div className="mb-12"> 
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Calendar size={16} />
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <User size={16} />
                      <span>{featuredPost.author}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
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
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
