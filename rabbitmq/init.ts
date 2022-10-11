import { Consumer } from "./consumer";
import { Producer } from "./producer";
import { RabbitMQ } from "./rabbitmq";

export const rabbitConsumer = new Consumer(
    new RabbitMQ()
);

export const rabbitProducer = new Producer(
    new RabbitMQ()
);