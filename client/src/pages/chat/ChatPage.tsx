import React, { useEffect, useState } from "react";
import ChatImage from "../../assets/chat/double-chat-bubble-icon.svg";
import { FaSearch } from "react-icons/fa";
import NavBarCandidate from "../../components/navBar/NavBarCandidate";
import ChatRoomList from "../../components/chat/ChatRoomList";
import Message from "../../components/chat/Message";
import ChatBoxTopBar from "../../components/chat/ChatBoxTopBar";
import ChatInputBox from "../../components/chat/ChatInputBox";
import {
	getAConversationApi,
	getAllChatRoomsApi,
} from "../../axios/apiMethods/chat-service/chat";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";

import socket from "../../config/socket";

const ChatPage = () => {
	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);
	const [chatRooms, setchatRooms] = useState([
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
	]);

	const [recipient, setRecipient] = useState("");

	const [currentChat, setCurrentChat] = useState([
		{ name: "abin", lastMessage: "lastMessage 1", timeStamp: "today" },
		// { name: "amal", lastMessage: "lastMessage 2", timeStamp: "today" },
		// { name: "abin", lastMessage: "lastMessage 3", timeStamp: "today" },
		// { name: "abin", lastMessage: "lastMessage 4", timeStamp: "today" },
		// { name: "amal", lastMessage: "lastMessage 5", timeStamp: "today" },
		// { name: "abin", lastMessage: "lastMessage 3", timeStamp: "today" },
		// { name: "abin", lastMessage: "lastMessage 4", timeStamp: "today" },
		// { name: "amal", lastMessage: "lastMessage 5", timeStamp: "today" },
	]);

	// const [currentChat, setCurrentChat] = useState(null);

	useEffect(() => {
		console.log("in socket io useEffect-2");
		socket.on("connect", () => {
			console.log("Connected to Socket.IO");
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from Socket.IO");
		});

		console.log("in socket io useEffect-2");

		socket.on("connect_error", (error) => {
			console.error("Socket.IO connection error:", error);
		});

		return () => {
			// Cleanup when the component unmounts
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		console.log("in socket io useEffect-1");
		socket.emit("addAUser", candidateData.id);
		console.log(socket); // Ensure that the socket is created here
		// let a = socket.emit("sendMessage", "asdkjfhkaksjadfkas");
		// console.log("in socket io useEffect-1 after emit ",a);
	}, []);

	useEffect(() => {
		(async () => {
			// dispatch(setLoading());
			const chatRooms = await getAllChatRoomsApi(candidateData.id);
			console.log("chatRooms", chatRooms);
			setchatRooms(chatRooms.data);
			// dispatch(setLoaded());
		})();
	}, []);

	const getConversation = async (roomId: string) => {
		// dispatch(setLoading());
		const conversation = await getAConversationApi(roomId);
		console.log("conversation", conversation);
		setCurrentChat(conversation.data);
		// dispatch(setLoaded());
	};

	// useEffect(() => {
	// 	if (sendMessage !== null) {
	// 	  socket.emit("send-message", sendMessage);
	// 	}
	//   }, [sendMessage]);

	const onSend = (message: string) => {
		const messageToSend = {
			sender: candidateData.id,
			// recipient: recipient,
			recipient: "fy8ysag6rq6we87yfgaisuduag",
			text: message,
		};
		console.log("--------sending message to socket---------");
		console.log(messageToSend);
		console.log("--------sending message to socket---------");
		let result = socket.emit("sendMessage", messageToSend);
		console.log("message after send: ", result);
		console.log("--------sending message to socket---------");

		setCurrentChat([...currentChat]);
	};

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
							{chatRooms.length === 0 ? (
								<div className="text-center">
									<h3>no chat rooms found</h3>
								</div>
							) : (
								chatRooms.map((chatRooms) => (
									<ChatRoomList user={chatRooms} />
								))
							)}
						</div>
					</div>

					{/* Right */}
					<div className="chat-area bg-slate-50 flex-4 w-5/6 p-4 rounded-r-lg">
						{currentChat.length === 0 ? (
							<div className="flex justify-center items-center p-4 min-h-[80vh] max-h-[80vh]">
								<img className="h-52" src={ChatImage} alt="" />
							</div>
						) : (
							<div className="flex flex-col gap-3">
								<div>
									<ChatBoxTopBar user={currentChat[0]} />
								</div>
								<div className="bg-red-200 p-4 min-h-[60vh] max-h-[60vh] overflow-y-scroll shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
									{currentChat.map((message, index) => (
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
