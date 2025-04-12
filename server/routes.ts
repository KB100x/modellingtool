import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Parse JSON bodies
  app.use(express.json());
  
  // Dashboard data endpoint
  app.get("/api/dashboard", async (req, res) => {
    try {
      const dashboardData = await storage.getDashboardData();
      res.json(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });

  // Sales data endpoint
  app.get("/api/sales", async (req, res) => {
    try {
      const salesData = await storage.getSalesData();
      res.json(salesData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      res.status(500).json({ error: "Failed to fetch sales data" });
    }
  });

  // Performers endpoint
  app.get("/api/performers", async (req, res) => {
    try {
      const performers = await storage.getPerformers();
      res.json(performers);
    } catch (error) {
      console.error("Error fetching performers data:", error);
      res.status(500).json({ error: "Failed to fetch performers data" });
    }
  });

  // Geographic data endpoint
  app.get("/api/geo-data", async (req, res) => {
    try {
      const geoData = await storage.getGeoData();
      res.json(geoData);
    } catch (error) {
      console.error("Error fetching geographic data:", error);
      res.status(500).json({ error: "Failed to fetch geographic data" });
    }
  });
  
  // Blended metrics endpoint
  app.get("/api/blended-metrics", async (req, res) => {
    try {
      const blendedMetrics = await storage.getBlendedMetrics();
      res.json(blendedMetrics);
    } catch (error) {
      console.error("Error fetching blended metrics:", error);
      res.status(500).json({ error: "Failed to fetch blended metrics" });
    }
  });
  
  // Additional charts endpoint
  app.get("/api/additional-charts", async (req, res) => {
    try {
      const additionalCharts = await storage.getAdditionalCharts();
      res.json(additionalCharts);
    } catch (error) {
      console.error("Error fetching additional charts data:", error);
      res.status(500).json({ error: "Failed to fetch additional charts data" });
    }
  });
  
  // Models endpoint
  app.get("/api/models", async (req, res) => {
    try {
      const models = await storage.getModels();
      res.json(models);
    } catch (error) {
      console.error("Error fetching models data:", error);
      res.status(500).json({ error: "Failed to fetch models data" });
    }
  });
  
  // AI Models API endpoints
  
  // Get all AI models
  app.get("/api/ai-models", async (req: Request, res: Response) => {
    try {
      const models = await storage.getAllAiModels();
      res.json(models);
    } catch (error) {
      console.error("Error fetching AI models:", error);
      res.status(500).json({ error: "Failed to fetch AI models" });
    }
  });
  
  // Get a specific AI model by ID
  app.get("/api/ai-models/:id", async (req: Request, res: Response) => {
    try {
      const modelId = parseInt(req.params.id);
      if (isNaN(modelId)) {
        return res.status(400).json({ error: "Invalid model ID" });
      }
      
      const model = await storage.getAiModel(modelId);
      if (!model) {
        return res.status(404).json({ error: "Model not found" });
      }
      
      // Get associated metrics
      try {
        const metrics = await storage.getModelMetrics(modelId);
        if (metrics) {
          return res.json({ ...model, metrics });
        }
      } catch (metricsError) {
        console.error("Error fetching model metrics:", metricsError);
        // Continue even if metrics fetch fails
      }
      
      res.json(model);
    } catch (error) {
      console.error("Error fetching AI model:", error);
      res.status(500).json({ error: "Failed to fetch AI model" });
    }
  });
  
  // Create a new AI model
  app.post("/api/ai-models", async (req: Request, res: Response) => {
    try {
      const modelData = req.body;
      
      // Extract metrics data if present
      const metricsData = modelData.metrics;
      delete modelData.metrics;
      
      // Create the model
      const model = await storage.createAiModel(modelData);
      
      // Create metrics if provided
      if (metricsData) {
        try {
          await storage.createModelMetrics({
            ...metricsData,
            modelId: model.id
          });
        } catch (metricsError) {
          console.error("Error creating model metrics:", metricsError);
          // Continue even if metrics creation fails
        }
      }
      
      res.status(201).json(model);
    } catch (error) {
      console.error("Error creating AI model:", error);
      res.status(500).json({ error: "Failed to create AI model" });
    }
  });
  
  // Update an AI model
  app.put("/api/ai-models/:id", async (req: Request, res: Response) => {
    try {
      const modelId = parseInt(req.params.id);
      if (isNaN(modelId)) {
        return res.status(400).json({ error: "Invalid model ID" });
      }
      
      // Check if the model exists
      const existingModel = await storage.getAiModel(modelId);
      if (!existingModel) {
        return res.status(404).json({ error: "Model not found" });
      }
      
      const modelData = req.body;
      
      // Extract metrics data if present
      const metricsData = modelData.metrics;
      delete modelData.metrics;
      
      // Update the model
      const updatedModel = await storage.updateAiModel(modelId, modelData);
      
      // Update metrics if provided
      if (metricsData) {
        try {
          const existingMetrics = await storage.getModelMetrics(modelId);
          
          if (existingMetrics) {
            await storage.updateModelMetrics(existingMetrics.id, metricsData);
          } else {
            await storage.createModelMetrics({
              ...metricsData,
              modelId
            });
          }
        } catch (metricsError) {
          console.error("Error updating model metrics:", metricsError);
          // Continue even if metrics update fails
        }
      }
      
      res.json(updatedModel);
    } catch (error) {
      console.error("Error updating AI model:", error);
      res.status(500).json({ error: "Failed to update AI model" });
    }
  });
  
  // Delete an AI model
  app.delete("/api/ai-models/:id", async (req: Request, res: Response) => {
    try {
      const modelId = parseInt(req.params.id);
      if (isNaN(modelId)) {
        return res.status(400).json({ error: "Invalid model ID" });
      }
      
      // Check if the model exists
      const existingModel = await storage.getAiModel(modelId);
      if (!existingModel) {
        return res.status(404).json({ error: "Model not found" });
      }
      
      // Delete the model
      const deleted = await storage.deleteAiModel(modelId);
      
      res.json({ success: deleted });
    } catch (error) {
      console.error("Error deleting AI model:", error);
      res.status(500).json({ error: "Failed to delete AI model" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
