import React, { useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';

const ChatInputBox: React.FC<{ onSend: (message: string) => void }> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-4 border-t  border-black ">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      />
      <button
        onClick={handleSend}
        className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <FaRegPaperPlane />
      </button>
    </div>
  );
};

export default ChatInputBox;
