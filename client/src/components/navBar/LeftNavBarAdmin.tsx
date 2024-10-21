import { useState } from "react";
import arrow from "../../assets/layoutItems/left-arrow.svg";
import logo from "../../assets/layoutItems/favicon-32x32.png";

import { Link, useLocation, useNavigate } from "react-router-dom";

const LeftNavBarAdmin: React.FC<{ menus: any }> = ({ menus }) => {
	const [open, setOpen] = useState(true);
	const location = useLocation();
	const navigate = useNavigate()

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
				<div className="flex gap-x-4 items-center cursor-pointer" onClick={() => navigate('/admin')}>
					<img
						src={logo}
						alt=""
						className={`duration-500`}
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
							<Link to={menu.to} key={index}>
								<li
									
									className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-sky-800 rounded-md gap-5 mt-7 ${
										isActive
											? "font-bold text-blue-500 bg-sky-800"
											: ""
									}`}
									onClick={menu.onClick} // Add onClick event
								>
									<img
										src={menu.src}
										className="w-5"
										alt=""
									/>
									<span
										className={`${
											!open && "hidden"
										} duration-200`}
									>
										{menu.title}
									</span>
								</li>
							</Link>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default LeftNavBarAdmin;
