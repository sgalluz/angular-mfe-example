import { Injectable } from '@angular/core';
import { Handler, Message, PubSubHandler, SubscriptionToken } from './pubsub.model';
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
    this.subscribers?.get(message?.topic)?.forEach(h => h.handler(message.payload));
    return true;
  }

  public subscribe(topic: string, handler: Handler): SubscriptionToken {
    const token: SubscriptionToken = uuid();
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }
    this.subscribers.get(topic)?.add({ token, handler });
    return token;
  }

  public unsubscribe(token: SubscriptionToken): boolean {
    this.subscribers = [...(this.subscribers?.keys() || [])]
      ?.reduce((acc: Map<string, Set<PubSubHandler>>, topic: string) => {
        acc.set(topic, this.filterSubscribersSet(topic, token));
        return acc;
      }, new Map());
    return true;
  }

  private filterSubscribersSet(topic: string, token: string): Set<PubSubHandler> {
    const filteredSubscribers: Array<PubSubHandler> =
      [...(this.subscribers.get(topic) || [])].filter(h => h?.token !== token);
    return new Set(filteredSubscribers);
  }
}
