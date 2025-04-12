interface Insight {
  title: string;
  description: string;
  icon: 'info' | 'eye';
}

interface AIInsightsProps {
  insights: Insight[];
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">AI Insights</h3>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              {insight.icon === 'info' ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                </svg>
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{insight.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button 
          onClick={() => alert("Viewing all AI Insights")}
          className="w-full text-primary bg-primary bg-opacity-10 hover:bg-opacity-20 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
        >
          See All AI Insights
        </button>
      </div>
    </div>
  );
}
