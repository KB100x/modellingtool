import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import ChatAssistant from "./ChatAssistant";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Left side: Page title */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
            </div>
            
            {/* Right side: Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </button>
              
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <span className="text-sm font-medium text-gray-700">Jane Doe</span>
              </div>
            </div>
          </div>
          
          {/* Sub Navigation */}
          <div className="flex items-center px-6 py-2">
            <a href="#" className="px-3 py-1.5 border-b-2 border-primary text-sm font-medium text-primary">Sales Performance</a>
            <a href="#" className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary">Market Analysis</a>
            <a href="#" className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary">Funnel Insights</a>
            
            <div className="ml-auto flex items-center space-x-2">
              <button className="flex items-center px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd"></path>
                </svg>
                <span>Filter</span>
              </button>
              
              <button className="flex items-center px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
                </svg>
                <span>Export</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {/* Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
