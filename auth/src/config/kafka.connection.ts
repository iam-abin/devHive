import { Kafka } from 'kafkajs';

const kafkaClient = new Kafka({
    clientId: 'auth-client',
    brokers: ['devhive-kafka:9092'],
});

export { kafkaClient };
