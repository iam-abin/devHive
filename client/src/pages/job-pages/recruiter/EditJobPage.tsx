import TopNavBarRecruiter from "../../../components/navBar/TopNavBarRecruiter";
import EditJob from "../../../components/recruiter/EditJob";

function EditJobPage() {
	return (
		<div>
			<TopNavBarRecruiter />
			<div className="flex items-center justify-center h-full bg-fuchsia-50">
				<EditJob />
			</div>
		</div>
	);
}

export default EditJobPage;
