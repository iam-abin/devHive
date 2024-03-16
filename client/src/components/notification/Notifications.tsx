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
							<li className="my-4" key={notification.id}>
								{notification.message}
							</li>
						))
					) : (
						<div className="bg-blue-400 flex flex-col items-center justify-center ">
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
