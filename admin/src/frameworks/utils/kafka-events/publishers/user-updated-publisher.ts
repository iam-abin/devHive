import { KafkaPublisher, TOPICS, USER_UPDATED_EVENT } from '@abijobportal/common';

export class UserUpdatedEventPublisher extends KafkaPublisher<USER_UPDATED_EVENT> {
    topic: TOPICS.USER_UPDATED_TOPIC = TOPICS.USER_UPDATED_TOPIC;
}
