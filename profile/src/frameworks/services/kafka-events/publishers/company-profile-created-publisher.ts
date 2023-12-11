import { KafkaPublisher, TOPICS, COMPANY_PROFILE_CREATED_EVENT } from "@abijobportal/common";

export class CompanyProfileCreatedEventPublisher extends KafkaPublisher<COMPANY_PROFILE_CREATED_EVENT>{
    topic: TOPICS.COMPANY_PROFILE_CREATED_TOPIC = TOPICS.COMPANY_PROFILE_CREATED_TOPIC;
}