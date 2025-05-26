'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface CartItem {
  id_producto: number;
  nombre: string;
  precio: number;
  precio_oferta: number | null;
  cantidad: number;
  stock: number;
  imagen_principal: string;
}

// Define a proper type for the product parameter
interface Product {
  id_producto: number;
  nombre: string;
  precio: number | string;
  precio_oferta: number | string | null;
  stock: number;
  imagen_principal: string;
  cotizable: number | string;
  agregable_carrito: number | string;
}

interface CartContextType {
  items: CartItem[];
  itemsCount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemsCount: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    if (Number(product.cotizable) === 1) {
      toast.error('Este producto es solo para cotización');
      return;
    }

    if (Number(product.agregable_carrito) !== 1) {
      toast.error('Este producto no está disponible para compra');
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id_producto === product.id_producto);

      if (existingItem) {
        const newQuantity = existingItem.cantidad + quantity;
        if (newQuantity > product.stock) {
          toast.error(`Solo hay ${product.stock} unidades disponibles`);
          return prevItems;
        }

        toast.success('Cantidad actualizada en el carrito');
        return prevItems.map(item =>
          item.id_producto === product.id_producto
            ? { ...item, cantidad: newQuantity }
            : item
        );
      }

      toast.success('Producto agregado al carrito');
      return [...prevItems, {
        id_producto: product.id_producto,
        nombre: product.nombre,
        precio: Number(product.precio),
        precio_oferta: product.precio_oferta ? Number(product.precio_oferta) : null,
        cantidad: quantity,
        stock: product.stock,
        imagen_principal: product.imagen_principal
      }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems(prev => prev.filter(item => item.id_producto !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems(prev => 
        prev.map(item => 
            item.id_producto === productId ? { ...item, cantidad: quantity } : item
        )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem('cart');
  }, []);

  const value = {
    items,
    itemsCount: items.reduce((total, item) => total + item.cantidad, 0),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
