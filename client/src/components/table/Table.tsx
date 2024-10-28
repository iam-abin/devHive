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

    const getNestedValue = (nestedObj: any, path: string) => {
        return path
            .split(".")
            .reduce((acc: any, curr: string) => acc && acc[curr], nestedObj);
    };

    const handlePageChange = async (pageNumber: number) => {
        setCurrentPage(pageNumber);
        await fetchData(pageNumber); // Fetch data for the new page
    };

    useEffect(() => {
        setCurrentPage(currentPage);
    }, [data]);

    console.log("Payments Data:", data);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-xl">
                    <thead>
                        <tr className="border-b bg-gray-700">
                            {columns.map((col: any, index: number) => (
                                <th
                                    key={index}
                                    className="py-3 px-6 text-center text-sm font-medium text-white uppercase tracking-wider"
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
                                    {columns.map((col: any, index: number) => (
                                        <td
                                            key={index}
                                            className="py-4 px-6 text-center text-sm text-gray-700"
                                        >
                                            {col.button
                                                ? col.button(row) // Use custom Cell if defined
                                                : getNestedValue(
                                                      row,
                                                      col.accessor
                                                  )}{" "}
                                            {/* Default to accessor */}
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
            </div>

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
        </>
    );
};

export default Table;
