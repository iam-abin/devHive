import { KafkaPublisher, TOPICS, JOB_UPDATED_EVENT } from '@abijobportal/common';

export class JobUpdatedEventPublisher extends KafkaPublisher<JOB_UPDATED_EVENT> {
    topic: TOPICS.JOB_UPDATED_TOPIC = TOPICS.JOB_UPDATED_TOPIC;
}
