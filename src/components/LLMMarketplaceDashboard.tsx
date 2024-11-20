import React, { useState, useEffect, useCallback } from 'react';
import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Download,
  Upload,
  UserCircle,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Loader2,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { idlFactory } from '../declarations/model_storage/model_storage.did.js';
import type { _SERVICE as ModelStorageService } from '../declarations/model_storage/model_storage.did';
import { Principal } from '@dfinity/principal';

interface LLMMarketplaceDashboardProps {
  authClient: any;
  identity: Identity;
}

const LLMMarketplaceDashboard: React.FC<LLMMarketplaceDashboardProps> = ({
  authClient,
  identity,
}) => {
  const [modelNames, setModelNames] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [isIIAuthenticated, setIsIIAuthenticated] = useState(false);

  // Stats data
  const stats = {
    totalRevenue: 45231.89,
    subscriptions: 2350,
    sales: 12234,
    activeNow: 573,
  };

  // Only showing the parts that need to change - the rest remains the same

  const initActor = useCallback(async () => {
    try {
      const dfxPrincipal = Principal.fromText("kjtnb-vg5m7-zzbdk-v44p2-m6q3l-vqqhp-kxwhm-ji6ue-jadvn-bflay-tae");
      const host = process.env.NEXT_PUBLIC_IC_HOST;
      const canisterId = process.env.NEXT_PUBLIC_MODEL_STORAGE_CANISTER_ID;
  
      if (!host || !canisterId) {
        throw new Error('Missing environment variables');
      }
  
      console.log('Initializing actor with dfx principal:', dfxPrincipal.toString());
  
      const agent = new HttpAgent({
        host,
        identity: {
          getPrincipal: () => dfxPrincipal,
          transformRequest: async (request: any) => {
            // Create a base request structure
            const baseRequest = {
              ...request,
              sender: dfxPrincipal,
              ingress_expiry: new Date().getTime() + 5 * 60 * 1000, // 5 minutes from now
            };
  
            // If it's a query request
            if (request.methodName === 'query') {
              return {
                ...baseRequest,
                body: {
                  request_type: "query",
                  canister_id: request.canisterId,
                  method_name: request.methodName,
                  arg: request.arg || new Uint8Array(),
                  sender: dfxPrincipal.toUint8Array(),
                  ingress_expiry: BigInt(baseRequest.ingress_expiry)
                }
              };
            }
  
            // If it's a call request
            return {
              ...baseRequest,
              body: {
                request_type: "call",
                canister_id: request.canisterId,
                method_name: request.methodName,
                arg: request.arg || new Uint8Array(),
                sender: dfxPrincipal.toUint8Array()
              }
            };
          }
        }
      });
  
      if (process.env.NEXT_PUBLIC_DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey().catch(e => {
          console.error('Failed to fetch root key:', e);
          throw new Error('Failed to fetch root key. Is the local replica running?');
        });
      }
  
      const canisterPrincipal = Principal.fromText(canisterId);
  
      const actor = Actor.createActor<ModelStorageService>(
        idlFactory,
        {
          agent,
          canisterId: canisterPrincipal,
          effectiveCanisterId: canisterPrincipal
        }
      );
  
      // Test the connection with better error handling
      try {
        console.log('Testing actor connection...');
        const result = await actor.get_model_names();
        console.log('Connection test successful:', result);
      } catch (e) {
        console.error('Actor test failed with detailed error:', {
          error: e,
          message: e instanceof Error ? e.message : 'Unknown error',
          stack: e instanceof Error ? e.stack : undefined
        });
        throw e;
      }
  
      return actor;
    } catch (err) {
      console.error('Actor initialization failed:', err);
      throw err;
    }
  }, []);

  // Add this function to validate authentication
  const validateAuthentication = useCallback(() => {
    if (!isIIAuthenticated) {
      setError('Please authenticate with Internet Identity first');
      return false;
    }
    return true;
  }, [isIIAuthenticated]);

  // Modify handleUpload to use validation
  const handleUpload = async () => {
    if (!validateAuthentication()) return;
    if (!uploadFile) return;

    try {
      setLoading(true);
      setError(null);

      const actor = await initActor();
      const buffer = await uploadFile.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);

      const metadata = {
        name: uploadFile.name,
        size: uploadFile.size,
        type: uploadFile.type,
        uploadDate: new Date().toISOString(),
      };

      console.log('Sending upload request:', {
        method: 'store_model',
        fileName: uploadFile.name,
        fileSize: uploadFile.size,
        metadataSize: JSON.stringify(metadata).length,
        dataSize: uint8Array.length,
      });

      const result = await actor.store_model(
        uploadFile.name,
        Array.from(uint8Array),
        JSON.stringify(metadata)
      );

      console.log('Upload response:', result);

      if ('Err' in result) {
        throw new Error(typeof result.Err === 'string' ? result.Err : 'Upload failed');
      }

      await fetchModelNames();
      setUploadFile(null);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload model');
    } finally {
      setLoading(false);
    }
  };

  // Modify handleDownload similarly
  const handleDownload = async (modelName: string) => {
    if (!validateAuthentication()) return;

    try {
      setLoading(true);
      setError(null);

      const actor = await initActor();
      const result = await actor.get_model_weights(modelName);

      if ('Ok' in result) {
        const blob = new Blob([new Uint8Array(result.Ok)]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = modelName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        throw new Error(typeof result.Err === 'string' ? result.Err : 'Download failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download model';
      setError(errorMessage);
      console.error('Download error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!identity) {
      console.error('No identity available');
      setError('Not authenticated');
      return;
    }

    console.log('Current principal:', identity.getPrincipal().toString());
  }, [identity]);

  useEffect(() => {
    if (identity) {
      setIsIIAuthenticated(true);
      console.log('II Identity authenticated:', identity.getPrincipal().toString());
    } else {
      setIsIIAuthenticated(false);
    }
  }, [identity]);

  // Add this debug effect
  useEffect(() => {
    const checkSetup = async () => {
      if (!identity) return;

      try {
        console.log('Environment check:', {
          host: process.env.NEXT_PUBLIC_IC_HOST,
          canisterId: process.env.NEXT_PUBLIC_MODEL_STORAGE_CANISTER_ID,
          network: process.env.NEXT_PUBLIC_DFX_NETWORK,
          principal: identity.getPrincipal().toString(),
        });

        const agent = new HttpAgent({
          host: process.env.NEXT_PUBLIC_IC_HOST,
          identity,
        });

        if (process.env.NEXT_PUBLIC_DFX_NETWORK !== 'ic') {
          await agent.fetchRootKey();
        }

        console.log('Agent setup successful');
      } catch (e) {
        console.error('Setup check failed:', e);
      }
    };

    checkSetup();
  }, [identity]);

  // useEffect(() => {
  //   if (identity) {
  //     checkCanisterAccess();
  //   }
  // }, [identity, checkCanisterAccess]);

  const fetchModelNames = useCallback(async () => {
    try {
      console.log('Fetching model names...');
      const actor = await initActor();

      // Explicitly handle the CBOR response
      const response = await actor.get_model_names();
      console.log('Raw response:', response);

      setModelNames(response);
      setError(null);
    } catch (err) {
      console.error('Error fetching model names:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch model names');
    }
  }, [initActor]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setError(null);
    }
  };

  // Set principal on mount
  useEffect(() => {
    if (identity) {
      setPrincipal(identity.getPrincipal().toString());
    }
  }, [identity]);

  // Fetch model names when identity is available
  useEffect(() => {
    if (identity) {
      fetchModelNames();
    }
  }, [identity, fetchModelNames]);

  useEffect(() => {
    if (identity) {
      const principal = identity.getPrincipal().toString();
      console.log('Frontend identity principal:', principal);
      console.log('Canister controllers:', {
        canisterId: process.env.NEXT_PUBLIC_MODEL_STORAGE_CANISTER_ID,
        myPrincipal: principal,
      });
    }
  }, [identity]);

  // Add near your other useEffects
  useEffect(() => {
    const checkAuth = async () => {
      if (authClient) {
        const isAuth = await authClient.isAuthenticated();
        console.log('Is authenticated:', isAuth);
        if (identity) {
          console.log('Principal:', identity.getPrincipal().toString());
        }
      }
    };

    checkAuth();
  }, [authClient, identity]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 bg-background p-6 text-foreground">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">LLM Marketplace</h1>

        <div className="flex items-center gap-2 text-muted-foreground">
          <UserCircle className="h-4 w-4" />
          <span className="text-sm font-medium">
            {principal ? `Principal: ${principal.slice(0, 10)}...` : 'Not connected'}
          </span>
        </div>
      </div>

      {/* Stats Grid - Use different background colors for each card */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card transition-colors hover:bg-accent/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">${stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card transition-colors hover:bg-accent/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">+{stats.subscriptions}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card transition-colors hover:bg-accent/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">+{stats.sales}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card transition-colors hover:bg-accent/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">+{stats.activeNow}</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Upload and Download Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Upload Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="file"
                onChange={handleFileUpload}
                disabled={loading}
                className="text-input-foreground bg-input"
              />
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!uploadFile || loading}
                onClick={handleUpload}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Upload Model
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Download Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="text-input-foreground bg-input">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  {modelNames.map((name) => (
                    <SelectItem
                      key={name}
                      value={name}
                      className="hover:bg-accent hover:text-accent-foreground"
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!selectedModel || loading}
                onClick={() => handleDownload(selectedModel)}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Download Model
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LLMMarketplaceDashboard;
