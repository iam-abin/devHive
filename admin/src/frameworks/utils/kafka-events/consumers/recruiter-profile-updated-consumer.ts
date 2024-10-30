import { Kafka } from 'kafkajs';
import { KafkaConsumer, TOPICS, RECRUITER_PROFILE_UPDATED_EVENT } from '@abijobportal/common';
import { handleMessage } from '../handleMessage';

export class RecruiterProfileUpdatedEventConsumer extends KafkaConsumer<RECRUITER_PROFILE_UPDATED_EVENT> {
    topic: TOPICS.RECRUITER_PROFILE_UPDATED_TOPIC = TOPICS.RECRUITER_PROFILE_UPDATED_TOPIC;

    groupId: string = 'admin-7';

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: RECRUITER_PROFILE_UPDATED_EVENT['data'], topic: string): Promise<void> {
        handleMessage(data, topic);
    }
}
