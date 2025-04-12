import { Link } from "wouter";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
          </svg>
        </div>
        <span className="text-xl font-bold text-gray-800">ForecastIQ</span>
      </div>
      
      {/* User Info */}
      <div className="mx-4 my-2 p-3 rounded-lg bg-gray-50 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Welcome back,</span>
            <span className="text-sm font-medium text-gray-900">Jane Doe</span>
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-2 flex-1 overflow-y-auto">
        <div className="px-4 mb-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Menu</span>
        </div>
        
        <div className="space-y-1 px-2">
          <Link href="/">
            <div className="sidebar-item active flex items-center px-4 py-2.5 text-sm font-medium text-primary rounded-lg group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span>Dashboard Overview</span>
            </div>
          </Link>
          
          <Link href="/ai-modeling">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>AI Modeling</span>
            </div>
          </Link>
          
          <Link href="/sales-performance">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
              </svg>
              <span>Sales Performance</span>
            </div>
          </Link>
          
          <Link href="/team-performance">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
              </svg>
              <span>Team Performance</span>
            </div>
          </Link>
          
          <Link href="/forecasting">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
              <span>Forecasting</span>
            </div>
          </Link>
          
          <Link href="/customer-models">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"></path>
              </svg>
              <span>Customer Models</span>
            </div>
          </Link>
          
          <Link href="/insights">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
              <span>Insights</span>
            </div>
          </Link>
          
          <Link href="/integrations">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
              <span>Integrations</span>
            </div>
          </Link>
        </div>
        
        <div className="mt-8 px-4">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Admin</span>
        </div>
        
        <div className="space-y-1 px-2 mt-2">
          <Link href="/settings">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
              </svg>
              <span>Settings</span>
            </div>
          </Link>
          
          <Link href="/profile">
            <div className="sidebar-item flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-primary group cursor-pointer">
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
              </svg>
              <span>User Profile</span>
            </div>
          </Link>
        </div>
      </nav>
      
      {/* Quick Mode Button */}
      <div className="p-4 mt-auto">
        <Link href="/quick-mode">
          <button onClick={() => alert("Quick Mode activated")} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Quick Mode</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
