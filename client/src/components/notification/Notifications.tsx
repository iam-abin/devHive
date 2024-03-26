import React from "react";

const Notifications: React.FC<{
	notifications: any;
	clearNotifications: any;
	setOpenNotificationFn: any;
}> = ({ notifications, clearNotifications, setOpenNotificationFn }) => {
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="absolute top-full right-0 w-80 h-80  border bg-gray-200 border-gray-300 rounded-2xl mt-2  shadow-md p-4"
		>
			<div className="mb-2 font-bold text-center ">
				chat notifications are
			</div>
			<div className="w-full-400 h-4/5 overflow-auto">
				<ul>
					{notifications.length > 0 ? (
						notifications?.map((notification: any) => (
							<li className="my-4 p-2 text-sm shadow-lg flex flex-row justify-between" key={notification.id}>
								<p>{ notification?.message?.length > 17 ? notification.message.substring(0, 17) + "..." : notification.message}</p>
								<p>{notification?.senderId?.name}</p>
							</li>
						))
					) : (
						<div className=" flex flex-col items-center justify-center ">
							<span className="my-aut">No Notifications</span>
						</div>
					)}
				</ul>
			</div>
			<div className="flex justify-between">
				<label
					className="bg-gray-400 hover: cursor-pointer text-white rounded-full p-1  text-xs mt-2"
					onClick={() => setOpenNotificationFn(false)}
				>
					close
				</label>
				<label
					className="bg-gray-400 hover: cursor-pointer text-white rounded-full p-1  text-xs mt-2"
					onClick={clearNotifications}
				>
					Clear Notifications
				</label>
			</div>
		</div>
	);
};

export default Notifications;
