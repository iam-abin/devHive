const Loading = () => {
	return (
		<div className="bg-black bg-opacity-50  backdrop-filter backdrop-blur-sm absolute z-50 top-0 left-0 w-full h-full flex justify-center items-center">
			<span className="loading loading-bars loading-xs"></span>
			<span className="loading loading-bars loading-sm"></span>
			<span className="loading loading-bars loading-md"></span>
			<span className="loading loading-bars loading-lg"></span>
		</div>
	);
};

export default Loading;
