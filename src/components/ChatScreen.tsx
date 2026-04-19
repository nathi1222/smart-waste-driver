import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, PaperAirplaneIcon, PhoneIcon, PhotoIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'driver' | 'dispatch';
  timestamp: Date;
  image?: string;
  read?: boolean;
}

interface ChatScreenProps {
  onBack: () => void;
  onOpenCallDispatch: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack, onOpenCallDispatch }) => {
  const getInitialMessages = (): Message[] => [
    {
      id: '1',
      text: 'Good morning Alex! How can I help you today?',
      sender: 'dispatch',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: '2',
      text: 'Hi Sarah, I have a question about Route 18 stop #45',
      sender: 'driver',
      timestamp: new Date(Date.now() - 3500000),
      read: true,
    },
    {
      id: '3',
      text: 'The bin access is blocked by a vehicle. What should I do?',
      sender: 'driver',
      timestamp: new Date(Date.now() - 3400000),
      read: true,
    },
    {
      id: '4',
      text: 'I see. Can you send a photo? I\'ll log it as blocked access and we\'ll schedule a special pickup.',
      sender: 'dispatch',
      timestamp: new Date(Date.now() - 3300000),
      read: true,
    },
  ];
  const [messages, setMessages] = useState<Message[]>(getInitialMessages());
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'driver',
        timestamp: new Date(),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate dispatch typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for the update! I\'ve logged this issue. Dispatch will follow up shortly.',
          sender: 'dispatch',
          timestamp: new Date(),
          read: false,
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-4 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white p-2 hover:bg-white/20 rounded-full transition-all">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-white text-xl font-bold">Dispatch Chat</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-200 text-xs">Sarah Johnson - Online</span>
              </div>
            </div>
          </div>
          <button onClick={onOpenCallDispatch} className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all">
            <PhoneIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'driver' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`max-w-[80%] rounded-2xl p-3 ${
              message.sender === 'driver' 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                : 'bg-white shadow-md text-gray-800'
            }`}>
              {message.image && <img src={message.image} alt="Shared" className="rounded-lg mb-2 max-w-full" />}
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className={`text-xs ${message.sender === 'driver' ? 'text-green-200' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.sender === 'driver' && message.read && (
                  <span className="text-xs text-green-200">✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-white shadow-md rounded-2xl p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
            <PhotoIcon className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
            <MicrophoneIcon className="h-6 w-6" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button onClick={sendMessage} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all">
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;