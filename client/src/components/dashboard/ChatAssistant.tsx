import { useState } from 'react';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I can help you analyze your sales data or create forecasts. What would you like to do?' }
  ]);
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { sender: 'user', text: message }]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'ai', text: `I'm analyzing your request about "${message}". This is a demo response. In the actual application, this would connect to a real AI model.` }
      ]);
    }, 1000);
    
    // Clear input field
    setMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-primary/5">
            <h3 className="font-medium text-primary">AI Assistant</h3>
            <p className="text-xs text-gray-600">How can I help you today?</p>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'ai' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                      AI
                    </div>
                  )}
                  <div className={`${msg.sender === 'ai' ? 'ml-2 bg-gray-100' : 'mr-2 bg-primary/10'} p-2 rounded-lg max-w-[80%]`}>
                    <p className="text-sm text-gray-800">{msg.text}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                      You
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..." 
                className="flex-1 bg-gray-100 text-sm p-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-primary text-white p-2 rounded-r-md cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11h2a1 1 0 00.894-.553l7-14A1 1 0 0017.894 1.19L10.894 2.553z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
