import { useState } from "react";

interface WorldMapProps {
  totalRevenue: string;
  coverage: string;
}

export default function WorldMap({ totalRevenue, coverage }: WorldMapProps) {
  // State for view toggle
  const [activeView, setActiveView] = useState<'revenue' | 'customers'>('revenue');
  
  // Locations for hotspots
  const hotspots = [
    { top: "20%", left: "25%", size: "10" },
    { top: "30%", left: "50%", size: "12" },
    { top: "60%", left: "35%", size: "8" },
    { top: "40%", left: "75%", size: "14" },
    { top: "70%", left: "60%", size: "10" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-6 pb-2">
        <h3 className="text-lg font-medium text-gray-800">Geographic Distribution</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveView('revenue')}
            className={`px-2 py-1 text-xs font-medium ${
              activeView === 'revenue' 
                ? 'text-white bg-primary' 
                : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
            } rounded cursor-pointer`}
          >
            Revenue
          </button>
          <button 
            onClick={() => setActiveView('customers')}
            className={`px-2 py-1 text-xs font-medium ${
              activeView === 'customers' 
                ? 'text-white bg-primary' 
                : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
            } rounded cursor-pointer`}
          >
            Customers
          </button>
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <div className="flex justify-between mb-3">
          <div className="text-xl font-semibold text-gray-800">{totalRevenue}</div>
          <div className="text-sm text-gray-500">{coverage} Global Coverage</div>
        </div>
        
        {/* World Map */}
        <div className="relative h-64">
          <svg width="100%" height="250" viewBox="0 0 800 450" className="text-gray-200">
            <path fill="currentColor" d="M165,160 C200,120 220,155 245,110 C270,65 330,65 330,110 C330,140 300,170 335,190 C370,210 370,250 335,250 C300,250 290,210 255,230 C220,250 220,280 185,280 C150,280 150,240 115,240 C80,240 80,200 115,200 C150,200 130,200 165,160 Z" />
            <path fill="currentColor" d="M420,120 C455,80 475,115 500,70 C525,25 585,25 585,70 C585,100 555,130 590,150 C625,170 625,210 590,210 C555,210 545,170 510,190 C475,210 475,240 440,240 C405,240 405,200 370,200 C335,200 335,160 370,160 C405,160 385,160 420,120 Z" />
            <path fill="currentColor" d="M580,260 C615,220 635,255 660,210 C685,165 745,165 745,210 C745,240 715,270 750,290 C785,310 785,350 750,350 C715,350 705,310 670,330 C635,350 635,380 600,380 C565,380 565,340 530,340 C495,340 495,300 530,300 C565,300 545,300 580,260 Z" />
            <path fill="currentColor" d="M215,310 C250,270 270,305 295,260 C320,215 380,215 380,260 C380,290 350,320 385,340 C420,360 420,400 385,400 C350,400 340,360 305,380 C270,400 270,430 235,430 C200,430 200,390 165,390 C130,390 130,350 165,350 C200,350 180,350 215,310 Z" />
            <path fill="currentColor" d="M459,365 C494,325 514,360 539,315 C564,270 624,270 624,315 C624,345 594,375 629,395 C664,415 664,455 629,455 C594,455 584,415 549,435 C514,455 514,485 479,485 C444,485 444,445 409,445 C374,445 374,405 409,405 C444,405 424,405 459,365 Z" />
          </svg>
          
          {/* Hotspots */}
          {hotspots.map((spot, index) => (
            <div 
              key={index}
              onClick={() => alert(`Region ${index + 1} details: ${activeView === 'revenue' ? 'Revenue data' : 'Customer data'}`)}
              className={`absolute w-${spot.size} h-${spot.size} bg-primary bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all`}
              style={{ top: spot.top, left: spot.left }}
            >
              <div className={`w-${parseInt(spot.size)/2} h-${parseInt(spot.size)/2} bg-primary rounded-full`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
