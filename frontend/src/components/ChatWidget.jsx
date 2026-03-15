import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import InputArea from './InputArea';
import axios from 'axios';
import { MessageCircle, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isLoading, isOpen]);

    const handleSendMessage = async (text) => {
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_URL}/query`, { query: text });
            const { answer, sources } = response.data;

            setMessages(prev => [...prev, {
                role: 'bot',
                content: answer,
                sources: sources
            }]);
        } catch (error) {
            console.error('Error querying:', error);
            setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error retrieving the answer.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* Chat Window */}
            {isOpen && (
                <div className="w-[380px] h-[600px] mb-4 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-[#333] overflow-hidden pointer-events-auto animate-fade-in origin-bottom-right transition-all">

                    {/* Widget Header */}
                    <div className="bg-blue-600 dark:bg-[#2563eb] px-4 py-3 flex items-center justify-between shrink-0 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                            <span className="font-semibold text-white">Support Assistant</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded transition-colors"><X size={18} /></button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 bg-gray-50 dark:bg-[#1e1e1e] transition-colors scroll-smooth">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center px-6 text-gray-500 dark:text-[#a0a0a0]">
                                <MessageCircle size={48} className="mb-4 text-gray-300 dark:text-[#333]" />
                                <h3 className="text-gray-900 dark:text-white font-medium mb-1">How can we help?</h3>
                                <p className="text-sm">We usually respond instantly.</p>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, index) => (
                                    <ChatBubble key={index} message={msg} />
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-white dark:bg-[#2d2d2d] px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-[#333] shadow-sm">
                                            <div className="flex gap-1.5 items-center h-4">
                                                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-75"></div>
                                                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-150"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Widget Input */}
                    <div className="p-3 bg-white dark:bg-[#252525] border-t border-gray-200 dark:border-[#333] transition-colors">
                        <InputArea
                            onSendMessage={handleSendMessage}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 pointer-events-auto border border-black/5 dark:border-white/10
            ${isOpen ? 'bg-white text-gray-900 hover:bg-gray-50 dark:bg-[#252525] dark:text-white' : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8]'}`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>

        </div>
    );
};

export default ChatWidget;
