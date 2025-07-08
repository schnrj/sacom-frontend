import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  RefreshCw,
  User,
  Bot,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  isListening: boolean;
  isAudioEnabled: boolean;
  onSendMessage: (message: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onToggleAudio: () => void;
  onCopyMessage: (content: string) => void;
  onRegenerateResponse: (messageId: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  isListening,
  isAudioEnabled,
  onSendMessage,
  onStartListening,
  onStopListening,
  onToggleAudio,
  onCopyMessage,
  onRegenerateResponse
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    
    return (
      <div className={cn(
        "flex gap-3 p-4 rounded-lg",
        isUser ? "bg-user-message-muted ml-8" : "bg-ai-response-muted mr-8"
      )}>
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-user-message" : "bg-ai-response"
        )}>
          {isUser ? (
            <User className="h-4 w-4 text-user-message-foreground" />
          ) : (
            <Bot className="h-4 w-4 text-ai-response-foreground" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground">
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <Badge variant="outline" className="text-xs">
              {message.timestamp.toLocaleTimeString()}
            </Badge>
          </div>
          
          <div className="text-sm text-foreground leading-relaxed">
            {message.content}
            {message.isStreaming && (
              <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onCopyMessage(message.content)}
            >
              <Copy className="h-3 w-3" />
            </Button>
            
            {!isUser && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onRegenerateResponse(message.id)}
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            )}
            
            {!isUser && isAudioEnabled && (
              <Button
                variant="ghost"
                size="icon-sm"
              >
                <Volume2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="flex flex-col h-full bg-gradient-surface border-card-border shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-card-border">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">Chat</h3>
          <Badge variant="secondary" className="text-xs">
            {messages.length} messages
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleAudio}
            className={cn(
              "relative",
              isAudioEnabled && "text-accent"
            )}
          >
            {isAudioEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Welcome to LLM Wrapper
              </h4>
              <p className="text-muted-foreground">
                Start a conversation or use the microphone to begin
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 p-4 rounded-lg bg-ai-response-muted mr-8">
              <div className="w-8 h-8 rounded-full bg-ai-response flex items-center justify-center">
                <Loader2 className="h-4 w-4 text-ai-response-foreground animate-spin" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    AI Assistant
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Thinking...
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-card-border bg-surface">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message or use the microphone..."
              className="w-full min-h-[48px] max-h-32 p-3 pr-12 resize-none border border-input-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder-muted-foreground"
              disabled={isLoading}
            />
            
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute right-2 top-2"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant={isListening ? "destructive" : "microphone"}
            size="microphone"
            onClick={isListening ? onStopListening : onStartListening}
            disabled={isLoading}
            className="flex-shrink-0"
          >
            {isListening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{inputMessage.length}/1000</span>
        </div>
      </div>
    </Card>
  );
};