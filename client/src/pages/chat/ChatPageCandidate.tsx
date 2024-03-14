import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { FaSearch } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

import ChatImage from "../../assets/chat/double-chat-bubble-icon.svg";
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import ChatRoomList from "../../components/chat/ChatRoomList";
import Message from "../../components/chat/Message";
import ChatBoxTopBar from "../../components/chat/ChatBoxTopBar";
import ChatInputBox from "../../components/chat/ChatInputBox";
import { getACandidateConversationApi } from "../../axios/apiMethods/chat-service/chat";
import { RootState } from "../../redux/reducer/reducer";
import socket from "../../config/socket";

const ChatPageCandidate = () => {
	const { recepientId } = useParams();

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const candidateProfile: any = useSelector((state: RootState) => {
		return state.candidateProfile.candidateProfile;
	});

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
	}, [candidateData?._id]);

	useEffect(() => {
		socket.emit("createChatRoom", candidateData.id, recepientId);
		socket.on("getAllChatRooms", (rooms) => {
			setchatRooms(rooms);
		});
		console.log("getAllChatRooms useEffect candidate");
		
	}, [selectedChatRoom, selectedChatRoomMessages]);

	useEffect(() => {
		// Listen for "selectedChatRoomMessages" events and update the selectedChatRoomMessages state
		socket.on("receiveMessage", (message) => {
			console.log("in receive message candidateEEEEEEEEEEEE ", message);

			if (message.result.roomId.toString() === selectedChatRoom?._id) {
				if(message.result.senderId != candidateData.id) socket.emit("markAsRead", message.result.id);
				setSelectedChatRoomMessages([
					...selectedChatRoomMessages,
					message.result,
				]);

				// selectedChatRoomMessages.forEach((message: any) => {
				// 	console.log("???????????????? message.read", message.read);
				// 	console.log(
				// 		"???????????????? message.senderId!= candidateData.id",
				// 		message.senderId != candidateData.id
				// 	);
				// 	console.log(message);

				// 	if (!message.read && message.senderId != candidateData.id) {
				// 		socket.emit("markAsRead", message.id);
				// 	}
				// });
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

	const sendMessage = (message: string) => {
		const messageToSend = {
			senderId: candidateData.id,
			roomId: selectedChatRoom._id,
			textMessage: message,
		};
		socket.emit("sendMessage", messageToSend);
	};

	const handleChatRoomClick = async (room: any) => {
		setSelectedChatRoom(room);
		const conversations = await getACandidateConversationApi(room._id);
		setSelectedChatRoomMessages(conversations.data);
		// selectedChatRoomMessages.forEach((message: any) => {
		// 	console.log("???????????????? message.read", message.read);
		// 	console.log(
		// 		"???????????????? message.senderId!= candidateData.id",
		// 		message.senderId != candidateData.id
		// 	);
		// 	console.log(message);

		// 	if (!message.read && message.senderId != candidateData.id) {
		// 		console.log(
		// 			"////////////////////////////////////////////////////////"
		// 		);

		// 		socket.emit("markAsRead", message.id);
		// 	}
		// });
	};

	console.log("onlineUsers are --->>>", onlineUsers);
	console.log("chatRooms are --->>>", chatRooms);
	console.log("selected chatRoom is --->>>", selectedChatRoom);

	const isUserOnline = (chatRoom: any) => {
		const otherValue = chatRoom.users.filter(
			(value: any) => value._id !== candidateData.id
		);

		for (let i = 0; i < onlineUsers.length; i++) {
			if (onlineUsers[i]?.userId == otherValue[0]?._id) {
				return true;
			}
		}
		return false;
	};

	const getReceiver = (chatRoom: any) => {
		const otherUser = chatRoom.users.filter(
			(value: any) => value._id !== candidateData.id
		);

		return otherUser;
	};

	return (
		<>
			<TopNavBarCandidate />
			<div className="bg-white  h-[92vh] flex justify-center items-center">
				<div className="bg-slate-200 h-max-[88vh] w-[90vw] flex rounded-md">
					{/* Left */}
					<div className=" bg-slate-50 w-2/6 flex-col rounded-l-lg p-4 flex gap-2 ">
						{/* <div className="rounded-3xl gap-2 bg-white p-3 flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
							<FaSearch />
							<input
								type="text"
								placeholder="search"
								className="h-6 border-transparent w-full focus:outline-none"
							/>
						</div> */}
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
											lastMessage={chatRoom?.lastMessage}
											onClick={() =>
												handleChatRoomClick(chatRoom)
											} // Update the onClick handler
											selected={
												selectedChatRoom?.id ===
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
										isOnline={isUserOnline(
											selectedChatRoom
										)}
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
													candidateImage={
														candidateProfile.profile_image
													}
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
