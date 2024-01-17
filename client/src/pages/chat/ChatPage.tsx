import React, { useEffect, useState } from "react";
import ChatImage from "../../assets/chat/double-chat-bubble-icon.svg";
import { FaSearch } from "react-icons/fa";
import NavBarCandidate from "../../components/navBar/NavBarCandidate";
import CartListItemItem from "../../components/chat/CartListItemItem";
import Message from "../../components/chat/Message";
import ChatBoxTopBar from "../../components/chat/ChatBoxTopBar";
import ChatInputBox from "../../components/chat/ChatInputBox";

const ChatPage = () => {
	// const [chats, setChats] = useState([]);

	// const fetchChats = async () => {
	// 	const response = await axios.get("/asddfasd");
	// 	console.log(response);
	// };
	// useEffect(() => {
	// 	fetchChats();
	// }, []);

	let users = [
		{
			name: "abin",
			ofline: true,
		},
		{
			name: "abin",
			ofline: true,
		},
		{
			name: "abin",
			ofline: true,
		},
	];

	const [messages, setMessages] = useState([
		{ name: "abin", lastMessage: "lastMessage 1", timeStamp: "today" },
		{ name: "amal", lastMessage: "lastMessage 2", timeStamp: "today" },
		{ name: "abin", lastMessage: "lastMessage 3", timeStamp: "today" },
		{ name: "abin", lastMessage: "lastMessage 4", timeStamp: "today" },
		{ name: "amal", lastMessage: "lastMessage 5", timeStamp: "today" },
		{ name: "abin", lastMessage: "lastMessage 3", timeStamp: "today" },
		{ name: "abin", lastMessage: "lastMessage 4", timeStamp: "today" },
		{ name: "amal", lastMessage: "lastMessage 5", timeStamp: "today" },
	]);


	const onSend = () => {};

	return (
		<>
			<NavBarCandidate />
			<div className="bg-white  h-[92vh] flex justify-center items-center">
				<div className="bg-slate-200 h-max-[88vh] w-[90vw] flex rounded-md">
					{/* Left */}
					<div className=" bg-slate-50 w-2/6 flex-col rounded-l-lg p-4 flex gap-2 ">
						<div className="rounded-3xl gap-2 bg-white p-3 flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
							<FaSearch />
							<input
								type="text"
								placeholder="search"
								className="h-6 border-transparent w-full focus:outline-none"
							/>
						</div>
						<div className="rounded-3xl gap-2 bg-white p-3 flex-grow items-center">
							{users.map((user) => (
								<CartListItemItem user={user} />
							))}
						</div>
					</div>

					{/* Right */}
					<div className="chat-area bg-slate-50 flex-4 w-5/6 p-4 rounded-r-lg">
						{messages.length === 0 ? (
							<div className="flex justify-center items-center p-4 min-h-[80vh] max-h-[80vh]">
								<img className="h-52" src={ChatImage} alt="" />
							</div>
						) : (
							<div className="flex flex-col gap-3">
								<div>
									<ChatBoxTopBar user={messages[0]} />
								</div>
								<div className="bg-red-200 p-4 min-h-[60vh] max-h-[60vh] overflow-y-scroll shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
									{messages.map((message, index) => (
										<Message
											key={index}
											message={message}
										/>
									))}
								</div>

								<div className="bottom-bar mb-0">
									<ChatInputBox onSend={onSend} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatPage;
