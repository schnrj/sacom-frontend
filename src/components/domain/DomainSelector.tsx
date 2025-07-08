import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Upload,
  Book,
  Heart,
  Brain,
  Users,
  FileText,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  documentCount: number;
  lastUpdated: Date;
}

interface DomainSelectorProps {
  domains: Domain[];
  selectedDomain: string;
  isLoading: boolean;
  onDomainSelect: (domainId: string) => void;
  onFileUpload: (file: File) => void;
  onCreateCustomDomain: (name: string, description: string) => void;
}

export const DomainSelector: React.FC<DomainSelectorProps> = ({
  domains,
  selectedDomain,
  isLoading,
  onDomainSelect,
  onFileUpload,
  onCreateCustomDomain
}) => {
  const [isCustomDomainMode, setIsCustomDomainMode] = useState(false);
  const [customDomainName, setCustomDomainName] = useState('');
  const [customDomainDescription, setCustomDomainDescription] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      onFileUpload(file);
    }
  };

  const handleCreateCustomDomain = () => {
    if (customDomainName.trim() && customDomainDescription.trim()) {
      onCreateCustomDomain(customDomainName.trim(), customDomainDescription.trim());
      setCustomDomainName('');
      setCustomDomainDescription('');
      setIsCustomDomainMode(false);
    }
  };

  const getIconForDomain = (name: string) => {
    switch (name.toLowerCase()) {
      case 'biblical texts':
        return <Book className="h-5 w-5" />;
      case 'buddhist teachings':
        return <Heart className="h-5 w-5" />;
      case 'self-help':
        return <Brain className="h-5 w-5" />;
      case 'therapeutic dialogue':
        return <Users className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-gradient-surface border-card-border shadow-lg">
      <div className="p-4 border-b border-card-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Knowledge Domain
            </h3>
            <p className="text-sm text-muted-foreground">
              Select content domain for AI responses
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCustomDomainMode(!isCustomDomainMode)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Custom
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {!isCustomDomainMode ? (
          <>
            {/* Domain Selection */}
            <div className="space-y-2">
              <Label htmlFor="domain-select" className="text-sm font-medium">
                Available Domains
              </Label>
              <Select value={selectedDomain} onValueChange={onDomainSelect}>
                <SelectTrigger id="domain-select">
                  <SelectValue placeholder="Select a domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain.id} value={domain.id}>
                      <div className="flex items-center gap-2">
                        {getIconForDomain(domain.name)}
                        <span>{domain.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Domain Cards */}
            <div className="space-y-3">
              {domains.map((domain) => (
                <div
                  key={domain.id}
                  className={cn(
                    "p-3 rounded-lg border border-card-border cursor-pointer transition-smooth",
                    domain.id === selectedDomain
                      ? "bg-primary-light border-primary"
                      : "bg-surface hover:bg-surface-elevated"
                  )}
                  onClick={() => onDomainSelect(domain.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                      domain.id === selectedDomain
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {getIconForDomain(domain.name)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">
                          {domain.name}
                        </h4>
                        {domain.id === selectedDomain && (
                          <Check className="h-4 w-4 text-success" />
                        )}
                        {domain.isActive && (
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">
                        {domain.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{domain.documentCount} documents</span>
                        <span>
                          Updated {domain.lastUpdated.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Switching domain...
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Custom Domain Creation */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-name" className="text-sm font-medium">
                  Custom Domain Name
                </Label>
                <Input
                  id="custom-name"
                  placeholder="e.g., Company Knowledge Base"
                  value={customDomainName}
                  onChange={(e) => setCustomDomainName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-description" className="text-sm font-medium">
                  Description
                </Label>
                <Input
                  id="custom-description"
                  placeholder="Describe the content domain"
                  value={customDomainDescription}
                  onChange={(e) => setCustomDomainDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-upload" className="text-sm font-medium">
                  Upload Text File
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateCustomDomain}
                    disabled={!customDomainName.trim() || !customDomainDescription.trim()}
                  >
                    Create
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-warning-muted rounded-lg">
                <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning-foreground">
                    Custom Domain Note
                  </p>
                  <p className="text-warning-foreground/80 mt-1">
                    Upload a plain text file (.txt) containing your custom knowledge base content. 
                    The system will process and index this content for AI responses.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};