import { Kafka } from 'kafkajs';

const kafkaClient = new Kafka({
    clientId: 'job-client',
    brokers: ['devhive-kafka:9092'],
});

export { kafkaClient };
