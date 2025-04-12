import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MetricItem {
  label: string;
  value: string;
}

interface BlendedMetricsCardProps {
  title: string;
  metrics: Record<string, string>;
  className?: string;
}

export default function BlendedMetricsCard({ title, metrics, className = "" }: BlendedMetricsCardProps) {
  const metricItems: MetricItem[] = Object.entries(metrics).map(([key, value]) => {
    // Convert camelCase to Title Case with spaces
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    
    return { label, value };
  });

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {metricItems.map((metric, index) => (
            <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{metric.label}</span>
              <span className="text-sm font-medium">{metric.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface BlendedMetricsGroupProps {
  valuation: Record<string, string>;
  profitability: Record<string, string>;
  financialMetrics: Record<string, string>;
  customerMetrics: Record<string, string>;
  productAcquisitionCosts: {
    initialOffer: Record<string, string>;
    renewals: Record<string, string>;
  };
  businessModelingInbound: Record<string, string>;
  businessModelingBlended: Record<string, string>;
  administrationFixedCosts: Record<string, string>;
  salesWorkforce: Record<string, string>;
  className?: string;
}

export function BlendedMetricsGroup(props: BlendedMetricsGroupProps) {
  const [activeTab, setActiveTab] = useState<string>("valuation");
  
  return (
    <div className={props.className}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Blended Metrics</h2>
      
      <Tabs defaultValue="valuation" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 mb-4">
          <TabsTrigger value="valuation">Valuation</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="inbound">Inbound</TabsTrigger>
          <TabsTrigger value="blended">Blended</TabsTrigger>
          <TabsTrigger value="admin">Administration</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="valuation" className="mt-2">
          <BlendedMetricsCard title="Valuation" metrics={props.valuation} />
        </TabsContent>
        
        <TabsContent value="profitability" className="mt-2">
          <BlendedMetricsCard title="Profitability" metrics={props.profitability} />
        </TabsContent>
        
        <TabsContent value="financial" className="mt-2">
          <BlendedMetricsCard title="Financial Metrics" metrics={props.financialMetrics} />
        </TabsContent>
        
        <TabsContent value="customer" className="mt-2">
          <BlendedMetricsCard title="Customer Metrics" metrics={props.customerMetrics} />
        </TabsContent>
        
        <TabsContent value="product" className="mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <BlendedMetricsCard title="Initial Offer" metrics={props.productAcquisitionCosts.initialOffer} />
            <BlendedMetricsCard title="Renewals" metrics={props.productAcquisitionCosts.renewals} />
          </div>
        </TabsContent>
        
        <TabsContent value="inbound" className="mt-2">
          <BlendedMetricsCard title="Business Modeling (Inbound)" metrics={props.businessModelingInbound} />
        </TabsContent>
        
        <TabsContent value="blended" className="mt-2">
          <BlendedMetricsCard title="Business Modeling (Blended)" metrics={props.businessModelingBlended} />
        </TabsContent>
        
        <TabsContent value="admin" className="mt-2">
          <BlendedMetricsCard title="Administration & Fixed Costs" metrics={props.administrationFixedCosts} />
        </TabsContent>
        
        <TabsContent value="sales" className="mt-2">
          <BlendedMetricsCard title="Sales & Workforce" metrics={props.salesWorkforce} />
        </TabsContent>
      </Tabs>
    </div>
  );
}