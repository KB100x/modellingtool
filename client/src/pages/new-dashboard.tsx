import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BlendedMetricsGroup } from '@/components/dashboard/BlendedMetricsCard';
import AdditionalCharts from '@/components/dashboard/AdditionalCharts';
import ModelPerformance from '@/components/dashboard/ModelPerformance';
import ImprovedLeadSources from '@/components/dashboard/ImprovedLeadSources';
import SalesChart from '@/components/dashboard/SalesChart';
import MetricCard from '@/components/dashboard/MetricCard';
import ProductPerformance from '@/components/dashboard/ProductPerformance';
import AIInsights from '@/components/dashboard/AIInsights';
import ChatAssistant from '@/components/dashboard/ChatAssistant';
import WorldMap from '@/components/dashboard/WorldMap';
import SavedModels from '@/components/dashboard/SavedModels';
import { toast } from '@/hooks/use-toast';

export default function NewDashboard() {
  // State for active model
  const [activeModel, setActiveModel] = useState<any>(null);
  
  // Fetch all data needed for the dashboard
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['/api/dashboard'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const { data: blendedMetrics, isLoading: isBlendedLoading } = useQuery({
    queryKey: ['/api/blended-metrics'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const { data: additionalCharts, isLoading: isChartsLoading } = useQuery({
    queryKey: ['/api/additional-charts'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const { data: models, isLoading: isModelsLoading } = useQuery({
    queryKey: ['/api/models'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const isLoading = isDashboardLoading || isBlendedLoading || isChartsLoading || isModelsLoading;
  
  // Handle applying a model to the dashboard
  const handleApplyModel = (model: any) => {
    setActiveModel(model);
    
    toast({
      title: "Model Applied",
      description: `Model "${model.name}" metrics have been applied to the dashboard.`,
      duration: 3000
    });
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  // Create adjusted metrics if a model is active
  const getAdjustedMetrics = () => {
    if (!activeModel || !activeModel.metrics) return dashboardData.metrics;
    
    // Apply active model's metrics to adjust dashboard values
    return {
      ...dashboardData.metrics,
      // Adjust totalRevenue based on model's calculated revenue
      totalRevenue: activeModel.metrics.totalRevenue ? 
        `$${Number(activeModel.metrics.totalRevenue).toLocaleString()}` : 
        dashboardData.metrics.totalRevenue,
      
      // Adjust conversionRate based on model's calculated conversion rate
      conversionRate: activeModel.metrics.conversionRate ? 
        `${activeModel.metrics.conversionRate}%` : 
        dashboardData.metrics.conversionRate,
    };
  };

  // Get adjusted metrics
  const adjustedMetrics = getAdjustedMetrics();
  
  return (
    <DashboardLayout>
      {dashboardData && (
        <div className="space-y-8">
          {/* Display active model indicator if a model is applied */}
          {activeModel && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-green-800">
                  Model Applied: {activeModel.name}
                </h3>
                <p className="text-sm text-green-600">
                  Dashboard metrics are now showing projections based on this model.
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setActiveModel(null);
                  toast({
                    title: "Model Removed",
                    description: "Dashboard metrics have been restored to default values.",
                    duration: 3000
                  });
                }}
              >
                Clear Model
              </Button>
            </div>
          )}
          
          {/* Blended Metrics Section */}
          {blendedMetrics && (
            <BlendedMetricsGroup
              valuation={blendedMetrics.valuation}
              profitability={blendedMetrics.profitability}
              financialMetrics={blendedMetrics.financialMetrics}
              customerMetrics={blendedMetrics.customerMetrics}
              productAcquisitionCosts={blendedMetrics.productAcquisitionCosts}
              businessModelingInbound={blendedMetrics.businessModelingInbound}
              businessModelingBlended={blendedMetrics.businessModelingBlended}
              administrationFixedCosts={blendedMetrics.administrationFixedCosts}
              salesWorkforce={blendedMetrics.salesWorkforce}
              className="mb-8"
            />
          )}
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Revenue" 
              value={adjustedMetrics.totalRevenue}
              change={{ value: "$12.5%", isPositive: true }}
            />
            <MetricCard
              title="Active Leads" 
              value={adjustedMetrics.activeLeads}
              change={{ value: "5.3%", isPositive: true }}
            />
            <MetricCard
              title="Deals Closed" 
              value={adjustedMetrics.dealsCount}
              change={{ value: "8.1%", isPositive: true }}
            />
            <MetricCard
              title="Conversion Rate" 
              value={adjustedMetrics.conversionRate}
              change={{ value: "2.4%", isPositive: true }}
            />
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SalesChart 
              data={dashboardData.salesData} 
              totalRevenue={adjustedMetrics.totalRevenue}
              growthRate="+12.5% vs last year"
            />
            <ProductPerformance 
              growthData={dashboardData.productPerformance.growthData}
              conversionData={dashboardData.productPerformance.conversionData}
            />
          </div>
          
          {/* Additional Charts */}
          {additionalCharts && (
            <AdditionalCharts 
              freeCashFlow={additionalCharts.freeCashFlow}
              renewalCustomers={additionalCharts.renewalCustomers}
              totalCustomers={additionalCharts.totalCustomers}
            />
          )}
          
          {/* Saved Models & Insights */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <WorldMap 
                totalRevenue={dashboardData.geoData.totalRevenue}
                coverage={dashboardData.geoData.coverage}
              />
            </div>
            <AIInsights insights={dashboardData.insights} />
          </div>
          
          {/* Lead Sources & Saved Models */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ImprovedLeadSources sources={dashboardData.leadSources} />
            <SavedModels onSelectModel={handleApplyModel} />
          </div>
          
          {/* Model Performance */}
          {models && (
            <ModelPerformance models={activeModel?.metrics ? 
              // If active model has metrics, add it to the top of the list
              [
                {
                  id: activeModel.id || 999,
                  name: activeModel.name,
                  category: activeModel.description || "Custom Model",
                  metrics: {
                    ltv: activeModel.metrics.ltv || 0,
                    cac: activeModel.metrics.cac || 0,
                    conversionRate: activeModel.metrics.conversionRate || 0,
                    revenuePerCustomer: activeModel.metrics.revenuePerCustomer || 0
                  },
                  status: "Active",
                  efficiency: activeModel.metrics.efficiency || "medium"
                },
                ...models
              ].slice(0, 5) : models} 
            />
          )}
        </div>
      )}
      
      {/* Chat Assistant */}
      <ChatAssistant />
    </DashboardLayout>
  );
}