import { KafkaPublisher, TOPICS, PREMIUM_PAYMENT_DONE_EVENT } from "@abijobportal/common";

export class PremiumPaymentDonePublisher extends KafkaPublisher<PREMIUM_PAYMENT_DONE_EVENT>{
    topic: TOPICS.PREMIUM_PAYMENT_TOPIC = TOPICS.PREMIUM_PAYMENT_TOPIC;
}