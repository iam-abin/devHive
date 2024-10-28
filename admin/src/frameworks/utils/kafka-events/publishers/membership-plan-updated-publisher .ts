import { KafkaPublisher, TOPICS, MEMBERSHIP_PLAN_UPDATED_EVENT } from '@abijobportal/common';

export class MemberShipPlanUpdatedEventPublisher extends KafkaPublisher<MEMBERSHIP_PLAN_UPDATED_EVENT> {
    topic: TOPICS.MEMBERSHIP_PLAN_UPDATED_TOPIC = TOPICS.MEMBERSHIP_PLAN_UPDATED_TOPIC;
}
