import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import { useDispatch, useSelector } from "react-redux";

import { recruiterSignoutApi } from "../../axios/apiMethods/auth-service/recruiterAuth";
import { clearRecruiter } from "../../redux/slice/recruiterSlice/recruiterDataSlice";
import Swal from "sweetalert2";
import { notify } from "../../utils/toastMessage";
import { IoMdNotifications } from "react-icons/io";
import { useState } from "react";

function TopNavBarRecruiter() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state: RootState) => {
		return state.recruiterData.data;
	});

	const recruiter: any = useSelector((state: RootState) => {
		return state.recruiterData.data;
	});

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

	const [showNotifications, setShowNotifications] = useState(false);

	const notifications = [
		// Add your notification data here
		{ id: 1, message: "Notification 1" },
		{ id: 2, message: "Notification 2" },
	];

	const clearNotifications = () => {
		// Implement logic to clear notifications
		console.log("Clearing notifications");
	};

	return (
		<div className="navbar sticky top-0 z-50  bg-cyan-700">
			<div className="flex-1">
				<a
					className="btn btn-ghost normal-case text-xl"
					onClick={() => navigate("/recruiter")}
				>
					DevHive
				</a>
			</div>
			<div
				className="relative mr-3 cursor-pointer"
				onClick={() => setShowNotifications(!showNotifications)}
			>
				<IoMdNotifications className="text-2xl mr-3" />
				<div className="badge absolute top-0 right-0 bg-green-600 text-white rounded-full p-1 text-xs">
					{notifications.length}
				</div>

				{showNotifications && (
					<div className="absolute top-full right-0 w-56 bg-white border border-gray-300 rounded shadow-md p-4">
						<div className="mb-2 font-bold">
							chat notifications are
						</div>
						<ul>
							{notifications.map((notification) => (
								<li className="my-4" key={notification.id}>
									{notification.message}
								</li>
							))}
						</ul>
						<div className="flex justify-end">
							<button
								className="bg-green-600 text-white rounded-full p-1  text-xs mt-2"
								onClick={clearNotifications}
							>
								Clear Notifications
							</button>
						</div>
					</div>
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
}

export default TopNavBarRecruiter;
