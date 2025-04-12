import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface PerformanceData {
  name: string;
  growth: number;
  conversion: number;
}

interface ProductPerformanceProps {
  growthData: PerformanceData[];
  conversionData: PerformanceData[];
}

export default function ProductPerformance({ growthData, conversionData }: ProductPerformanceProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-6 pb-2">
        <h3 className="text-lg font-medium text-gray-800">Product Performance</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => alert("Filter options")} 
            className="flex items-center text-xs text-gray-600 hover:text-primary cursor-pointer"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
            </svg>
            <span>Filter</span>
          </button>
          <button 
            onClick={() => alert("More options")} 
            className="flex items-center text-xs text-gray-600 hover:text-primary cursor-pointer"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
            <span>More</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Growth Trends */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Growth Trends</h4>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    fontSize={10}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '0.375rem',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                    formatter={(value) => [`${value}%`, 'Growth']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="hsl(268, 75%, 55%)" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(268, 75%, 55%)" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Conversion Metrics */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Conversion Metrics</h4>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    fontSize={10}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '0.375rem',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                    formatter={(value) => [`${value}%`, 'Conversion Rate']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversion" 
                    stroke="hsl(268, 75%, 55%)" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(268, 75%, 55%)" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
