import React, { useState } from 'react';

type IdentityType = 'email' | 'phone';

const InternetIdentityLogin: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<string>("Not logged in");
  const [iiUrl, setIiUrl] = useState<string>("https://identity.ic0.app");
  const [identity, setIdentity] = useState<string>("");
  const [identityType, setIdentityType] = useState<IdentityType>('email');
  const [principal, setPrincipal] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!identity) {
        throw new Error("Identity is required");
      }

      // Simulate generating a principal after successful authentication
      const mockPrincipal = 'w3gps-vyaaa-aaaaa-aaaan-cai';
      setPrincipal(mockPrincipal);
      
      setLoginStatus(`Logged in successfully with ${identityType}: ${identity}`);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginStatus(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setPrincipal(null);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Internet Identity Demo Webapp</h1>
      <section className="mb-4">
        <label htmlFor="iiUrl" className="block mb-2">Internet Identity URL:</label>
        <input
          className="w-full p-2 border rounded"
          id="iiUrl"
          type="text"
          value={iiUrl}
          onChange={(e) => setIiUrl(e.target.value)}
        />
      </section>
      <section className="mb-4">
        <label htmlFor="identityType" className="block mb-2">Identity Type:</label>
        <select
          className="w-full p-2 border rounded"
          id="identityType"
          value={identityType}
          onChange={(e) => setIdentityType(e.target.value as IdentityType)}
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </section>
      <section className="mb-4">
        <label htmlFor="identity" className="block mb-2">Identity:</label>
        <input
          className="w-full p-2 border rounded"
          id="identity"
          type="text"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder={identityType === 'email' ? 'user@example.com' : '+1234567890'}
        />
      </section>
      <section className="mb-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login with Internet Identity
        </button>
      </section>
      <section>
        <p className="text-lg">{loginStatus}</p>
        {principal && (
          <p className="text-lg mt-2">Your principal: {principal}</p>
        )}
      </section>
    </main>
  );
};

export default InternetIdentityLogin;