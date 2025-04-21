'use client'
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Category {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  imagen?: string;
}

interface DeleteCategoryProps {
  onBack: () => void;
}

const DeleteCategory = ({ onBack }: DeleteCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

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

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
      try {
        const response = await fetch(`http://localhost/e-commerce/api/category/delete/${id}`, {
          method: 'POST', // o DELETE si tu backend lo soporta
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (data.status === 'success') {
          setCategories(categories.filter(category => category.id_categoria !== id));
          alert('Categoría eliminada exitosamente');
        } else {
          alert(data.mensaje || 'Error al eliminar la categoría');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la categoría');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Eliminar Categoría</h2>
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id_categoria} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div>
              <h3 className="font-semibold">{category.nombre}</h3>
              <p className="text-sm text-gray-600">{category.descripcion}</p>
            </div>
            <button
              onClick={() => handleDelete(category.id_categoria)}
              className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteCategory;
