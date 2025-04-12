import { useState } from 'react';
import { Badge } from "@/components/ui/badge";

interface ModelData {
  id: number;
  name: string;
  category: string;
  metrics: {
    ltv: number;
    cac: number;
    conversionRate: number;
    revenuePerCustomer: number;
  };
  status: string;
  efficiency: 'high' | 'medium' | 'low';
}

interface ModelPerformanceProps {
  models: ModelData[];
}

export default function ModelPerformance({ models: initialModels }: ModelPerformanceProps) {
  const [models, setModels] = useState<ModelData[]>(initialModels);
  const [sortByEfficiency, setSortByEfficiency] = useState<boolean>(false);
  const [sortByRevenue, setSortByRevenue] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Sort models according to selected sort options
  const sortedModels = [...models].sort((a, b) => {
    if (sortByEfficiency) {
      const efficiencyValues = { high: 3, medium: 2, low: 1 };
      return efficiencyValues[b.efficiency] - efficiencyValues[a.efficiency];
    } else if (sortByRevenue) {
      return b.metrics.revenuePerCustomer - a.metrics.revenuePerCustomer;
    }
    return 0;
  });
  
  const getEfficiencyColor = (efficiency: 'high' | 'medium' | 'low') => {
    switch (efficiency) {
      case 'high': return 'green';
      case 'medium': return 'yellow';
      case 'low': return 'red';
      default: return 'gray';
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1
    }).format(value / 100);
  };
  
  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-800">Model Performance</h3>
        <div className="flex items-center space-x-2">
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
            onClick={() => {
              setSortByRevenue(false);
              setSortByEfficiency(!sortByEfficiency);
            }}
            className={`flex items-center text-xs ${sortByEfficiency ? 'text-primary' : 'text-gray-600'} hover:text-primary cursor-pointer`}
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
            <span>Sort By Efficiency</span>
          </button>
          <button 
            onClick={() => {
              setSortByEfficiency(false);
              setSortByRevenue(!sortByRevenue);
            }}
            className={`flex items-center text-xs ${sortByRevenue ? 'text-primary' : 'text-gray-600'} hover:text-primary cursor-pointer`}
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
            <span>Sort By Revenue</span>
          </button>
          <button 
            onClick={() => alert("Exporting model data...")}
            className="flex items-center text-xs text-gray-600 hover:text-primary cursor-pointer"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd"></path>
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">LTV</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">CAC</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">LTV:CAC</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue/Customer</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. Rate</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedModels.map(model => (
              <tr key={model.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{model.name}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{model.category}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(model.metrics.ltv)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(model.metrics.cac)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                  {(model.metrics.ltv / model.metrics.cac).toFixed(2)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                  {formatCurrency(model.metrics.revenuePerCustomer)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                  {formatPercentage(model.metrics.conversionRate)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge variant="outline" className={`bg-opacity-10 text-xs font-medium bg-${getEfficiencyColor(model.efficiency)}-100 text-${getEfficiencyColor(model.efficiency)}-800 rounded-full`}>
                    {model.efficiency.charAt(0).toUpperCase() + model.efficiency.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center text-xs text-gray-500">
          <span>Showing {sortedModels.length} models</span>
        </div>
        
        <div className="flex space-x-1">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
          >
            Previous
          </button>
          
          {[1, 2, 3].map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-xs ${
                currentPage === page 
                  ? 'text-white bg-primary border border-primary' 
                  : 'text-gray-500 border border-gray-300 hover:bg-gray-50'
              } rounded cursor-pointer`}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            className="px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}