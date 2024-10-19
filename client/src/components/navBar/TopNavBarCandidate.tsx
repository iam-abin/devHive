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
import {
    deleteCandidatesAllNotificationsApi,
    getCandidatesAllNotificationsApi,
    getCandidatesNotificationCountApi,
} from "../../axios/apiMethods/chat-service/notification";

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
            if (isCandidateUrl && candidate) {
                let candidateProfileData = await candidateGetProfileApi(
                    candidate?.id
                );
                dispatch(
                    setCandidateProfileDetails(candidateProfileData?.data)
                );
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

    const [openNotifications, setOpenNotifications] = useState(false);

    useEffect(() => {
        // socket.on("chatNotification", (message) => {
        // });

        return () => {
            // Clean up the event listener when the component unmounts
            socket.off("chatNotification");
            // dispatch(clearRecruiterCurrentlySelectedChatRoom())
        };
    }, []);

    useEffect(() => {
        (async () => {
            if (openNotifications) {
                let fetchedNotifications =
                    await getCandidatesAllNotificationsApi();

                let currentChatRoomSender = getOtherUser(
                    currentlySelectedChatRoom
                );

                let filteredNotifications = [];
                if (currentlySelectedChatRoom) {
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

                if (filteredNotifications.length == 0) {
                    await deleteCandidatesAllNotificationsApi();
                }

                setNotifications(filteredNotifications);
            }
        })();
    }, [openNotifications]);
    // io.to(user2.socketId).emit("chatNotification", {sender: senderId,message: textMessage });
    useEffect(() => {
        socket.on("chatNotification", (data: any) => {
            if (!currentlySelectedChatRoom) {
                setNotifications([...notifications, data]);
            }
        });
    }, []);

    useEffect(() => {
        (async () => {
            let notificationsCount = await getCandidatesNotificationCountApi();

            let fetchedNotifications = await getCandidatesAllNotificationsApi();

            let currentChatRoomSender = getOtherUser(currentlySelectedChatRoom);

            let filteredNotifications = [];
            if (currentlySelectedChatRoom) {
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

            setNotificationsCount(filteredNotifications.length);
        })();
    }, [notifications]);

    const clearNotifications = async (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        // Implement logic to clear notifications
        e.stopPropagation();

        await deleteCandidatesAllNotificationsApi();
        setNotificationsCount(0);
        setNotifications([]);
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
                            setOpenNotificationFn={setOpenNotifications}
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
                                                ? candidateProfile.profileImage
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
