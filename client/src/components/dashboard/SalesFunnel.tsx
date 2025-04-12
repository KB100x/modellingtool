interface FunnelStage {
  name: string;
  value: number;
  percentage: number;
}

interface SalesFunnelProps {
  stages: FunnelStage[];
  conversionLabels: string[];
}

export default function SalesFunnel({ stages, conversionLabels }: SalesFunnelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-6 pb-0">
        <h3 className="text-lg font-medium text-gray-800">Sales Funnel</h3>
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        {/* Funnel Chart */}
        <div className="flex flex-col items-center space-y-1">
          {stages.map((stage, index) => (
            <div 
              key={stage.name}
              style={{ width: `${stage.percentage}%` }} 
              className={`bg-primary ${index === 0 ? 'rounded-t-lg' : ''} ${index === stages.length - 1 ? 'rounded-b-lg' : ''} 
              bg-opacity-${90 - index * 10} text-white px-4 py-3 text-sm flex justify-between`}
            >
              <span>{stage.name}</span>
              <span>{stage.value}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          {conversionLabels.map((label, index) => (
            <div key={index} className="text-center">
              <div className="font-medium">{label}</div>
              <div className="mt-1">{index === 0 ? '100%' : `${Math.round(stages[index].percentage)}%`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
