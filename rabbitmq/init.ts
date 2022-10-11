import { Consumer } from "./consumer";
import { Producer } from "./producer";
import { RabbitMQ } from "./rabbitmq";

const host: string = 'amqp://localhost';
const queue: string = 'rate';

export const rabbitConsumer = new Consumer(
    new RabbitMQ(host), queue
);

export const rabbitProducer = new Producer(
    new RabbitMQ(host), queue
);