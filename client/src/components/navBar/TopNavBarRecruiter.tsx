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

// import { candidateGetProfileApi } from "../../axios/apiMethods/profile-service/candidate";

import socket from "../../config/socket";
import {
	deleteCandidatesAllNotificationsApi,
	deleteRecruiterAllNotificationsApi,
	getRecruiterAllNotificationsApi,
	getRecruiterNotificationCountApi,
} from "../../axios/apiMethods/chat-service/notification";

const TopNavBarRecruiter: React.FC<{ toggleLeftNavBar: any }> = ({
	toggleLeftNavBar,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [notifications, setNotifications] = useState<any[]>([]);
	const [notificationsCount, setNotificationsCount] = useState<number>(0);

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to toggle mobile menu
	const [isLeftNavBarVisible, setIsLeftNavBarVisible] = useState(false); // State to toggle LeftNavBarRecruiter

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

	const isRecruiterUrl = location.pathname.includes("recruiter");
	console.log("isLoggedin Data", isLoggedIn);

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
				console.log("signout response", response);
				if (response) {
					dispatch(clearRecruiter());
					notify("Logged out successfully", "success");
					navigate("/recruiter/signin");
				}
			}
		});
	};

	// ============================================================================

	const [openNotifications, setOpenNotifications] = useState(false);
	useEffect(() => {
		(async () => {
			try {
				// console.log("no");

				if (openNotifications) {
					let fetchedNotifications =
						await getRecruiterAllNotificationsApi(recruiter?.id);
					// let fetchedNotificationsCount = await getrecruitersNotificationCountApi(recruiter?.id);

					// console.log("fetchedNotifications$$$$$$$$$$$$", fetchedNotifications);
					console.log(
						"fetchedNotifications$$$$$$$$$$$$",
						fetchedNotifications.data
					);
					// socket.on('notification', (data: any) => {

					let currentChatRoomSender = getOtherUser(
						currentlySelectedRecruiterChatRoom
					);
					console.log(
						"socket.on chatNotification 000000000000004",
						currentChatRoomSender
					);

					// let filteredNotifications = fetchedNotifications.data.filter((notification: any)=>{
					// 	console.log("socket.on chatNotification 000000000000005", currentChatRoomSender[0]?._id !== notification?.senderId);
					// 	if((currentChatRoomSender[0]?._id !== notification?.senderId) || !currentlySelectedRecruiterChatRoom){
					// 		return notification
					// 	}

					// })

					let filteredNotifications = [];
					if (currentlySelectedRecruiterChatRoom) {
						filteredNotifications =
							fetchedNotifications.data.filter(
								(notification: any) => {
									// console.log("socket.on chatNotification 000000000000005", currentChatRoomSender[0]?._id !== notification?.senderId);
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
						await deleteRecruiterAllNotificationsApi(recruiter.id);
					}
					// if(sender[0]._id !== data?.senderId) setNotifications([...notifications, data]);

					setNotifications(filteredNotifications);

					// })
					// dispatch(
					// 	setrecruiterProfileDetails(notifications?.data)
					// );
				}
			} catch (error) {
				console.error("Error fetching recruiter profile:", error);
			}
		})();
	}, [openNotifications]);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			if (openNotifications) {
	// 				let fetchedNotifications = await getRecruiterAllNotificationsApi(recruiter?.id);
	// 				console.log("fetchedNotifications:", fetchedNotifications);
	// 				console.log("currentlySelectedRecruiterChatRoom:", currentlySelectedRecruiterChatRoom);
	// 				let sender = getOtherUser(currentlySelectedRecruiterChatRoom);
	// 				console.log("sender:", sender);

	// 				// let filteredNotifications = fetchedNotifications?.data?.filter((notification: any) => {
	// 				// 	return sender && sender.length > 0 && sender[0]?._id !== notification?.senderId;
	// 				// });

	// 				let filteredNotifications = fetchedNotifications.data.filter((notification: any)=>{
	// 					console.log("on filteredNotifications 000000000000005", sender[0]?._id !== notification?.senderId);
	// 					return sender[0]?._id !== notification?.senderId
	// 				})

	// 				console.log("filteredNotifications in openNotification useCase ", filteredNotifications);

	// 				setNotifications(filteredNotifications);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching candidate profile:", error);
	// 		}
	// 	})();
	// }, [openNotifications]);

	// io.to(user2.socketId).emit("chatNotification", {sender: senderId,message: textMessage });
	useEffect(() => {
		socket.on("chatNotification", (data: any) => {
			console.log(
				"socket.on chatNotification 000000000000001",
				notifications
			);
			console.log("socket.on chatNotification 000000000000002", data);
			console.log("socket.on chatNotification 000000000000003", [
				...notifications,
				data,
			]);
			let senderToChatRoom = getOtherUser(
				currentlySelectedRecruiterChatRoom
			);
			console.log(
				"socket.on chatNotification 000000000000004",
				senderToChatRoom
			);
			console.log(
				"socket.on chatNotification 000000000000005",
				senderToChatRoom[0]?._id !== data?.senderId
			);
			if (senderToChatRoom[0]._id !== data?.senderId)
				setNotifications([...notifications, data]);
		});
	}, []);
	// dispatch(setCandidateProfileDetails(notifications?.data));setNotificationsCount(fetchedNotificationsCount)

	useEffect(() => {
		(async () => {
			try {
				let notificationsCount = await getRecruiterNotificationCountApi(
					recruiter?.id
				);
				console.log(
					"notificationsCounttttttttt",
					notificationsCount.data
				);

				let fetchedNotifications =
					await getRecruiterAllNotificationsApi(recruiter?.id);
				console.log(
					"fetchedNotifications$$$$$$$$$$$$",
					fetchedNotifications.data
				);

				let currentChatRoomSender = getOtherUser(
					currentlySelectedRecruiterChatRoom
				);
				console.log(
					"socket.on chatNotification 000000000000004",
					currentChatRoomSender
				);

				// let filteredNotifications = fetchedNotifications?.data?.filter((notification: any) => {
				// 	return currentChatRoomSender && currentChatRoomSender.length > 0 && currentChatRoomSender[0]?._id !== notification?.senderId;
				// });

				let filteredNotifications = [];
				if (currentlySelectedRecruiterChatRoom) {
					filteredNotifications = fetchedNotifications.data.filter(
						(notification: any) => {
							// console.log("socket.on chatNotification 000000000000005", currentChatRoomSender[0]?._id !== notification?.senderId);
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
				// } else {
				// 	setNotificationsCount(0);
				// }
			} catch (error) {
				console.error("Error fetching candidate profile:", error);
			}
		})();
	}, [notifications]);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			if (openNotifications) {
	// 				let notifications = await getRecruiterAllNotificationsApi(
	// 					recruiter?.id
	// 				);

	// 				console.log("notifications", notifications);

	// 				// dispatch(setCandidateProfileDetails(notifications?.data));
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching candidate profile:", error);
	// 		}
	// 	})();
	// }, []);

	// ============================================================================

	// const notifications = [
	// 	// Add your notification data here
	// 	{ id: 1, message: "Notification 1" },
	// 	{ id: 2, message: "Notification 2" },
	// ];

	const clearNotifications = async (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		// Implement logic to clear notifications
		e.stopPropagation();
		console.log("Clearing notifications...");
		// await deleteCandidatesAllNotificationsApi(recruiter.id)
		await deleteRecruiterAllNotificationsApi(recruiter.id);
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
				className="relative mr-3 cursor-pointer"
				onClick={() => setOpenNotifications(!openNotifications)}
			>
				<IoMdNotifications className="text-2xl mr-3" />
				<div className="badge absolute top-0 right-0 bg-green-600 text-white rounded-full p-1 text-xs">
					{notificationsCount}
				</div>

				{openNotifications && (
					<Notifications
						notifications={notifications}
						clearNotifications={clearNotifications}
						setOpenNotificationFn={setOpenNotifications}
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
