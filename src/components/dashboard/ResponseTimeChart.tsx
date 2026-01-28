import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import ChartCard from './ChartCard';
import { ResponseTimeData } from '@/types/dashboard';

interface ResponseTimeChartProps {
  title: string;
  data: ResponseTimeData[];
  avgValue: string;
  onRefresh: () => void;
  isLoading: boolean;
  error?: string | null;
}

const ResponseTimeChart = ({ 
  title, 
  data, 
  avgValue, 
  onRefresh, 
  isLoading, 
  error 
}: ResponseTimeChartProps) => {
  return (
    <ChartCard 
      title={title} 
      onRefresh={onRefresh} 
      isLoading={isLoading} 
      error={error}
    >
      <div className="space-y-3">
        <div className="text-2xl font-bold text-foreground">{avgValue}</div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-blue))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-blue))" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
                tickFormatter={(value) => `${value}s`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [`${value}s`, 'Response Time']}
              />
              <Area 
                type="monotone" 
                dataKey="time" 
                stroke="hsl(var(--chart-blue))" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTime)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
};

export default ResponseTimeChart;
