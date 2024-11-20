import React, { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { useRouter } from 'next/router';

const InternetIdentityLogin: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<string>('Not logged in');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setLoginStatus('Connecting to Internet Identity...');

      const authClient = await AuthClient.create();

      const handleAuthenticated = async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toString();
        console.log('Authentication successful. Principal:', principal);
        setLoginStatus(`Logged in with principal: ${principal}`);
        router.push('/dashboard');
      };

      await new Promise((resolve, reject) => {
        authClient.login({
          // Change this line to always use the IC identity provider
          identityProvider: 'https://identity.ic0.app', // This will redirect to ICP login page
          maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days in nanoseconds
          onSuccess: () => {
            handleAuthenticated();
            resolve(true);
          },
          onError: (error) => {
            console.error('Login failed:', error);
            setLoginStatus(`Login failed: ${error}`);
            reject(new Error(typeof error === 'string' ? error : 'Login failed'));
          },
        });
      });
    } catch (err) {
      console.error('Login failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setLoginStatus(`Login failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="mb-8 text-4xl font-bold">Welcome to LLM Marketplace</h1>

        <div className="flex flex-col items-center space-y-4">
          <button
            className={`rounded-lg px-6 py-3 font-semibold text-white ${
              loading ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } `}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Login with Internet Identity'}
          </button>

          {loginStatus && <p className="mt-4 text-gray-600">{loginStatus}</p>}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an Internet Identity?{' '}
            <a
              href="https://identity.ic0.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Create one here
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default InternetIdentityLogin;
