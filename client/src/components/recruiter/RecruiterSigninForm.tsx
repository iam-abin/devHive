function RecruiterSigninForm() {
	return (
		<div className="w-1/2 h-full flex flex-col p-14 justify-between items-center">
			<h1 className="text-xl font-semibold">Recruiter Sign In</h1>

			<div className="w-full flex flex-col max-w-[450px]">
				<div className="w-full flex flex-col mb-10 ">
					<h3 className="text-3xl font-semibold mb-4">Signin</h3>
					<p className="text-base mb-4">
						welcome back! please enter your details
					</p>
				</div>

				<div className="w-full flex flex-col">
					<input
						type="email"
						placeholder="Email"
						name="email"
						className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
						id=""
					/>

					<input
						type="password"
						placeholder="Password"
						name="password"
						className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
						id=""
					/>
				</div>
				<div className="flex justify-end">
					<p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
						Forgot password?
					</p>
				</div>

				<div className="w-full flex flex-col my-4">
					<button className="w-full text-white bg-black rounded-md p-4 my-2 text-center flex items-center justify-center">
						Sign In
					</button>
				</div>
			</div>

			<div className="w-full items-center justify-center flex">
				<p className="text-sm font-normal">
					Don't have an account?
					<span className="font-semibold underline underline-offset-2 cursor-pointer">
						Sign up
					</span>
				</p>
			</div>
		</div>
	);
}

export default RecruiterSigninForm;
