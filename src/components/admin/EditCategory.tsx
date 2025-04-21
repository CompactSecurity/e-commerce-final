'use client'
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

interface Category {
  id_categoria: number;
  nombre: string;
  slug: string;
  descripcion: string;
  imagen?: string;
  estado: number;
}

interface EditCategoryProps {
  onBack: () => void;
}

const EditCategory = ({ onBack }: EditCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost/e-commerce/api/category/get-all');
      const data = await response.json();
      if (data.status === 'success') {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    try {
      const response = await fetch(`http://localhost/e-commerce/api/category/update/${selectedCategory.id_categoria}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(selectedCategory),
      });

      const data = await response.json();
      if (data.status === 'success') {
        alert('Categoría actualizada exitosamente');
        setSelectedCategory(null);
        fetchCategories();
      } else {
        alert(data.mensaje || 'Error al actualizar la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la categoría');
    }
  };

  if (selectedCategory) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Editar Categoría</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={selectedCategory.nombre}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, nombre: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              value={selectedCategory.slug}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, slug: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={selectedCategory.descripcion}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, descripcion: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">URL de imagen</label>
            <input
              type="text"
              value={selectedCategory.imagen || ''}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, imagen: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategory.estado === 1}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, estado: e.target.checked ? 1 : 0 })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label className="ml-2 block text-sm text-gray-900">Categoría activa</label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Actualizar Categoría
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Editar Categoría</h2>
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id_categoria} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div>
              <h3 className="font-semibold">{category.nombre}</h3>
              <p className="text-sm text-gray-600">{category.descripcion}</p>
            </div>
            <button
              onClick={() => setSelectedCategory(category)}
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

export default EditCategory;
