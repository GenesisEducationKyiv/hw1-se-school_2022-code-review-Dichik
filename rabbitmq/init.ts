import { Consumer } from "./entities/consumer";
import { ConsumerBroker } from "./entities/brokers/consumerBroker";
import { Producer } from "./entities/producer";
import { ProducerBroker } from "./entities/brokers/producerBroker";

const host: string = 'amqp://localhost';
const queue: string = 'rate';

export const consumer = new Consumer(
    new ConsumerBroker(host), queue
);

export const producer = new Producer(
    new ProducerBroker(host), queue
);