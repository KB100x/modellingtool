import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface SalesData {
  name: string;
  revenue: number;
  transactions: number;
}

interface SalesChartProps {
  data: SalesData[];
  totalRevenue: string;
  growthRate: string;
}

export default function SalesChart({ data, totalRevenue, growthRate }: SalesChartProps) {
  const [timeRange, setTimeRange] = useState<"month" | "all">("all");
  const [visibleSeries, setVisibleSeries] = useState({
    revenue: true,
    transactions: true,
    forecast: true
  });
  
  const toggleSeries = (series: 'revenue' | 'transactions' | 'forecast') => {
    setVisibleSeries({
      ...visibleSeries,
      [series]: !visibleSeries[series]
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm col-span-2">
      <div className="flex items-center justify-between p-6 pb-0">
        <h3 className="text-lg font-medium text-gray-800">Sales Trends</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-2 py-1 text-xs font-medium ${timeRange === "month" 
              ? "text-white bg-primary" 
              : "text-gray-600 border border-gray-300"} rounded hover:bg-gray-50`}
            onClick={() => setTimeRange("month")}
          >
            Last 30 Days
          </button>
          <button 
            className={`px-2 py-1 text-xs font-medium ${timeRange === "all" 
              ? "text-white bg-primary" 
              : "text-gray-600 border border-gray-300"} rounded hover:bg-gray-50`}
            onClick={() => setTimeRange("all")}
          >
            All Time
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <h4 className="text-xl font-bold text-gray-900">{totalRevenue}</h4>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded">{growthRate}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div 
              onClick={() => toggleSeries('revenue')} 
              className={`flex items-center text-xs font-medium ${visibleSeries.revenue ? 'text-primary' : 'text-gray-400'} hover:text-primary cursor-pointer`}
            >
              <span className={`w-3 h-3 ${visibleSeries.revenue ? 'bg-primary' : 'bg-gray-300'} rounded-full mr-1`}></span>
              <span>Revenue</span>
            </div>
            <div 
              onClick={() => toggleSeries('transactions')} 
              className={`flex items-center text-xs font-medium ${visibleSeries.transactions ? 'text-gray-600' : 'text-gray-400'} hover:text-primary cursor-pointer`}
            >
              <span className={`w-3 h-3 ${visibleSeries.transactions ? 'bg-purple-300' : 'bg-gray-300'} rounded-full mr-1`}></span>
              <span>Transactions</span>
            </div>
            <div 
              onClick={() => toggleSeries('forecast')} 
              className={`flex items-center text-xs font-medium ${visibleSeries.forecast ? 'text-gray-600' : 'text-gray-400'} hover:text-primary cursor-pointer`}
            >
              <span className={`w-3 h-3 ${visibleSeries.forecast ? 'bg-purple-200' : 'bg-gray-300'} rounded-full mr-1`}></span>
              <span>Forecast</span>
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-44 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}
                formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Transactions']}
              />
              {visibleSeries.revenue && <Bar dataKey="revenue" fill="hsl(268, 75%, 55%)" radius={[4, 4, 0, 0]} />}
              {visibleSeries.transactions && <Bar dataKey="transactions" fill="hsl(268, 65%, 72%)" radius={[4, 4, 0, 0]} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
