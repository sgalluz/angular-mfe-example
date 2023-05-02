type Payload = any;

export type Message = {
  topic: string,
  payload: Payload
};

export type PubSubHandler = {
  token: SubscriptionToken,
  handler: (_?: any) => any
};

export type SubscriptionToken = string;
