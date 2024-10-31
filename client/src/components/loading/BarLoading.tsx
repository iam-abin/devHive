const BarLoading = () => {
	return (
		<div className="w-full h-full flex flex-grow justify-center items-center absolute z-50 top-0 left-0 ">
			<span className="loading loading-bars loading-xs"></span>
			<span className="loading loading-bars loading-sm"></span>
			<span className="loading loading-bars loading-md"></span>
			<span className="loading loading-bars loading-lg"></span>
		</div>
	);
};

export default BarLoading;
