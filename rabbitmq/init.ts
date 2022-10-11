import { Consumer } from "./entities/consumer";
import { ConsumerBroker } from "./entities/consumerBroker";
import { Producer } from "./entities/producer";
import { ProducerBroker } from "./entities/producerBroker";

const host: string = 'amqp://localhost';
const queue: string = 'rate';

export const rabbitConsumer = new Consumer(
    new ConsumerBroker(host), queue
);

export const rabbitProducer = new Producer(
    new ProducerBroker(host), queue
);