import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb,
  BookOpen,
  MessageCircle,
  Heart,
  Zap,
  Star,
  Clock,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResponseType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isRecommended?: boolean;
  estimatedResponseTime: string;
  features: string[];
}

interface ResponseTypeSelectorProps {
  responseTypes: ResponseType[];
  selectedType: string;
  onTypeSelect: (typeId: string) => void;
  isLoading: boolean;
}

export const ResponseTypeSelector: React.FC<ResponseTypeSelectorProps> = ({
  responseTypes,
  selectedType,
  onTypeSelect,
  isLoading
}) => {
  const getIconForType = (name: string) => {
    switch (name.toLowerCase()) {
      case 'daily guidance':
      case 'quotes':
        return <Lightbulb className="h-5 w-5" />;
      case 'interpretation':
        return <BookOpen className="h-5 w-5" />;
      case 'conversation':
        return <MessageCircle className="h-5 w-5" />;
      case 'therapeutic dialogue':
        return <Heart className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const getColorForType = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'purple': 'bg-purple-500',
      'orange': 'bg-orange-500',
      'pink': 'bg-pink-500',
      'teal': 'bg-teal-500',
    };
    return colorMap[color] || 'bg-primary';
  };

  return (
    <Card className="bg-gradient-surface border-card-border shadow-lg">
      <div className="p-4 border-b border-card-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Response Type
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose interaction style for AI responses
            </p>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {responseTypes.length} types
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {responseTypes.map((type) => (
          <div
            key={type.id}
            className={cn(
              "relative p-4 rounded-lg border border-card-border cursor-pointer transition-smooth",
              type.id === selectedType
                ? "bg-primary-light border-primary shadow-md"
                : "bg-surface hover:bg-surface-elevated hover:shadow-sm"
            )}
            onClick={() => onTypeSelect(type.id)}
          >
            {/* Recommended Badge */}
            {type.isRecommended && (
              <div className="absolute -top-2 -right-2">
                <Badge variant="gradient" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
              </div>
            )}

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={cn(
                "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                type.id === selectedType
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {getIconForType(type.name)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-foreground">
                    {type.name}
                  </h4>
                  {type.id === selectedType && (
                    <Badge variant="success" className="text-xs">
                      Active
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {type.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {type.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{type.estimatedResponseTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Best for focused sessions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Button */}
            <div className="mt-3 flex justify-end">
              <Button
                variant={type.id === selectedType ? "default" : "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onTypeSelect(type.id);
                }}
                disabled={isLoading}
              >
                {type.id === selectedType ? "Selected" : "Select"}
              </Button>
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="pt-3 border-t border-card-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Quick Actions
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTypeSelect('daily-guidance')}
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                Daily
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTypeSelect('conversation')}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTypeSelect('therapeutic')}
              >
                <Heart className="h-4 w-4 mr-1" />
                Therapy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};