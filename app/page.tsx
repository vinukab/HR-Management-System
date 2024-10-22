'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const cookies = document.cookie.split('; ');
            const hasToken = cookies.some(cookie => cookie.startsWith('user='));

            if (!hasToken) {
                router.push('/login'); 
            } else {
                router.push('/dashboard'); 
            }
        };

        checkAuth();
    }, [router]);

    return <div>Redirecting...</div>;
}
