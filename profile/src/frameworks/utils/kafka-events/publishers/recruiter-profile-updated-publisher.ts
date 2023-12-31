import { KafkaPublisher, TOPICS, RECRUITER_PROFILE_UPDATED_EVENT } from "@abijobportal/common";

export class RecruiterProfileUpdatedEventPublisher extends KafkaPublisher<RECRUITER_PROFILE_UPDATED_EVENT>{
    topic: TOPICS.RECRUITER_PROFILE_UPDATED_TOPIC = TOPICS.RECRUITER_PROFILE_UPDATED_TOPIC;
}