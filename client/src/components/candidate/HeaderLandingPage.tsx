function HeaderLandingPage() {
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">DevHive</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a>Candidate Login</a>
					</li>
					<li>
						<a>Recruiter Login</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default HeaderLandingPage;
