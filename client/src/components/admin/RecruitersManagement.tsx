function RecruitersManagement() {
    return (
        <div className="mx-24"> {/* Add mx-4 for horizontal margins */}
            <div className="text-center ">
                <h1 className="font-semibold text-5xl mt-4 mb-10">Recruiters Management</h1>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th className="text-center">view</th>
                                <th>status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Ajay</td>
                                <td>ajay@gmail.com</td>
                                <td>4565623232</td>
                                <td className="text-center"><button className="btn btn-info">view details</button></td>
                                <td>
                                <div className="badge badge-success gap-2">
									Active
									</div>
                                </td>
                                <td className="text-center"><button className="btn btn-error bg-red-600">Block</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecruitersManagement
