import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import { useDispatch, useSelector } from "react-redux";

import dashboard from "../../assets/dashboard.svg";
import finance from "../../assets/finance.svg";
import companies from "../../assets/companies.svg";
import candidates from "../../assets/candidates.svg";
import membership from "../../assets/membership.svg";
import { recruiterSignoutApi } from "../../api/axios/auth/recruiterAuth";
import { clearRecruiter } from "../../redux/slice/recruiterSlice/recruiterDataSlice";
import { recruiterSignout } from "../../redux/slice/recruiterSlice/recruiterAuthSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function HeaderRecruiter() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state: RootState) => {
		return state.recruiterAuth.recruiterLoggedIn;
	});

	const recruiter = useSelector((state: RootState) => {
		return state.recruiterData.recruiter;
	});

	const notify = (msg: any, type: string) => {
		type === "error"
			? toast.error(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  })
			: toast.success(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  });
	};

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
					dispatch(recruiterSignout());
					notify("Logged out successfully", "success");
					navigate("/recruiter/signin");
				}
			}
		});
	};
	const menus = [
		{ title: "Dashboard", src: dashboard, to: "/recruiter" },
		{ title: "Jobs", src: finance, to: "/recruiter/all-jobs" },
		{ title: "Added Jobs", src: finance, to: "/recruiter/recruiter-added-jobs" },
		{
			title: "Applications",
			src: companies,
			to: "/recruiter/applications",
		},
		{ title: "Chats", src: candidates, to: "/recruiter/chats" },
		{ title: "Profile", src: membership, to: "/recruiter/profile" },
	];
	return (
		<>
			<div className="navbar bg-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl" onClick={()=> navigate("/recruiter")}>DevHive</a>
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
									{recruiter.name}
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
							>
								<li onClick={()=> navigate("/recruiter/passwordResetMobile")}>
									<a>Reset Password</a>
								</li>
								<li  onClick={handleRecruiterLogout}>
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

			<div className="flex">
				<div className="w-56 duration-200 h-screen p-5 pt-8 bg-primary relative">
					<ul>
						{menus.map((menu, index) => {
							return (
								<li
									key={index}
									className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-400 rounded-md gap-5 mt-7`}
								>
									<img
										src={menu.src}
										className="w-5"
										alt=""
									/>
									<Link to={menu.to}>{menu.title}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="p-7 text-2xl flex-1 font-semibold bg-slate-400 h-screen">
					<h1>Home page</h1>
				</div>
			</div>
		</>
	);
}

export default HeaderRecruiter;
