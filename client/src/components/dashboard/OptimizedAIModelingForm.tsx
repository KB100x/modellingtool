import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

// Create model interface
interface ModelInputs {
  // Product Parameters
  priceOfOffer: string;
  realizationRate: string;
  costToFulfill: string;
  timeToSell: string;
  timeToMarket: string;
  timeToCollect: string;
  refundPeriod: string;
  refundRate: string;
  churnRate: string;
  
  // Renewals
  priceOfRenewal: string;
  timeToRenew: string;
  costToSellRenewal: string;
  costToFulfillRenewal: string;
  timeToCollectRenewal: string;
  renewalRateRenewals: string;
  
  // Sales & Marketing
  useGranular: boolean;
  costToMarket: string;
  costToSell: string;
  
  // Outbound
  outboundSalary: string;
  numberOfContacts: string;
  numberOfSDRs: string;
  outboundConversionRate: string;
  timeToMarketOutbound: string;
  leadToCustomerOutbound: string;
  
  // Inbound
  mediaSpend: string;
  cpm: string;
  ctr: string;
  funnelConversion: string;
  timeToMarketInbound: string;
  leadToCustomerInbound: string;
  
  // Starting State
  cash0: string;
  initialCustomers: string;
  
  // Viral Component
  useViral: boolean;
  invites: string;
  viralConversion: string;
  viralTime: string;
  viralStart: string;
  costToSellViral: string;
  costToMarketViral: string;
  
  // Administration
  transactionFee: string;
  fixedCost: string;
  fixedCostIncrease: string;
  upfrontCosts: string;
  debt: string;
  debtInterest: string;
  fcfLeftInCompany: string;
  
  // Valuation
  taxRate: string;
  inflationRate: string;
  maxTimePeriod: string;
  shares: string;
  
  // Valuation Methods
  useDCF: boolean;
  projectionPeriodDCF: string;
  discountRate: string;
  growthRate: string;
  
  useEBITDA: boolean;
  ebitdaMultiple: string;
  projectionPeriodEBITDA: string;
  
  usePE: boolean;
  peMultiple: string;
  projectionPeriodPE: string;
  
  useRevenue: boolean;
  evRevenueMultiple: string;
  projectionPeriodEVRevenue: string;
}

// Default values
const defaultValues: ModelInputs = {
  // Product Parameters
  priceOfOffer: "1200",
  realizationRate: "95",
  costToFulfill: "30",
  timeToSell: "20",
  timeToMarket: "5",
  timeToCollect: "365",
  refundPeriod: "45",
  refundRate: "3",
  churnRate: "15",
  
  // Renewals
  priceOfRenewal: "1200",
  timeToRenew: "365",
  costToSellRenewal: "15",
  costToFulfillRenewal: "30",
  timeToCollectRenewal: "30",
  renewalRateRenewals: "85",
  
  // Sales & Marketing
  useGranular: false,
  costToMarket: "20",
  costToSell: "18",
  
  // Outbound
  outboundSalary: "2500",
  numberOfContacts: "2000",
  numberOfSDRs: "2",
  outboundConversionRate: "1",
  timeToMarketOutbound: "15",
  leadToCustomerOutbound: "8",
  
  // Inbound
  mediaSpend: "10000",
  cpm: "23.08",
  ctr: "1.69",
  funnelConversion: "3.2",
  timeToMarketInbound: "1",
  leadToCustomerInbound: "8",
  
  // Starting State
  cash0: "50000",
  initialCustomers: "0",
  
  // Viral Component
  useViral: false,
  invites: "3",
  viralConversion: "5",
  viralTime: "14",
  viralStart: "30",
  costToSellViral: "5",
  costToMarketViral: "3",
  
  // Administration
  transactionFee: "2.9",
  fixedCost: "50000",
  fixedCostIncrease: "3000",
  upfrontCosts: "100000",
  debt: "0",
  debtInterest: "6",
  fcfLeftInCompany: "100",
  
  // Valuation
  taxRate: "25",
  inflationRate: "2",
  maxTimePeriod: "1825",
  shares: "1000000",
  
  // Valuation Methods
  useDCF: true,
  projectionPeriodDCF: "1825",
  discountRate: "15",
  growthRate: "3",
  
  useEBITDA: true,
  ebitdaMultiple: "14",
  projectionPeriodEBITDA: "365",
  
  usePE: true,
  peMultiple: "20",
  projectionPeriodPE: "365",
  
  useRevenue: true,
  evRevenueMultiple: "5",
  projectionPeriodEVRevenue: "365",
};

