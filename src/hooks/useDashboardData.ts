import { useState, useCallback, useEffect } from 'react';
import { TimeRange, DashboardData } from '@/types/dashboard';
import {
  fetchDashboardData,
  fetchUserStats,
  fetchUniqueLogins,
  fetchQueryExecutions,
  fetchQuerySources,
  fetchWorkflowResponseTime,
  fetchFirewallCalls,
  fetchFirewallResponseTime,
} from '@/services/mockData';

interface LoadingStates {
  all: boolean;
  userStats: boolean;
  uniqueLogins: boolean;
  queryExecutions: boolean;
  querySources: boolean;
  workflowResponseTime: boolean;
  firewallCalls: boolean;
  firewallResponseTime: boolean;
}

interface ErrorStates {
  userStats: string | null;
  uniqueLogins: string | null;
  queryExecutions: string | null;
  querySources: string | null;
  workflowResponseTime: string | null;
  firewallCalls: string | null;
  firewallResponseTime: string | null;
}

const initialLoadingStates: LoadingStates = {
  all: false,
  userStats: false,
  uniqueLogins: false,
  queryExecutions: false,
  querySources: false,
  workflowResponseTime: false,
  firewallCalls: false,
  firewallResponseTime: false,
};

const initialErrorStates: ErrorStates = {
  userStats: null,
  uniqueLogins: null,
  queryExecutions: null,
  querySources: null,
  workflowResponseTime: null,
  firewallCalls: null,
  firewallResponseTime: null,
};

export const useDashboardData = (initialTimeRange: TimeRange = '90') => {
  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<LoadingStates>(initialLoadingStates);
  const [errors, setErrors] = useState<ErrorStates>(initialErrorStates);

  // Fetch all data
  const fetchAllData = useCallback(async () => {
    setLoading(prev => ({ ...prev, all: true }));
    setErrors(initialErrorStates);
    
    try {
      const result = await fetchDashboardData(timeRange);
      setData(result);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(prev => ({ ...prev, all: false }));
    }
  }, [timeRange]);

  // Individual refresh functions
  const refreshUserStats = useCallback(async () => {
    setLoading(prev => ({ ...prev, userStats: true }));
    setErrors(prev => ({ ...prev, userStats: null }));
    
    try {
      const result = await fetchUserStats(timeRange);
      setData(prev => prev ? { ...prev, userStats: result } : null);
    } catch (error) {
      setErrors(prev => ({ ...prev, userStats: 'Failed to load' }));
    } finally {
      setLoading(prev => ({ ...prev, userStats: false }));
    }
  }, [timeRange]);

  const refreshUniqueLogins = useCallback(async () => {
    setLoading(prev => ({ ...prev, uniqueLogins: true }));
    setErrors(prev => ({ ...prev, uniqueLogins: null }));
    
    try {
      const result = await fetchUniqueLogins(timeRange);
      setData(prev => prev ? { ...prev, uniqueLogins: result } : null);
    } catch (error) {
      setErrors(prev => ({ ...prev, uniqueLogins: 'Failed to load' }));
    } finally {
      setLoading(prev => ({ ...prev, uniqueLogins: false }));
    }
  }, [timeRange]);

  const refreshQueryExecutions = useCallback(async () => {
    setLoading(prev => ({ ...prev, queryExecutions: true }));
    setErrors(prev => ({ ...prev, queryExecutions: null }));
    
    try {
      const result = await fetchQueryExecutions(timeRange);
      setData(prev => prev ? { ...prev, queryExecutions: result } : null);
    } catch (error) {
      setErrors(prev => ({ ...prev, queryExecutions: 'Failed to load' }));
    } finally {
      setLoading(prev => ({ ...prev, queryExecutions: false }));
    }
  }, [timeRange]);

  const refreshQuerySources = useCallback(async () => {
    setLoading(prev => ({ ...prev, querySources: true }));
    setErrors(prev => ({ ...prev, querySources: null }));
    
    try {
      const result = await fetchQuerySources();
      setData(prev => prev ? { ...prev, querySources: result } : null);
    } catch (error) {
      setErrors(prev => ({ ...prev, querySources: 'Failed to load' }));
    } finally {
      setLoading(prev => ({ ...prev, querySources: false }));
    }
  }, []);

  const refreshWorkflowResponseTime = useCallback(async () => {
    setLoading(prev => ({ ...prev, workflowResponseTime: true }));
    setErrors(prev => ({ ...prev, workflowResponseTime: null }));
    
    try {
      const result = await fetchWorkflowResponseTime(timeRange);
      setData(prev => prev ? { ...prev, workflowResponseTime: result } : null);
    } catch (error) {
      setErrors(prev => ({ ...prev, workflowResponseTime: 'Failed to load' }));
    } finally {
      setLoading(prev => ({ ...prev, workflowResponseTime: false }));
    }
  }, [timeRange]);

  const refreshFirewallCalls = useCallback(async () => {
    setLoading(prev => ({ ...prev, firewallCalls: true }));
    setErrors(prev => ({ ...prev, firewallCalls: null }));
    
    try {
      const result = await fetchFirewallCalls(timeRange);
      setData(prev => prev ? { ...prev, firewallCalls: result } : null);
    } catch (error) {
      setErrors(prev => ({ ...prev, firewallCalls: 'Failed to load' }));
    } finally {
      setLoading(prev => ({ ...prev, firewallCalls: false }));
    }
  }, [timeRange]);

  const refreshFirewallResponseTime = useCallback(async () => {
    setLoading(prev => ({ ...prev, firewallResponseTime: true }));
    setErrors(prev => ({ ...prev, firewallResponseTime: null }));
    
    try {
      const result = await fetchFirewallResponseTime(timeRange);
      setData(prev => prev ? { ...prev, firewallResponseTime: result } : null);
    } catch (error) {
      setErrors(prev => ({ ...prev, firewallResponseTime: 'Failed to load' }));
    } finally {
      setLoading(prev => ({ ...prev, firewallResponseTime: false }));
    }
  }, [timeRange]);

  // Effect to fetch data on mount and when time range changes
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    timeRange,
    setTimeRange,
    data,
    loading,
    errors,
    fetchAllData,
    refreshUserStats,
    refreshUniqueLogins,
    refreshQueryExecutions,
    refreshQuerySources,
    refreshWorkflowResponseTime,
    refreshFirewallCalls,
    refreshFirewallResponseTime,
  };
};
