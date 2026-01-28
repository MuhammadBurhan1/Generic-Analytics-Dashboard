import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface UserStatsCardProps {
  data: { count: number; change: number } | null;
  onRefresh: () => void;
  isLoading: boolean;
  error?: string;
}

export default function UserStatsCard({ data, onRefresh, isLoading, error }: UserStatsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-1">Total Users</p>
          <h3 className="text-3xl font-bold text-blue-600">{data?.count ?? 0}</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onRefresh}
          disabled={isLoading}
          className="text-blue-600 hover:bg-blue-200"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <span className={`text-sm font-semibold ${(data?.change ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {(data?.change ?? 0) >= 0 ? '+' : ''}{data?.change ?? 0}%
        </span>
        <span className="text-xs text-slate-500 ml-2">vs last period</span>
      </div>

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </Card>
  );
}
