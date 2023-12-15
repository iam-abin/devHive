import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { clearCandidate } from "../../redux/slice/candidateSlice/candidateDataSlice";
import { candidateSignout } from "../../redux/slice/candidateSlice/candidateAuthSlice";
import { toast } from "react-toastify";
import { candidateSignoutApi } from "../../api/axios/auth/candidateAuth";
import Swal from "sweetalert2";

function HeaderCandidate() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: RootState) => {
		return state.candidateAuth.candidateLoggedIn;
	});

	const candidate = useSelector((state: RootState) => {
		return state.candidateData.candidate;
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
				if (response) {
					dispatch(clearCandidate());
					dispatch(candidateSignout());
					notify("Logged out successfully", "success");
					navigate("/candidate/signin");
				}
			}
		});
	};

	const notify = (msg: any, type: string) => {
		type === "error"
			? toast.error(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  })
			: toast.success(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  });
	};

	return (
		<>
			<nav className="navbar bg-base-100 bg-primary">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">DevHive</a>
				</div>

				{isLoggedIn ? (
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
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
								<li onClick={()=> navigate("/candidate/all-jobs")}>
									<a>Jobs</a>
								</li>
								<li>
									<a>Applied Jobs</a>
								</li>
								<li onClick={()=> navigate("/candidate/profile")}>
									<a>Profile</a>
								</li>
								<li>
									<a>Chat</a>
								</li>
								<li onClick={()=> navigate("/candidate/passwordResetMobile")}>
									<a>Reset Password</a>
								</li>
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
}

export default HeaderCandidate;
