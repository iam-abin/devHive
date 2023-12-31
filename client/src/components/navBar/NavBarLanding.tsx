import { Link } from "react-router-dom";

function NavBarLanding() {
	return (
		<nav className="sticky top-0 z-50  navbar bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
			<div className="flex-1">
				<a className="btn bg-transparent border-transparent text-white hover:text-black normal-case text-xl">DevHive</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1 mx-4 gap-4">
					<li className="bg-accent rounded-3xl hover:bg-yellow-600">
						<Link to="/candidate/signin">Candidate Signin</Link>
					</li>

					<li className="bg-accent rounded-3xl hover:bg-yellow-600">
						<Link  to="/recruiter/signin">Recruiter Signin</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBarLanding;
