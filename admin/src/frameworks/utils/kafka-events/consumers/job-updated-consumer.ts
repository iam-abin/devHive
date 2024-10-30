import { Kafka } from 'kafkajs';
import { KafkaConsumer, TOPICS, JOB_UPDATED_EVENT } from '@abijobportal/common';
import { handleMessage } from '../handleMessage';

export class JobUpdatedEventConsumer extends KafkaConsumer<JOB_UPDATED_EVENT> {
    topic: TOPICS.JOB_UPDATED_TOPIC = TOPICS.JOB_UPDATED_TOPIC;

    groupId: string = 'admin-6';

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: JOB_UPDATED_EVENT['data'], topic: string): Promise<void> {
        handleMessage(data, topic);
    }
}
