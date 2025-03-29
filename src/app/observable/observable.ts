type Subscriber = {
  next: (nextValue: any) => void;
  error: (e: Error) => void;
  complete: () => void;
};
type Unsubscribe = () => void;
type Subscription = {
  unsubscribe: Unsubscribe;
  add: (subscription: Subscription) => void;
};
type SubscribeHandler = (subscriber: Subscriber) => void;
type Operator = () => (obs: Observable) => Observable;
type OperatorHandler = (value: unknown) => unknown;
type OperatorFactory = (handler: OperatorHandler) => Operator;

export class Observable {
  subscribeHandler;
  completed = false;
  childSubscriptions: Subscription[] = [];

  constructor(subscribeHandler: SubscribeHandler) {
    this.subscribeHandler = subscribeHandler;
  }

  pipe(...operators: (Operator | OperatorFactory)[]) {
    for (let i = 0; i < operators.length; i++) {}
  }

  subscribe(subscriber: Subscriber): Subscription {
    this.subscribeHandler(subscriber);
    const subscription = {
      unsubscribe: () => {
        this.childSubscriptions.forEach((s) => {
          s.unsubscribe();
        });
      },
      add: (subscription: Subscription) => {
        this.childSubscriptions.push(subscription);
      },
    };
    return subscription;
  }
}
