import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, TooltipProps
} from 'recharts';
import { AreaChart, Area } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Data structure for charts
interface ChartDataPoint {
  name: string;
  value: number;
  dailyValues: number[];
}

interface ChartProps {
  title: string;
  data: ChartDataPoint[];
  dataKey?: string;
  valuePrefix?: string;
  tooltipLabel?: string;
  color?: string;
  showArea?: boolean;
  className?: string;
}

// Custom tooltip component
const CustomTooltip = ({ 
  active, payload, label, valuePrefix = "", dailyValues 
}: TooltipProps<number, string> & { valuePrefix: string, dailyValues?: number[] }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload as ChartDataPoint;
    
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-gray-600">
          {valuePrefix}{payload[0].value}
        </p>
        {dailyValues && dataPoint.dailyValues && (
          <div className="mt-2">
            <p className="text-xs font-medium mb-1">Daily Values:</p>
            <div className="h-20 w-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dataPoint.dailyValues.map((value, i) => ({ day: i + 1, value }))}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

// Chart component
function ChartWithTooltip({ 
  title, 
  data, 
  dataKey = "value", 
  valuePrefix = "", 
  tooltipLabel = "Value", 
  color = "#10b981",
  showArea = false,
  className = ""
}: ChartProps) {
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {showArea ? (
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  content={(props) => (
                    <CustomTooltip 
                      {...props} 
                      valuePrefix={valuePrefix} 
                      dailyValues={[]}
                    />
                  )} 
                />
                <Area 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color} 
                  fill={color} 
                  fillOpacity={0.2}
                />
              </AreaChart>
            ) : (
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  content={(props) => (
                    <CustomTooltip 
                      {...props} 
                      valuePrefix={valuePrefix}
                      dailyValues={[]}
                    />
                  )} 
                />
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color} 
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Props for the chart group component
interface AdditionalChartsProps {
  freeCashFlow: ChartDataPoint[];
  renewalCustomers: ChartDataPoint[];
  totalCustomers: ChartDataPoint[];
  className?: string;
}

// Component that displays all three charts
export default function AdditionalCharts({ 
  freeCashFlow, 
  renewalCustomers, 
  totalCustomers,
  className = ""
}: AdditionalChartsProps) {
  const [timeFrames, setTimeFrames] = useState({
    cashFlow: 'monthly',
    renewals: 'monthly',
    customers: 'monthly'
  });
  
  const handleTimeFrameChange = (chart: keyof typeof timeFrames, value: string) => {
    setTimeFrames(prev => ({ ...prev, [chart]: value }));
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Monthly Free Cash Flow vs. Time</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeFrameChange('cashFlow', 'monthly')}
              className={`px-3 py-1 text-xs rounded ${
                timeFrames.cashFlow === 'monthly' 
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeFrameChange('cashFlow', 'daily')}
              className={`px-3 py-1 text-xs rounded ${
                timeFrames.cashFlow === 'daily'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
          </div>
        </div>
        <ChartWithTooltip
          title=""
          data={freeCashFlow}
          valuePrefix="$"
          showArea={true}
          color="#047857"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">New Renewal Customers vs. Time</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeFrameChange('renewals', 'monthly')}
              className={`px-3 py-1 text-xs rounded ${
                timeFrames.renewals === 'monthly' 
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeFrameChange('renewals', 'daily')}
              className={`px-3 py-1 text-xs rounded ${
                timeFrames.renewals === 'daily'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
          </div>
        </div>
        <ChartWithTooltip
          title=""
          data={renewalCustomers}
          color="#0891b2"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Total Customers vs. Time</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeFrameChange('customers', 'monthly')}
              className={`px-3 py-1 text-xs rounded ${
                timeFrames.customers === 'monthly' 
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeFrameChange('customers', 'daily')}
              className={`px-3 py-1 text-xs rounded ${
                timeFrames.customers === 'daily'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
          </div>
        </div>
        <ChartWithTooltip
          title=""
          data={totalCustomers}
          color="#6366f1"
          showArea={true}
        />
      </div>
    </div>
  );
}