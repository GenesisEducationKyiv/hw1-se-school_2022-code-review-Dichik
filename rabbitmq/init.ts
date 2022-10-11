import { Consumer } from "./consumer";
import { Producer } from "./producer";
import { RabbitMQ } from "./rabbitmq";

const host: string = 'amqp://localhost';

export const rabbitConsumer = new Consumer(
    new RabbitMQ(host)
);

export const rabbitProducer = new Producer(
    new RabbitMQ(host)
);