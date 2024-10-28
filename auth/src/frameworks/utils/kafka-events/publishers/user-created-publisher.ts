import { KafkaPublisher, TOPICS, USER_CREATED_EVENT } from '@abijobportal/common';

export class UserCreatedEventPublisher extends KafkaPublisher<USER_CREATED_EVENT> {
    topic: TOPICS.USER_CREATED_TOPIC = TOPICS.USER_CREATED_TOPIC;
}
