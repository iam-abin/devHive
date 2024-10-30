import { Kafka } from 'kafkajs';
import { KafkaConsumer, TOPICS, JOB_DELETED_EVENT } from '@abijobportal/common';
import { handleMessage } from '../handleMessage';

export class JobDeletedEventConsumer extends KafkaConsumer<JOB_DELETED_EVENT> {
    topic: TOPICS.JOB_DELETED_TOPIC = TOPICS.JOB_DELETED_TOPIC;

    groupId: string = 'admin-5';

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: JOB_DELETED_EVENT['data'], topic: string): Promise<void> {
        handleMessage(data, topic);
    }
}
