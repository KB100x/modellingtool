import { Link } from "wouter";
import OptimizedAIModelingForm from '@/components/dashboard/OptimizedAIModelingForm';

export default function AIModelingStandalonePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <h1 className="text-2xl font-bold text-white">ForecastIQ</h1>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className="text-white hover:text-gray-200 cursor-pointer">
                Return to Dashboard
              </span>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <OptimizedAIModelingForm />
      </main>
    </div>
  );
}