import { Link, useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/reducer";
import { candidateSignoutApi } from "../../axios/apiMethods/auth-service/candidateAuth";
import { notify } from "../../utils/toastMessage";
import { IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import { getCandidateProfileApi } from "../../axios/apiMethods/profile-service/candidate";
import { FaCrown } from "react-icons/fa";
import Notifications from "../notification/Notifications";
import socket from "../../config/socket";
import {
    deleteCandidatesAllNotificationsApi,
    deleteRecruiterAllNotificationsApi,
    getCandidatesAllNotificationsApi,
    getRecruiterAllNotificationsApi,
} from "../../axios/apiMethods/chat-service/notification";
import {
    clearMyProfileData,
    clearUser,
    setMyProfileData,
} from "../../redux/slice/user";
import { clearJob, clearJobs } from "../../redux/slice/job";
import {
    clearNotifications,
    clearNotificationsCount,
    setNotifications,
    setNotificationsCount,
} from "../../redux/slice/notification";
import { IChatRoom, INotification } from "../../types/chat";
import { recruiterSignoutApi } from "../../axios/apiMethods/auth-service/recruiterAuth";
import { IResponse } from "../../types/api";
import { swal } from "../../utils/swal";
import { checkUserRole } from "../../utils/checkRole";

const TopNavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // User
    const isRecruiterUrl: boolean = location.pathname.includes("recruiter");
    const isCandidateUrl: boolean = location.pathname.includes("candidate");

    const currentUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const myProfile: any = useSelector((store: RootState) => {
        return store.userReducer.myProfile;
    });

    const { isCandidate, isRecruiter } = checkUserRole(currentUser);

    const handleLogout = async () => {
        swal("Do you want to Logout?", "Yes, Logout").then(async (result) => {
            if (result.isConfirmed) {
                let response: IResponse | null = null;
                if (isCandidate && isCandidateUrl) {
                    response = await candidateSignoutApi(currentUser);
                }
                if (isRecruiter && isRecruiterUrl) {
                    response = await recruiterSignoutApi(currentUser);
                }

                if (response) {
                    dispatch(clearUser());
                    dispatch(clearMyProfileData());

                    dispatch(clearJobs());
                    dispatch(clearJob());
                    // dispatch(clearNotifications());
                    dispatch(clearNotificationsCount());

                    notify("Logged out successfully", "success");
                    isCandidateUrl &&
                        isCandidate &&
                        navigate("/candidate/signin");
                    isRecruiterUrl &&
                        isRecruiter &&
                        navigate("/recruiter/signin");
                }
            }
        });
    };

    useEffect(() => {
        (async () => {
            if (isCandidateUrl && isCandidate) {
                const candidateProfileData = await getCandidateProfileApi(
                    currentUser?.id
                );
                dispatch(setMyProfileData(candidateProfileData?.data));
            }
        })();
    }, [currentUser, isCandidateUrl, dispatch]);

    // Dropdown menu items for candidate
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
        { title: "Chat", to: `/candidate/chat/${currentUser.id}` },
        { title: "Reset Password", to: "/candidate/passwordResetMobile" },
    ];

    // chatRoom
    const selectedChatRoom = useSelector(
        (store: RootState) => store.chatReducer.roomData
    );

    const getOtherChatRoomUser = (chatRoom: IChatRoom) => {
        console.log("getOtherChatRoomUser", chatRoom);
        
        const otherUser = chatRoom?.users?.find(
            (value: any) => value?._id !== myProfile?.id
        );

        return otherUser;
    };

    const [openNotifications, setOpenNotifications] = useState(false);
    const handleOpenNotifications = () => {
        console.log("handleopen notification", openNotifications);

        setOpenNotifications(!openNotifications);
        dispatch(clearNotificationsCount()); // Reset count to 0 when opened
    };


    useEffect(() => {
        if (openNotifications) {
            (async () => {
                let fetchedNotifications: IResponse | null = null;

                if (isCandidateUrl && isCandidate) {
                    fetchedNotifications =
                        await getCandidatesAllNotificationsApi();
                } else if (isRecruiterUrl && isRecruiter) {
                    fetchedNotifications =
                        await getRecruiterAllNotificationsApi();
                }

                // Only filter if a chat room is selected
                if (fetchedNotifications && selectedChatRoom) {
                    const currentChatRoomSender =
                        getOtherChatRoomUser(selectedChatRoom);
                    const filteredNotifications =
                        fetchedNotifications.data.filter(
                            (notification: INotification) =>
                                currentChatRoomSender !== notification?.senderId
                        );

                    if (filteredNotifications.length > 0) {
                        // Set filtered notifications
                        dispatch(setNotifications(filteredNotifications));
                    } else {
                        // Only clear if necessary
                        if (isCandidateUrl && isCandidate) {
                            await deleteCandidatesAllNotificationsApi();
                        } else if (isRecruiterUrl && isRecruiter) {
                            await deleteRecruiterAllNotificationsApi();
                        }
                    }
                } else if (fetchedNotifications) {
                    // If no chat room is selected, set all notifications
                    dispatch(setNotifications(fetchedNotifications.data));
                }

                // Only clear notifications count, not the notifications themselves
                dispatch(clearNotificationsCount());
            })();
        }
    }, [
        openNotifications,
        currentUser,
        isCandidateUrl,
        selectedChatRoom,
        dispatch,
    ]);

    // Notifications
    const notificationsCount = useSelector(
        (store: RootState) => store.notificationReducer.notificationsCount
    );

    const notifications = useSelector(
        (store: RootState) => store.notificationReducer.notifications
    );

    useEffect(() => {
        socket.on("receiveMessage", (message) => {
            console.log("receiveMessage", message);
            // If no rooms are selected
            if (
                !selectedChatRoom ||
                selectedChatRoom._id !== message.messageData.roomId.toString()
            ) {
                console.log("inside if notifications", notifications);
                // New notification logic
                dispatch(setNotifications([...notifications, message])); // Add new notification
                dispatch(setNotificationsCount(notifications.length + 1)); // Increment count
            }
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("receiveMessage");
        };
    }, [notifications, selectedChatRoom, dispatch]);

    useEffect(() => {
        socket.on("chatNotification", (data: any) => {
            if (!selectedChatRoom) {
                setNotifications([...notifications, data]);
            }
        });
    }, []);

    useEffect(() => {
        (async () => {
            const fetchedNotifications =
                isCandidate && isCandidateUrl
                    ? await getCandidatesAllNotificationsApi()
                    : await getRecruiterAllNotificationsApi();

            let filteredNotifications = [];
            if (selectedChatRoom) {
                const currentChatRoomSender =
                    getOtherChatRoomUser(selectedChatRoom);
                filteredNotifications = fetchedNotifications.data.filter(
                    (notification: INotification) => {
                        // Both conditions true (AND) or either one true (OR)
                        if (
                            myProfile.id !== notification?.senderId &&
                            (currentChatRoomSender !== notification.senderId ||
                                myProfile.id !== notification?.senderId)
                        ) {
                            return notification;
                        }
                    }
                );
            }

            dispatch(setNotifications(filteredNotifications));
        })();
    }, [openNotifications]);

    const clearNavBarNotifications = async (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        e.stopPropagation();
        if (isCandidate) {
            await deleteCandidatesAllNotificationsApi();
        }
        if (isRecruiter) {
            await deleteRecruiterAllNotificationsApi();
        }
        // Clear only when the user confirms
        dispatch(clearNotifications());
        dispatch(clearNotificationsCount());
    };

    return (
        <>
            {/* <nav className="navbar sticky top-0 z-50 bg-base-100 bg-primary"> */}
            <nav
                className={`navbar sticky top-0 z-50 ${
                    isCandidateUrl && isCandidate ? "bg-primary" : "bg-cyan-700"
                }`}
            >
                <div className="flex-1">
                    <a
                        className="btn btn-ghost text-xl"
                        onClick={() => navigate("/")}
                    >
                        DevHive
                    </a>

                    {isCandidate && myProfile?.isPremiumUser && (
                        <FaCrown className="text-yellow-600" />
                    )}
                </div>
                <div
                    className="flex w-9 cursor-pointer mr-3 "
                    onClick={() => handleOpenNotifications()}
                >
                    <IoMdNotifications className="text-2xl" />
                    <div className="badge bg-green-600 text-white rounded-full p-1 text-xs">
                        {notificationsCount}
                    </div>

                    {openNotifications && (
                        <Notifications
                            notifications={notifications}
                            clearNotifications={clearNavBarNotifications}
                            setOpenNotificationFn={setOpenNotifications}
                        />
                    )}
                </div>
                {myProfile && myProfile?.name}
                {isCandidate && menus && (
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
                                            myProfile
                                                ? myProfile.profileImage
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
                                <li onClick={handleLogout}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {isRecruiter && (
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost mr-10 p-5"
                            >
                                <div className=" rounded-full">
                                    {currentUser?.name}
                                </div>
                            </div>
                            {/* List */}
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
                                <li onClick={handleLogout}>
                                    <a>Recruiter Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default TopNavBar;
