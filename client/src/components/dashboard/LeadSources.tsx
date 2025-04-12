interface LeadSource {
  name: string;
  count: number;
  percentage: number;
}

interface LeadSourcesProps {
  sources: LeadSource[];
}

export default function LeadSources({ sources }: LeadSourcesProps) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Lead Sources</h3>
      
      <div className="space-y-3">
        {sources.map(source => (
          <div key={source.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-800 w-20">{source.name}</span>
              <div className="w-80 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: `${source.percentage}%` }}></div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-800">{source.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
