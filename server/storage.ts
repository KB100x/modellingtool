import { 
  users, type User, type InsertUser,
  metrics, type Metric, type InsertMetric,
  salesData, type SalesData, type InsertSalesData,
  performers, type Performer, type InsertPerformer,
  leadSources, type LeadSource, type InsertLeadSource,
  insights, type Insight, type InsertInsight,
  dashboardData, type DashboardData, type InsertDashboardData,
  aiModels, type AiModel, type InsertAiModel,
  modelMetrics, type ModelMetrics, type InsertModelMetrics
} from "@shared/schema";
import { dashboardData as initialDashboardData } from "./data/dashboardData";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dashboard data
  getDashboardData(): Promise<any>;
  getSalesData(): Promise<any>;
  getPerformers(): Promise<any>;
  getGeoData(): Promise<any>;
  getBlendedMetrics(): Promise<any>;
  getAdditionalCharts(): Promise<any>;
  getModels(): Promise<any>;
  
  // AI Models
  getAllAiModels(): Promise<AiModel[]>;
  getAiModel(id: number): Promise<AiModel | undefined>;
  createAiModel(model: InsertAiModel): Promise<AiModel>;
  updateAiModel(id: number, model: Partial<InsertAiModel>): Promise<AiModel | undefined>;
  deleteAiModel(id: number): Promise<boolean>;
  
  // Model metrics
  getModelMetrics(modelId: number): Promise<ModelMetrics | undefined>;
  createModelMetrics(metrics: InsertModelMetrics): Promise<ModelMetrics>;
  updateModelMetrics(id: number, metrics: Partial<InsertModelMetrics>): Promise<ModelMetrics | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private metrics: Map<number, Metric>;
  private salesData: Map<number, SalesData>;
  private performers: Map<number, Performer>;
  private leadSources: Map<number, LeadSource>;
  private insights: Map<number, Insight>;
  private dashboardData: Map<number, DashboardData>;
  
  currentId: number;

  constructor() {
    this.users = new Map();
    this.metrics = new Map();
    this.salesData = new Map();
    this.performers = new Map();
    this.leadSources = new Map();
    this.insights = new Map();
    this.dashboardData = new Map();
    
    this.currentId = 1;
    
    // Initialize with dashboard data
    this.initializeDashboardData();
  }

  private initializeDashboardData() {
    const dashboardDataEntry: DashboardData = {
      id: 1,
      data: initialDashboardData,
      lastUpdated: new Date()
    };
    this.dashboardData.set(1, dashboardDataEntry);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDashboardData(): Promise<any> {
    const dashboard = this.dashboardData.get(1);
    if (!dashboard) {
      throw new Error("Dashboard data not found");
    }
    return dashboard.data;
  }

  async getSalesData(): Promise<any> {
    const dashboard = this.dashboardData.get(1);
    if (!dashboard) {
      throw new Error("Sales data not found");
    }
    return dashboard.data.salesData;
  }

  async getPerformers(): Promise<any> {
    const dashboard = this.dashboardData.get(1);
    if (!dashboard) {
      throw new Error("Performers data not found");
    }
    return dashboard.data.performers;
  }

  async getGeoData(): Promise<any> {
    const dashboard = this.dashboardData.get(1);
    if (!dashboard) {
      throw new Error("Geographic data not found");
    }
    return dashboard.data.geoData;
  }
  
  async getBlendedMetrics(): Promise<any> {
    const dashboard = this.dashboardData.get(1);
    if (!dashboard) {
      throw new Error("Blended metrics not found");
    }
    return dashboard.data.blendedMetrics || {};
  }
  
  async getAdditionalCharts(): Promise<any> {
    const dashboard = this.dashboardData.get(1);
    if (!dashboard) {
      throw new Error("Additional charts data not found");
    }
    return dashboard.data.additionalCharts || {};
  }
  
  async getModels(): Promise<any> {
    const dashboard = this.dashboardData.get(1);
    if (!dashboard) {
      throw new Error("Models data not found");
    }
    return dashboard.data.models || [];
  }
  
  // AI Models - these are not implemented in the memory version
  async getAllAiModels(): Promise<AiModel[]> {
    return [];
  }
  
  async getAiModel(id: number): Promise<AiModel | undefined> {
    return undefined;
  }
  
  async createAiModel(model: InsertAiModel): Promise<AiModel> {
    throw new Error("Not implemented in memory storage");
  }
  
  async updateAiModel(id: number, model: Partial<InsertAiModel>): Promise<AiModel | undefined> {
    throw new Error("Not implemented in memory storage");
  }
  
  async deleteAiModel(id: number): Promise<boolean> {
    throw new Error("Not implemented in memory storage");
  }
  
  // Model metrics
  async getModelMetrics(modelId: number): Promise<ModelMetrics | undefined> {
    throw new Error("Not implemented in memory storage");
  }
  
  async createModelMetrics(metrics: InsertModelMetrics): Promise<ModelMetrics> {
    throw new Error("Not implemented in memory storage");
  }
  
  async updateModelMetrics(id: number, metrics: Partial<InsertModelMetrics>): Promise<ModelMetrics | undefined> {
    throw new Error("Not implemented in memory storage");
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async getDashboardData(): Promise<any> {
    const [data] = await db.select().from(dashboardData).limit(1);
    if (!data) {
      // Initialize and insert default data if none exists
      const [newData] = await db
        .insert(dashboardData)
        .values({ data: initialDashboardData })
        .returning();
      return newData.data;
    }
    return data.data;
  }

  async getSalesData(): Promise<any> {
    // Get data from the database or from the dashboard data
    const dashboard = await this.getDashboardData();
    return dashboard.salesData;
  }

  async getPerformers(): Promise<any> {
    // Get data from the database or from the dashboard data
    const dashboard = await this.getDashboardData();
    return dashboard.performers;
  }

  async getGeoData(): Promise<any> {
    // Get data from the database or from the dashboard data
    const dashboard = await this.getDashboardData();
    return dashboard.geoData;
  }
  
  async getBlendedMetrics(): Promise<any> {
    // Get data from the database or from the dashboard data
    const dashboard = await this.getDashboardData();
    return dashboard.blendedMetrics || {};
  }
  
  async getAdditionalCharts(): Promise<any> {
    // Get data from the database or from the dashboard data
    const dashboard = await this.getDashboardData();
    return dashboard.additionalCharts || {};
  }
  
  async getModels(): Promise<any> {
    // First try to get models from the model table
    try {
      const dbModels = await db.select().from(aiModels)
        .orderBy(desc(aiModels.updatedAt))
        .limit(10);
        
      if (dbModels && dbModels.length > 0) {
        // Transform database models into the format expected by the dashboard
        return await Promise.all(dbModels.map(async (model) => {
          const [metrics] = await db.select()
            .from(modelMetrics)
            .where(eq(modelMetrics.modelId, model.id));
          
          return {
            id: model.id,
            name: model.name,
            category: model.description || 'Standard',
            metrics: {
              ltv: metrics?.ltv || 0,
              cac: metrics?.cac || 0,
              conversionRate: metrics?.conversionRate || 0,
              revenuePerCustomer: metrics?.revenuePerCustomer || 0
            },
            status: model.isActive ? 'Active' : 'Inactive',
            efficiency: metrics?.efficiency || 'medium'
          };
        }));
      }
    } catch (error) {
      console.error('Error getting models from database:', error);
    }
    
    // Fallback to dashboard data if no models found in database
    const dashboard = await this.getDashboardData();
    return dashboard.models || [];
  }
  
  // AI Models
  async getAllAiModels(): Promise<AiModel[]> {
    return await db.select().from(aiModels).orderBy(desc(aiModels.updatedAt));
  }
  
  async getAiModel(id: number): Promise<AiModel | undefined> {
    const [model] = await db.select().from(aiModels).where(eq(aiModels.id, id));
    return model;
  }
  
  async createAiModel(model: InsertAiModel): Promise<AiModel> {
    const [createdModel] = await db.insert(aiModels).values({
      ...model,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return createdModel;
  }
  
  async updateAiModel(id: number, model: Partial<InsertAiModel>): Promise<AiModel | undefined> {
    const [updatedModel] = await db.update(aiModels)
      .set({
        ...model,
        updatedAt: new Date()
      })
      .where(eq(aiModels.id, id))
      .returning();
    return updatedModel;
  }
  
  async deleteAiModel(id: number): Promise<boolean> {
    const [deletedModel] = await db.delete(aiModels)
      .where(eq(aiModels.id, id))
      .returning();
    return !!deletedModel;
  }
  
  // Model metrics
  async getModelMetrics(modelId: number): Promise<ModelMetrics | undefined> {
    const [metrics] = await db.select()
      .from(modelMetrics)
      .where(eq(modelMetrics.modelId, modelId));
    return metrics;
  }
  
  async createModelMetrics(metrics: InsertModelMetrics): Promise<ModelMetrics> {
    const [createdMetrics] = await db.insert(modelMetrics)
      .values(metrics)
      .returning();
    return createdMetrics;
  }
  
  async updateModelMetrics(id: number, metrics: Partial<InsertModelMetrics>): Promise<ModelMetrics | undefined> {
    const [updatedMetrics] = await db.update(modelMetrics)
      .set(metrics)
      .where(eq(modelMetrics.id, id))
      .returning();
    return updatedMetrics;
  }
}

// Use Database Storage implementation
export const storage = new DatabaseStorage();
