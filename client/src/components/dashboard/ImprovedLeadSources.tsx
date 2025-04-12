import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeadSource {
  name: string;
  count: number;
  percentage: number;
}

interface LeadSourcesProps {
  sources: LeadSource[];
}

export default function ImprovedLeadSources({ sources }: LeadSourcesProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-800">Lead Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sources.map((source, index) => (
            <div key={index} className="flex items-center gap-6">
              <div className="min-w-[120px] text-sm text-gray-600">{source.name}</div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${source.percentage}%` }}
                ></div>
              </div>
              <div className="min-w-[60px] text-right text-sm text-gray-600">{source.count}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}