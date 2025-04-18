import React, { useState, useRef, useEffect } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-[500px] w-[400px] border border-gray-300 rounded-lg overflow-hidden font-sans">
      <div className="bg-teal-700 text-white p-4 text-center">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-[50%]">Start guessing!</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="mb-4 p-3 bg-white rounded-lg shadow-sm">
              <div className="font-bold text-teal-700 mb-1">{message.sender}</div>
              <div className="text-gray-800">{message.text}</div>
              <div className="text-xs text-gray-500 text-right mt-1">{message.timestamp}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex p-3 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded mr-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;