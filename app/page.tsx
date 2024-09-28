'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth', { withCredentials: true });
        if (res.data.auth) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return <div>Redirecting...</div>;
}
