import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/Home.module.css";
import InternetIdentityLogin from "../components/InternetIdentityLogin";
import { AuthClient } from '@dfinity/auth-client';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authClient = await AuthClient.create();
      const isAuthenticated = await authClient.isAuthenticated();
      
      if (isAuthenticated) {
        console.log("User is already authenticated, redirecting to dashboard...");
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className={styles.container}>
      <InternetIdentityLogin />
    </div>
  );
}
