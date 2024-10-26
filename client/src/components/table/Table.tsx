import { useEffect, useState } from "react";

const Table = ({
    columns,
    data,
    numberOfPages,
    fetchData,
}: {
    columns: any;
    data: any;
    numberOfPages: number;
    fetchData: (page: number) => Promise<void>;
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const getNestedValue = (nestedObj: any, path: any) => {
        return path
            .split(".")
            .reduce((acc: any, curr: any) => acc && acc[curr], nestedObj);
    };

    const handlePageChange = async (pageNumber: number) => {
        setCurrentPage(pageNumber);
        await fetchData(pageNumber); // Fetch data for the new page
    };

    useEffect(() => {
        // Reset to first page when data changes
        setCurrentPage(currentPage);
    }, [data]);

    console.log("Payments Data:", data);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-xl">
                <thead>
                    <tr className="border-b bg-gray-700">
                        {columns.map((col: any) => (
                            <th
                                key={col.accessor}
                                className="py-3 px-6 text-left text-sm font-medium text-white uppercase tracking-wider"
                            >
                                {col.Header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row: any, rowIndex: number) => (
                            <tr
                                key={rowIndex}
                                className={`${
                                    rowIndex % 2 === 0
                                        ? "bg-white"
                                        : "bg-gray-200"
                                } border-b`}
                            >
                                {columns.map((col: any) => (
                                    <td
                                        key={col.accessor}
                                        className="py-4 px-6 text-sm text-gray-700"
                                    >
                                        {getNestedValue(row, col.accessor)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="py-4 text-center text-gray-700"
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {numberOfPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === numberOfPages}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
