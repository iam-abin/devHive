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
		const filtered = data.filter((item: any) => {
		  // Loop through each key in the item
		  for (let key in item) {
			// Check if the key is an object
			if (typeof item[key] === "object" && item[key] !== null) {
			  // If the key is an object, loop through its properties
			  for (let nestedKey in item[key]) {
				// Check if the nested property is a string
				if (
				  typeof item[key][nestedKey] === "string" &&
				  item[key][nestedKey]
					.toLowerCase().trim()
					.includes(searchText.toLowerCase().trim())
				) {
				  return true; // Return true if the nested property matches the search text
				}
			  }
			} else if (
			  // Check if the item's value is a string and matches the search text
			  typeof item[key] === "string" &&
			  item[key].toLowerCase().includes(searchText.toLowerCase())
			) {
			  return true;
			}
		  }
		  return false; // Return false if no match is found
		});
		setFilteredData(filtered);
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
					//  md:my-2 md:p-1 md:text-sm lg:text-base
					<input
						type="text"
						className="search-box my-3 p-2 md:my-2 md:p-1 md:text-sm lg:text-base border rounded-xl border-slate-800"
						placeholder="Search by name, email, or phone..."
						value={searchText}
						onChange={(e) =>
							setSearchText(e.target.value.toLowerCase())
						}
					/>
				}
				customStyles={customStyles} // Apply custom styles
			/>
		</StyleSheetManager>
	);
};

export default TableComponent;
