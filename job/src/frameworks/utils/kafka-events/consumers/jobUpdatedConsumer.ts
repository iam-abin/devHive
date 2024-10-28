import { Kafka, KafkaMessage } from 'kafkajs';
import { KafkaConsumer, TOPICS, JOB_UPDATED_EVENT } from '@abijobportal/common';
import { handleMessage } from '../handleMessage';

export class jobUpdatedEventConsumer extends KafkaConsumer<JOB_UPDATED_EVENT> {
    topic: TOPICS.JOB_UPDATED_TOPIC = TOPICS.JOB_UPDATED_TOPIC;

    groupId: string = 'job-1';

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: JOB_UPDATED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {
        handleMessage(data, topic);
    }
}
