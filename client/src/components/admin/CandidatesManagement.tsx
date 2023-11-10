function CandidatesManagement() {
	return (
		<div className="mx-24">
			{" "}
			{/* Add mx-4 for horizontal margins */}
			<div className="text-center ">
				<h1 className="font-semibold text-5xl mt-4 mb-10">
					Candidates Management
				</h1>
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
								<th className="">status</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							<tr>
								<th>1</th>
								<td>Abin</td>
								<td>abin@gmail.com</td>
								<td>8755623232</td>
								<td className="text-center"><button className="btn btn-info">view details</button></td>
								<td>
									<div className="badge badge-error gap-2">
									blocked
									</div>
								</td>
								<td className="text-center">
									<button className="btn btn-success bg-green-600">
										UnBlock
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default CandidatesManagement;
