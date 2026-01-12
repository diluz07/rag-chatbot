import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatBubble = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`flex max-w-3xl w-full ${isUser ? 'justify-end' : 'justify-start gap-4'}`}>

                {/* Bot Icon - Pulsating Orb */}
                {!isUser && (
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 animate-pulse shadow-lg shadow-blue-500/50"></div>
                    </div>
                )}

                {/* Content */}
                <div className={`
          ${isUser
                        ? 'bg-[#292a2d] px-6 py-4 rounded-[20px] rounded-tr-[5px] max-w-[85%]'
                        : 'flex-1 min-w-0 px-2'
                    }
        `}>
                    {/* Bot Name */}
                    {!isUser && (
                        <div className="font-medium text-sm mb-2 text-[#e3e3e3]">Support Assistant</div>
                    )}

                    <div className={`prose prose-invert max-w-none ${isUser ? 'text-[15px]' : ''}`}>
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
