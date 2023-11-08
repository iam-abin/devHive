import googleIcon from "../../assets/google-icon.svg";

function CandidateSigninForm() {
	return (
		<div className="w-6/12 h-5/6">
			<div className="mb-16">
				<h1 className="text-center  text-5xl font-bold">Sign In</h1>
				<div className="w-16 h-1 bg-black mx-auto my-4"></div>
			</div>

			<form action="">
				<div className="form-control w-6/6 mb-3">
					<input
						type="text"
						placeholder="Email"
						className="input input-primary w-full rounded-xl"
					/>
				</div>
				<label className="label mt-1">
					<span className="label-text-alt">Bottom Left label</span>
				</label>

				<div className="form-control w-6/6 mb-3">
					<input
						type="password"
						placeholder="Password"
						className="input input-primary w-full rounded-xl"
					/>
				</div>
				<div className="flex items-center justify-between mb-3">
					<label className="label mt-1">
						<span className="label-text-alt">
							Bottom Left label
						</span>
					</label>
					<label className="label mt-1">
						<span className="label-text-alt">Forgot Password?</span>
					</label>
				</div>

				<div className="flex items-center justify-center mb-3">
					<button
						type="submit"
						className="btn btn-outline w-60 btn-primary"
					>
						Signin
					</button>
				</div>

				<div className="flex items-center">
					<div className="flex-1 h-0 border-t border-black"></div>
					<div className="mx-4 text-black">or</div>
					<div className="flex-1 h-0 border-t border-black"></div>
				</div>

				<div className="flex items-center justify-center gap-3">
					<button className="btn border-gray-600 w-60">
						<img src={googleIcon} className="w-7" alt="" />
						Sign in With Google
					</button>
				</div>
			</form>
		</div>
	);
}

export default CandidateSigninForm;
