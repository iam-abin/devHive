import schemas from "../../database/mongo/models"

const { RecruiterProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createRecruiter: async (userData: any) => {
		console.log("inside createRecruiter fn in admin service", userData);
		
		const {name, email, phone, userType, isActive} = userData
		const userObject = new RecruiterProfileModel({name, email, phone, userType, isActive});
		return await userObject.save();
	},

	getById: async (id: string) => {
		const recruiter = await RecruiterProfileModel.findById(id);
		return recruiter;
	}
};

// export default repository();
