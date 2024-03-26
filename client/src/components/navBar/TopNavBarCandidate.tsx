// import React from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import { useDispatch, useSelector } from "react-redux";

import { candidateSignoutApi } from "../../axios/apiMethods/auth-service/candidateAuth";
import { clearCandidate } from "../../redux/slice/candidateSlice/candidateDataSlice";
import Swal from "sweetalert2";
import { notify } from "../../utils/toastMessage";
import { IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import {
	clearCandidateProfileDetails,
	setCandidateProfileDetails,
} from "../../redux/slice/candidateSlice/candidateProfileSlice";
import { candidateGetProfileApi } from "../../axios/apiMethods/profile-service/candidate";
import { FaCrown } from "react-icons/fa";
import Notifications from "../notification/Notifications";
import socket from "../../config/socket";
import { deleteCandidatesAllNotificationsApi, getCandidatesAllNotificationsApi, getCandidatesNotificationCountApi } from "../../axios/apiMethods/chat-service/notification";

const TopNavBarCandidate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [notifications, setNotifications] = useState<any[]>([]);
	const [notificationsCount, setNotificationsCount] = useState<number>(0);

	const candidate: any = useSelector((state: RootState) => {
		return state.candidateData.data;
	});

	// to avoid notification for current chatbox
	const currentlySelectedChatRoom = useSelector(
		(state: RootState) => state.candidateCurrentlySelectedChatroom.data
	);

	
	const candidateProfile: any = useSelector((state: RootState) => {
		return state.candidateProfile.candidateProfile;
	});
	// to get the other user
	const getOtherUser = (chatRoom: any) => {
		const otherUser = chatRoom?.users?.filter(
			(value: any) => value._id !== candidateProfile.id
		);

		// const otherUser = chatRoom?.users?.filter(
		// 	(value: any) =>{
		// 		if( value._id !== candidateProfile.id){
		// 			return value._id
		// 		}
		// 	}
		// );

		console.log("in getOtherUser fn other user ", otherUser);
		
		return otherUser;
	};

	const isCandidateUrl = location.pathname.includes("candidate");

	const handleCandidateLogout = async () => {
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
				const response = await candidateSignoutApi(candidate);
				console.log("signout response", response);

				if (response) {
					dispatch(clearCandidate());
					dispatch(clearCandidateProfileDetails());
					notify("Logged out successfully", "success");
					navigate("/candidate/signin");
				}
			}
		});
	};

	useEffect(() => {
		(async () => {
			try {
				if (isCandidateUrl && candidate) {
					let candidateProfileData = await candidateGetProfileApi(
						candidate?.id
					);

					console.log("candidateProfileData", candidateProfileData);

					dispatch(
						setCandidateProfileDetails(candidateProfileData?.data)
					);
				}
			} catch (error) {
				console.error("Error fetching candidate profile:", error);
			}
		})();
	}, [candidate]);

	const menus = [
		{ title: "Jobs", to: "/candidate/all-jobs" },

		{
			title: "Applied Jobs",
			to: "/candidate/applied-jobs",
		},
		{
			title: "Profile",
			to: "/candidate/profile",
		},
		{
			title: "Premium",
			to: "/candidate/payment-plans",
		},
		{ title: "Chat", to: `/candidate/chat/${candidate.id}` },
		{ title: "Reset Password", to: "/candidate/passwordResetMobile" },
	];
	// ============================================================================

	const [openNotifications, setOpenNotifications] = useState(false);

	useEffect(() => {
		socket.on("chatNotification", (message) => {
			console.log("in receive chat Notification candidateNNNNNNNNNaaaaVVVVVV recruiterRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR", message);
			// socket.on("getAllChatRooms", (rooms) => {
			// 	setchatRooms(rooms);
			// });
			// (async()=>{
			// 	const rooms = await getAllRecruiterChatRoomsApi(recruiterData.id)
			// 	setchatRooms(rooms.data);
			// })()
		});
	
		return () => {
			// Clean up the event listener when the component unmounts
			socket.off("chatNotification");
			// dispatch(clearRecruiterCurrentlySelectedChatRoom())
		};
	}, []);


	useEffect(() => {
		(async () => {
			try {
				// console.log("no");
				
				if (openNotifications) {
					
					let fetchedNotifications = await getCandidatesAllNotificationsApi(candidate?.id);
					// let fetchedNotificationsCount = await getCandidatesNotificationCountApi(candidate?.id);

					// console.log("fetchedNotifications$$$$$$$$$$$$", fetchedNotifications);
					console.log("fetchedNotifications$$$$$$$$$$$$", fetchedNotifications.data);
					// socket.on('notification', (data: any) => {

					let currentChatRoomSender = getOtherUser(currentlySelectedChatRoom)
					console.log("socket.on chatNotification 000000000000004", currentChatRoomSender);

					let filteredNotifications = []
					if(currentlySelectedChatRoom){
						filteredNotifications = fetchedNotifications.data.filter((notification: any)=>{
							// console.log("socket.on chatNotification 000000000000005", currentChatRoomSender[0]?._id !== notification?.senderId);
							if((currentChatRoomSender[0]?._id !== notification?.senderId)){
								return notification
							}
	
						})
					}else{
						filteredNotifications = fetchedNotifications.data
					}

					if(filteredNotifications.length ==0){
						await deleteCandidatesAllNotificationsApi(candidate.id)
					}
					// if(sender[0]._id !== data?.senderId) setNotifications([...notifications, data]);

					setNotifications(filteredNotifications);

					// })
					// dispatch(
					// 	setCandidateProfileDetails(notifications?.data)
					// );
				}
			} catch (error) {
				console.error("Error fetching candidate profile:", error);
			}
		})();
	}, [openNotifications]);
	// io.to(user2.socketId).emit("chatNotification", {sender: senderId,message: textMessage });
	useEffect(()=>{
		socket.on("chatNotification", (data: any) => {
			console.log("socket.on chatNotification 000000000000001", notifications);
			console.log("socket.on chatNotification 000000000000002", data);
			console.log("socket.on chatNotification 000000000000003", [...notifications,data]);
			let senderToChatRoom = getOtherUser(currentlySelectedChatRoom)
			console.log("socket.on chatNotification 000000000000004", senderToChatRoom);
			// ============================================================================================
			// if(senderToChatRoom[0].id !== data?.senderId) setNotifications([...notifications, data]);

			let currentChatRoomSender = getOtherUser(currentlySelectedChatRoom)
					console.log("socket.on chatNotification 000000000000004", currentChatRoomSender);

					// let filteredNotifications = []
					if(!currentlySelectedChatRoom){
						// filteredNotifications = fetchedNotifications.data.filter((notification: any)=>{
						// 	// console.log("socket.on chatNotification 000000000000005", currentChatRoomSender[0]?._id !== notification?.senderId);
						// 	if((currentChatRoomSender[0]?._id !== notification?.senderId)){
						// 		return notification
						// 	}
	
						// })
						setNotifications([...notifications, data]);
					}
					// else{
					// }

					// if(filteredNotifications.length ==0){
					// 	await deleteCandidatesAllNotificationsApi(candidate.id)
					// }
					// if(sender[0]._id !== data?.senderId) setNotifications([...notifications, data]);

					
			// ============================================================================================
			
			// useEffect(() => {
			// 	socket.on("chatNotification", (data: any) => {
			// 		// Increment notificationsCount when a chat notification is received
			// 	});
			// }, []);
			
		});
	},[])

	// useEffect(() => {
    //     socket.on("chatNotification", (data: any) => {
    //         // Increment notificationsCount when a chat notification is received
    //         setNotificationsCount(prevCount => prevCount + 1);
    //     });
    // }, []);

	// dispatch(setCandidateProfileDetails(notifications?.data));setNotificationsCount(fetchedNotificationsCount)



	useEffect(() => {
		(async () => {
			try {
					let notificationsCount = await getCandidatesNotificationCountApi(
						candidate?.id
					);

					let fetchedNotifications = await getCandidatesAllNotificationsApi(candidate?.id);
					// let fetchedNotificationsCount = await getCandidatesNotificationCountApi(candidate?.id);

					// console.log("fetchedNotifications$$$$$$$$$$$$", fetchedNotifications);
					console.log("fetchedNotifications$$$$$$$$$$$$", fetchedNotifications.data);
					// socket.on('notification', (data: any) => {

					let currentChatRoomSender = getOtherUser(currentlySelectedChatRoom)
					console.log("socket.on chatNotification 000000000000004", currentChatRoomSender);

					// let filteredNotifications = fetchedNotifications?.data?.filter((notification: any)=>{
					// 	// console.log("socket.on chatNotification 000000000000005", currentChatRoomSender[0]?._id !== notification?.senderId);
					// 	return currentChatRoomSender[0]?._id !== notification?.senderId
					// })

					let filteredNotifications = []
					if(currentlySelectedChatRoom){
						filteredNotifications = fetchedNotifications.data.filter((notification: any)=>{
							// console.log("socket.on chatNotification 000000000000005", currentChatRoomSender[0]?._id !== notification?.senderId);
							if((currentChatRoomSender[0]?._id !== notification?.senderId)){
								return notification
							}
	
						})
					}else{
						filteredNotifications = fetchedNotifications.data
					}

					console.log("notificationsCount1*****************", notificationsCount?.data);
					console.log("notificationsCount2*****************", filteredNotifications?.length);

					// console.log("socket.on chatNotification 000000000000005", sender[0]?._id !== notification?.senderId);
					// return sender[0]?._id !== notification?.senderId

					setNotificationsCount(filteredNotifications.length)

					// dispatch(setCandidateProfileDetails(notifications?.data));
				
			} catch (error) {
				console.error("Error fetching candidate profile:", error);
			}
		})();
	}, [notifications]);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			if (openNotifications) {
	// 				let notifications = await getCandidatesAllNotificationsApi(
	// 					candidate?.id
	// 				);

	// 				console.log("notifications", notifications);

	// 				dispatch(setCandidateProfileDetails(notifications?.data));
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
	// 	{ id: 2, message: "Notification 2" },
	// 	{ id: 2, message: "Notification 2" },
	// ];

	
	const clearNotifications = async(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		// Implement logic to clear notifications
		e.stopPropagation()
		console.log("Clearing notifications...");
		await deleteCandidatesAllNotificationsApi(candidate.id)
		setNotificationsCount(0)
		setNotifications([])
	};

	return (
		<>
			{/* <nav className="navbar sticky top-0 z-50 bg-base-100 bg-primary"> */}
			<nav className="navbar sticky top-0 z-50 bg-primary">
				<div className="flex-1">
					<a
						className="btn btn-ghost text-xl"
						onClick={() => navigate("/")}
					>
						DevHive
					</a>
					
					{candidateProfile?.isPremiumUser && (
						<FaCrown className="text-yellow-600" />
					)}
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
				{candidateProfile && candidateProfile?.name}
				{candidate && menus ? (
					<div className="flex-none ">
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar "
							>
								<div className="w-10 rounded-full ">
									<img
										alt="Tailwind CSS Navbar component"
										src={`${
											candidateProfile
												? candidateProfile.profile_image
												: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
										}`}
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
							>
								{menus.map((menu: any, index: number) => {
									const isActive = useMatch(menu.to);
									return (
										<li key={index}>
											<Link
												className={`${
													isActive
														? "font-bold bg-base-300"
														: ""
												}`}
												to={menu.to}
											>
												{menu.title}
											</Link>
										</li>
									);
								})}
								{/* +++++++++ */}
								<li onClick={handleCandidateLogout}>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<li>
						<Link to="/candidate/signin">Candidate Signin</Link>
					</li>
				)}
			</nav>
		</>
	);
};

export default TopNavBarCandidate;
