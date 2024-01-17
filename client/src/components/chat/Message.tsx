import React from "react";

const Message: React.FC<{ message: any }> = ({ message }) => {
	return (
		<>
			{message.name === "amal" ? (
				<div className="chat chat-start ">
					<div className="chat-image avatar">
						<div className="w-10 rounded-full">
							<img
								alt="Tailwind CSS chat bubble component"
								src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
							/>
						</div>
					</div>
					<div className="chat-header">
						<time className="text-xs opacity-50">12:45</time>
					</div>
					<div className="chat-bubble shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">{message.lastMessage}</div>
					{/* <div className="chat-footer opacity-50">Delivered</div> */}
				</div>
			) : (
				<div className="chat chat-end mt-3">
					<div className="chat-image avatar">
						<div className="w-10 rounded-full">
							<img
								alt="Tailwind CSS chat bubble component"
								src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
							/>
						</div>
					</div>
					<div className="chat-header">
						<time className="text-xs opacity-50">12:46</time>
					</div>
					<div className="chat-bubble shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">{message.lastMessage}</div>
					{/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
				</div>
			)}
		</>
	);
};

export default Message;
