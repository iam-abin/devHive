import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
    clientId: 'auth-client',
    brokers: ['devhive-kafka-headless:9092'],
})

export { kafkaClient }