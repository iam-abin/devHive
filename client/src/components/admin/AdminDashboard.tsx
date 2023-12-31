import { useState } from "react";
import arrow from "../../assets/left-arrow.svg";
import logo from "../../assets/favicon-32x32.png";
import dashboard from "../../assets/dashboard.svg";
import finance from "../../assets/finance.svg";
import companies from "../../assets/companies.svg";
import candidates from "../../assets/candidates.svg";
import membership from "../../assets/membership.svg";
import logout from "../../assets/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminSignoutApi } from "../../axios/apiMethods/auth-service/adminAuth"; 
import Swal from "sweetalert2";
import { clearAdmin } from "../../redux/slice/adminSlice/adminDataSlice";
import { notify } from "../../utils/toastMessage";

function AdminDashboard() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	


	const handleLogout = async () => {
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
				const response = await adminSignoutApi();
				if (response) {
					dispatch(clearAdmin())
					notify("Logged out successfully", "success");
					navigate("/admin");
				}
			}
		});
		
		
		
	};
	const [open, setOpen] = useState(true);
	const menus = [
		{ title: "Dashboard", src: dashboard, to: "/admin" },
		{ title: "Finance", src: finance, to: "/admin/finance" },
		{ title: "Companies", src: companies, to: "/admin/companies" },
		{ title: "Candidates", src: candidates, to: "/admin/candidates" },
		{ title: "Recruiters", src: finance, to: "/admin/recruiters" },
		{ title: "jobs", src: finance, to: "/admin/jobs" },
		{ title: "MemberShip", src: membership, to: "/admin/memberships" },
		{ title: "Logout", src: logout, onClick: handleLogout, to: "/admin" },
	];
	return (
		<div className="flex">
			<div
				className={`${
					open ? "w-72" : "w-20"
				} duration-200 h-screen p-5 pt-8 bg-primary relative`}
			>
				<img
					src={arrow}
					alt=""
					className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 border-4 border-primary-focus rounded-full ${
						!open && "rotate-180"
					}`}
					onClick={() => setOpen(!open)}
				/>
				<div className="flex gap-x-4 items-center">
					<img
						src={logo}
						alt=""
						className={`cursor-pointer duration-500`}
					/>
					<h1
						className={`text-white origin-left font-medium text-xl duration-300 ${
							!open && "scale-0"
						}`}
					>
						Admin
					</h1>
				</div>
				<ul className="pt-6">
					{menus.map((menu, index) => {
						return (
							<li
								key={index}
								className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-400 rounded-md gap-5 mt-7`}
								onClick={menu.onClick} // Add onClick event
							>
								<img src={menu.src} className="w-5" alt="" />
								<Link to={menu.to}>
									<span
										className={`${
											!open && "hidden"
										} duration-200`}
									>
										{menu.title}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="p-7 text-2xl flex-1 font-semibold bg-red-300 h-screen">
				<h1>Home page</h1>
			</div>
		</div>
	);
}

export default AdminDashboard;
