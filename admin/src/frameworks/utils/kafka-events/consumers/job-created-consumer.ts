import { Kafka } from 'kafkajs';
import { KafkaConsumer, TOPICS, JOB_CREATED_EVENT } from '@abijobportal/common';
import { handleMessage } from '../handleMessage';

export class JobCreatedEventConsumer extends KafkaConsumer<JOB_CREATED_EVENT> {
    topic: TOPICS.JOB_CREATED_TOPIC = TOPICS.JOB_CREATED_TOPIC;

    groupId: string = 'admin-4';

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: JOB_CREATED_EVENT['data'], topic: string): Promise<void> {
        handleMessage(data, topic);
    }
}
