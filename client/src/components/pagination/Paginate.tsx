import React from "react";
import ReactPaginate from "react-paginate";

const Paginate: React.FC<{ pageCount: number; handlePageChange: any }> = ({
	pageCount,
	handlePageChange,
}) => {
	return (
		<div className="pb-5">
			<ReactPaginate
				pageCount={pageCount}
				pageRangeDisplayed={3}
				marginPagesDisplayed={1}
				onPageChange={handlePageChange}
				containerClassName={"flex justify-center mt-4"}
				activeClassName={
					"bg-blue-500 px-3 py-2 text-white border-solid border-blue-500 border rounded"
				}
				pageClassName={"mx-2"}
				previousClassName={
					"mx-2 px-5 py-2 bg-blue-500 text-white cursor-pointer border-tr-2 border-br-2 rounded-l-lg"
				}
				nextClassName={
					"mx-2 px-5 py-2 bg-blue-500 text-white cursor-pointer border-tr-2 border-br-2 rounded-r-lg"
				}
			/>
		</div>
	);
};

export default Paginate;
