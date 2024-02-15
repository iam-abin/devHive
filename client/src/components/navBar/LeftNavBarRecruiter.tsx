import React from "react";
import { Link } from "react-router-dom";

const LeftNavBarRecruiter: React.FC<{ menus: any }> = ({ menus }) => {
	return (
		<div className="w-56 duration-200 h-screen p-5 pt-8 bg-primary relative">
			<ul>
				{menus.map((menu: any, index: number) => {
					return (
						<li
							key={index}
							className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-400 rounded-md gap-5 mt-7`}
						>
							<img src={menu.src} className="w-5" alt="" />
							<Link to={menu.to}>{menu.title}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default LeftNavBarRecruiter;
