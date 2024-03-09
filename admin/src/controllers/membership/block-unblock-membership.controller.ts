import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
// import { JobUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/job-updated-publisher";
import { MemberShipPlanUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/membership-plan-updated-publisher ";
import { NotAuthorizedError, NotFoundError } from "@abijobportal/common";
// import { produceMessage } from "../../frameworks/services/kafka/producer";

export = (dependencies: DependenciesData) => {
	const {
		useCases: {
			getMemberShipPlanByIdUseCase,
			blockUnblockMemberShipPlanUseCase,
		},
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { id: membershipPlanId } = req.params;
		console.log(
			"in  blockUnblockMemberShipPlan controller 1: ",
			membershipPlanId
		);

		const job = await getMemberShipPlanByIdUseCase(dependencies).execute(
			membershipPlanId
		);
		if (!job) {
			console.log(
				`No job Fount with membershipPlanId ${membershipPlanId}`
			);

			throw new NotFoundError();
		}

		const response = await blockUnblockMemberShipPlanUseCase(
			dependencies
		).execute(membershipPlanId);
		console.log("in blockUnblockMemberShipPlan controller 2: ", response);

		const membershipPlan = await getMemberShipPlanByIdUseCase(
			dependencies
		).execute(membershipPlanId);

		if (response?.deletedCount === 1) {
			const memberShipPlanDeletedEvent =
				new MemberShipPlanUpdatedEventPublisher(kafkaClient);
			await memberShipPlanDeletedEvent.publish({
				membershipPlanId: membershipPlan.id,
				name: membershipPlan?.name,
				features: membershipPlan?.features,
				description: membershipPlan?.description,
				price: membershipPlan?.price,
				isActive: membershipPlan?.isActive,
			});

			return res
				.status(200)
				.json({
					message: "memberShipPlan blocked successfully",
					data: membershipPlan,
					daletedDetails: response,
				});
		}

		return res
			.status(200)
			.json({
				message: "memberShipPlan couldn't deleted",
				data: response,
			});
	};
};