import React from "react";

interface ChatRoomListProps {
	receiver: any;
	isOnline: boolean;
	lastMessage: string;
	unreadCount: number;
	onClick: () => void;
	selected: boolean;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
	receiver,
	isOnline,
	lastMessage,
	unreadCount,
	onClick,
	selected,
}) => {
	console.log("inside chatRoomList", selected);
	console.log("inside chatRoomList", selected);
	console.log("inside chatRoomList lastMessage", lastMessage);
	console.log("inside chatRoomList receiver ", receiver);
	console.log(
		"inside chatRoomList receiver?.name isOnline ",
		receiver[0]?.name,
		isOnline
	);

	return (
		<div
			onClick={onClick}
			className={`card max-w-96  ${
				selected === true
					? "bg-green-300  hover:bg-green-400"
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
						<p>{lastMessage?.length>8?lastMessage?.substring(0,8)+"...": lastMessage}</p>
					</span>
				</div>
					{unreadCount>0 && <div className="badge  right-0 bg-green-600 text-white rounded-full p-1 text-xs">
						{unreadCount}
					</div>}
				{/* <div className="flex flex-row w-full justify-between"> */}
			</div>
		</div>
	);
};

export default ChatRoomList;
