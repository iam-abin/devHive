import schemas from "../../database/mongo/models";

const { TokenModel } = schemas;

// we want to export some closure
const repository = () => {
	return {

		 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

		 createToken: async (tokenData: any) => {

			const tokenObject = new TokenModel(tokenData);
			return await tokenObject.save();
			
		},
		 
		getToken: async (tokenData: any) => {

			const {userId,  token} = tokenData;
			const tokenDetails = await TokenModel.findOne({ token });
			
			console.log(tokenDetails,"token found repo");
			
			return tokenDetails;
			
		},

		deleteToken: async (tokenData: any) => {
			const {userId,  token} = tokenData;
			const userObject = await TokenModel.deleteOne({userId,  token} );
			return userObject;
		},

	};
};

export default repository();
