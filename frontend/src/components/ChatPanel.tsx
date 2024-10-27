'use client';
import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { ChatMessage } from "../types";

const BOT_AVATAR = `data:image/svg+xml,${encodeURIComponent(`
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="16" fill="#1D4ED8"/>
  <path d="M16 8C12.6863 8 10 10.6863 10 14V16C10 16.7364 10.2299 17.4275 10.6346 18H9C8.44772 18 8 18.4477 8 19V21C8 21.5523 8.44772 22 9 22H10V23C10 23.5523 10.4477 24 11 24H13C13.5523 24 14 23.5523 14 23V22H18V23C18 23.5523 18.4477 24 19 24H21C21.5523 24 22 23.5523 22 23V22H23C23.5523 22 24 21.5523 24 21V19C24 18.4477 23.5523 18 23 18H21.3654C21.7701 17.4275 22 16.7364 22 16V14C22 10.6863 19.3137 8 16 8ZM14 16C13.4477 16 13 15.5523 13 15C13 14.4477 13.4477 14 14 14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16ZM18 16C17.4477 16 17 15.5523 17 15C17 14.4477 17.4477 14 18 14C18.5523 14 19 14.4477 19 15C19 15.5523 18.5523 16 18 16Z" fill="white"/>
</svg>
`)}`;

const USER_AVATAR = `data:image/svg+xml,${encodeURIComponent(`
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="16" fill="#4B5563"/>
  <path d="M16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8ZM10.7419 18C9.22792 18 8 19.2279 8 20.7419C8 22.5412 9.45883 24 11.2581 24H20.7419C22.5412 24 24 22.5412 24 20.7419C24 19.2279 22.7721 18 21.2581 18H10.7419Z" fill="white"/>
</svg>
`)}`;

interface ChatPanelProps {
  onUpdatePreview: (files: Record<string, string>) => void;
}

export function ChatPanel({ onUpdatePreview }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your website building assistant. How can I help you today?',
      timestamp: '10:30 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev: ChatMessage[]) => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate bot response and file update
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Update preview based on user input
    onUpdatePreview({
      "/src/app/page.tsx": `
export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Updated based on: ${inputMessage}</h1>
      <p className="mt-2">Your changes have been applied!</p>
    </div>
  );
}`
    });

    const mockBotResponse: ChatMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: 'I\'ve updated the page with your changes. Check the preview!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev: ChatMessage[]) => [...prev, mockBotResponse]);
    setIsLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="w-96 border-r border-gray-700 bg-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Website Builder Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.type === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-start space-x-2">
              {message.type === 'bot' && (
                <img
                  src={BOT_AVATAR}
                  alt="Bot"
                  width={32}
                  height={32}
                  className="object-cover w-8 h-8"
                />
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {message.content}
              </div>
              {message.type === 'user' && (
                <img
                  src={USER_AVATAR}
                  alt="User"
                  width={32}
                  height={32}
                  className="object-cover w-8 h-8"
                />
              )}
            </div>
            <span className="text-xs text-gray-400 mt-1 mx-10">{message.timestamp}</span>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2">
            <img
              src={BOT_AVATAR}
              alt="Bot"
              width={32}
              height={32}
              className="object-cover w-8 h-8"
            />
            <div className="bg-gray-700 rounded-lg p-3 text-white">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
