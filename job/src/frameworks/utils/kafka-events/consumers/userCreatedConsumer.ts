import { Kafka } from 'kafkajs';
import { KafkaConsumer, TOPICS, USER_CREATED_EVENT } from '@abijobportal/common';
import { handleMessage } from '../handleMessage';

export class UserCreatedEventConsumer extends KafkaConsumer<USER_CREATED_EVENT> {
    topic: TOPICS.USER_CREATED_TOPIC = TOPICS.USER_CREATED_TOPIC;

    groupId: string = 'job-2';

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: USER_CREATED_EVENT['data'], topic: string): Promise<void> {
        handleMessage(data, topic);
    }
}
