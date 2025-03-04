import { Kafka } from 'kafkajs';
import { KafkaConsumer, TOPICS, PAYMENT_CREATED_EVENT } from '@abijobportal/common';
import { handleMessage } from '../handleMessage';

export class paymentCreatedEventConsumer extends KafkaConsumer<PAYMENT_CREATED_EVENT> {
    topic: TOPICS.PAYMENT_CREATED_TOPIC = TOPICS.PAYMENT_CREATED_TOPIC;

    groupId: string = 'profile-4';

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: PAYMENT_CREATED_EVENT['data'], topic: string): Promise<void> {
        handleMessage(data, topic);
    }
}
