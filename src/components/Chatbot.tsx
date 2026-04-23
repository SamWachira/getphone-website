'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDxBKV7Pj5KB8eCTrzeV_E-UWjgsw9TUrk";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `You are the GetPhone Digital Assistant. GetPhone is a company in Somalia that provides smartphones (primarily ZTE and nubia brands) through flexible installment plans (6, 9, or 12 months). 
Key points to remember:
- Partnerships: Hormuud Telecom (distribution/network), ZTE (hardware), EVC Plus via Waafi (payments).
- Benefits: 1GB data and 30 mins calls FREE daily for 1 year with every phone.
- Process: Choose phone -> Pay deposit at Hormuud branch -> Register with Hormuud number -> Pay installments manually via eGet app.
- Tone: Professional, helpful, and culturally respectful.
- Financing: 0% interest, Sharia-compliant.
Keep your answers concise and focused on helping users understand our services.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm the GetPhone digital assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      const result = await model.generateContent(currentInput);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, text: text, isBot: true }
      ]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, text: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support at info@getphonelimited.com.", isBot: true }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 sm:w-96 max-h-[calc(100vh-140px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mb-4 flex flex-col transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="bg-primary px-5 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-700 text-sm">GetPhone Support</h3>
                <p className="text-xs text-white/70">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 min-h-[200px] p-4 bg-gray-50 overflow-y-auto flex flex-col gap-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  msg.isBot 
                    ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm' 
                    : 'bg-accent text-white rounded-tr-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 px-4 py-2 bg-gray-100 text-sm rounded-full outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent text-white rounded-full shadow-xl shadow-accent/30 flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
