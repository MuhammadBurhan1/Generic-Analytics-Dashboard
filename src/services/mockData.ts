import { TimeRange, DashboardData, QueryExecutionData, ResponseTimeData, FirewallData } from '@/types/dashboard';

// Helper to generate random data
const generateBarData = (days: number): QueryExecutionData[] => {
  const data: QueryExecutionData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: Math.floor(Math.random() * 15000) + 5000,
    });
  }
  return data;
};

const generateLineData = (days: number, baseValue: number, variance: number): ResponseTimeData[] => {
  const data: ResponseTimeData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: +(baseValue + (Math.random() - 0.5) * variance).toFixed(2),
    });
  }
  return data;
};

const generateFirewallData = (days: number): FirewallData[] => {
  const data: FirewallData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      calls: Math.floor(Math.random() * 800) + 200,
    });
  }
  return data;
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const fetchDashboardData = async (timeRange: TimeRange): Promise<DashboardData> => {
  await delay(800 + Math.random() * 400); // 800-1200ms delay
  
  const days = parseInt(timeRange);
  const multiplier = days / 30;
  
  return {
    userStats: {
      totalUsers: Math.floor(500 + Math.random() * 100 * multiplier),
      activeUsers: Math.floor(450 + Math.random() * 100 * multiplier),
      inactiveUsers: Math.floor(20 + Math.random() * 20),
    },
    uniqueLogins: {
      count: Math.floor(300 + Math.random() * 100 * multiplier),
    },
    queryExecutions: generateBarData(Math.min(days, 30)),
    querySources: [
      { source: 'Slack', count: Math.floor(2000 + Math.random() * 500), color: 'hsl(var(--chart-purple))' },
      { source: 'Microsoft Teams', count: Math.floor(1500 + Math.random() * 300), color: 'hsl(var(--chart-blue))' },
      { source: 'AWS Cloud', count: Math.floor(700 + Math.random() * 200), color: 'hsl(var(--chart-orange))' },
      { source: 'Google Cloud', count: Math.floor(600 + Math.random() * 150), color: 'hsl(var(--chart-green))' },
      { source: 'Oracle', count: Math.floor(400 + Math.random() * 100), color: 'hsl(var(--chart-red))' },
      { source: 'G Suite Gmail', count: Math.floor(300 + Math.random() * 100), color: 'hsl(var(--chart-cyan))' },
    ],
    workflowResponseTime: generateLineData(Math.min(days, 30), 10.5, 4),
    firewallCalls: generateFirewallData(Math.min(days, 30)),
    firewallResponseTime: generateLineData(Math.min(days, 30), 2.5, 1),
  };
};

// Individual chart refresh functions
export const fetchUserStats = async (timeRange: TimeRange) => {
  await delay(500 + Math.random() * 300);
  const multiplier = parseInt(timeRange) / 30;
  return {
    totalUsers: Math.floor(500 + Math.random() * 100 * multiplier),
    activeUsers: Math.floor(450 + Math.random() * 100 * multiplier),
    inactiveUsers: Math.floor(20 + Math.random() * 20),
  };
};

export const fetchUniqueLogins = async (timeRange: TimeRange) => {
  await delay(500 + Math.random() * 300);
  const multiplier = parseInt(timeRange) / 30;
  return { count: Math.floor(300 + Math.random() * 100 * multiplier) };
};

export const fetchQueryExecutions = async (timeRange: TimeRange) => {
  await delay(600 + Math.random() * 400);
  return generateBarData(Math.min(parseInt(timeRange), 30));
};

export const fetchQuerySources = async () => {
  await delay(500 + Math.random() * 300);
  return [
    { source: 'Slack', count: Math.floor(2000 + Math.random() * 500), color: 'hsl(var(--chart-purple))' },
    { source: 'Microsoft Teams', count: Math.floor(1500 + Math.random() * 300), color: 'hsl(var(--chart-blue))' },
    { source: 'AWS Cloud', count: Math.floor(700 + Math.random() * 200), color: 'hsl(var(--chart-orange))' },
    { source: 'Google Cloud', count: Math.floor(600 + Math.random() * 150), color: 'hsl(var(--chart-green))' },
    { source: 'Oracle', count: Math.floor(400 + Math.random() * 100), color: 'hsl(var(--chart-red))' },
    { source: 'G Suite Gmail', count: Math.floor(300 + Math.random() * 100), color: 'hsl(var(--chart-cyan))' },
  ];
};

export const fetchWorkflowResponseTime = async (timeRange: TimeRange) => {
  await delay(600 + Math.random() * 400);
  return generateLineData(Math.min(parseInt(timeRange), 30), 10.5, 4);
};

export const fetchFirewallCalls = async (timeRange: TimeRange) => {
  await delay(600 + Math.random() * 400);
  return generateFirewallData(Math.min(parseInt(timeRange), 30));
};

export const fetchFirewallResponseTime = async (timeRange: TimeRange) => {
  await delay(600 + Math.random() * 400);
  return generateLineData(Math.min(parseInt(timeRange), 30), 2.5, 1);
};
