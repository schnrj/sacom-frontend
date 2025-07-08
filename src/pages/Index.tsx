import React, { useState } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { DomainSelector } from '@/components/domain/DomainSelector';
import { ResponseTypeSelector } from '@/components/response/ResponseTypeSelector';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { PluginSection } from '@/components/plugins/PluginSection';
import { ContextPreview } from '@/components/context/ContextPreview';
import { HelpModal } from '@/components/help/HelpModal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockDomains = [
  { id: 'biblical', name: 'Biblical Texts', description: 'Religious texts and interpretations', icon: null, isActive: true, documentCount: 1250, lastUpdated: new Date() },
  { id: 'buddhist', name: 'Buddhist Teachings', description: 'Buddhist philosophy and practices', icon: null, isActive: false, documentCount: 890, lastUpdated: new Date() },
  { id: 'self-help', name: 'Self-Help', description: 'Personal development content', icon: null, isActive: false, documentCount: 340, lastUpdated: new Date() },
  { id: 'therapeutic', name: 'Therapeutic Dialogue', description: 'Mental health resources', icon: null, isActive: false, documentCount: 567, lastUpdated: new Date() }
];

const mockResponseTypes = [
  { id: 'daily-guidance', name: 'Daily Guidance', description: 'Inspirational quotes and daily wisdom', icon: null, color: 'blue', isRecommended: true, estimatedResponseTime: '2-3 sec', features: ['Inspirational', 'Brief', 'Uplifting'] },
  { id: 'interpretation', name: 'Interpretation', description: 'Deep analysis and explanation', icon: null, color: 'purple', estimatedResponseTime: '5-8 sec', features: ['Detailed', 'Analytical', 'Educational'] },
  { id: 'conversation', name: 'Conversation', description: 'Natural dialogue and discussion', icon: null, color: 'green', estimatedResponseTime: '3-5 sec', features: ['Interactive', 'Engaging', 'Personalized'] },
  { id: 'therapeutic', name: 'Therapeutic Dialogue', description: 'Supportive and healing conversations', icon: null, color: 'orange', estimatedResponseTime: '4-6 sec', features: ['Supportive', 'Healing', 'Empathetic'] }
];

const mockProviders = [
  { id: 'openai', name: 'OpenAI', status: 'connected' as const, models: ['gpt-4', 'gpt-3.5-turbo'], maxTokens: 4000, isDefault: true, pricing: '$0.002/1K tokens' },
  { id: 'anthropic', name: 'Anthropic', status: 'disconnected' as const, models: ['claude-3', 'claude-2'], maxTokens: 8000, isDefault: false, pricing: '$0.008/1K tokens' },
  { id: 'google', name: 'Google', status: 'error' as const, models: ['gemini-pro'], maxTokens: 2000, isDefault: false, pricing: '$0.001/1K tokens' }
];

const mockPlugins = [
  { id: 'search', name: 'Web Search', description: 'Search the web for additional context', version: '1.0.0', author: 'LLM Team', category: 'integration', icon: null, isActive: true, isInstalled: true, rating: 4.5, downloads: 1200, lastUpdated: new Date(), features: ['Real-time', 'Filtered'], isOfficial: true, configurable: true },
  { id: 'calendar', name: 'Calendar Integration', description: 'Schedule and manage appointments', version: '1.2.0', author: 'Community', category: 'productivity', icon: null, isActive: false, isInstalled: true, rating: 4.2, downloads: 890, lastUpdated: new Date(), features: ['Scheduling', 'Reminders'], isOfficial: false, configurable: true }
];

const Index = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('biblical');
  const [selectedResponseType, setSelectedResponseType] = useState('daily-guidance');
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [isAutoSave, setIsAutoSave] = useState(true);

  const handleSendMessage = async (message: string) => {
    const userMessage = { id: Date.now().toString(), content: message, sender: 'user' as const, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const aiMessage = { id: (Date.now() + 1).toString(), content: 'This is a simulated AI response. In a real implementation, this would connect to your Django backend via /api/v1/chat/message/send/', sender: 'ai' as const, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    toast({ title: 'Domain switched', description: `Now using ${mockDomains.find(d => d.id === domainId)?.name}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        onSettingsClick={() => setShowSettings(true)}
        onHelpClick={() => setShowHelp(true)}
        onMenuClick={() => {}}
        currentDomain={mockDomains.find(d => d.id === selectedDomain)?.name || 'Unknown'}
        isConnected={true}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <DomainSelector
              domains={mockDomains}
              selectedDomain={selectedDomain}
              isLoading={false}
              onDomainSelect={handleDomainSelect}
              onFileUpload={() => {}}
              onCreateCustomDomain={() => {}}
            />
            
            <ResponseTypeSelector
              responseTypes={mockResponseTypes}
              selectedType={selectedResponseType}
              onTypeSelect={setSelectedResponseType}
              isLoading={false}
            />
            
            <PluginSection
              plugins={mockPlugins}
              onPluginToggle={() => {}}
              onPluginConfigure={() => {}}
              onPluginInstall={() => {}}
              onPluginUninstall={() => {}}
              isLoading={false}
            />
          </div>

          {/* Center Column - Chat */}
          <div className="lg:col-span-2">
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              isListening={isListening}
              isAudioEnabled={isAudioEnabled}
              onSendMessage={handleSendMessage}
              onStartListening={() => setIsListening(true)}
              onStopListening={() => setIsListening(false)}
              onToggleAudio={() => setIsAudioEnabled(!isAudioEnabled)}
              onCopyMessage={() => {}}
              onRegenerateResponse={() => {}}
            />
          </div>

          {/* Right Column - Context (hidden on smaller screens) */}
          <div className="hidden xl:block">
            <ContextPreview
              snippets={[]}
              currentDomain={mockDomains.find(d => d.id === selectedDomain)?.name || 'Unknown'}
              isLoading={false}
              onSearch={() => {}}
              onRefresh={() => {}}
              onSnippetExpand={() => {}}
              onSnippetCopy={() => {}}
              onSnippetView={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <SettingsPanel
            providers={mockProviders}
            selectedProvider={selectedProvider}
            selectedModel={selectedModel}
            temperature={temperature}
            maxTokens={maxTokens}
            isAutoSave={isAutoSave}
            isSpeechEnabled={isSpeechEnabled}
            isAudioEnabled={isAudioEnabled}
            onProviderChange={setSelectedProvider}
            onModelChange={setSelectedModel}
            onTemperatureChange={setTemperature}
            onMaxTokensChange={setMaxTokens}
            onAutoSaveToggle={setIsAutoSave}
            onSpeechToggle={setIsSpeechEnabled}
            onAudioToggle={setIsAudioEnabled}
            onSaveSettings={() => { setShowSettings(false); toast({ title: 'Settings saved' }); }}
            onResetSettings={() => {}}
            onTestConnection={() => {}}
            isLoading={false}
          />
        </DialogContent>
      </Dialog>

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default Index;