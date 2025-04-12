import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Performer {
  id: number;
  name: string;
  region: string;
  email: string;
  revenue: number;
  status: string;
  avatarColor: string;
  initials: string;
}

interface TopPerformersProps {
  performers: Performer[];
}

export default function TopPerformers({ performers }: TopPerformersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByName, setSortByName] = useState(false);
  
  // Sort performers if needed
  const sortedPerformers = [...performers].sort((a, b) => {
    if (sortByName) {
      return a.name.localeCompare(b.name);
    }
    return b.revenue - a.revenue; // Default sort by revenue (highest first)
  });
  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-800">Top Performers</h3>
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
            onClick={() => setSortByName(!sortByName)}
            className={`flex items-center text-xs ${sortByName ? 'text-primary' : 'text-gray-600'} hover:text-primary cursor-pointer`}
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
            <span>Sort By Name</span>
          </button>
          <button 
            onClick={() => alert("Exporting data...")}
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPerformers.map(performer => (
              <tr key={performer.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 bg-${performer.avatarColor}-100 rounded-full flex items-center justify-center text-${performer.avatarColor}-600 font-medium text-sm`}>
                      {performer.initials}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{performer.name}</div>
                      <div className="text-xs text-gray-500">{performer.region}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{performer.email}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 text-right">${performer.revenue.toLocaleString()}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge variant="outline" className="bg-opacity-10 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {performer.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center text-xs text-gray-500">
          <span>Showing {sortedPerformers.length} performers</span>
        </div>
        
        <div className="flex space-x-1">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
          >
            Previous
          </button>
          
          {[1, 2, 3, 4, 5].map(page => (
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
            onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
            className="px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
