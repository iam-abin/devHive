import { Link } from "react-router-dom";

function HeaderLanding() {



	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">DevHive</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
				<li>
					<Link to="/candidate/signin">Candidate Signin</Link>
					</li>

					<li>
					<Link to="/recruiter/signin">Recruiter Signin</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default HeaderLanding;
