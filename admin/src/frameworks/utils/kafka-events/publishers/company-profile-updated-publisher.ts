import { KafkaPublisher, TOPICS, COMPANY_PROFILE_UPDATED_EVENT } from "@abijobportal/common";

export class CompanyProfileUpdatedEventPublisher extends KafkaPublisher<COMPANY_PROFILE_UPDATED_EVENT>{
    topic: TOPICS.COMPANY_PROFILE_UPDATED_TOPIC = TOPICS.COMPANY_PROFILE_UPDATED_TOPIC;
    
}