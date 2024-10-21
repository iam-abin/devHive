import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { kafkaClient } from "../../config/kafka.connection";
// import { JobUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/job-updated-publisher";
import { MemberShipPlanUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/membership-plan-updated-publisher ";
import { NotFoundError } from "@abijobportal/common";

export = (dependencies: IDependency) => {
	const {
		useCases: {
			getMemberShipPlanByIdUseCase,
			blockUnblockMemberShipPlanUseCase,
		},
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { id: membershipPlanId } = req.params;

		const job = await getMemberShipPlanByIdUseCase(dependencies).execute(
			membershipPlanId
		);
		if (!job) throw new NotFoundError();

		const response = await blockUnblockMemberShipPlanUseCase(
			dependencies
		).execute(membershipPlanId);

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
