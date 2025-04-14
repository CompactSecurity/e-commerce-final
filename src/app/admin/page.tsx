'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            if (userData.rol === 'admin') {
                setIsAdmin(true);
            } else {
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }, [router]);

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
            <AdminPanel />
        </div>
    );
}