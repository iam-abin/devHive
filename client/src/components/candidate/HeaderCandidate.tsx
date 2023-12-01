import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { clearCandidate } from "../../redux/slice/candidateSlice/candidateDataSlice";
import { candidateSignout } from "../../redux/slice/candidateSlice/candidateAuthSlice";
import { toast } from "react-toastify";
import { candidateSignoutApi } from "../../api/axios/auth/candidateAuth";

function HeaderCandidate() {
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const isLoggedIn = useSelector((state: RootState) => {
		return state.candidateAuth.candidateLoggedIn;
	});

	const candidate = useSelector((state: RootState)=>{
		return state.candidateData.candidate
	})

	console.log("candidate details: ",candidate);
	

	const handleCandidateLogout = async() => {
		const response = await candidateSignoutApi(candidate);
		dispatch(clearCandidate());
		dispatch(candidateSignout());
		notify("Logged out successfully","success")
		navigate("/candidate/signin")
		
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
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">DevHive</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					{isLoggedIn ? (
						<li>
							<button onClick={handleCandidateLogout}>
								Candidate Signout
							</button>
						</li>
					) : (
						<li>
							<Link to="/candidate/signin">Candidate Signin</Link>
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

export default HeaderCandidate;
