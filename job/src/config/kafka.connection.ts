import { Kafka } from 'kafkajs';

const kafkaClient = new Kafka({
    clientId: 'job-client',
    brokers: ['devhive-kafka:9092'],
    retry: {
        retries: 5, // Number of retries
        initialRetryTime: 300, // Initial time to wait before the first retry (in ms)
        maxRetryTime: 10000, // Maximum time to wait before giving up (in ms)
      }
});

export { kafkaClient };
