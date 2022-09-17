interface SubscriptionProvider {
    subscribe(request: Express.Request, response: Express.Response): Promise<string[]>;
}

export default SubscriptionProvider;