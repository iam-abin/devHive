import { Kafka } from "kafkajs";

const kafkaClient: Kafka = new Kafka({
    clientId: 'payment-client',
    brokers: ['devhive-kafka:9092'],
})

export { kafkaClient }