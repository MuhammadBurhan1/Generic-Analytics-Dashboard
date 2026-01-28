import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { QueryExecutionData } from '@/types/dashboard';

interface QueryExecutionsChartProps {
  data: QueryExecutionData[];
  onRefresh: () => void;
  isLoading: boolean;
  error?: string | null;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

const QueryExecutionsChart = ({ data, onRefresh, isLoading, error }: QueryExecutionsChartProps) => {
  const totalQueries = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ChartCard 
      title="Queries Executed in the Workflow" 
      onRefresh={onRefresh} 
      isLoading={isLoading} 
      error={error}
    >
      <div className="space-y-3">
        <div className="text-2xl font-bold text-foreground">{formatNumber(totalQueries)}</div>
        <div className="h-40">
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
                formatter={(value: number) => [formatNumber(value), 'Queries']}
              />
              <Bar 
                dataKey="count" 
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

export default QueryExecutionsChart;
