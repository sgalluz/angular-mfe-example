import { Injectable } from '@angular/core';
import { Message, PubSubHandler, SubscriptionToken } from './pubsub.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PubSubService {

  private subscribers: Map<string, Set<PubSubHandler>>;

  constructor() {
    this.subscribers = new Map();
  }

  public publish(message: Message): boolean {
    console.log('publish', this.subscribers);
    this.subscribers?.get(message?.topic)?.forEach(h => h.handler(message.payload));
    return true;
  }

  public subscribe(topic: string, handler: (_?: any) => any): SubscriptionToken {
    const token: SubscriptionToken = uuid();
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }
    this.subscribers.get(topic)?.add({ token, handler });
    return token;
  }

  public unsubscribe(token: SubscriptionToken): boolean {
    this.subscribers = [...(this.subscribers?.keys() || [])]
      ?.reduce((acc: Map<string, Set<PubSubHandler>>, topic: string) =>
        acc.set(topic, new Set([...(this.subscribers.get(topic) || [])].filter(h => h?.token !== token))),
        new Map());
    return true;
  }
}