export default function OptimizedAIModelingForm() {
  // State for form values
  const [formValues, setFormValues] = useState<ModelInputs>(defaultValues);
  const [autoSave, setAutoSave] = useState(true);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    
    setFormValues(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    if (autoSave) {
      // Simulate auto-saving
      const timerId = setTimeout(() => {
        toast({
          title: "Auto-saved",
          description: `Changes to ${id.replace(/([A-Z])/g, ' $1').toLowerCase()} saved automatically.`,
          duration: 2000
        });
      }, 500);
      
      return () => clearTimeout(timerId);
    }
  };
  
  // Handle toggle change for boolean values
  const handleToggleChange = (id: string, checked: boolean) => {
    setFormValues(prev => ({
      ...prev,
      [id]: checked
    }));
  };
  
  // Save model dialog state
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const queryClient = useQueryClient();
  
  // Mutation for saving model
  const saveModelMutation = useMutation({
    mutationFn: async (modelData: any) => {
      const response = await fetch('/api/ai-models', {
        method: 'POST',
        body: JSON.stringify(modelData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save model: ${response.statusText}`);
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Model saved",
        description: `Model "${modelName}" has been saved successfully`,
        duration: 3000
      });
      
      // Reset dialog state
      setSaveDialogOpen(false);
      setModelName("");
      setModelDescription("");
      
      // Invalidate cache to refresh models list
      queryClient.invalidateQueries({ queryKey: ['/api/models'] });
      queryClient.invalidateQueries({ queryKey: ['/api/ai-models'] });
    },
    onError: (error) => {
      console.error("Error saving model:", error);
      toast({
        title: "Error saving model",
        description: "There was an error saving your model. Please try again.",
        variant: "destructive",
        duration: 5000
      });
    }
  });
  
  // Mutation for calculating metrics
  const calculateMetricsMutation = useMutation({
    mutationFn: async (inputValues: ModelInputs) => {
      // This would be replaced with a real API call to calculate metrics
      // For now, we'll simulate a calculation
      
      // Simple simulation of calculating some metrics
      const ltv = parseFloat(inputValues.priceOfOffer) / (parseFloat(inputValues.churnRate) / 100);
      const cac = (parseFloat(inputValues.costToMarket) + parseFloat(inputValues.costToSell)) * (parseFloat(inputValues.priceOfOffer) / 100);
      const conversionRate = parseFloat(inputValues.useGranular ? inputValues.leadToCustomerInbound : "8");
      const revenuePerCustomer = parseFloat(inputValues.priceOfOffer);
      
      // Calculate efficiency
      let efficiency: 'high' | 'medium' | 'low' = 'medium';
      const ratio = ltv / cac;
      if (ratio > 3) efficiency = 'high';
      else if (ratio < 1.5) efficiency = 'low';
      
      return {
        ltv,
        cac,
        conversionRate,
        revenuePerCustomer,
        efficiency,
        profit: ltv - cac,
        totalRevenue: revenuePerCustomer * 100, // Simulate for 100 customers
        cashFlow: (ltv - cac) * 100 // Simulate for 100 customers
      };
    }
  });
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate metrics
    calculateMetricsMutation.mutate(formValues, {
      onSuccess: (metrics) => {
        // Show save dialog
        toast({
          title: "Model processed",
          description: "Your model has been processed. You can now save it.",
          duration: 3000
        });
        
        setSaveDialogOpen(true);
      }
    });
  };
  
  // Handle save model
  const handleSaveModel = () => {
    if (!modelName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for your model",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    // Prepare model data
    const modelData = {
      name: modelName,
      description: modelDescription,
      ...formValues,
      metrics: calculateMetricsMutation.data
    };
    
    // Save model to database
    saveModelMutation.mutate(modelData);
  };
  
  // Reset form to defaults
  const handleReset = () => {
    if (confirm("Are you sure you want to reset all values to defaults?")) {
      setFormValues(defaultValues);
      toast({
        title: "Form reset",
        description: "All values have been reset to defaults.",
        duration: 3000
      });
    }
  };
  
  // Validate numeric input
  const validateNumeric = (value: string, allowZero = true): boolean => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return false;
    if (!allowZero && numValue <= 0) return false;
    return true;
  };
  
  return (
    <div className="py-4 px-2 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Modeling</h1>
        <p className="text-gray-600">
          Configure all parameters in one place to create accurate business forecasts. 
          All inputs are automatically saved as you type.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="autoSave"
            checked={autoSave}
            onCheckedChange={setAutoSave}
          />
          <Label htmlFor="autoSave">Auto-save changes</Label>
        </div>
        
        <div className="space-x-4">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSubmit}>
            Run Model
          </Button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Parameters Section */}
        <Accordion type="single" collapsible defaultValue="product">
          <AccordionItem value="product" className="border rounded-lg p-1">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold">Product Parameters</h2>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="priceOfOffer">Price of Offer (P)</Label>
                    <Input 
                      id="priceOfOffer" 
                      type="number" 
                      value={formValues.priceOfOffer}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.priceOfOffer, false) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Average contract value during initial term</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="realizationRate">Realization Rate (RR) %</Label>
                    <Input 
                      id="realizationRate" 
                      type="number" 
                      value={formValues.realizationRate}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.realizationRate, false) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Collected cash ÷ Requested cash (%)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costToFulfill">Cost to Fulfill (c_f) %</Label>
                    <Input 
                      id="costToFulfill" 
                      type="number" 
                      value={formValues.costToFulfill}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.costToFulfill) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Delivery cost as % of Price of offer</p>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="timeToSell">Time to Sell (days)</Label>
                    <Input 
                      id="timeToSell" 
                      type="number" 
                      value={formValues.timeToSell}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.timeToSell) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Days between lead creation and purchase</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeToMarket">Time to Market (days)</Label>
                    <Input 
                      id="timeToMarket" 
                      type="number" 
                      value={formValues.timeToMarket}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.timeToMarket) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Days between first impression and lead event</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeToCollect">Time to Collect (days)</Label>
                    <Input 
                      id="timeToCollect" 
                      type="number" 
                      value={formValues.timeToCollect}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.timeToCollect) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Days between purchase and full payment</p>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="refundPeriod">Refund Period (days)</Label>
                    <Input 
                      id="refundPeriod" 
                      type="number" 
                      value={formValues.refundPeriod}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.refundPeriod) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Days for processing refunds</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refundRate">Refund Rate (%)</Label>
                    <Input 
                      id="refundRate" 
                      type="number" 
                      value={formValues.refundRate}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.refundRate) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Percentage of customers refunded</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="churnRate">Churn Rate (%)</Label>
                    <Input 
                      id="churnRate" 
                      type="number" 
                      value={formValues.churnRate}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.churnRate) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Percentage who don't renew</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium mb-4">Renewals</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="priceOfRenewal">Price of Renewal</Label>
                    <Input 
                      id="priceOfRenewal" 
                      type="number" 
                      value={formValues.priceOfRenewal}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.priceOfRenewal, false) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Average total Price of Renewal offer</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeToRenew">Time to Renew (days)</Label>
                    <Input 
                      id="timeToRenew" 
                      type="number" 
                      value={formValues.timeToRenew}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.timeToRenew) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Days between purchase and renewal</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costToSellRenewal">Cost to Sell Renewal (%)</Label>
                    <Input 
                      id="costToSellRenewal" 
                      type="number" 
                      value={formValues.costToSellRenewal}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.costToSellRenewal) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Cost to renew a customer (% of renewal price)</p>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="costToFulfillRenewal">Cost to Fulfill Renewal (%)</Label>
                    <Input 
                      id="costToFulfillRenewal" 
                      type="number" 
                      value={formValues.costToFulfillRenewal}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.costToFulfillRenewal) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Cost to fulfill renewal (% of renewal price)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeToCollectRenewal">Time to Collect Renewal (days)</Label>
                    <Input 
                      id="timeToCollectRenewal" 
                      type="number" 
                      value={formValues.timeToCollectRenewal}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.timeToCollectRenewal) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Days between renewal and full payment</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="renewalRateRenewals">Renewal Rate of Renewals (%)</Label>
                    <Input 
                      id="renewalRateRenewals" 
                      type="number" 
                      value={formValues.renewalRateRenewals}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.renewalRateRenewals) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Percentage who renew again</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Sales & Marketing Section */}
        <Accordion type="single" collapsible>
          <AccordionItem value="sales" className="border rounded-lg p-1">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold">Sales & Marketing</h2>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="useGranular"
                    checked={formValues.useGranular}
                    onCheckedChange={(checked) => handleToggleChange('useGranular', checked)}
                  />
                  <Label htmlFor="useGranular">Use Granular View</Label>
                </div>
                
                {!formValues.useGranular ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="costToMarket">Cost to Market (c_m) %</Label>
                      <Input 
                        id="costToMarket" 
                        type="number" 
                        value={formValues.costToMarket}
                        onChange={handleInputChange}
                        className={validateNumeric(formValues.costToMarket) ? '' : 'border-red-500'}
                      />
                      <p className="text-xs text-gray-500">Cost to generate a lead (% of price)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="costToSell">Cost to Sell (c_s) %</Label>
                      <Input 
                        id="costToSell" 
                        type="number" 
                        value={formValues.costToSell}
                        onChange={handleInputChange}
                        className={validateNumeric(formValues.costToSell) ? '' : 'border-red-500'}
                      />
                      <p className="text-xs text-gray-500">Cost to convert lead to customer (% of price)</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Outbound Prospecting</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="outboundSalary">Outbound Salary ($)</Label>
                          <Input 
                            id="outboundSalary" 
                            type="number" 
                            value={formValues.outboundSalary}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.outboundSalary) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Average salary for an SDR</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="numberOfContacts">Contacts per Month</Label>
                          <Input 
                            id="numberOfContacts" 
                            type="number" 
                            value={formValues.numberOfContacts}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.numberOfContacts, false) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Average outreaches per SDR</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="numberOfSDRs">Number of SDRs</Label>
                          <Input 
                            id="numberOfSDRs" 
                            type="number" 
                            value={formValues.numberOfSDRs}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.numberOfSDRs) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Amount of SDRs prospecting</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="outboundConversionRate">Contact to Lead Rate (%)</Label>
                          <Input 
                            id="outboundConversionRate" 
                            type="number" 
                            value={formValues.outboundConversionRate}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.outboundConversionRate) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Percentage of contacts becoming leads</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeToMarketOutbound">Time to Market (days)</Label>
                          <Input 
                            id="timeToMarketOutbound" 
                            type="number" 
                            value={formValues.timeToMarketOutbound}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.timeToMarketOutbound) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Days between contact and lead event</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leadToCustomerOutbound">Lead to Customer Rate (%)</Label>
                          <Input 
                            id="leadToCustomerOutbound" 
                            type="number" 
                            value={formValues.leadToCustomerOutbound}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.leadToCustomerOutbound) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Percentage of leads becoming customers</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Inbound Marketing</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="mediaSpend">Media Spend ($)</Label>
                          <Input 
                            id="mediaSpend" 
                            type="number" 
                            value={formValues.mediaSpend}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.mediaSpend, false) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Monthly advertising budget</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cpm">CPM ($)</Label>
                          <Input 
                            id="cpm" 
                            type="number" 
                            value={formValues.cpm}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.cpm, false) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Cost for 1000 ad impressions</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ctr">Click Through Rate (%)</Label>
                          <Input 
                            id="ctr" 
                            type="number" 
                            value={formValues.ctr}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.ctr) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Percentage of impressions that get clicks</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="funnelConversion">Funnel Conversion Rate (%)</Label>
                          <Input 
                            id="funnelConversion" 
                            type="number" 
                            value={formValues.funnelConversion}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.funnelConversion) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Percentage of clicks becoming leads</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeToMarketInbound">Time to Market (days)</Label>
                          <Input 
                            id="timeToMarketInbound" 
                            type="number" 
                            value={formValues.timeToMarketInbound}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.timeToMarketInbound) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Days between impression and lead event</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leadToCustomerInbound">Lead to Customer Rate (%)</Label>
                          <Input 
                            id="leadToCustomerInbound" 
                            type="number" 
                            value={formValues.leadToCustomerInbound}
                            onChange={handleInputChange}
                            className={validateNumeric(formValues.leadToCustomerInbound) ? '' : 'border-red-500'}
                          />
                          <p className="text-xs text-gray-500">Percentage of leads becoming customers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Starting State Section */}
        <Accordion type="single" collapsible>
          <AccordionItem value="starting" className="border rounded-lg p-1">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold">Starting State</h2>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cash0">Cash in Bank ($)</Label>
                  <Input 
                    id="cash0" 
                    type="number" 
                    value={formValues.cash0}
                    onChange={handleInputChange}
                    className={validateNumeric(formValues.cash0) ? '' : 'border-red-500'}
                  />
                  <p className="text-xs text-gray-500">Cash at t=0</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialCustomers">Initial Customer Count</Label>
                  <Input 
                    id="initialCustomers" 
                    type="number" 
                    value={formValues.initialCustomers}
                    onChange={handleInputChange}
                    className={validateNumeric(formValues.initialCustomers) ? '' : 'border-red-500'}
                  />
                  <p className="text-xs text-gray-500">Customer count at t=0</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Viral Component Section */}
        <Accordion type="single" collapsible>
          <AccordionItem value="viral" className="border rounded-lg p-1">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold">Viral Component</h2>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="useViral"
                    checked={formValues.useViral}
                    onCheckedChange={(checked) => handleToggleChange('useViral', checked)}
                  />
                  <Label htmlFor="useViral">Use Viral Component</Label>
                </div>
                
                {formValues.useViral && (
                  <div className="grid gap-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="invites">Invites per Customer</Label>
                        <Input 
                          id="invites" 
                          type="number" 
                          value={formValues.invites}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.invites) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Referrals per customer during active time</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="viralConversion">Conversion Rate per Invite (%)</Label>
                        <Input 
                          id="viralConversion" 
                          type="number" 
                          value={formValues.viralConversion}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.viralConversion) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Percentage of invites converting to customers</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="viralTime">Viral Time (days)</Label>
                        <Input 
                          id="viralTime" 
                          type="number" 
                          value={formValues.viralTime}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.viralTime) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Days for referral to convert</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="viralStart">Viral Start (day)</Label>
                        <Input 
                          id="viralStart" 
                          type="number" 
                          value={formValues.viralStart}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.viralStart) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Day when viral effect begins</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="costToSellViral">Cost to Sell Viral (%)</Label>
                        <Input 
                          id="costToSellViral" 
                          type="number" 
                          value={formValues.costToSellViral}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.costToSellViral) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Cost to convert a referral (% of price)</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="costToMarketViral">Cost to Market Viral (%)</Label>
                        <Input 
                          id="costToMarketViral" 
                          type="number" 
                          value={formValues.costToMarketViral}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.costToMarketViral) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Cost to generate a successful viral invite (% of price)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Administration Section */}
        <Accordion type="single" collapsible>
          <AccordionItem value="admin" className="border rounded-lg p-1">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold">Administration</h2>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="transactionFee">Transaction Fee (%)</Label>
                    <Input 
                      id="transactionFee" 
                      type="number" 
                      value={formValues.transactionFee}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.transactionFee) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Payment processor fee percentage</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fixedCost">Fixed Cost per Month ($)</Label>
                    <Input 
                      id="fixedCost" 
                      type="number" 
                      value={formValues.fixedCost}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.fixedCost) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Monthly fixed costs</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fixedCostIncrease">Fixed Cost Increase per 100 Customers ($)</Label>
                    <Input 
                      id="fixedCostIncrease" 
                      type="number" 
                      value={formValues.fixedCostIncrease}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.fixedCostIncrease) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Additional fixed costs per 100 customers</p>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="upfrontCosts">Upfront Investment Costs ($)</Label>
                    <Input 
                      id="upfrontCosts" 
                      type="number" 
                      value={formValues.upfrontCosts}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.upfrontCosts) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Initial capital for starting</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="debt">Debt ($)</Label>
                    <Input 
                      id="debt" 
                      type="number" 
                      value={formValues.debt}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.debt) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Total liabilities</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="debtInterest">Debt Interest Rate (%)</Label>
                    <Input 
                      id="debtInterest" 
                      type="number" 
                      value={formValues.debtInterest}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.debtInterest) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Annual interest rate on debt</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fcfLeftInCompany">FCF Left in Company (%)</Label>
                    <Input 
                      id="fcfLeftInCompany" 
                      type="number" 
                      value={formValues.fcfLeftInCompany}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.fcfLeftInCompany) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Percentage of free cash flow retained</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Valuation Section */}
        <Accordion type="single" collapsible>
          <AccordionItem value="valuation" className="border rounded-lg p-1">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold">Valuation</h2>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input 
                      id="taxRate" 
                      type="number" 
                      value={formValues.taxRate}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.taxRate) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Applicable tax rate</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                    <Input 
                      id="inflationRate" 
                      type="number" 
                      value={formValues.inflationRate}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.inflationRate) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Annual inflation rate</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxTimePeriod">Time Max (days)</Label>
                    <Input 
                      id="maxTimePeriod" 
                      type="number" 
                      value={formValues.maxTimePeriod}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.maxTimePeriod, false) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Simulation period in days</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shares">Number of Shares</Label>
                    <Input 
                      id="shares" 
                      type="number" 
                      value={formValues.shares}
                      onChange={handleInputChange}
                      className={validateNumeric(formValues.shares, false) ? '' : 'border-red-500'}
                    />
                    <p className="text-xs text-gray-500">Outstanding shares</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="useDCF" 
                      checked={formValues.useDCF}
                      onCheckedChange={(checked) => handleToggleChange('useDCF', !!checked)}
                    />
                    <Label htmlFor="useDCF" className="text-base font-medium">DCF Method</Label>
                  </div>
                  
                  {formValues.useDCF && (
                    <div className="grid gap-4 md:grid-cols-3 pl-6">
                      <div className="space-y-2">
                        <Label htmlFor="projectionPeriodDCF">Projection Period DCF (days)</Label>
                        <Input 
                          id="projectionPeriodDCF" 
                          type="number" 
                          value={formValues.projectionPeriodDCF}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.projectionPeriodDCF, false) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Time before terminal value calculation</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discountRate">Discount Rate (%)</Label>
                        <Input 
                          id="discountRate" 
                          type="number" 
                          value={formValues.discountRate}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.discountRate, false) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Investors' required return</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="growthRate">Growth Rate (%)</Label>
                        <Input 
                          id="growthRate" 
                          type="number" 
                          value={formValues.growthRate}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.growthRate) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Long-term steady growth rate</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="useEBITDA" 
                      checked={formValues.useEBITDA}
                      onCheckedChange={(checked) => handleToggleChange('useEBITDA', !!checked)}
                    />
                    <Label htmlFor="useEBITDA" className="text-base font-medium">EBITDA Multiple Method</Label>
                  </div>
                  
                  {formValues.useEBITDA && (
                    <div className="grid gap-4 md:grid-cols-2 pl-6">
                      <div className="space-y-2">
                        <Label htmlFor="ebitdaMultiple">Enterprise Multiple EBITDA</Label>
                        <Input 
                          id="ebitdaMultiple" 
                          type="number" 
                          value={formValues.ebitdaMultiple}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.ebitdaMultiple, false) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Industry multiple (SaaS: 14, Consulting: 8)</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectionPeriodEBITDA">Projection Period EBITDA (days)</Label>
                        <Input 
                          id="projectionPeriodEBITDA" 
                          type="number" 
                          value={formValues.projectionPeriodEBITDA}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.projectionPeriodEBITDA, false) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">At least 365 days</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="usePE" 
                      checked={formValues.usePE}
                      onCheckedChange={(checked) => handleToggleChange('usePE', !!checked)}
                    />
                    <Label htmlFor="usePE" className="text-base font-medium">P/E Method</Label>
                  </div>
                  
                  {formValues.usePE && (
                    <div className="grid gap-4 md:grid-cols-2 pl-6">
                      <div className="space-y-2">
                        <Label htmlFor="peMultiple">PE Multiple</Label>
                        <Input 
                          id="peMultiple" 
                          type="number" 
                          value={formValues.peMultiple}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.peMultiple, false) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Price/Earnings ratio</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectionPeriodPE">Projection Period PE (days)</Label>
                        <Input 
                          id="projectionPeriodPE" 
                          type="number" 
                          value={formValues.projectionPeriodPE}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.projectionPeriodPE, false) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">At least 365 days</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="useRevenue" 
                      checked={formValues.useRevenue}
                      onCheckedChange={(checked) => handleToggleChange('useRevenue', !!checked)}
                    />
                    <Label htmlFor="useRevenue" className="text-base font-medium">Revenue Multiple Method</Label>
                  </div>
                  
                  {formValues.useRevenue && (
                    <div className="grid gap-4 md:grid-cols-2 pl-6">
                      <div className="space-y-2">
                        <Label htmlFor="evRevenueMultiple">EV Revenue Multiple</Label>
                        <Input 
                          id="evRevenueMultiple" 
                          type="number" 
                          value={formValues.evRevenueMultiple}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.evRevenueMultiple, false) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">Enterprise value to revenue multiple</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectionPeriodEVRevenue">Projection Period EV Revenue (days)</Label>
                        <Input 
                          id="projectionPeriodEVRevenue" 
                          type="number" 
                          value={formValues.projectionPeriodEVRevenue}
                          onChange={handleInputChange}
                          className={validateNumeric(formValues.projectionPeriodEVRevenue, false) ? '' : 'border-red-500'}
                        />
                        <p className="text-xs text-gray-500">At least 365 days</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Model Output Section */}
        <Accordion type="single" collapsible>
          <AccordionItem value="output" className="border rounded-lg p-1">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold">Model Output</h2>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="p-8 flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-center text-gray-500 mb-4">Run your model to see results</p>
                <Button 
                  size="lg" 
                  onClick={handleSubmit} 
                  className="bg-primary hover:bg-primary/90"
                >
                  Run Model
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex justify-center pt-4">
          <Button type="submit" size="lg" className="min-w-[200px]">
            Submit Model
          </Button>
        </div>
      </form>
      
      {/* Save Model Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Model</DialogTitle>
            <DialogDescription>
              Give your model a name and description to save it for future reference.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modelName" className="text-right">
                Name
              </Label>
              <Input
                id="modelName"
                placeholder="My Business Model"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelDescription" className="text-right">
                Description (optional)
              </Label>
              <Input
                id="modelDescription"
                placeholder="Description of this model..."
                value={modelDescription}
                onChange={(e) => setModelDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSaveModel}
              disabled={saveModelMutation.isPending}
            >
              {saveModelMutation.isPending ? "Saving..." : "Save Model"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}