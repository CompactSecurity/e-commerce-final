'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function CartPage() {
    return (
        <>
            <Navbar />
            <main className="pt-[50px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Cart />
                </div>
            </main>
            <Footer />
        </>
    );
}