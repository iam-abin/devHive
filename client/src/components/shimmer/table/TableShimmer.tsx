const TableShimmer = ({ columnCount, rowCount }: { columnCount: number; rowCount: number }) => {
    
    return (
        <tbody>
            {Array.from({ length: columnCount }).map((_, rowIndex) => (
                <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-200"} border-b`}>
                    {Array.from({length:rowCount}).map((_: unknown, colIndex: number) => (
                        <td key={colIndex} className="py-4 px-6 text-center">
                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableShimmer;
