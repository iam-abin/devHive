// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { clearCandidate } from "../../redux/slice/candidateSlice/candidateDataSlice";
import { candidateSignoutApi } from "../../axios/apiMethods/auth-service/candidateAuth";
import Swal from "sweetalert2";
import { notify } from "../../utils/toastMessage";

const TopNavBarCandidate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const candidate: any = useSelector((state: RootState) => {
		return state.candidateData.data;
	});

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
					notify("Logged out successfully", "success");
					navigate("/candidate/signin");
				}
			}
		});
	};

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
		{ title: "Chat", to: "/candidate/chat" },
		{ title: "Reset Password", to: "/candidate/passwordResetMobile" },
	];

	return (
		<>
			<nav className="navbar sticky top-0 z-50 bg-base-100 bg-primary">
				<div className="flex-1">
					<a
						className="btn btn-ghost text-xl"
						onClick={() => navigate("/")}
					>
						DevHive
					</a>
				</div>
				{candidate && candidate?.name}
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
										src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
							>
								{menus.map((menu: any, index: number) => {
									return (
										<li
											key={index}
										>
											<Link to={menu.to}>
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
