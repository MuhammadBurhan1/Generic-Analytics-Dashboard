import { RefreshCw, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartCardProps } from '@/types/dashboard';

const ChartCard = ({ title, onRefresh, isLoading, error, children }: ChartCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin-slow' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex items-center justify-center h-32 text-destructive">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm">Failed to load data</span>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="animate-slide-up">{children}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
