import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const InputArea = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-6 pb-6">
            <form onSubmit={handleSubmit} className="relative w-full">
                <div className="flex items-center gap-2 p-2 pl-4 bg-gray-100 dark:bg-[#2d2d2d] border border-gray-300 dark:border-[#444] rounded-full focus-within:border-blue-500 dark:focus-within:border-blue-500 transition-colors shadow-sm dark:shadow-lg">

                    {/* Input Field */}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#888] text-[15px] px-2 h-10"
                        disabled={isLoading}
                        autoFocus
                    />

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`p-2.5 rounded-full transition-all duration-200 shrink-0 mr-1
                      ${input.trim() && !isLoading
                                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md'
                                : 'bg-gray-200 text-gray-400 dark:bg-[#404040] dark:text-[#777] cursor-not-allowed'}`}
                    >
                        <ArrowUp size={18} strokeWidth={3} />
                    </button>
                </div>

                <div className="text-center mt-3">
                    <span className="text-[11px] text-gray-500 dark:text-[#666]">
                        Support Assistant v1.0
                    </span>
                </div>
            </form>
        </div>
    );
};

export default InputArea;
