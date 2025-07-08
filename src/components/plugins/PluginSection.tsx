import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Puzzle,
  Plus,
  Settings,
  Download,
  Search,
  Star,
  Shield,
  Zap,
  Brain,
  MessageSquare,
  Database,
  Globe,
  Code,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: string;
  icon: React.ReactNode;
  isActive: boolean;
  isInstalled: boolean;
  rating: number;
  downloads: number;
  lastUpdated: Date;
  features: string[];
  isOfficial: boolean;
  configurable: boolean;
}

interface PluginSectionProps {
  plugins: Plugin[];
  onPluginToggle: (pluginId: string, enabled: boolean) => void;
  onPluginConfigure: (pluginId: string) => void;
  onPluginInstall: (pluginId: string) => void;
  onPluginUninstall: (pluginId: string) => void;
  isLoading: boolean;
}

export const PluginSection: React.FC<PluginSectionProps> = ({
  plugins,
  onPluginToggle,
  onPluginConfigure,
  onPluginInstall,
  onPluginUninstall,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai':
        return <Brain className="h-5 w-5" />;
      case 'data':
        return <Database className="h-5 w-5" />;
      case 'communication':
        return <MessageSquare className="h-5 w-5" />;
      case 'integration':
        return <Globe className="h-5 w-5" />;
      case 'development':
        return <Code className="h-5 w-5" />;
      default:
        return <Puzzle className="h-5 w-5" />;
    }
  };

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const installedPlugins = plugins.filter(p => p.isInstalled);
  const availablePlugins = plugins.filter(p => !p.isInstalled);
  const activePlugins = plugins.filter(p => p.isActive);

  const categories = ['all', ...Array.from(new Set(plugins.map(p => p.category)))];

  return (
    <Card className="bg-gradient-surface border-card-border shadow-lg">
      <div className="p-4 border-b border-card-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <Puzzle className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Plugins
              </h3>
              <p className="text-sm text-muted-foreground">
                Extend functionality with plugins
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {activePlugins.length} active
            </Badge>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plugin
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Plugin Marketplace</DialogTitle>
                  <DialogDescription>
                    Discover and install new plugins to enhance your LLM experience
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search plugins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-input-border rounded-md bg-input text-foreground"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Available Plugins */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {availablePlugins.map((plugin) => (
                      <div
                        key={plugin.id}
                        className="p-4 bg-surface rounded-lg border border-card-border hover:bg-surface-elevated transition-smooth"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            {getIconForCategory(plugin.category)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-foreground">
                                {plugin.name}
                              </h4>
                              {plugin.isOfficial && (
                                <Badge variant="success" className="text-xs">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Official
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {plugin.category}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {plugin.description}
                            </p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current text-yellow-500" />
                                <span>{plugin.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                <span>{plugin.downloads.toLocaleString()}</span>
                              </div>
                              <span>v{plugin.version}</span>
                              <span>by {plugin.author}</span>
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPluginInstall(plugin.id)}
                            disabled={isLoading}
                          >
                            Install
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-surface rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-primary">
              {installedPlugins.length}
            </div>
            <div className="text-sm text-muted-foreground">Installed</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-success">
              {activePlugins.length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-accent">
              {availablePlugins.length}
            </div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
        </div>

        {/* Installed Plugins */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Installed Plugins</h4>
          
          {installedPlugins.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Puzzle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No plugins installed yet</p>
              <p className="text-sm mt-1">Add plugins to extend functionality</p>
            </div>
          ) : (
            installedPlugins.map((plugin) => (
              <div
                key={plugin.id}
                className={cn(
                  "p-4 rounded-lg border border-card-border transition-smooth",
                  plugin.isActive 
                    ? "bg-success-muted border-success" 
                    : "bg-surface hover:bg-surface-elevated"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    plugin.isActive ? "bg-success" : "bg-muted"
                  )}>
                    {getIconForCategory(plugin.category)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">
                        {plugin.name}
                      </h4>
                      {plugin.isActive && (
                        <Badge variant="success" className="text-xs">
                          Active
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        v{plugin.version}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {plugin.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {plugin.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={plugin.isActive}
                      onCheckedChange={(checked) => onPluginToggle(plugin.id, checked)}
                      disabled={isLoading}
                    />
                    
                    {plugin.configurable && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onPluginConfigure(plugin.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon-sm"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Plugin Development Note */}
        <div className="p-4 bg-primary-muted rounded-lg border border-primary">
          <div className="flex items-start gap-2">
            <Code className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary-foreground">
                Plugin Development
              </p>
              <p className="text-primary-foreground/80 mt-1">
                This plugin system demonstrates extensibility. In a full implementation, 
                plugins would be loaded dynamically and could extend chat functionality, 
                add new AI capabilities, or integrate with external services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};