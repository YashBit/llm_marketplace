import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { AuthClient } from '@dfinity/auth-client';
import { useRouter } from 'next/router';
import "../styles/global.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      
      const isAuth = await client.isAuthenticated();
      setIsAuthenticated(isAuth);

      // Redirect unauthenticated users to login
      if (!isAuth && router.pathname !== '/') {
        router.push('/');
      }
    };

    initAuth();
  }, [router]);

  return <Component {...pageProps} authClient={authClient} isAuthenticated={isAuthenticated} />;
};

export default App;
