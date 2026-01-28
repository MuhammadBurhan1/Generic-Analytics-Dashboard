import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import ChartCard from './ChartCard';
import { QuerySourceData } from '@/types/dashboard';

interface QuerySourcesChartProps {
  data: QuerySourceData[];
  onRefresh: () => void;
  isLoading: boolean;
  error?: string | null;
}

const QuerySourcesChart = ({ data, onRefresh, isLoading, error }: QuerySourcesChartProps) => {
  return (
    <ChartCard 
      title="Queries by Source" 
      onRefresh={onRefresh} 
      isLoading={isLoading} 
      error={error}
    >
      <div className="space-y-3">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          {data.map((item) => (
            <div key={item.source} className="flex items-center gap-1.5">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.source}</span>
            </div>
          ))}
        </div>
        
        {/* Horizontal Bar Chart */}
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              layout="vertical" 
              margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
            >
              <XAxis 
                type="number"
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                type="category"
                dataKey="source" 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Queries']}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
};

export default QuerySourcesChart;
