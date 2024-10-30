import { Kafka } from 'kafkajs';
import { KafkaConsumer, TOPICS, CANDIDATE_PROFILE_UPDATED_EVENT } from '@abijobportal/common';
import { handleMessage } from '../handleMessage';

export class CandidateProfileUpdatedEventConsumer extends KafkaConsumer<CANDIDATE_PROFILE_UPDATED_EVENT> {
    topic: TOPICS.CANDIDATE_PROFILE_UPDATED_TOPIC = TOPICS.CANDIDATE_PROFILE_UPDATED_TOPIC;

    groupId: string = 'chat-3';

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: CANDIDATE_PROFILE_UPDATED_EVENT['data'], topic: string): Promise<void> {
        handleMessage(data, topic);
    }
}
