import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  HelpCircle,
  Book,
  Zap,
  Settings,
  Puzzle,
  MessageCircle,
  Mic,
  Brain,
  Code,
  ExternalLink,
  ChevronRight,
  Play
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: 'Intelligent Chat',
      description: 'AI-powered conversations with context awareness',
      color: 'bg-blue-500'
    },
    {
      icon: <Mic className="h-5 w-5" />,
      title: 'Voice Input',
      description: 'Speech-to-text for hands-free interaction',
      color: 'bg-green-500'
    },
    {
      icon: <Book className="h-5 w-5" />,
      title: 'Knowledge Domains',
      description: 'Specialized content areas for focused responses',
      color: 'bg-purple-500'
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: 'Multiple LLMs',
      description: 'Support for various AI model providers',
      color: 'bg-orange-500'
    },
    {
      icon: <Puzzle className="h-5 w-5" />,
      title: 'Plugin System',
      description: 'Extensible architecture for custom functionality',
      color: 'bg-pink-500'
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: 'Customization',
      description: 'Flexible settings for personalized experience',
      color: 'bg-teal-500'
    }
  ];

  const quickStart = [
    {
      step: 1,
      title: 'Select Domain',
      description: 'Choose a knowledge domain like "Biblical Texts" or "Self-Help"',
      icon: <Book className="h-4 w-4" />
    },
    {
      step: 2,
      title: 'Configure Response',
      description: 'Pick your preferred interaction style (Daily Guidance, Conversation, etc.)',
      icon: <Settings className="h-4 w-4" />
    },
    {
      step: 3,
      title: 'Start Chatting',
      description: 'Type your message or use the microphone for voice input',
      icon: <MessageCircle className="h-4 w-4" />
    },
    {
      step: 4,
      title: 'Explore Features',
      description: 'Try plugins, adjust LLM settings, and customize your experience',
      icon: <Zap className="h-4 w-4" />
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/content/domains/',
      description: 'Fetch available knowledge domains'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/content/domain/switch/',
      description: 'Switch to a different domain'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/chat/message/send/',
      description: 'Send a chat message'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/chat/session/create/',
      description: 'Create a new chat session'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/speech/process/',
      description: 'Process speech-to-text'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/llm/providers/',
      description: 'Get available LLM providers'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help & Documentation
          </DialogTitle>
          <DialogDescription>
            Learn how to use the LLM Wrapper application effectively
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                LLM Wrapper
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                A professional frontend for LLM integration with Django backend, 
                supporting multiple AI providers, knowledge domains, and extensible plugins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-card-border">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Modular Architecture</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built with React, TypeScript, and Tailwind CSS for maintainability 
                  and extensibility. Components are designed for easy customization.
                </p>
              </Card>

              <Card className="p-4 border-card-border">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-foreground">API Integration</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Seamless integration with Django REST APIs and WebSocket 
                  connections for real-time chat functionality.
                </p>
              </Card>

              <Card className="p-4 border-card-border">
                <div className="flex items-center gap-2 mb-3">
                  <Puzzle className="h-5 w-5 text-success" />
                  <h4 className="font-semibold text-foreground">Plugin System</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Extensible plugin architecture allows for custom functionality 
                  and third-party integrations.
                </p>
              </Card>

              <Card className="p-4 border-card-border">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-warning" />
                  <h4 className="font-semibold text-foreground">Customizable</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Extensive configuration options for LLM providers, response types, 
                  and user preferences.
                </p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quickstart" className="space-y-4">
            <div className="space-y-4">
              {quickStart.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {step.icon}
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-success-muted rounded-lg border border-success">
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-4 w-4 text-success" />
                <h4 className="font-semibold text-success-foreground">Ready to Start?</h4>
              </div>
              <p className="text-sm text-success-foreground/80">
                Close this dialog and try sending your first message! The system will 
                guide you through setting up your preferences.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-4 border-card-border">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center text-white`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary-muted rounded-lg border border-primary">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-primary-foreground">Advanced Features</h4>
              </div>
              <ul className="text-sm text-primary-foreground/80 space-y-1">
                <li>• Real-time WebSocket communication</li>
                <li>• Context-aware responses based on knowledge domains</li>
                <li>• Multiple response types (guidance, interpretation, conversation)</li>
                <li>• Speech-to-text and text-to-speech capabilities</li>
                <li>• Customizable plugin system</li>
                <li>• Professional UI with dark/light mode</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">API Endpoints</h3>
              </div>

              <div className="space-y-3">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="p-3 bg-surface rounded-lg border border-card-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={endpoint.method === 'GET' ? 'success' : 'accent'} className="text-xs">
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {endpoint.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-warning-muted rounded-lg border border-warning">
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="h-4 w-4 text-warning" />
                  <h4 className="font-semibold text-warning-foreground">WebSocket Connection</h4>
                </div>
                <p className="text-sm text-warning-foreground/80 mb-2">
                  For real-time chat, connect to the WebSocket endpoint:
                </p>
                <code className="text-sm font-mono bg-warning text-warning-foreground px-2 py-1 rounded block">
                  ws://localhost:8000/ws/chat/{'{'}{'{'}session_id{'}'}{'}'}/
                </code>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};