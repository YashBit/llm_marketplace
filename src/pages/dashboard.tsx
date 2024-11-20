// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthClient } from '@dfinity/auth-client';
import { Identity } from '@dfinity/agent';
import LLMMarketplaceDashboard from '../components/LLMMarketplaceDashboard';

interface DashboardProps {
  authClient?: AuthClient;
  identity?: Identity;
}

const DashboardPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);

        const isAuth = await client.isAuthenticated();
        console.log('Dashboard auth check:', isAuth);

        if (!isAuth) {
          console.log('User not authenticated, redirecting to login...');
          router.push('/');
          return;
        }

        setIsAuthenticated(true);
        setIdentity(client.getIdentity());
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/');
      }
    };

    initAuth();
  }, [router]);

  if (!isAuthenticated || !authClient || !identity) {
    return <div>Loading...</div>;
  }

  return <LLMMarketplaceDashboard authClient={authClient} identity={identity} />;
};

export default DashboardPage;
