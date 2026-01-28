import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { FirewallData } from '@/types/dashboard';

interface FirewallCallsChartProps {
  data: FirewallData[];
  onRefresh: () => void;
  isLoading: boolean;
  error?: string | null;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

const FirewallCallsChart = ({ data, onRefresh, isLoading, error }: FirewallCallsChartProps) => {
  const totalCalls = data.reduce((sum, item) => sum + item.calls, 0);

  return (
    <ChartCard 
      title="Firewall API Calls" 
      onRefresh={onRefresh} 
      isLoading={isLoading} 
      error={error}
    >
      <div className="space-y-3">
        <div className="text-2xl font-bold text-foreground">{formatNumber(totalCalls)}</div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatNumber}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [formatNumber(value), 'API Calls']}
              />
              <Bar 
                dataKey="calls" 
                fill="hsl(var(--chart-green))" 
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
};

export default FirewallCallsChart;
