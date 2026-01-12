
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, X, Send, Loader2 } from 'lucide-react';
import { Project, ChatMessage } from '../types';
import { startDesignChat } from '../services/geminiService';

interface GeminiAssistantProps {
  project: Project;
  textColor: string;
  accentColor: string;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ project, textColor, accentColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = startDesignChat(project);
    setMessages([{ role: 'model', text: `Hi! I'm Lyna's AI assistant. Want to know more about the creative process for "${project.title}"?` }]);
  }, [project]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I couldn't generate a response." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I lost my connection to the design grid." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[300]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl transition-all duration-300 border"
        style={{ backgroundColor: `${accentColor}20`, borderColor: `${accentColor}50`, color: textColor }}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border bg-white/95 backdrop-blur-md flex flex-col"
            style={{ borderColor: `${accentColor}30` }}
          >
            <div className="p-4 border-b flex items-center justify-between" style={{ backgroundColor: `${accentColor}10` }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black">Design Assistant</h3>
                  <p className="text-[10px] text-gray-500 font-medium">Powered by Gemini</p>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="animate-spin text-gray-400" size={16} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t flex gap-2 bg-white">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about the design..."
                className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 text-black"
                style={{ focusRingColor: accentColor }}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeminiAssistant;
