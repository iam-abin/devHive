import { KafkaPublisher, TOPICS, CANDIDATE_PROFILE_UPDATED_EVENT } from '@abijobportal/common';

export class CandidateProfileUpdatedEventPublisher extends KafkaPublisher<CANDIDATE_PROFILE_UPDATED_EVENT> {
    topic: TOPICS.CANDIDATE_PROFILE_UPDATED_TOPIC = TOPICS.CANDIDATE_PROFILE_UPDATED_TOPIC;
}
