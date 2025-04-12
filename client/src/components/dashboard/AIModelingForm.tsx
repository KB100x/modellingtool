import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function AIModelingForm() {
  const [showGranular, setShowGranular] = useState(false);
  const [selectedGranularTab, setSelectedGranularTab] = useState<string | null>(null);
  const [showViral, setShowViral] = useState(false);
  const [selectedValuationMethods, setSelectedValuationMethods] = useState({
    dcf: true,
    ebitda: true,
    pe: true,
    revenue: true
  });
  
  const toggleValuationMethod = (method: string) => {
    setSelectedValuationMethods(prev => ({
      ...prev,
      [method]: !prev[method as keyof typeof prev]
    }));
  };
  
  const handleGranularTabChange = (value: string) => {
    setSelectedGranularTab(value === selectedGranularTab ? null : value);
  };
  
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">AI Modeling</h1>
        <p className="text-gray-600 mb-8">Configure model parameters to create accurate business forecasts</p>
      </div>
      
      <Tabs defaultValue="product" className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-7 mb-8">
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="sales">Sales & Marketing</TabsTrigger>
          <TabsTrigger value="starting">Starting State</TabsTrigger>
          <TabsTrigger value="viral">Viral Component</TabsTrigger>
          <TabsTrigger value="admin">Administration</TabsTrigger>
          <TabsTrigger value="valuation">Valuation</TabsTrigger>
          <TabsTrigger value="output">Output</TabsTrigger>
        </TabsList>
        
        {/* Product Section */}
        <TabsContent value="product" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Parameters</CardTitle>
              <CardDescription>Define your core product offering parameters</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="priceOfOffer">Price of Offer (P)</Label>
                  <Input id="priceOfOffer" type="number" placeholder="e.g. 1200" />
                  <p className="text-xs text-gray-500">Average contract value during initial term</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="realizationRate">Realization Rate (RR)</Label>
                  <Input id="realizationRate" type="number" placeholder="e.g. 95" />
                  <p className="text-xs text-gray-500">Collected cash ÷ Requested cash (%)</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="costToFulfill">Cost to Fulfill (c_f)</Label>
                  <Input id="costToFulfill" type="number" placeholder="e.g. 30" />
                  <p className="text-xs text-gray-500">Delivery cost as % of Price of offer</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeToSell">Time to Sell (t_s)</Label>
                  <Input id="timeToSell" type="number" placeholder="e.g. 20" />
                  <p className="text-xs text-gray-500">Days between lead creation and purchase</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timeToMarket">Time to Market (t_m)</Label>
                  <Input id="timeToMarket" type="number" placeholder="e.g. 5" />
                  <p className="text-xs text-gray-500">Days between first impression and lead event</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeToCollect">Time to Collect (t_c)</Label>
                  <Input id="timeToCollect" type="number" placeholder="e.g. 365" />
                  <p className="text-xs text-gray-500">Days between purchase and full payment</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="refundPeriod">Refund Period</Label>
                  <Input id="refundPeriod" type="number" placeholder="e.g. 45" />
                  <p className="text-xs text-gray-500">Days for processing refunds</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refundRate">Refund Rate (%)</Label>
                  <Input id="refundRate" type="number" placeholder="e.g. 3" />
                  <p className="text-xs text-gray-500">Percentage of customers refunded</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="churnRate">Churn Rate (%)</Label>
                  <Input id="churnRate" type="number" placeholder="e.g. 15" />
                  <p className="text-xs text-gray-500">Percentage who don't renew</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Renewals</CardTitle>
              <CardDescription>Configure renewal parameters</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="priceOfRenewal">Price of Renewal (p_renewal)</Label>
                  <Input id="priceOfRenewal" type="number" placeholder="e.g. 1200" />
                  <p className="text-xs text-gray-500">Average total Price of Renewal offer</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeToRenew">Time to Renew (t_renew)</Label>
                  <Input id="timeToRenew" type="number" placeholder="e.g. 365" />
                  <p className="text-xs text-gray-500">Days between purchase and renewal</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="costToSellRenewal">Cost to Sell Renewal (c_s_renewals)</Label>
                  <Input id="costToSellRenewal" type="number" placeholder="e.g. 15" />
                  <p className="text-xs text-gray-500">Cost to renew a customer (% of renewal price)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costToFulfillRenewal">Cost to Fulfill Renewal (c_f_renewal)</Label>
                  <Input id="costToFulfillRenewal" type="number" placeholder="e.g. 30" />
                  <p className="text-xs text-gray-500">Cost to fulfill renewal (% of renewal price)</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timeToCollectRenewal">Time to Collect Renewal (t_c_renewal)</Label>
                  <Input id="timeToCollectRenewal" type="number" placeholder="e.g. 30" />
                  <p className="text-xs text-gray-500">Days between renewal and full payment</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="renewalRateRenewals">Renewal Rate of Renewals</Label>
                  <Input id="renewalRateRenewals" type="number" placeholder="e.g. 85" />
                  <p className="text-xs text-gray-500">Percentage who renew again (%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Sales & Marketing Section */}
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales & Marketing Parameters</CardTitle>
              <CardDescription>
                Configure how you acquire and convert customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="granular-view"
                  checked={showGranular}
                  onCheckedChange={setShowGranular}
                />
                <Label htmlFor="granular-view">Use Granular View</Label>
              </div>
              
              {!showGranular ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="costToMarket">Cost to Market (c_m)</Label>
                    <Input id="costToMarket" type="number" placeholder="e.g. 20" />
                    <p className="text-xs text-gray-500">Cost to generate a lead (% of price)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costToSell">Cost to Sell (c_s)</Label>
                    <Input id="costToSell" type="number" placeholder="e.g. 18" />
                    <p className="text-xs text-gray-500">Cost to convert lead to customer (% of price)</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <Button 
                      variant={selectedGranularTab === 'outbound' ? 'default' : 'outline'} 
                      onClick={() => handleGranularTabChange('outbound')}
                    >
                      Outbound
                    </Button>
                    <Button 
                      variant={selectedGranularTab === 'inbound' ? 'default' : 'outline'}
                      onClick={() => handleGranularTabChange('inbound')}
                    >
                      Inbound
                    </Button>
                  </div>
                  
                  {selectedGranularTab === 'outbound' && (
                    <div className="space-y-6 pt-4">
                      <h3 className="text-lg font-medium">Outbound Prospecting</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="outboundSalary">Outbound Salary</Label>
                          <Input id="outboundSalary" type="number" placeholder="e.g. 2500" />
                          <p className="text-xs text-gray-500">Average salary for an SDR ($)</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="numberOfContacts">Number of Contacts per Month</Label>
                          <Input id="numberOfContacts" type="number" placeholder="e.g. 2000" />
                          <p className="text-xs text-gray-500">Average outreaches per SDR</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="numberOfSDRs">Number of SDRs</Label>
                          <Input id="numberOfSDRs" type="number" placeholder="e.g. 2" />
                          <p className="text-xs text-gray-500">Amount of SDRs prospecting</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="outboundConversionRate">Outbound Contact to Lead Conversion Rate (%)</Label>
                          <Input id="outboundConversionRate" type="number" placeholder="e.g. 1" />
                          <p className="text-xs text-gray-500">Percentage of contacts becoming leads</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="timeToMarketOutbound">Time to Market Outbound</Label>
                          <Input id="timeToMarketOutbound" type="number" placeholder="e.g. 15" />
                          <p className="text-xs text-gray-500">Days between contact and lead event</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leadToCustomerOutbound">Lead to Customer Conversion Rate Outbound (%)</Label>
                          <Input id="leadToCustomerOutbound" type="number" placeholder="e.g. 8" />
                          <p className="text-xs text-gray-500">Percentage of leads becoming customers</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedGranularTab === 'inbound' && (
                    <div className="space-y-6 pt-4">
                      <h3 className="text-lg font-medium">Inbound Marketing</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="mediaSpend">Media Spend</Label>
                          <Input id="mediaSpend" type="number" placeholder="e.g. 10000" />
                          <p className="text-xs text-gray-500">Monthly advertising budget ($)</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cpm">Cost per Thousand Impressions (CPM)</Label>
                          <Input id="cpm" type="number" placeholder="e.g. 23.08" />
                          <p className="text-xs text-gray-500">Cost for 1000 ad impressions ($)</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="ctr">Click Through Rate (CTR) (%)</Label>
                          <Input id="ctr" type="number" placeholder="e.g. 1.69" />
                          <p className="text-xs text-gray-500">Percentage of impressions that get clicks</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="funnelConversion">Funnel Conversion Rate (%)</Label>
                          <Input id="funnelConversion" type="number" placeholder="e.g. 3.2" />
                          <p className="text-xs text-gray-500">Percentage of clicks becoming leads</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="timeToMarketInbound">Time to Market Inbound</Label>
                          <Input id="timeToMarketInbound" type="number" placeholder="e.g. 1" />
                          <p className="text-xs text-gray-500">Days between impression and lead event</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leadToCustomerInbound">Lead to Customer Conversion Rate Inbound (%)</Label>
                          <Input id="leadToCustomerInbound" type="number" placeholder="e.g. 8" />
                          <p className="text-xs text-gray-500">Percentage of leads becoming customers</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Starting State Section */}
        <TabsContent value="starting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Starting State</CardTitle>
              <CardDescription>Define your starting position</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cash0">Cash in Bank (cash_0)</Label>
                  <Input id="cash0" type="number" placeholder="e.g. 50000" />
                  <p className="text-xs text-gray-500">Cash at t=0 ($)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialCustomers">Initial Customer Count (c_0)</Label>
                  <Input id="initialCustomers" type="number" placeholder="e.g. 0" />
                  <p className="text-xs text-gray-500">Customer count at t=0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Viral Component Section */}
        <TabsContent value="viral" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Viral Component</CardTitle>
              <CardDescription>Configure viral marketing effects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="viral-component"
                  checked={showViral}
                  onCheckedChange={setShowViral}
                />
                <Label htmlFor="viral-component">Use Viral Component</Label>
              </div>
              
              {showViral && (
                <div className="grid gap-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="invites">Invites per Customer</Label>
                      <Input id="invites" type="number" placeholder="e.g. 3" />
                      <p className="text-xs text-gray-500">Referrals per customer during active time</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="viralConversion">Conversion Rate per Invite (%)</Label>
                      <Input id="viralConversion" type="number" placeholder="e.g. 5" />
                      <p className="text-xs text-gray-500">Percentage of invites converting to customers</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="viralTime">Viral Time</Label>
                      <Input id="viralTime" type="number" placeholder="e.g. 14" />
                      <p className="text-xs text-gray-500">Days for referral to convert</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="viralStart">Viral Start</Label>
                      <Input id="viralStart" type="number" placeholder="e.g. 30" />
                      <p className="text-xs text-gray-500">Day when viral effect begins</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="costToSellViral">Cost to Sell Viral (%)</Label>
                      <Input id="costToSellViral" type="number" placeholder="e.g. 5" />
                      <p className="text-xs text-gray-500">Cost to convert a referral (% of price)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="costToMarketViral">Cost to Market Viral (%)</Label>
                      <Input id="costToMarketViral" type="number" placeholder="e.g. 3" />
                      <p className="text-xs text-gray-500">Cost to generate a successful viral invite (% of price)</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Administration Section */}
        <TabsContent value="admin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Administration</CardTitle>
              <CardDescription>Configure financial parameters</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="transactionFee">Transaction Fee (TF) (%)</Label>
                  <Input id="transactionFee" type="number" placeholder="e.g. 2.9" />
                  <p className="text-xs text-gray-500">Payment processor fee percentage</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fixedCost">Fixed Cost per Month (FC)</Label>
                  <Input id="fixedCost" type="number" placeholder="e.g. 50000" />
                  <p className="text-xs text-gray-500">Monthly fixed costs ($)</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fixedCostIncrease">Fixed Cost Increase per Hundred Customers ($)</Label>
                  <Input id="fixedCostIncrease" type="number" placeholder="e.g. 3000" />
                  <p className="text-xs text-gray-500">Additional fixed costs per 100 customers</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upfrontCosts">Upfront Investment Costs ($)</Label>
                  <Input id="upfrontCosts" type="number" placeholder="e.g. 100000" />
                  <p className="text-xs text-gray-500">Initial capital for starting</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="debt">Debt ($)</Label>
                  <Input id="debt" type="number" placeholder="e.g. 0" />
                  <p className="text-xs text-gray-500">Total liabilities</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="debtInterest">Debt Interest Rate (%)</Label>
                  <Input id="debtInterest" type="number" placeholder="e.g. 6" />
                  <p className="text-xs text-gray-500">Annual interest rate on debt</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fcfLeftInCompany">FCF Left in Company (%)</Label>
                  <Input id="fcfLeftInCompany" type="number" placeholder="e.g. 100" />
                  <p className="text-xs text-gray-500">Percentage of free cash flow retained</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Valuation Section */}
        <TabsContent value="valuation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Valuation Parameters</CardTitle>
              <CardDescription>Configure how your business is valued</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input id="taxRate" type="number" placeholder="e.g. 25" />
                  <p className="text-xs text-gray-500">Applicable tax rate</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                  <Input id="inflationRate" type="number" placeholder="e.g. 2" />
                  <p className="text-xs text-gray-500">Annual inflation rate</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxTimePeriod">Time Max (days)</Label>
                  <Input id="maxTimePeriod" type="number" placeholder="e.g. 1825" />
                  <p className="text-xs text-gray-500">Simulation period in days</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shares">Number of Shares</Label>
                  <Input id="shares" type="number" placeholder="e.g. 1000000" />
                  <p className="text-xs text-gray-500">Outstanding shares</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dcfMethod" 
                    checked={selectedValuationMethods.dcf}
                    onCheckedChange={() => toggleValuationMethod('dcf')}
                  />
                  <Label 
                    htmlFor="dcfMethod" 
                    className="text-base font-medium"
                  >
                    DCF Method
                  </Label>
                </div>
                
                {selectedValuationMethods.dcf && (
                  <div className="grid gap-4 md:grid-cols-3 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectionPeriodDCF">Projection Period DCF (days)</Label>
                      <Input id="projectionPeriodDCF" type="number" placeholder="e.g. 1825" />
                      <p className="text-xs text-gray-500">Time before terminal value calculation</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discountRate">Discount Rate (%)</Label>
                      <Input id="discountRate" type="number" placeholder="e.g. 15" />
                      <p className="text-xs text-gray-500">Investors' required return</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="growthRate">Growth Rate (%)</Label>
                      <Input id="growthRate" type="number" placeholder="e.g. 3" />
                      <p className="text-xs text-gray-500">Long-term steady growth rate</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ebitdaMethod" 
                    checked={selectedValuationMethods.ebitda}
                    onCheckedChange={() => toggleValuationMethod('ebitda')}
                  />
                  <Label 
                    htmlFor="ebitdaMethod" 
                    className="text-base font-medium"
                  >
                    EBITDA Multiple Method
                  </Label>
                </div>
                
                {selectedValuationMethods.ebitda && (
                  <div className="grid gap-4 md:grid-cols-2 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="ebitdaMultiple">Enterprise Multiple EBITDA</Label>
                      <Input id="ebitdaMultiple" type="number" placeholder="e.g. 14" />
                      <p className="text-xs text-gray-500">Industry multiple (SaaS: 14, Consulting: 8)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectionPeriodEBITDA">Projection Period EBITDA (days)</Label>
                      <Input id="projectionPeriodEBITDA" type="number" placeholder="e.g. 365" />
                      <p className="text-xs text-gray-500">At least 365 days</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="peMethod" 
                    checked={selectedValuationMethods.pe}
                    onCheckedChange={() => toggleValuationMethod('pe')}
                  />
                  <Label 
                    htmlFor="peMethod" 
                    className="text-base font-medium"
                  >
                    P/E Method
                  </Label>
                </div>
                
                {selectedValuationMethods.pe && (
                  <div className="grid gap-4 md:grid-cols-2 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="peMultiple">PE Multiple</Label>
                      <Input id="peMultiple" type="number" placeholder="e.g. 20" />
                      <p className="text-xs text-gray-500">Price/Earnings ratio</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectionPeriodPE">Projection Period PE (days)</Label>
                      <Input id="projectionPeriodPE" type="number" placeholder="e.g. 365" />
                      <p className="text-xs text-gray-500">At least 365 days</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="revenueMethod" 
                    checked={selectedValuationMethods.revenue}
                    onCheckedChange={() => toggleValuationMethod('revenue')}
                  />
                  <Label 
                    htmlFor="revenueMethod" 
                    className="text-base font-medium"
                  >
                    Revenue Multiple Method
                  </Label>
                </div>
                
                {selectedValuationMethods.revenue && (
                  <div className="grid gap-4 md:grid-cols-2 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="evRevenueMultiple">EV Revenue Multiple</Label>
                      <Input id="evRevenueMultiple" type="number" placeholder="e.g. 5" />
                      <p className="text-xs text-gray-500">Enterprise value to revenue multiple</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectionPeriodEVRevenue">Projection Period EV Revenue (days)</Label>
                      <Input id="projectionPeriodEVRevenue" type="number" placeholder="e.g. 365" />
                      <p className="text-xs text-gray-500">At least 365 days</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Output Section */}
        <TabsContent value="output" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Output</CardTitle>
              <CardDescription>Preview your model results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-center text-gray-500 mb-4">Run your model to see results</p>
                <Button size="lg">Run Model</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}