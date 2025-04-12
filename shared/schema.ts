import { pgTable, text, serial, integer, boolean, decimal, jsonb, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  previousValue: text("previous_value"),
  changePercentage: decimal("change_percentage"),
  isPositive: boolean("is_positive").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const salesData = pgTable("sales_data", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  revenue: decimal("revenue").notNull(),
  transactions: integer("transactions").notNull(),
  year: integer("year").notNull(),
});

export const performers = pgTable("performers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  region: text("region").notNull(),
  revenue: decimal("revenue").notNull(),
  status: text("status").notNull(),
  avatarColor: text("avatar_color").notNull(),
  initials: text("initials").notNull(),
});

export const leadSources = pgTable("lead_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  count: integer("count").notNull(),
  percentage: decimal("percentage").notNull(),
});

export const insights = pgTable("insights", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const dashboardData = pgTable("dashboard_data", {
  id: serial("id").primaryKey(),
  data: jsonb("data").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// New schema for AI Models
export const aiModels = pgTable("ai_models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true),
  
  // Product Parameters
  priceOfOffer: text("price_of_offer").notNull(),
  realizationRate: text("realization_rate").notNull(),
  costToFulfill: text("cost_to_fulfill").notNull(),
  timeToSell: text("time_to_sell").notNull(),
  timeToMarket: text("time_to_market").notNull(),
  timeToCollect: text("time_to_collect").notNull(),
  refundPeriod: text("refund_period").notNull(),
  refundRate: text("refund_rate").notNull(),
  churnRate: text("churn_rate").notNull(),
  
  // Renewals
  priceOfRenewal: text("price_of_renewal").notNull(),
  timeToRenew: text("time_to_renew").notNull(),
  costToSellRenewal: text("cost_to_sell_renewal").notNull(),
  costToFulfillRenewal: text("cost_to_fulfill_renewal").notNull(),
  timeToCollectRenewal: text("time_to_collect_renewal").notNull(),
  renewalRateRenewals: text("renewal_rate_renewals").notNull(),
  
  // Sales & Marketing
  useGranular: boolean("use_granular").notNull(),
  costToMarket: text("cost_to_market").notNull(),
  costToSell: text("cost_to_sell").notNull(),
  
  // Outbound
  outboundSalary: text("outbound_salary").notNull(),
  numberOfContacts: text("number_of_contacts").notNull(),
  numberOfSDRs: text("number_of_sdrs").notNull(),
  outboundConversionRate: text("outbound_conversion_rate").notNull(),
  timeToMarketOutbound: text("time_to_market_outbound").notNull(),
  leadToCustomerOutbound: text("lead_to_customer_outbound").notNull(),
  
  // Inbound
  mediaSpend: text("media_spend").notNull(),
  cpm: text("cpm").notNull(),
  ctr: text("ctr").notNull(),
  funnelConversion: text("funnel_conversion").notNull(),
  timeToMarketInbound: text("time_to_market_inbound").notNull(),
  leadToCustomerInbound: text("lead_to_customer_inbound").notNull(),
  
  // Starting State
  cash0: text("cash0").notNull(),
  initialCustomers: text("initial_customers").notNull(),
  
  // Viral Component
  useViral: boolean("use_viral").notNull(),
  invites: text("invites").notNull(),
  viralConversion: text("viral_conversion").notNull(),
  viralTime: text("viral_time").notNull(),
  viralStart: text("viral_start").notNull(),
  costToSellViral: text("cost_to_sell_viral").notNull(),
  costToMarketViral: text("cost_to_market_viral").notNull(),
  
  // Administration
  transactionFee: text("transaction_fee").notNull(),
  fixedCost: text("fixed_cost").notNull(),
  fixedCostIncrease: text("fixed_cost_increase").notNull(),
  upfrontCosts: text("upfront_costs").notNull(),
  debt: text("debt").notNull(),
  debtInterest: text("debt_interest").notNull(),
  fcfLeftInCompany: text("fcf_left_in_company").notNull(),
  
  // Valuation
  taxRate: text("tax_rate").notNull(),
  inflationRate: text("inflation_rate").notNull(),
  maxTimePeriod: text("max_time_period").notNull(),
  shares: text("shares").notNull(),
  
  // Valuation Methods
  useDCF: boolean("use_dcf").notNull(),
  projectionPeriodDCF: text("projection_period_dcf").notNull(),
  discountRate: text("discount_rate").notNull(),
  growthRate: text("growth_rate").notNull(),
  
  useEBITDA: boolean("use_ebitda").notNull(),
  ebitdaMultiple: text("ebitda_multiple").notNull(),
  projectionPeriodEBITDA: text("projection_period_ebitda").notNull(),
  
  usePE: boolean("use_pe").notNull(),
  peMultiple: text("pe_multiple").notNull(),
  projectionPeriodPE: text("projection_period_pe").notNull(),
  
  useRevenue: boolean("use_revenue").notNull(),
  evRevenueMultiple: text("ev_revenue_multiple").notNull(),
  projectionPeriodEVRevenue: text("projection_period_ev_revenue").notNull(),
  
  // Model results (calculated or simulated)
  results: jsonb("results"),
});

// Model metrics - derived from each model's calculations 
export const modelMetrics = pgTable("model_metrics", {
  id: serial("id").primaryKey(),
  modelId: integer("model_id").notNull().references(() => aiModels.id, { onDelete: 'cascade' }),
  
  // Common metrics that would be shown on dashboard
  ltv: decimal("ltv"),
  cac: decimal("cac"),
  conversionRate: decimal("conversion_rate"),
  revenuePerCustomer: decimal("revenue_per_customer"),
  totalRevenue: decimal("total_revenue"),
  profit: decimal("profit"),
  cashFlow: decimal("cash_flow"),
  
  // Valuation metrics
  valuation: decimal("valuation"),
  equityValue: decimal("equity_value"),
  enterpriseValue: decimal("enterprise_value"),
  
  // Efficiency categorization
  efficiency: text("efficiency"), // 'high' | 'medium' | 'low'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMetricSchema = createInsertSchema(metrics).omit({
  id: true,
});

export const insertSalesDataSchema = createInsertSchema(salesData).omit({
  id: true,
});

export const insertPerformerSchema = createInsertSchema(performers).omit({
  id: true,
});

export const insertLeadSourceSchema = createInsertSchema(leadSources).omit({
  id: true,
});

export const insertInsightSchema = createInsertSchema(insights).omit({
  id: true,
});

export const insertDashboardDataSchema = createInsertSchema(dashboardData).omit({
  id: true,
  lastUpdated: true,
});

export const insertAiModelSchema = createInsertSchema(aiModels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  results: true,
});

export const insertModelMetricsSchema = createInsertSchema(modelMetrics).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type Metric = typeof metrics.$inferSelect;

export type InsertSalesData = z.infer<typeof insertSalesDataSchema>;
export type SalesData = typeof salesData.$inferSelect;

export type InsertPerformer = z.infer<typeof insertPerformerSchema>;
export type Performer = typeof performers.$inferSelect;

export type InsertLeadSource = z.infer<typeof insertLeadSourceSchema>;
export type LeadSource = typeof leadSources.$inferSelect;

export type InsertInsight = z.infer<typeof insertInsightSchema>;
export type Insight = typeof insights.$inferSelect;

export type InsertDashboardData = z.infer<typeof insertDashboardDataSchema>;
export type DashboardData = typeof dashboardData.$inferSelect;

export type InsertAiModel = z.infer<typeof insertAiModelSchema>;
export type AiModel = typeof aiModels.$inferSelect;

export type InsertModelMetrics = z.infer<typeof insertModelMetricsSchema>;
export type ModelMetrics = typeof modelMetrics.$inferSelect;
