import Sidebar from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const ReportsExport = () => {
  const [format, setFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('30');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);

  const handleExport = () => {
    toast({
      title: 'Export started',
      description: `Your ${format.toUpperCase()} report is being generated...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-56 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Export Reports</h1>
            <p className="text-muted-foreground mt-1">Generate and download custom reports</p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Export Configuration</CardTitle>
              <CardDescription>Configure your report export settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Format Selection */}
              <div className="space-y-2">
                <Label>Export Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        PDF Document
                      </div>
                    </SelectItem>
                    <SelectItem value="csv">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        CSV Spreadsheet
                      </div>
                    </SelectItem>
                    <SelectItem value="xlsx">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        Excel Spreadsheet
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <Label>Include in Report</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="charts" 
                      checked={includeCharts} 
                      onCheckedChange={(checked) => setIncludeCharts(checked as boolean)} 
                    />
                    <label htmlFor="charts" className="text-sm text-foreground cursor-pointer">
                      Charts and visualizations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rawData" 
                      checked={includeRawData} 
                      onCheckedChange={(checked) => setIncludeRawData(checked as boolean)} 
                    />
                    <label htmlFor="rawData" className="text-sm text-foreground cursor-pointer">
                      Raw data tables
                    </label>
                  </div>
                </div>
              </div>

              {/* Export Button */}
              <div className="pt-4">
                <Button onClick={handleExport} className="w-full max-w-xs">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReportsExport;
