import React from "react";

const ChatRoomList: React.FC<{ user: any }> = ({ user }) => {
	return (
		<div className="card max-w-96 bg-base-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-1 hover:bg-gray-200">
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
				<div className="flex flex-row w-full justify-between">
					<h5>{user.name}</h5>
					<p>{user.ofline ? "ofline" : "online"}</p>
				</div>
			</div>
		</div>
	);
};

export default ChatRoomList;
