export function signal<T>(initialValue: T): Signal<T> {
  let _value = initialValue;
  const subscribers: Subscriber<T>[] = [];

  function track<R>(fn: Subscriber<T, R>) {
    subscribers.push(fn);
    return () => fn(_value);
  }

  function _signal() {
    return _value;
  }

  function triggerSubscribers(updatedValue: T) {
    subscribers.forEach((subscriber) => {
      subscriber(updatedValue);
    });
  }

  _signal.set = (newValue: T) => {
    _value = newValue;
    triggerSubscribers(_value);
  };

  _signal.update = (fn: UpdateCallback<T>) => {
    _value = fn(_value);
    triggerSubscribers(_value);
  };

  _signal.track = track;

  return _signal;
}

type Subscriber<T, R = unknown> = (currentValue: T) => R;
type UpdateCallback<T> = (oldValue: T) => T;
interface Signal<T> {
  (): T;
  set: (newValue: T) => void;
  update: (fn: UpdateCallback<T>) => void;
  track: <R>(fn: Subscriber<T, R>) => () => R;
}
