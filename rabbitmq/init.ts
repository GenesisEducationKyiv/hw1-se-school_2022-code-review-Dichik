import { Consumer } from "./entities/consumer";
import { Producer } from "./entities/producer";
import { RabbitMQ } from "./entities/rabbitmq";

const host: string = 'amqp://localhost';
const queue: string = 'rate';

export const rabbitConsumer = new Consumer(
    new RabbitMQ(host), queue
);

export const rabbitProducer = new Producer(
    new RabbitMQ(host), queue
);