import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/dashboard";
import NewDashboard from "@/pages/new-dashboard";
import AIModelingPage from "@/pages/ai-modeling";
import AIModelingStandalonePage from "@/pages/ai-modeling-standalone";
import NotFound from "@/pages/not-found";

// Create a simple placeholder component for routes that are not yet implemented
const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold text-primary mb-4">{name}</h1>
      <p className="text-gray-600 mb-6">This page is under development and will be implemented in a future release.</p>
      <a href="/" className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
        Return to Dashboard
      </a>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={NewDashboard} />
      <Route path="/legacy-dashboard" component={Dashboard} />
      <Route path="/ai-modeling" component={AIModelingStandalonePage} />
      <Route path="/sales-performance">
        {() => <PlaceholderPage name="Sales Performance" />}
      </Route>
      <Route path="/team-performance">
        {() => <PlaceholderPage name="Team Performance" />}
      </Route>
      <Route path="/forecasting">
        {() => <PlaceholderPage name="Forecasting" />}
      </Route>
      <Route path="/customer-models">
        {() => <PlaceholderPage name="Customer Models" />}
      </Route>
      <Route path="/insights">
        {() => <PlaceholderPage name="Insights" />}
      </Route>
      <Route path="/integrations">
        {() => <PlaceholderPage name="Integrations" />}
      </Route>
      <Route path="/settings">
        {() => <PlaceholderPage name="Settings" />}
      </Route>
      <Route path="/profile">
        {() => <PlaceholderPage name="User Profile" />}
      </Route>
      <Route path="/quick-mode">
        {() => <PlaceholderPage name="Quick Mode" />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
