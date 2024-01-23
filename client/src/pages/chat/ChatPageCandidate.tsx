import { useEffect, useRef, useState } from "react";
import ChatImage from "../../assets/chat/double-chat-bubble-icon.svg";
import { FaSearch } from "react-icons/fa";
import NavBarCandidate from "../../components/navBar/NavBarCandidate";
import ChatRoomList from "../../components/chat/ChatRoomList";
import Message from "../../components/chat/Message";
import ChatBoxTopBar from "../../components/chat/ChatBoxTopBar";
import ChatInputBox from "../../components/chat/ChatInputBox";
import { getAConversationApi } from "../../axios/apiMethods/chat-service/chat";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";

import socket from "../../config/socket";
import { useParams } from "react-router-dom";

const ChatPageCandidate = () => {
	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);
	const { recepientId } = useParams();

	const [chatRooms, setchatRooms] = useState([]);
	const [selectedChatRoom, setSelectedChatRoom] = useState<any>(null);
	const [onlineUsers, setOnlineUsers] = useState<any>([]);
	const [selectedChatRoomMessages, setSelectedChatRoomMessages] =
		useState<any>([]);
	const chatAreaRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		if (chatAreaRef.current) {
			chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [selectedChatRoomMessages]);

	useEffect(() => {
		// Establish the connection when the component mounts
		socket.connect();

		// Clean up the connection when the component unmounts
		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		console.log("=========in socket io addActiveUser useEffect");
		socket.emit("addActiveUser", candidateData.id);
		socket.on("getActiveUsers", (users) => {
			setOnlineUsers(users);
		});
		console.log(socket); // Ensure that the socket is created here
	}, [candidateData?._id]);

	useEffect(() => {
		console.log("//////////in socket io addRoomeUser useEffect");
		socket.emit("createChatRoom", candidateData.id, recepientId);
		socket.on("getAllChatRooms", (rooms) => {
			setchatRooms(rooms);
		});
	}, [selectedChatRoom]);

	useEffect(() => {
		// Listen for "selectedChatRoomMessages" events and update the selectedChatRoomMessages state
		socket.on("receiveMessage", (message) => {
			if (message.result.roomId.toString() === selectedChatRoom) {
				setSelectedChatRoomMessages([
					...selectedChatRoomMessages,
					message.result,
				]);
			}
		});

		socket.on("connect_error", (error) => {
			console.error("Socket.IO connection error:", error);
		});

		// Clean up the event listener when the component unmounts
		return () => {
			socket.off("sendMessage");
		};
		// Include 'selectedChatRoomMessages' in the dependency array to update the effect when
		// 'selectedChatRoomMessages' changes
	}, [selectedChatRoomMessages]);

	useEffect(() => {
		console.log("//////////get conversation useEffect");
		socket.emit("createChatRoom", candidateData.id, recepientId);
		// socket.on("getAllChatRooms", (rooms) => {
		// 	setchatRooms(rooms);
		// });
	}, [selectedChatRoom]);

	const sendMessage = (message: string) => {
		const messageToSend = {
			senderId: candidateData.id,
			roomId: selectedChatRoom,
			textMessage: message,
		};
		console.log("--------sending message to socket---------");
		console.log(messageToSend);
		socket.emit("sendMessage", messageToSend);
		console.log("--------sending message to socket---------");
	};
	
	const handleChatRoomClick = async (room: any) => {
		console.log("??????????????inside handleChatRoomClick room ", room);
		setSelectedChatRoom(room);
		const conversations = await getAConversationApi(room.id);
		console.log("ccccccccccccccccccconversation", conversations);
		setSelectedChatRoomMessages(conversations.data);
	};

	console.log("onlineUsers are --->>>", onlineUsers);
	console.log("chatRooms are --->>>", chatRooms);
	console.log("selected chatRoom is --->>>", selectedChatRoom);

	const isUserOnline = (chatRoom: any) => {
		// console.log("isUserOnline ", chatRoom.users);
		// console.log("candidate ", candidateData.id);

		const otherValue = chatRoom.users.filter(
			(value: string) => value !== candidateData.id
		);
		console.log("otherValue", otherValue);

		return otherValue.length > 0;
	};

	const getReceiver = (chatRoom: any) => {
		console.log(" getReceiver  ", chatRoom.users);
		console.log("candidate ", candidateData.id);

		const otherUser = chatRoom.users.filter(
			(value: string) => value !== candidateData.id
		);
		console.log("otherValue", otherUser);

		return otherUser;
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
								chatRooms.map(
									(chatRoom: any, index: number) => (
										<ChatRoomList
											key={index}
											receiver={getReceiver(chatRoom)}
											isOnline={isUserOnline(chatRoom)}
											onClick={() =>
												handleChatRoomClick(chatRoom)
											} // Update the onClick handler
											selected={
												selectedChatRoom ===
												chatRoom?.id
											} // Highlight the selected chat room
										/>
									)
								)
							)}
						</div>
					</div>

					{/* Right */}
					<div className="chat-area bg-slate-50 flex-4 w-5/6 p-4 rounded-r-lg">
						{selectedChatRoom === null ? (
							<div className="flex justify-center items-center p-4 min-h-[80vh] max-h-[80vh]">
								<img className="h-52" src={ChatImage} alt="" />
							</div>
						) : (
							<div className="flex flex-col gap-3">
								<div>
									<ChatBoxTopBar
										// chatRoom={selectedChatRoom}
										receiver={getReceiver(selectedChatRoom)}
									/>
								</div>
								<div
									className="bg-red-300 min-h-[58vh] max-h-[58vh] p-5 overflow-x-scroll "
									ref={chatAreaRef}
								>
									{selectedChatRoomMessages.length == 0 ? (
										<div className="text-center">
											no messages send yet
										</div>
									) : (
										selectedChatRoomMessages.map(
											(message: any, index: number) => (
												<Message
													key={index}
													message={message}
													currentUserId={
														candidateData.id
													}
												/>
											)
										)
									)}
								</div>

								<div className="bottom-bar mb-0">
									<ChatInputBox onSend={sendMessage} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatPageCandidate;