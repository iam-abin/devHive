import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
	series: number[];
}

const ChartThree: React.FC<{ graphData: any }> = ({ graphData }) => {
	const [state, setState] = useState<ChartThreeState>({
		series: graphData
			? Object.values(graphData).map((item) => Number(item))
			: [0, 0, 0], // default value for initial state. not correct
	});


	useEffect(() => {
		if (graphData) {
			let arr = graphData
				? Object.values(graphData).map((item) => Number(item))
				: [0, 0, 0];
			setState((prevState: any) => ({
				...prevState,
				series: arr,
			}));
		}
		
	}, [graphData]);
	const options: ApexOptions = {
		chart: {
			fontFamily: "Satoshi, sans-serif",
			type: "donut",
		},
		colors: ["#B8860B", "#FF0000", "#00FF00"],
		labels: Object.keys(graphData),
		legend: {
			show: false,
			position: "bottom",
		},
		plotOptions: {
			pie: {
				donut: {
					size: "65%",
					background: "transparent",
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		responsive: [
			{
				breakpoint: 2600,
				options: {
					chart: {
						width: 380,
					},
				},
			},
			{
				breakpoint: 640,
				options: {
					chart: {
						width: 200,
					},
				},
			},
		],
	};

	return (
		<>
			<div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
				<div className="mb-3 justify-between gap-4 sm:flex">
					<div className="w-full p-9">
						<p className="font-semibold text-primary">
							{" "}
							Job applicatins statuses(Applied, shortlisted, Rejected)
						</p>
						{/* <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p> */}
					</div>
				</div>

				<div className="mb-2">
					<div
						id="chartThree"
						className="mx-auto flex justify-center"
					>
						<ReactApexChart
							options={options}
							series={state.series}
							type="donut"
						/>
					</div>
				</div>

				<div className="-mx-8 flex flex-col flex-wrap items-center justify-center gap-y-3">
					
				</div>
			</div>
		</>
	);
};

export default ChartThree;
