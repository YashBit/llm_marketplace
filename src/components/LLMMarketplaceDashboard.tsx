import React, {useState, useEffect, useCallback} from 'react';
import {Actor, HttpAgent, Identity} from "@dfinity/agent";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from "@/components/ui/select";
import {
    BarChart,
    Download,
    Upload,
    UserCircle,
    DollarSign,
    Users,
    CreditCard,
    Activity,
    Loader2
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { idlFactory } from '../declarations/model_storage/model_storage.did.js';
import type { _SERVICE as ModelStorageService } from '../declarations/model_storage/model_storage.did';

interface LLMMarketplaceDashboardProps {
  authClient: any;
  identity: Identity;
}

const LLMMarketplaceDashboard: React.FC<LLMMarketplaceDashboardProps> = ({ 
  authClient, 
  identity 
}) => {
  const [modelNames, setModelNames] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);

  // Stats data
  const stats = {
    totalRevenue: 45231.89,
    subscriptions: 2350,
    sales: 12234,
    activeNow: 573,
  };

  const initActor = useCallback(async () => {
    try {
      const agent = new HttpAgent({
        host: process.env.NEXT_PUBLIC_IC_HOST || 'http://localhost:4943',
        identity
      });

      if(process.env.NODE_ENV !== 'production') {
        await agent.fetchRootKey();
      }

      const actor = Actor.createActor<ModelStorageService>(
        idlFactory,
        {
          agent,
          canisterId: process.env.NEXT_PUBLIC_MODEL_STORAGE_CANISTER_ID!,
        }
      );

      return actor;
    } catch (err) {
      console.error('Failed to initialize actor:', err);
      throw err;
    }
  }, [identity]);

  const fetchModelNames = useCallback(async () => {
    try {
      const actor = await initActor();
      const names = await actor.get_model_names();
      setModelNames(names);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch model names';
      setError(errorMessage);
      console.error('Fetch error:', err);
    }
  }, [initActor]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;

    try {
      setLoading(true);
      setError(null);
      const buffer = await uploadFile.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      
      const actor = await initActor();
      const result = await actor.store_model(
        uploadFile.name,
        Array.from(uint8Array),
        JSON.stringify({
          name: uploadFile.name,
          size: uploadFile.size,
          type: uploadFile.type,
          uploadDate: new Date().toISOString()
        })
      );

      if ('Err' in result) {
        throw new Error(typeof result.Err === 'string' ? result.Err : 'Upload failed');
      }

      await fetchModelNames();
      setUploadFile(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload model';
      setError(errorMessage);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (modelName: string) => {
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">LLM Marketplace</h1>
        
        <div className="flex items-center gap-2">
          <UserCircle className="w-4 h-4" />
          <span className="text-sm font-medium">
            {principal ? `Principal: ${principal.slice(0, 10)}...` : 'Not connected'}
          </span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.subscriptions}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.sales}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.activeNow}</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input 
                type="file" 
                onChange={handleFileUpload}
                disabled={loading}
              />
              <Button 
                className="w-full" 
                disabled={!uploadFile || loading}
                onClick={handleUpload}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                Upload Model
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle>Download Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {modelNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                className="w-full"
                disabled={!selectedModel || loading}
                onClick={() => handleDownload(selectedModel)}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
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