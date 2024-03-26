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

	const [entries, setEntries] = useState<any>([]);
	//  useEffect(() => {
	//   if (graphData) {

	//     // Update series state using update function
	//     setState((prevstate: any) => ({
	//       ...prevstate,
	//       series: graphData.map((plan: any, index: number) => ({
	//         name: plan.name || `Series ${index + 1}`,
	//         data: plan.data,
	//       })),
	//     }));
	//   }
	// }, [graphData]);

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

		const entries = Object.entries(graphData);
		setEntries(entries);
	}, [graphData]);
	//  const allZeros = state.series.reduce((accumulator, currentValue) => {
	//   return accumulator && currentValue === 0;
	// }, true);

	// console.log("allZeros",allZeros);

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
					{/* <div>
          <div className="relative z-20 inline-block">
            <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                Monthly
              </option>
              <option value="" className="dark:bg-boxdark">
                Yearly
              </option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                 d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                 fill="#637381"
                />
                <path
                 fillRule="evenodd"
                 clipRule="evenodd"
                 d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                 fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div> */}
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
