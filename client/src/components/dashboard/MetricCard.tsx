interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    isPositive: boolean;
  };
  indicatorHeight?: number;
}

export default function MetricCard({ title, value, change, indicatorHeight = 8 }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`flex items-center text-xs ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            {change.isPositive ? (
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414l3.293 3.293A1 1 0 0014 13z" clipRule="evenodd" />
            )}
          </svg>
          <span>{change.value} vs Last Month</span>
        </div>
      </div>
      <div className="flex items-end">
        <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
        <div className={`ml-2 h-${indicatorHeight} w-2 bg-primary rounded-t-sm`}></div>
      </div>
    </div>
  );
}
