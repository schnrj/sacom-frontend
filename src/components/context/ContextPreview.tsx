import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search,
  BookOpen,
  FileText,
  Clock,
  Eye,
  EyeOff,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextSnippet {
  id: string;
  title: string;
  content: string;
  source: string;
  category: string;
  relevanceScore: number;
  lastAccessed: Date;
  wordCount: number;
  isExpanded: boolean;
}

interface ContextPreviewProps {
  snippets: ContextSnippet[];
  currentDomain: string;
  isLoading: boolean;
  onSearch: (query: string) => void;
  onRefresh: () => void;
  onSnippetExpand: (snippetId: string) => void;
  onSnippetCopy: (content: string) => void;
  onSnippetView: (snippetId: string) => void;
}

export const ContextPreview: React.FC<ContextPreviewProps> = ({
  snippets,
  currentDomain,
  isLoading,
  onSearch,
  onRefresh,
  onSnippetExpand,
  onSnippetCopy,
  onSnippetView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(snippets.map(s => s.category)))];

  const getRelevanceColor = (score: number) => {
    if (score >= 0.8) return 'text-success';
    if (score >= 0.6) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getRelevanceBadge = (score: number) => {
    if (score >= 0.8) return 'success';
    if (score >= 0.6) return 'warning';
    return 'secondary';
  };

  return (
    <Card className="bg-gradient-surface border-card-border shadow-lg">
      <div className="p-4 border-b border-card-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Context Preview
              </h3>
              <p className="text-sm text-muted-foreground">
                Current domain: {currentDomain}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {filteredSnippets.length} items
            </Badge>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsPreviewCollapsed(!isPreviewCollapsed)}
            >
              {isPreviewCollapsed ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          </div>
        </div>
      </div>

      {!isPreviewCollapsed && (
        <div className="p-4 space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-2">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search knowledge base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" size="sm" disabled={isLoading}>
                Search
              </Button>
            </form>
            
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

          {/* Context Snippets */}
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {filteredSnippets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No context found</p>
                  <p className="text-sm mt-1">Try adjusting your search terms</p>
                </div>
              ) : (
                filteredSnippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className="p-4 bg-surface rounded-lg border border-card-border hover:bg-surface-elevated transition-smooth"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground truncate">
                            {snippet.title}
                          </h4>
                          <Badge 
                            variant={getRelevanceBadge(snippet.relevanceScore) as any}
                            className="text-xs"
                          >
                            {Math.round(snippet.relevanceScore * 100)}%
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {snippet.category}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-2">
                          {snippet.isExpanded ? (
                            <div className="whitespace-pre-wrap">
                              {snippet.content}
                            </div>
                          ) : (
                            <div className="line-clamp-3">
                              {snippet.content}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{snippet.lastAccessed.toLocaleDateString()}</span>
                          </div>
                          <span>{snippet.wordCount} words</span>
                          <span>Source: {snippet.source}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onSnippetExpand(snippet.id)}
                        >
                          {snippet.isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onSnippetCopy(snippet.content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onSnippetView(snippet.id)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Context Summary */}
          <div className="pt-3 border-t border-card-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Snippets:</span>
                <span className="ml-2 font-medium text-foreground">
                  {snippets.length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Average Relevance:</span>
                <span className="ml-2 font-medium text-foreground">
                  {Math.round((snippets.reduce((sum, s) => sum + s.relevanceScore, 0) / snippets.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};