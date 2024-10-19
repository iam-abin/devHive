import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

import { recruiterSignoutApi } from "../../axios/apiMethods/auth-service/recruiterAuth";
import { clearRecruiter } from "../../redux/slice/recruiterSlice/recruiterDataSlice";
import Swal from "sweetalert2";
import { notify } from "../../utils/toastMessage";
import { IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import Notifications from "../notification/Notifications";

import socket from "../../config/socket";
import {
	deleteRecruiterAllNotificationsApi,
	getRecruiterAllNotificationsApi,
} from "../../axios/apiMethods/chat-service/notification";

const TopNavBarRecruiter: React.FC<{ toggleLeftNavBar: any }> = ({
	toggleLeftNavBar,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [notifications, setNotifications] = useState<any[]>([]);
	const [notificationsCount, setNotificationsCount] = useState<number>(0);

	const isLoggedIn: any = useSelector((state: RootState) => {
		return state.recruiterData.data;
	});

	const recruiter: any = useSelector((state: RootState) => {
		return state.recruiterData.data;
	});

	// to get the other user
	const getOtherUser = (chatRoom: any) => {
		const otherUser = chatRoom?.users?.filter(
			(value: any) => value._id !== recruiter?.id
		);

		return otherUser;
	};

	// to avoid notification for current chatbox
	const currentlySelectedRecruiterChatRoom = useSelector(
		(state: RootState) => state.recruiterCurrentlySelectedChatroom.data
	);

	const handleRecruiterLogout = async () => {
		Swal.fire({
			title: "Do you want to Logout?",
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Logout",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await recruiterSignoutApi(recruiter);
				if (response) {
					dispatch(clearRecruiter());
					notify("Logged out successfully", "success");
					navigate("/recruiter/signin");
				}
			}
		});
	};
	const [openNotifications, setOpenNotifications] = useState(false);
	useEffect(() => {
		(async () => {
			try {

				if (openNotifications) {
					let fetchedNotifications =
						await getRecruiterAllNotificationsApi();
				
					// socket.on('notification', (data: any) => {

					let currentChatRoomSender = getOtherUser(
						currentlySelectedRecruiterChatRoom
					);
					

					let filteredNotifications = [];
					if (currentlySelectedRecruiterChatRoom) {
						filteredNotifications =
							fetchedNotifications.data.filter(
								(notification: any) => {
									if (
										currentChatRoomSender[0]?._id !==
										notification?.senderId
									) {
										return notification;
									}
								}
							);
					} else {
						filteredNotifications = fetchedNotifications.data;
					}

					if (filteredNotifications.length == 0) {
						await deleteRecruiterAllNotificationsApi();
					}
					// if(sender[0]._id !== data?.senderId) setNotifications([...notifications, data]);

					setNotifications(filteredNotifications);

					// })
					// dispatch(
					// 	setrecruiterProfileDetails(notifications?.data)
					// );
				}
		})();
	}, [openNotifications]);

	
	useEffect(() => {
		socket.on("chatNotification", (data: any) => {
			let senderToChatRoom = getOtherUser(
				currentlySelectedRecruiterChatRoom
			);
			if (senderToChatRoom[0]._id !== data?.senderId)
				setNotifications([...notifications, data]);
		});
	}, []);

	useEffect(() => {
		(async () => {
				let fetchedNotifications =
					await getRecruiterAllNotificationsApi();
				let currentChatRoomSender = getOtherUser(
					currentlySelectedRecruiterChatRoom
				);
				
				let filteredNotifications = [];
				if (currentlySelectedRecruiterChatRoom) {
					filteredNotifications = fetchedNotifications.data.filter(
						(notification: any) => {
							if (
								currentChatRoomSender[0]?._id !==
								notification?.senderId
							) {
								return notification;
							}
						}
					);
				} else {
					filteredNotifications = fetchedNotifications.data;
				}

				// if (filteredNotifications) {
				setNotificationsCount(filteredNotifications.length);
				
		})();
	}, [notifications]);

	
	const clearNotifications = async (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		// Implement logic to clear notifications
		e.stopPropagation();
		await deleteRecruiterAllNotificationsApi();
		setNotificationsCount(0);
		setNotifications([]);
	};

	return (
		<div className="navbar sticky top-0 z-50  bg-cyan-700">
			<div className="flex-1 z-50">
				{ (
					<GiHamburgerMenu
						className="text-white sm:hidden text-3xl cursor-pointer"
						onClick={() =>
							toggleLeftNavBar()
						}
					/>
				)}
				<a
					className="btn btn-ghost normal-case text-xl"
					onClick={() => navigate("/recruiter")}
				>
					DevHive
				</a>
			</div>
			<div
					className="flex w-9 cursor-pointer mr-3 "
					onClick={() => setOpenNotifications(!openNotifications)}
				>
					<IoMdNotifications className="text-2xl" />
					<div className="badge bg-green-600 text-white rounded-full p-1 text-xs">
						{notificationsCount}
					</div>

					{openNotifications && (
						<Notifications
							notifications={notifications}
							clearNotifications={clearNotifications}
							setOpenNotificationFn = {setOpenNotifications}
						/>
					)}
				</div>

			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					{isLoggedIn ? (
						<div className="flex-none">
							<div className="dropdown dropdown-end">
								<div
									tabIndex={0}
									role="button"
									className="btn btn-ghost mr-10 p-5"
								>
									<div className=" rounded-full">
										{recruiter?.name}
									</div>
								</div>
								<ul
									tabIndex={0}
									className="menu menu-sm dropdown-content mt z-[1] p-2 shadow bg-base-100 rounded-box w-40"
								>
									<li
										onClick={() =>
											navigate(
												"/recruiter/passwordResetMobile"
											)
										}
									>
										<a>Reset Password</a>
									</li>
									<li onClick={handleRecruiterLogout}>
										<a>Recruiter Logout</a>
									</li>
								</ul>
							</div>
						</div>
					) : (
						<li>
							<Link to="/recruiter/signin">Recruiter Signin</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default TopNavBarRecruiter;
