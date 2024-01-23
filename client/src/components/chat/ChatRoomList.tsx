import React from "react";

interface ChatRoomListProps {
	user: any;
	isOnline: boolean;
	onClick: () => void;
	selected: boolean;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
	user,
	isOnline,
	onClick,
	selected,
}) => {
	console.log("inside chatRoomList", selected);
	console.log("inside chatRoomList", selected);
	console.log("inside chatRoomList", selected);

	return (
		<div onClick={onClick} className={`card max-w-96  ${
			selected ===true ? 'bg-green-300  hover:bg-green-400' : 'bg-base-100 '
		  } shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-1 hover:bg-gray-200`}>
			<div className="flex flex-row p-4 gap-3 items-center ">
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle avatar"
				>
					<div className="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						/>
					</div>
				</div>
				{/* <div className="flex flex-row w-full justify-between"> */}
				<div className="flex flex-col w-full justify-between">
					<h5>{user}</h5>
					<p>{isOnline ? "online" : "ofline"}</p>
				</div>
			</div>
		</div>
	);
};

export default ChatRoomList;
