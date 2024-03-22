import React, { useEffect, useState } from "react";
import { deleteCandidatesAllNotificationsApi, deleteRecruiterAllNotificationsApi, getCandidatesUnreadMessagesCountApi, getRecruitersUnreadMessagesCountApi } from "../../axios/apiMethods/chat-service/notification";
import { dateFormatHumanized, getTime, isToday } from "../../utils/date-functions";
import { formatDate } from "../../utils/date-functions";

interface ChatRoomListProps {
	receiver: any;
	isOnline: boolean;
	lastMessage: string;
	lastMessageTime: Date;
	currentUser: any;
	onClick: () => void;
	selected: boolean;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
	receiver,
	isOnline,
	lastMessage,
	lastMessageTime,
	currentUser,
	onClick,
	selected,
}) => {
	// Use useState to manage the unReadCount state
	const [unReadCount, setUnReadCount] = useState<number>(0);
	
	// Use useEffect to fetch the unread message count asynchronously
	useEffect(() => {
		const fetchUnreadCount = async () => {
			let count: any = 0;
			if (currentUser.userType === "candidate") {
				// if(selected){
				// 	await deleteCandidatesAllNotificationsApi(currentUser.id)
				// }else{
					count = await getCandidatesUnreadMessagesCountApi(currentUser.id, receiver[0]._id);
				// }
			} 
			// else if(currentUser.userType === "recruiter") {
			// 	// if(selected){
			// 	// 	await deleteRecruiterAllNotificationsApi(currentUser.id)
			// 	// }else{
			// 		count = await getRecruitersUnreadMessagesCountApi(currentUser.id, receiver[0]._id);
			// 	// }
			// }
			console.log("unread ****** count", count);
			
			setUnReadCount(count.data);
		};

		fetchUnreadCount();
	}, [currentUser, receiver]); // Depend on currentUser and receiver to refetch when they change

	return (
		<div
			onClick={onClick}
			className={`card max-w-96 ${
				selected === true
					? "bg-green-200 hover:bg-green-100"
					: "bg-base-100 "
			} shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-1 hover:bg-gray-200`}
		>
			<div className="flex flex-row p-4 gap-3 items-center ">
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle avatar flex flex-col items-start relative"
				>
					<div className="w-10 rounded-full relative">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						/>
						<span
							className={`${
								isOnline ? "bg-green-500" : "bg-red-500"
							} w-4 h-4 rounded-full absolute top-0 right-0`}
						></span>
					</div>
				</div>
				<div className="flex flex-col w-full justify-between">
					<h5 className="text-gray-600 font-semibold text-sm">{receiver[0]?.name}</h5>
					<span className="flex flex-row items-center">
						<p>{lastMessage?.length > 8 ? lastMessage.substring(0, 8) + "..." : lastMessage}</p>
					</span>
				</div>
				{unReadCount > 0 && !selected && (
					<div className="badge right-0 bg-green-600 text-white rounded-full p-1 text-xs">
						{unReadCount}

					</div>
					
					)}
					{isToday(lastMessageTime)? getTime(lastMessageTime) :formatDate(lastMessageTime.toString())}
			</div>
		</div>
	);
};

export default ChatRoomList;