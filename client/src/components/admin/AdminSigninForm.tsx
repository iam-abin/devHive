import React from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom"; // Assuming you're using React Router

function Signin() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<main className="flex flex-col items-center justify-center w-full flex-1 bg-yellow-400 px-20 text-center">
				<div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
					{/* Signin section */}
					<div className="w-3/5 py-16 p-5 rounded-tl-2xl rounded-bl-2xl">
						<h2 className="text-3xl font-bold mb-2 text-sky-600">
							Sign in to account
						</h2>
						<div className="border-2 w-10 border-sky-600 inline-block mb-2"></div>

						<form action="" className="flex flex-col items-center">
							<div className="bg-gray-100 w-72 p-2 flex items-center mb-1">
								<FaRegEnvelope className="text-gray-400 m-1" />
								<input
									type="email"
									name="email"
									placeholder="Email"
									className="bg-gray-100 outline-none text-sm flex-1"
								/>
							</div>
							<label className="">
								<span className="label-text-alt">
									Bottom Left label
								</span>
							</label>

							<div className="bg-gray-100 w-72 p-2 flex items-center mb-1">
								<MdLockOutline className="text-gray-400 m-1" />
								<input
									type="password"
									name="password"
									placeholder="Password"
									className="bg-gray-100 outline-none text-sm flex-1"
								/>
							</div>
							<label className=" flex">
								<span className="label-text-alt">
									Bottom Left label
								</span>
							</label>

							<div className="flex items-center justify-center mt-5 mb-3">
								<button
									type="submit"
									className="btn btn-outline w-60 btn-primary"
								>
									Signin
								</button>
							</div>
						</form>
					</div>

					{/* Signup section */}
					<div className="bg-sky-600 w-2/5 p-5 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
						<h2 className="text-3xl font-bold mb-2">
							Hello Admin!
						</h2>
						<div className="border-2 w-10 border-white inline-block mb-2"></div>
						<p className="mb-2">
							Fill up personal information and start your journey
							with us
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Signin;
