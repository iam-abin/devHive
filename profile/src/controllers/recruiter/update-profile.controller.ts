import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { RecruiterProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/recruiter-profile-updated-publisher";
import { CompanyProfileCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/company-profile-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";

export = (dependencies: IDependenciesData) => {
	const {
		useCases: {
			getRecruiterProfileByUserIdUseCase,
			updateRecruiterProfileUseCase,
		},
	} = dependencies;

	return async (req: Request, res: Response) => {
		const updatedData = req.body;
		const { userId } = req.body;

		const existingData = await getRecruiterProfileByUserIdUseCase(
			dependencies
		).execute(userId);
		
		const recruiter = await updateRecruiterProfileUseCase(
			dependencies
		).execute(existingData, updatedData);
		
		const recruiterProfileUpdatedEvent =
			new RecruiterProfileUpdatedEventPublisher(kafkaClient);
		await recruiterProfileUpdatedEvent.publish({
			name: updatedData?.name,
			email: updatedData?.email,
			phone: updatedData?.phone,
			isActive: updatedData?.isActive,
			gender: updatedData?.gender,
			profile_image: updatedData?.profile_image,
			about: updatedData?.about,
			company_name: updatedData.company_name,
			company_location: updatedData.company_location,
			company_website: updatedData.company_website,
			company_state: updatedData.company_state,
			company_country: updatedData.company_country,
			// company_id: updatedData?.company_id,
			userId: updatedData?.userId,
            
		});

		await new UserUpdatedEventPublisher(kafkaClient).publish({
			name: updatedData?.name,
			email: updatedData?.email,
			phone: updatedData?.phone,
			isActive: updatedData?.isActive,
			userType: "recruiter",
			userId: updatedData?.userId,
		});

		res.status(200).json({ message: "recruiter data", data: recruiter });
	};
};
