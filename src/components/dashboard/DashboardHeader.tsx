import { RefreshCw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TimeRange } from '@/types/dashboard';

interface DashboardHeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onRefreshAll: () => void;
  isRefreshing: boolean;
}

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
];

const DashboardHeader = ({
  timeRange,
  onTimeRangeChange,
  onRefreshAll,
  isRefreshing,
}: DashboardHeaderProps) => {
  const currentLabel = timeRangeOptions.find(opt => opt.value === timeRange)?.label;

  return (
    <header className="bg-dashboard-header text-dashboard-header-foreground px-6 py-4 rounded-t-lg mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-dashboard-header-foreground/80" />
          <h1 className="text-lg font-semibold">Analytics</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Filter */}
          <div className="flex items-center gap-2 text-sm">
            <span className="opacity-80">Time Range</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 px-3 text-dashboard-header-foreground hover:bg-dashboard-header-foreground/10 hover:text-dashboard-header-foreground"
                >
                  {currentLabel}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {timeRangeOptions.map(option => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onTimeRangeChange(option.value)}
                    className={timeRange === option.value ? 'bg-accent' : ''}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefreshAll}
            disabled={isRefreshing}
            className="text-dashboard-header-foreground hover:bg-dashboard-header-foreground/10 hover:text-dashboard-header-foreground"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin-slow' : ''}`} />
            Refresh Dashboard
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
