import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
    clientId: 'job-client',
    brokers: ['kafka-srv:9092']
})

export { kafkaClient }