import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import dashboard from "../../assets/layoutItems/dashboard.svg";
import finance from "../../assets/layoutItems/finance.svg";
import companies from "../../assets/layoutItems/companies.svg";
import candidates from "../../assets/layoutItems/candidates.svg";
import membership from "../../assets/layoutItems/membership.svg";
import logout from "../../assets/layoutItems/logout.svg";
import { adminSignoutApi } from "../../axios/apiMethods/auth-service/adminAuth";
import { notify } from "../../utils/toastMessage";
import LeftNavBarAdmin from "../../components/navBar/LeftNavBarAdmin";
import { clearUser } from "../../redux/slice/user";
import { swal } from "../../utils/swal";

const AdminLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		swal("Do you want to Logout?", "Yes, Logout").then(async (result) => {
			if (result.isConfirmed) {
				const response = await adminSignoutApi();
				if (response) {
					dispatch(clearUser());
					notify("Logged out successfully", "success");
					navigate("/admin");
				}
			}
		});
	};
	const menus = [
		{ title: "Dashboard", src: dashboard, to: "/admin" },
		{ title: "Candidates", src: candidates, to: "/admin/candidates" },
		{ title: "Recruiters", src: finance, to: "/admin/recruiters" },
		{ title: "jobs", src: finance, to: "/admin/jobs" },
		{ title: "MemberShip", src: membership, to: "/admin/memberships" },
		{ title: "payments", src: companies, to: "/admin/payments" },
		{ title: "Logout", src: logout, onClick: handleLogout },
	];
	
	return (
		<div className="flex">
			{/* left-side */}
			<LeftNavBarAdmin menus={menus} />

			{/* right-side */}
			<div className="p-4 overflow-auto flex-1 font-semibold bg-red-300 h-screen">
				{<Outlet />}
			</div>
		</div>
	);
};

export default AdminLayout;
