import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  HelpCircle, 
  Moon, 
  Sun, 
  Menu,
  Zap,
  Activity
} from 'lucide-react';

interface AppHeaderProps {
  onSettingsClick: () => void;
  onHelpClick: () => void;
  onMenuClick: () => void;
  currentDomain: string;
  isConnected: boolean;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onSettingsClick,
  onHelpClick,
  onMenuClick,
  currentDomain,
  isConnected,
  isDarkMode,
  onThemeToggle
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-gradient-surface backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  LLM Wrapper
                </h1>
                <p className="text-xs text-muted-foreground">
                  Professional AI Interface
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Current Domain */}
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <span className="text-xs font-medium">{currentDomain}</span>
          </Badge>
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-success" />
            <span className="text-xs text-muted-foreground">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onThemeToggle}
            className="hidden sm:inline-flex"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onHelpClick}
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onSettingsClick}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};