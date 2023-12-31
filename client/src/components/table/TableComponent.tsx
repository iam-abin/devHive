import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";

interface TablePropsInterface {
	columns: any;
	data: any;
}

const TableComponent: React.FC<TablePropsInterface> = ({ columns, data }) => {
	const [searchText, setSearchText] = useState("");

	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		setFilteredData(
			data.filter((item: any) =>
				Object.values(item).some(
					(value) =>
						value &&
						value
							.toString()
							.toLowerCase()
							.includes(searchText.toLowerCase())
				)
			)
		);
	}, [data, searchText]);

	const customStyles = {
		headRow: {
			style: {
				backgroundColor: "black",
				color: "white",
			},
		},
		headCells: {
			style: {
				color: "white",
				fontSize: "18px",
				alignItems: "center",
				display: "flex",
				justifyContent: "center",
			},
		},
		rows: {
			style: {
				minHeight: "60px",
			},
		},
		cells: {
			style: {
				minHeight: "60px",
				display: "flex",
				justifyContent: "center",
			},
		},
	};

	return (
		<StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
			{/* The usage of StyleSheetManager with the shouldForwardProp prop is generally done 
			when you encounter 'warnings' related to unknown props being passed to styled components 
			in libraries like styled-components. */}
			<DataTable
				columns={columns}
				data={filteredData}
				pagination
				fixedHeader
				fixedHeaderScrollHeight="450px"
				highlightOnHover
				responsive
				subHeader
				subHeaderComponent={
					<input
						type="text"
						className="search-box my-3 p-2 border rounded-xl border-slate-800"
						placeholder="Search by name, email, or phone..."
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				}
				customStyles={customStyles} // Apply custom styles
			/>
		</StyleSheetManager>
	);
};

export default TableComponent;
