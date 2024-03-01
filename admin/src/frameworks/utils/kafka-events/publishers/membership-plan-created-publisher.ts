import { KafkaPublisher, TOPICS, MEMBERSHIP_PLAN_CREATED_EVENT } from "@abijobportal/common";

export class MemberShipPlanCreatedEventPublisher extends KafkaPublisher<MEMBERSHIP_PLAN_CREATED_EVENT>{
    topic: TOPICS.MEMBERSHIP_PLAN_CREATED_TOPIC = TOPICS.MEMBERSHIP_PLAN_CREATED_TOPIC;
    
}