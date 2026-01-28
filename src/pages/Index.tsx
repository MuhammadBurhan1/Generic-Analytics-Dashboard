import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import UserStatsCard from '@/components/dashboard/UserStatsCard';
import UniqueLoginsCard from '@/components/dashboard/UniqueLoginsCard';
import QueryExecutionsChart from '@/components/dashboard/QueryExecutionsChart';
import QuerySourcesChart from '@/components/dashboard/QuerySourcesChart';
import ResponseTimeChart from '@/components/dashboard/ResponseTimeChart';
import FirewallCallsChart from '@/components/dashboard/FirewallCallsChart';
import { useDashboardData } from '@/hooks/useDashboardData';

const Index = () => {
  const {
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
  } = useDashboardData('90');

  const calculateAvgResponseTime = (data: { time: number }[]): string => {
    if (!data || data.length === 0) return '0s';
    const avg = data.reduce((sum, item) => sum + item.time, 0) / data.length;
    return `${avg.toFixed(2)}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="w-full">
          {/* Dashboard Header */}
          <DashboardHeader
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            onRefreshAll={fetchAllData}
            isRefreshing={loading.all}
          />

          {/* Dashboard Content */}
          <div className="px-4 sm:px-6 md:px-8 py-6 space-y-6">
            
            {/* Top Stats Row - 4 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <UserStatsCard
                data={data?.userStats ?? null}
                onRefresh={refreshUserStats}
                isLoading={loading.all || loading.userStats}
                error={errors.userStats}
              />
              <UniqueLoginsCard
                data={data?.uniqueLogins ?? null}
                onRefresh={refreshUniqueLogins}
                isLoading={loading.all || loading.uniqueLogins}
                error={errors.uniqueLogins}
              />
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all">
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-2">Queries Exec.</p>
                <h3 className="text-3xl font-bold text-slate-800">371.8k</h3>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all">
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-2">Firewall Calls</p>
                <h3 className="text-3xl font-bold text-slate-800">12.5k</h3>
              </div>
            </div>

            {/* Charts Row 1 - 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden">
                <QueryExecutionsChart
                  data={data?.queryExecutions ?? []}
                  onRefresh={refreshQueryExecutions}
                  isLoading={loading.all || loading.queryExecutions}
                  error={errors.queryExecutions}
                />
              </div>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden">
                <QuerySourcesChart
                  data={data?.querySources ?? []}
                  onRefresh={refreshQuerySources}
                  isLoading={loading.all || loading.querySources}
                  error={errors.querySources}
                />
              </div>
            </div>

            {/* Charts Row 2 - Full Width */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden">
              <ResponseTimeChart
                title="Avg. Response Time - Workflow"
                data={data?.workflowResponseTime ?? []}
                avgValue={calculateAvgResponseTime(data?.workflowResponseTime ?? [])}
                onRefresh={refreshWorkflowResponseTime}
                isLoading={loading.all || loading.workflowResponseTime}
                error={errors.workflowResponseTime}
              />
            </div>

            {/* Charts Row 3 - 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden">
                <FirewallCallsChart
                  data={data?.firewallCalls ?? []}
                  onRefresh={refreshFirewallCalls}
                  isLoading={loading.all || loading.firewallCalls}
                  error={errors.firewallCalls}
                />
              </div>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden">
                <ResponseTimeChart
                  title="Avg. Response Time - Firewall"
                  data={data?.firewallResponseTime ?? []}
                  avgValue={calculateAvgResponseTime(data?.firewallResponseTime ?? [])}
                  onRefresh={refreshFirewallResponseTime}
                  isLoading={loading.all || loading.firewallResponseTime}
                  error={errors.firewallResponseTime}
                />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;