import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MetricCard from "@/components/dashboard/MetricCard";
import SalesChart from "@/components/dashboard/SalesChart";
import SalesFunnel from "@/components/dashboard/SalesFunnel";
import WorldMap from "@/components/dashboard/WorldMap";
import ProductPerformance from "@/components/dashboard/ProductPerformance";
import AIInsights from "@/components/dashboard/AIInsights";
import LeadSources from "@/components/dashboard/LeadSources";
import TopPerformers from "@/components/dashboard/TopPerformers";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['/api/dashboard'],
    staleTime: 60 * 1000, // 1 minute
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard 
          title="Total Revenue" 
          value={data.metrics.totalRevenue} 
          change={{ value: "+15.3%", isPositive: true }}
          indicatorHeight={8}
        />
        <MetricCard 
          title="Deals Closed" 
          value={data.metrics.dealsCount} 
          change={{ value: "+7.2%", isPositive: true }}
          indicatorHeight={6}
        />
        <MetricCard 
          title="Conversion Rate" 
          value={data.metrics.conversionRate} 
          change={{ value: "-2.1%", isPositive: false }}
          indicatorHeight={5}
        />
        <MetricCard 
          title="Active Leads" 
          value={data.metrics.activeLeads} 
          change={{ value: "+12.5%", isPositive: true }}
          indicatorHeight={7}
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SalesChart 
          data={data.salesData} 
          totalRevenue={data.metrics.revenueFormatted} 
          growthRate="+12.6%" 
        />
        <SalesFunnel 
          stages={data.funnelStages}
          conversionLabels={data.funnelLabels}
        />
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorldMap 
          totalRevenue={data.geoData.totalRevenue} 
          coverage={data.geoData.coverage} 
        />
        <ProductPerformance 
          growthData={data.productPerformance.growthData}
          conversionData={data.productPerformance.conversionData}
        />
      </div>
      
      {/* AI Insights */}
      <AIInsights insights={data.insights} />
      
      {/* Lead Sources */}
      <LeadSources sources={data.leadSources} />
      
      {/* Top Performers */}
      <TopPerformers performers={data.performers} />
    </DashboardLayout>
  );
}
