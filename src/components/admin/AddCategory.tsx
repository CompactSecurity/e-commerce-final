'use client'
import React, { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

interface AddCategoryProps {
  onBack: () => void;
}

const AddCategory = ({ onBack }: AddCategoryProps) => {
  const [categoryData, setCategoryData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre', categoryData.nombre);
      formData.append('descripcion', categoryData.descripcion);
      // Add slug to form data
      formData.append('slug', categoryData.nombre.toLowerCase().replace(/\s+/g, '-'));
      // Add estado (status) with default value 1
      formData.append('estado', '1');

      if (selectedFile) {
        formData.append('imagen', selectedFile);
      }

      const response = await fetch('http://localhost/e-commerce/api/category/create', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al crear la categoría');
      }

      const data = await response.json();
      if (data.status === 'success') {
        alert('Categoría creada exitosamente');
        onBack();
      } else {
        alert(data.mensaje || 'Error al crear la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error al conectar con el servidor');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Agregar Nueva Categoría</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={categoryData.nombre}
            onChange={(e) => setCategoryData({ ...categoryData, nombre: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={categoryData.nombre.toLowerCase().replace(/\s+/g, '-')}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={categoryData.descripcion}
            onChange={(e) => setCategoryData({ ...categoryData, descripcion: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Imagen</label>
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
            Crear Categoría
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
