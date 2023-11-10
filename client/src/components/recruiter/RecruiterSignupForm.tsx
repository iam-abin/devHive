

function RecruiterSignupForm() {
	return (
		<div className="w-1/2 h-full flex flex-col p-14 justify-between items-center">
				<h1 className="text-xl font-semibold">Recruiter Sign Up</h1>

				<div className="w-full flex flex-col max-w-[450px]">
					<div className="w-full flex flex-col mb-10 ">
						<h3 className="text-3xl font-semibold mb-4">Sign Up</h3>
						<p className="text-base mb-4">
							welcome back! please enter your details
						</p>
					</div>

					<div className="w-full flex flex-col">
						<input
							type="text"
							placeholder="Name"
							name="name"
							className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
							id=""
						/>

						<input
							type="email"
							placeholder="Email"
							name="email"
							className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
							id=""
						/>
						<input
							type="text"
							placeholder="Phone"
							name="phone"
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
          

					<div className="w-full flex flex-col my-4">
						<button className="w-full text-white bg-black rounded-md p-4 my-2 text-center flex items-center justify-center">Sign Up</button>
					</div>
				</div>

				<div className="w-full items-center justify-center flex">
					<p className="text-sm font-normal">
						Already have an account?
						<span className="font-semibold underline underline-offset-2 cursor-pointer">
							Sign In
						</span>
					</p>
				</div>
			</div>
	);
}

export default RecruiterSignupForm;
