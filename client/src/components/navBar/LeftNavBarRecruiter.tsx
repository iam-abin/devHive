import React from "react";
import { NavLink, useMatch } from "react-router-dom";

const LeftNavBarRecruiter: React.FC<{ menus: any }> = ({ menus }) => {
	return (
		<div className="w-56 duration-200 h-[89vh] p-5 bg-primary ">
			<ul>
				{menus.map((menu: any, index: number) => {
					const isActive = useMatch(menu.to);

					return (
						<NavLink to={menu.to} key={index}>
							<li
								
								className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-sky-800 rounded-md gap-5 mt-7 ${
									isActive
										? "font-bold text-blue-500 bg-sky-800"
										: ""
								}`}
							>
								<img src={menu.src} className="w-5" alt="" />
								{menu.title}
							</li>
						</NavLink>
					);
				})}
			</ul>
		</div>
	);
};

export default LeftNavBarRecruiter;
