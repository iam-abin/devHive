import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatImage from "../../assets/chat/double-chat-bubble-icon.svg";
import ChatRoomList from "../../components/chat/ChatRoomList";
import Message from "../../components/chat/Message";
import ChatBoxTopBar from "../../components/chat/ChatBoxTopBar";
import ChatInputBox from "../../components/chat/ChatInputBox";
import {
    getARecrutierConversationApi,
    getAllRecruiterChatRoomsApi,
} from "../../axios/apiMethods/chat-service/chat";
import { RootState } from "../../redux/reducer";
import socket from "../../config/socket";
import { deleteRecruitersAllNotificationsBySenderIdApi } from "../../axios/apiMethods/chat-service/notification";
import { CONSTANTS } from "../../utils/constants";
import { clearCurrentlySelectedChatRoom, setCurrentlySelectedChatRoom } from "../../redux/slice/chat";

const ChatPageRecruiter = () => {
    const dispatch = useDispatch();
    const { recepientId } = useParams();

    const recruiterData: any = useSelector(
        (store: RootState) => store.userReducer.authData
    );

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
        // Check if the page is being refreshed
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            // Dispatch the action to clear the currently selected chat room
            dispatch(clearCurrentlySelectedChatRoom());
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        socket.emit("addActiveUser", recruiterData.id);
        socket.on("getActiveUsers", (users) => {
            setOnlineUsers(users);
        });
    }, [recruiterData?._id]);

    useEffect(() => {
        socket.emit("createChatRoom", recruiterData.id, recepientId);
        // console.log(rooms);
        
        socket.on("getAllChatRooms", (rooms) => {
            console.log(rooms);
            
            setchatRooms(rooms);
        });
    }, [selectedChatRoom, selectedChatRoomMessages]);

    useEffect(() => {
        socket.on("chatNotification", () => {
            (async () => {
                const rooms = await getAllRecruiterChatRoomsApi(
                    recruiterData.id
                );
                setchatRooms(rooms.data);
            })();
        });

        return () => {
            // Clean up the event listener when the component unmounts
            socket.off("chatNotification");
            dispatch(clearCurrentlySelectedChatRoom());
        };
    }, []);

    useEffect(() => {
        // Listen for "selectedChatRoomMessages" events and update the selectedChatRoomMessages state
        socket.on("receiveMessage", (message) => {
            if (selectedChatRoom?._id != message.result.roomId.toString()) {
                // console.error("no chat rooms are selected");
            }
            if (message.result.roomId.toString() === selectedChatRoom?._id) {
                if (message.result.senderId.toString() != recruiterData.id) {
                    socket.emit("markAsRead", message.result.id);
                }
                setSelectedChatRoomMessages([
                    ...selectedChatRoomMessages,
                    message.result,
                ]);
            } else {
                setSelectedChatRoomMessages([...selectedChatRoomMessages]);
            }
        });

        socket.on("connect_error", (error) => {
            console.error("Socket.IO connection error:", error);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("sendMessage");
            // socket.off("receiveMessage");
        };
        // Include 'selectedChatRoomMessages' in the dependency array to update the effect when
        // 'selectedChatRoomMessages' changes
    }, [selectedChatRoomMessages]);

    const sendMessage = (message: string) => {
        const messageToSend = {
            senderId: recruiterData?.id,
            roomId: selectedChatRoom?._id,
            textMessage: message,
        };
        socket.emit("sendMessage", messageToSend);
    };

    const handleChatRoomClick = async (room: any) => {
        setSelectedChatRoom(room);
        dispatch(setCurrentlySelectedChatRoom(room));
        const conversations = await getARecrutierConversationApi(room._id);
        let senderId = getReceiver(room); // to find the other user
        await deleteRecruitersAllNotificationsBySenderIdApi(
            senderId[0]?._id,
        );
        setSelectedChatRoomMessages(conversations.data);
    };
    const isUserOnline = (chatRoom: any) => {
        const otherValue = chatRoom.users.filter(
            (value: any) => value._id !== recruiterData.id
        );

        for (let i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i]?.userId == otherValue[0]?._id) {
                return true;
            }
        }
        return false;
    };

    function getReceiver(chatRoom: any) {
        const otherUser = chatRoom.users.filter(
            (value: any) => value._id !== recruiterData?.id
        );
        return otherUser;
    }

    return (
        <>
            <div className="bg-white  h-[92vh] flex justify-center items-center">
                <div className="bg-slate-200 h-max-[88vh] w-[90vw] flex rounded-md">
                    {/* Left */}
                    <div className=" bg-slate-50 w-2/6 flex-col rounded-l-lg p-4 flex gap-2 ">
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
                                            currentUser={recruiterData}
                                            receiver={getReceiver(chatRoom)}
                                            isOnline={isUserOnline(chatRoom)}
                                            lastMessage={chatRoom?.lastMessage}
                                            lastMessageTime={chatRoom.updatedAt}
                                            onClick={() =>
                                                handleChatRoomClick(chatRoom)
                                            }
                                            selected={
                                                selectedChatRoom?._id ===
                                                chatRoom?._id
                                            } // Adjust this line as needed
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
                                        userImage={
                                            CONSTANTS.CANDIDATE_DEFAULT_PROFILE_IMAGE
                                        }
                                        // chatRoom={selectedChatRoom}
                                        isOnline={isUserOnline(
                                            selectedChatRoom
                                        )}
                                        receiver={getReceiver(selectedChatRoom)}
                                        
                                        handleBackButtonClick={undefined}
                                    />
                                </div>
                                {/* chat box message area */}
                                <div
                                    className="bg-blue-200 min-h-[58vh] max-h-[58vh] p-5 overflow-x-scroll "
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
                                                    senderImage={
                                                        CONSTANTS.RECRUITER_DEFAULT_PROFILE_IMAGE
                                                    }
                                                    receiverImage={
                                                        getReceiver(
                                                            selectedChatRoom
                                                        )[0].profileImage
                                                            ? getReceiver(
                                                                  selectedChatRoom
                                                              )[0].profileImage
                                                            : CONSTANTS.RECRUITER_DEFAULT_PROFILE_IMAGE
                                                    }
                                                    key={index}
                                                    message={message}
                                                    userId={recruiterData.id}
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

export default ChatPageRecruiter;
