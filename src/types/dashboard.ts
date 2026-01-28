export type TimeRange = '7' | '30' | '90';

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface UniqueLoginsData {
  count: number;
}

export interface QueryExecutionData {
  date: string;
  count: number;
}

export interface QuerySourceData {
  source: string;
  count: number;
  color: string;
}

export interface ResponseTimeData {
  date: string;
  time: number;
}

export interface FirewallData {
  date: string;
  calls: number;
}

export interface DashboardData {
  userStats: UserStats;
  uniqueLogins: UniqueLoginsData;
  queryExecutions: QueryExecutionData[];
  querySources: QuerySourceData[];
  workflowResponseTime: ResponseTimeData[];
  firewallCalls: FirewallData[];
  firewallResponseTime: ResponseTimeData[];
}

export interface ChartCardProps {
  title: string;
  onRefresh: () => void;
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
}
