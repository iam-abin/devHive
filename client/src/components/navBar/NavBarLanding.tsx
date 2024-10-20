import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducer";

function NavBarLanding() {
	const recruiter: any = useSelector((state: RootState) => {
		return state.recruiterData.data;
	});
	const candidate: any = useSelector((state: RootState) => {
		return state.candidateData.data;
	});
	return (
		<nav className="sticky top-0 z-50  navbar bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
			<div className="flex-1">
				<a className="btn bg-transparent border-transparent text-white hover:text-black normal-case text-xl">
					DevHive
				</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1 mx-4 gap-4">
					{!recruiter && (
						<li className="bg-accent rounded-3xl hover:bg-yellow-600">
							<Link to="/recruiter/signin">Recruiter Signin</Link>
						</li>
					)}

					{!candidate && (
						<li className="bg-accent rounded-3xl hover:bg-yellow-600">
							<Link to="/candidate/signin">Candidate Signin</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default NavBarLanding;
