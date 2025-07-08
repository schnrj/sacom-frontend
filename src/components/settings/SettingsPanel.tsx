import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Zap,
  Brain,
  Mic,
  Volume2,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  Save,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LLMProvider {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  models: string[];
  maxTokens: number;
  isDefault: boolean;
  pricing: string;
}

interface SettingsPanelProps {
  providers: LLMProvider[];
  selectedProvider: string;
  selectedModel: string;
  temperature: number;
  maxTokens: number;
  isAutoSave: boolean;
  isSpeechEnabled: boolean;
  isAudioEnabled: boolean;
  onProviderChange: (providerId: string) => void;
  onModelChange: (model: string) => void;
  onTemperatureChange: (temperature: number) => void;
  onMaxTokensChange: (maxTokens: number) => void;
  onAutoSaveToggle: (enabled: boolean) => void;
  onSpeechToggle: (enabled: boolean) => void;
  onAudioToggle: (enabled: boolean) => void;
  onSaveSettings: () => void;
  onResetSettings: () => void;
  onTestConnection: (providerId: string) => void;
  isLoading: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  providers,
  selectedProvider,
  selectedModel,
  temperature,
  maxTokens,
  isAutoSave,
  isSpeechEnabled,
  isAudioEnabled,
  onProviderChange,
  onModelChange,
  onTemperatureChange,
  onMaxTokensChange,
  onAutoSaveToggle,
  onSpeechToggle,
  onAudioToggle,
  onSaveSettings,
  onResetSettings,
  onTestConnection,
  isLoading
}) => {
  const [activeTab, setActiveTab] = useState('llm');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'success';
      case 'error':
        return 'destructive';
      default:
        return 'warning';
    }
  };

  const selectedProviderData = providers.find(p => p.id === selectedProvider);

  return (
    <Card className="w-full max-w-2xl bg-gradient-surface border-card-border shadow-xl">
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure LLM providers and system preferences
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetSettings}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSaveSettings}
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 m-6 mb-0">
          <TabsTrigger value="llm" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            LLM
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        <div className="p-6 pt-4">
          <TabsContent value="llm" className="space-y-6">
            {/* Provider Selection */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">LLM Provider</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose your preferred AI model provider
                </p>
              </div>
              
              <div className="grid gap-3">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className={cn(
                      "p-4 rounded-lg border border-card-border cursor-pointer transition-smooth",
                      provider.id === selectedProvider
                        ? "bg-primary-light border-primary"
                        : "bg-surface hover:bg-surface-elevated"
                    )}
                    onClick={() => onProviderChange(provider.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(provider.status)}
                          <span className="font-medium text-foreground">
                            {provider.name}
                          </span>
                        </div>
                        {provider.isDefault && (
                          <Badge variant="accent" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(provider.status) as any} className="text-xs">
                          {provider.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTestConnection(provider.id);
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Zap className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      {provider.models.length} models • {provider.pricing}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Selection */}
            {selectedProviderData && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Model</Label>
                <Select value={selectedModel} onValueChange={onModelChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProviderData.models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Temperature */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Temperature</Label>
                <Badge variant="outline" className="text-xs">
                  {temperature}
                </Badge>
              </div>
              <Slider
                value={[temperature]}
                onValueChange={(value) => onTemperatureChange(value[0])}
                min={0}
                max={2}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Creative</span>
              </div>
            </div>

            {/* Max Tokens */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Max Tokens</Label>
                <Badge variant="outline" className="text-xs">
                  {maxTokens}
                </Badge>
              </div>
              <Slider
                value={[maxTokens]}
                onValueChange={(value) => onMaxTokensChange(value[0])}
                min={100}
                max={selectedProviderData?.maxTokens || 4000}
                step={100}
                className="w-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6">
            {/* Speech Recognition */}
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-card-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Mic className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Speech Recognition</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable voice input for messages
                  </p>
                </div>
              </div>
              <Switch
                checked={isSpeechEnabled}
                onCheckedChange={onSpeechToggle}
              />
            </div>

            {/* Audio Playback */}
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-card-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Audio Playback</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable text-to-speech for AI responses
                  </p>
                </div>
              </div>
              <Switch
                checked={isAudioEnabled}
                onCheckedChange={onAudioToggle}
              />
            </div>

            {/* Audio Settings Info */}
            <div className="p-4 bg-warning-muted rounded-lg border border-warning">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning-foreground">
                    Audio Features
                  </p>
                  <p className="text-warning-foreground/80 mt-1">
                    Audio features require microphone and speaker permissions. 
                    These will be requested when you first use voice features.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            {/* Auto Save */}
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-card-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Save className="h-5 w-5 text-success-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Auto Save</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically save conversations and settings
                  </p>
                </div>
              </div>
              <Switch
                checked={isAutoSave}
                onCheckedChange={onAutoSaveToggle}
              />
            </div>

            {/* System Info */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">System Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-surface rounded-lg border border-card-border">
                  <div className="text-sm font-medium text-foreground">Version</div>
                  <div className="text-sm text-muted-foreground">v1.0.0</div>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-card-border">
                  <div className="text-sm font-medium text-foreground">Backend</div>
                  <div className="text-sm text-muted-foreground">Django API</div>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-card-border">
                  <div className="text-sm font-medium text-foreground">WebSocket</div>
                  <div className="text-sm text-muted-foreground">Connected</div>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-card-border">
                  <div className="text-sm font-medium text-foreground">Session</div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};