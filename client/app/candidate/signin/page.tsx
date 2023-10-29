import Link from "next/link";
import React from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

function Signin() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2 bg-grey-100">
			<main className="flex flex-col items-center justify-center w-full flex-1 bg-yellow-400 px-20 text-center">
				<div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
					{/* signin section */}
					<div className=" w-3/5 py-16 p-5 rounded-tl-2xl rounded-bl-2xl ">
						<h2 className="text-3xl font-bold mb-2 text-sky-600">
							Sign in to account
						</h2>
						<div className="border-2 w-10 border-sky-600 inline-block mb-2"></div>

						<div className="flex flex-col items-center">
							<div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
								<FaRegEnvelope className="text-grey-400 m-1" />
								<input
									type="email"
									name="email"
									placeholder="Email"
									className="bg-gray-100 outline-none text-sm flex-1"
								/>
							</div>

							<div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
								<MdLockOutline className="text-grey-400 m-1" />
								<input
									type="password "
									name="password "
									placeholder="Password"
									className="bg-gray-100 outline-none text-sm flex-1"
								/>
							</div>
							<div className="flex w-72 justify-end mb-4 mt-3">
								<Link href={"/forgot"} className="text-xs">
									Forgot password?
								</Link>
							</div>

							<Link
								className="border-2 border-sky-600 rounded-full px-12 py-2 inline-block font-semibold hover:bg-sky-700 hover:text-white hover:shadow-lg"
								href={"/hi"}
							>
								Sign in
							</Link>
						</div>
					</div>

					{/* signup section */}
					<div className="bg-sky-600 w-2/5 p-5 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
						<h2 className="text-3xl font-bold mb-2">
							Hello friends!
						</h2>
						<div className="border-2 w-10 border-white inline-block mb-2"></div>
						<p className="mb-2">
							Fill up personal information and start yout journey
							with us
						</p>
						<Link
							className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-sky-700 hover:shadow-lg"
							href={"/candidate/signup"}
						>
							Sign up
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Signin;
