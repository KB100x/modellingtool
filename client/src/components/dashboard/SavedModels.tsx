import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface SavedModelsProps {
  onSelectModel?: (model: any) => void;
}

export default function SavedModels({ onSelectModel }: SavedModelsProps) {
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  
  const { data: models, isLoading, error } = useQuery({
    queryKey: ['/api/ai-models'],
    queryFn: async () => {
      const response = await fetch('/api/ai-models');
      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }
      return response.json();
    }
  });
  
  const handleSelectModel = (modelId: string) => {
    const id = parseInt(modelId);
    setSelectedModelId(id);
    
    if (onSelectModel && models) {
      const selectedModel = models.find((model: any) => model.id === id);
      if (selectedModel) {
        onSelectModel(selectedModel);
      }
    }
  };
  
  // Get the selected model data
  const selectedModel = models?.find((model: any) => model.id === selectedModelId);
  
  // Create data for metrics chart
  const createMetricsData = (model: any) => {
    if (!model || !model.metrics) return [];
    
    return [
      { name: 'LTV', value: model.metrics.ltv },
      { name: 'CAC', value: model.metrics.cac },
      { name: 'Revenue/Customer', value: model.metrics.revenuePerCustomer },
      { name: 'Profit/Customer', value: model.metrics.profit }
    ];
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Models</CardTitle>
          <CardDescription>Loading your saved models...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Models</CardTitle>
          <CardDescription>Error loading models</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load saved models. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Saved Models</span>
          <Badge variant="outline" className="ml-2">
            {models?.length || 0} models
          </Badge>
        </CardTitle>
        <CardDescription>Select a model to view or apply to dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        {models && models.length > 0 ? (
          <div className="space-y-4">
            <Select onValueChange={handleSelectModel} value={selectedModelId?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model: any) => (
                  <SelectItem key={model.id} value={model.id.toString()}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedModel && (
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium mb-1">{selectedModel.name}</h3>
                  {selectedModel.description && (
                    <p className="text-sm text-gray-500">{selectedModel.description}</p>
                  )}
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge className={selectedModel.metrics?.efficiency === 'high' ? 'bg-green-500' : 
                              selectedModel.metrics?.efficiency === 'low' ? 'bg-red-500' : 'bg-blue-500'}>
                      {selectedModel.metrics?.efficiency || 'Unknown'} efficiency
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Created {new Date(selectedModel.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {selectedModel.metrics && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Metrics</h4>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={createMetricsData(selectedModel)}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" fontSize={10} />
                          <YAxis fontSize={10} />
                          <Tooltip 
                            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Value']} 
                          />
                          <Bar dataKey="value" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">LTV/CAC Ratio:</span>
                        <span className="font-medium">{(selectedModel.metrics.ltv / selectedModel.metrics.cac).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Conversion:</span>
                        <span className="font-medium">{selectedModel.metrics.conversionRate}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">No saved models found</p>
            <Button variant="outline" asChild>
              <a href="/ai-modeling">Create a model</a>
            </Button>
          </div>
        )}
      </CardContent>
      {selectedModel && onSelectModel && (
        <CardFooter className="justify-end">
          <Button 
            size="sm" 
            onClick={() => onSelectModel(selectedModel)}
          >
            Apply to Dashboard
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}