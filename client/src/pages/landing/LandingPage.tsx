// import { GiHamburgerMenu } from "react-icons/gi"
import homeImage from "../../assets/landingPage/company-like.jpg";
import FooterLanding from "../../components/landing/FooterLanding";
import { useEffect, useState } from "react";
import NavBarLanding from "../../components/landing/NavBarLanding";
import SearchBar from "../../components/landing/SearchBar";
import JobCard from "../../components/landing/JobCard";
import {
	getAJobApi,
	getAllJobsApi,
} from "../../axios/apiMethods/jobs-service/jobs";
import { Link } from "react-scroll";
import JobCardShimmerLandingPage from "../../components/shimmer/job/JobCardShimmerLandingPage";
import { useDispatch, useSelector } from "react-redux";
import { setLoaded, setLoading } from "../../redux/slice/loaderSlice/isLoading";
import { RootState } from "../../redux/reducer/reducer";

function LandingPage() {
	const [jobs, setJobs] = useState([]);
	const dispatch = useDispatch();
	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);
	useEffect(() => {
		(async () => {
			dispatch(setLoading());
			const allJobs = await getAllJobsApi();
			setJobs(allJobs.data);
			dispatch(setLoaded());
		})();
	}, []);

	const handleViewJob = async (jobId: string) => {
		const job = await getAJobApi(jobId);
		return job;
	};

	return (
		<>
			{/* <GiHamburgerMenu /> */}
			<NavBarLanding />
			<div>
				<div>
					<div
						className="hero min-h-screen"
						style={{
							backgroundImage: `url(${homeImage})`,
						}}
					>
						<div className="hero-overlay bg-opacity-60"></div>
						<div className="hero-content text-center text-neutral-content">
							<div className="max-w-md">
								<h1 className="mb-5 text-5xl font-bold">
									Find your dream jobs now
								</h1>
								<p className="mb-5">
									It's time to get creative in your job
									search!
								</p>
								<Link
									to="search-div"
									smooth={true}
									duration={700} // Adjust the duration as needed
									offset={-60} // Adjust this value based on the height of your navigation bar
									className="btn btn-primary"
								>
									Get Started
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div
					id="search-div"
					className=" bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"
				>
					<div className="py-10 ">
						<SearchBar jobs={jobs} />
					</div>
					<div className="pb-20">
						{isLoading ? (
							<JobCardShimmerLandingPage />
						) : jobs.length > 0 ? (
							jobs.map((job: any) => (
								<JobCard
									key={job?.id}
									job={job}
									handleViewJob={handleViewJob}
								/>
							))
						) : (
							<div className="mx-40 p-6 bg-transparent rounded-md shadow-md">
								<div className="flex items-center justify-center mb-4">
									<p className="text-white ml-4 text-2xl font-bold">
										No jobs are listed yet
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div>
				<FooterLanding />
			</div>
		</>
	);
}

export default LandingPage;
