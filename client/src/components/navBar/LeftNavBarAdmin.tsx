import { useState } from "react";
import arrow from "../../assets/left-arrow.svg";
import logo from "../../assets/favicon-32x32.png";

import { Link, useLocation } from "react-router-dom";

const LeftNavBarAdmin: React.FC<{ menus: any }> = ({ menus }) => {
	const [open, setOpen] = useState(true);
	const location = useLocation();

	return (
		<>
			<div
				className={`${
					open ? "w-72" : "w-20"
				} duration-200 h-screen p-5 pt-8 bg-primary relative`}
			>
				<img
					src={arrow}
					alt=""
					className={` absolute cursor-pointer -right-3 top-9 w-7 h-7 border-4 border-primary-focus rounded-full ${
						!open && "rotate-180"
					} `}
					onClick={() => setOpen(!open)}
				/>
				<div className="flex gap-x-4 items-center">
					<img
						src={logo}
						alt=""
						className={`cursor-pointer duration-500`}
					/>
					<h1
						className={`text-white origin-left font-medium text-xl duration-300 ${
							!open && "scale-0"
						}`}
					>
						Admin
					</h1>
				</div>
				<ul className="pt-6">
					{menus.map((menu: any, index: number) => {
						const isActive = location.pathname === menu.to;
						return (
							<li
								key={index}
								className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-sky-800 rounded-md gap-5 mt-7 ${
									isActive
										? "font-bold text-blue-500 bg-sky-800"
										: ""
								}`}
								onClick={menu.onClick} // Add onClick event
							>
								<img src={menu.src} className="w-5" alt="" />
								<Link to={menu.to}>
									<span
										className={`${
											!open && "hidden"
										} duration-200`}
									>
										{menu.title}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default LeftNavBarAdmin;
