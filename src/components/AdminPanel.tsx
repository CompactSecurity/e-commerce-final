'use client'
import React, { useState } from 'react';
import { FaUserPlus, FaUserMinus, FaUserEdit, FaArrowLeft, FaBlog, FaFolderMinus, FaFolderPlus, FaFolder } from 'react-icons/fa';
import { AiOutlineProduct, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete, AiFillProduct } from "react-icons/ai";
import AddAdmin from './admin/AddAdmin';
import DeleteAdmin from './admin/DeleteAdmin';
import EditAdmin from './admin/EditAdmin';
import AddBlog from './admin/AddBlog';
import DeleteBlog from './admin/DeleteBlog';
import EditBlog from './admin/EditBlog';
import AddCategory from './admin/AddCategory';
import DeleteCategory from './admin/DeleteCategory';
import EditCategory from './admin/EditCategory';
import AddMarca from './admin/AddMarca';
import DeleteMarca from './admin/DeleteMarca';
import EditMarca from './admin/EditMarca';
import AddProduct from './admin/AddProduct';
import DeleteProduct from './admin/DeleteProduct';
import EditProduct from './admin/EditProduct';
import ViewPedidos from './admin/ViewPedidos';

const AdminPanel = () => {
    const [currentView, setCurrentView] = useState<string>('main');

    const renderView = () => {
        switch(currentView) {
            case 'add':
                return <AddAdmin onBack={() => setCurrentView('main')} />;
            case 'delete':
                return <DeleteAdmin onBack={() => setCurrentView('main')} />;
            case 'edit':
                return <EditAdmin onBack={() => setCurrentView('main')} />;
            case 'add-blog':
                return <AddBlog onBack={() => setCurrentView('main')} />;
            case 'delete-blog':
                return <DeleteBlog onBack={() => setCurrentView('main')} />;
            case 'edit-blog':
                return <EditBlog onBack={() => setCurrentView('main')} />;
            case 'add-category':
                return <AddCategory onBack={() => setCurrentView('main')} />;
            case 'delete-category':
                return <DeleteCategory onBack={() => setCurrentView('main')} />;
            case 'edit-category':
                return <EditCategory onBack={() => setCurrentView('main')} />;
            case 'add-marca':
                return <AddMarca onBack={() => setCurrentView('main')} />;
            case 'delete-marca':
                return <DeleteMarca onBack={() => setCurrentView('main')} />;
            case 'edit-marca':
                return <EditMarca onBack={() => setCurrentView('main')} />;
            case 'add-product':
                return <AddProduct onBack={() => setCurrentView('main')} />;
            case 'delete-product':
                return <DeleteProduct onBack={() => setCurrentView('main')} />;
            case 'edit-product':
                return <EditProduct onBack={() => setCurrentView('main')} />;
            case 'view-pedidos':
                return <ViewPedidos onBack={() => setCurrentView('main')} />;
            default:
                return (
                    <div className="space-y-10">
                        {/* Sección de Administradores */}
                        <div className="border-b pb-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                                Gestión de Administradores
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button
                                    onClick={() => setCurrentView('add')}
                                    className="p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaUserPlus className="text-4xl text-blue-600" />
                                    <span className="text-lg font-medium text-blue-800">Agregar Administrador</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('delete')}
                                    className="p-6 bg-red-100 rounded-lg hover:bg-red-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaUserMinus className="text-4xl text-red-600" />
                                    <span className="text-lg font-medium text-red-800">Eliminar Administrador</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('edit')}
                                    className="p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaUserEdit className="text-4xl text-green-600" />
                                    <span className="text-lg font-medium text-green-800">Editar Administrador</span>
                                </button>
                            </div>
                        </div>

                        {/* Sección de Blogs */}
                        <div className="border-b pb-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-purple-500 pl-3">
                                Gestión de Blogs
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button
                                    onClick={() => setCurrentView('add-blog')}
                                    className="p-6 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaBlog className="text-4xl text-purple-600" />
                                    <span className="text-lg font-medium text-purple-800">Agregar Blog</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('delete-blog')}
                                    className="p-6 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaBlog className="text-4xl text-orange-600" />
                                    <span className="text-lg font-medium text-orange-800">Eliminar Blog</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('edit-blog')}
                                    className="p-6 bg-teal-100 rounded-lg hover:bg-teal-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaBlog className="text-4xl text-teal-600" />
                                    <span className="text-lg font-medium text-teal-800">Editar Blog</span>
                                </button>
                            </div>
                        </div>

                        {/* Sección de Categorías */}
                        <div className="border-b pb-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-indigo-500 pl-3">
                                Gestión de Categorías
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button
                                    onClick={() => setCurrentView('add-category')}
                                    className="p-6 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaFolderPlus className="text-4xl text-indigo-600" />
                                    <span className="text-lg font-medium text-indigo-800">Agregar Categoría</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('delete-category')}
                                    className="p-6 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaFolderMinus className="text-4xl text-pink-600" />
                                    <span className="text-lg font-medium text-pink-800">Eliminar Categoría</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('edit-category')}
                                    className="p-6 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <FaFolder className="text-4xl text-yellow-600" />
                                    <span className="text-lg font-medium text-yellow-800">Editar Categoría</span>
                                </button>
                            </div>
                        </div>

                        {/* Sección de Marcas */}
                        <div className="border-b pb-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-gray-500 pl-3">
                                Gestión de Marcas
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button
                                    onClick={() => setCurrentView('add-marca')}
                                    className="p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <AiFillProduct className="text-4xl text-gray-600" />
                                    <span className="text-lg font-medium text-gray-800">Agregar Marca</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('delete-marca')}
                                    className="p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <AiFillDelete className="text-4xl text-gray-600" />
                                    <span className="text-lg font-medium text-gray-800">Eliminar Marca</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('edit-marca')}
                                    className="p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <AiOutlineEdit className="text-4xl text-gray-600" />
                                    <span className="text-lg font-medium text-gray-800">Editar Marca</span>
                                </button>
                            </div>
                        </div>

                        {/* Sección de Productos */}
                        <div className="border-b pb-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-green-500 pl-3">
                                Gestión de Productos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button
                                    onClick={() => setCurrentView('add-product')}
                                    className="p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <AiOutlineProduct className="text-4xl text-green-600" />
                                    <span className="text-lg font-medium text-green-800">Agregar Producto</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('delete-product')}
                                    className="p-6 bg-red-100 rounded-lg hover:bg-red-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <AiOutlineDelete className="text-4xl text-red-600" />
                                    <span className="text-lg font-medium text-red-800">Eliminar Producto</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('edit-product')}
                                    className="p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <AiOutlineEdit className="text-4xl text-blue-600" />
                                    <span className="text-lg font-medium text-blue-800">Editar Producto</span>
                                </button>
                            </div>
                        </div>

                        {/* Sección de Pedidos */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-orange-500 pl-3">
                                Gestión de Pedidos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button 
                                    onClick={() => setCurrentView('view-pedidos')}
                                    className="p-6 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors flex flex-col items-center gap-4 cursor-pointer">
                                    <FaUserEdit className="text-4xl text-orange-600" />
                                    <span className="text-lg font-medium text-orange-800">Ver pedidos</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="p-6">
            {currentView !== 'main' && (
                <button
                    onClick={() => setCurrentView('main')}
                    className="mb-6 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                    <FaArrowLeft className="mr-2 cursor-pointer" /> Volver al Panel
                </button>
            )}
            {renderView()}
        </div>
    );
};

export default AdminPanel;