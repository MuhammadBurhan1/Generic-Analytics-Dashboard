import Sidebar from '@/components/dashboard/Sidebar';
import { FileText, Download, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Reports = () => {
  const reports = [
    {
      title: 'Monthly Analytics Report',
      description: 'Comprehensive overview of all metrics for the current month',
      icon: TrendingUp,
      date: 'Generated: Jan 28, 2026',
    },
    {
      title: 'User Activity Report',
      description: 'Detailed breakdown of user logins and session data',
      icon: FileText,
      date: 'Generated: Jan 27, 2026',
    },
    {
      title: 'Query Performance Report',
      description: 'Analysis of query executions and response times',
      icon: Calendar,
      date: 'Generated: Jan 25, 2026',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-56 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">View and download generated reports</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <report.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{report.title}</CardTitle>
                      <CardDescription className="text-xs">{report.date}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
