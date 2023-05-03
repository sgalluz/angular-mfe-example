type Payload = any;

export type Message = {
  topic: string,
  payload: Payload
};

export type Handler = (_?: any) => any;

export type PubSubHandler = {
  token: SubscriptionToken,
  handler: Handler
};

export type SubscriptionToken = string;
