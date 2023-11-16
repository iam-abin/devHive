import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import { useSelector } from "react-redux";

function HeaderRecruiter() {
	const isLoggedIn = useSelector((state: RootState) => {
		return state.recruiterAuth.recruiterLoggedIn;
	});
	const handleRecruiterLogout = () => {};
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">DevHive</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					{isLoggedIn ? (
						<li>
							<button onClick={handleRecruiterLogout}>
								Recruiter Signout
							</button>
						</li>
					) : (
						<li>
							<Link to="/recruiter/signin">Recruiter Signin</Link>
						</li>
					)}

					{/* <li>
					<Link to="/recruiter/signin">Recruiter Signin</Link>
					</li> */}
				</ul>
			</div>
		</div>
	);
}

export default HeaderRecruiter;
