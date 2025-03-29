# RxJS Observable Summary

## What is an Observable?

An **Observable** is a _lazy push-based_ collection that can emit **multiple values** over time. It fills the gap in JavaScript’s data producer-consumer table:

|      | Single Value | Multiple Values |
| ---- | ------------ | --------------- |
| Pull | Function     | Iterator        |
| Push | Promise      | **Observable**  |

## Example Usage

```ts
import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

observable.subscribe({
  next: (x) => console.log("got value " + x),
  error: (err) => console.error("error: " + err),
  complete: () => console.log("done"),
});
```

**Console Output:**

```
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
```

## Pull vs Push

**Pull** (e.g., Functions, Iterators):

- **Producer**: passive
- **Consumer**: active (asks for data)

**Push** (e.g., Promises, Observables):

- **Producer**: active (sends data)
- **Consumer**: passive (reacts to data)

## Observables vs Other JS Constructs

| Type       | Lazy | Sync | Async | Multiple Values |
| ---------- | ---- | ---- | ----- | --------------- |
| Function   | ✔️   | ✔️   | ❌    | ❌              |
| Generator  | ✔️   | ✔️   | ❌    | ✔️              |
| Promise    | ❌   | ❌   | ✔️    | ❌              |
| Observable | ✔️   | ✔️   | ✔️    | ✔️              |

## Observables Are Not EventEmitters

- Observables are **unicast** by default.
- They do not share execution like `EventEmitter` or `Subject`.
- Every subscription triggers a **new independent execution**.

## Observables vs Functions

### Function

```ts
function foo() {
  console.log("Hello");
  return 42;
}

console.log(foo());
console.log(foo());
```

### Observable

```ts
import { Observable } from "rxjs";

const foo = new Observable((subscriber) => {
  console.log("Hello");
  subscriber.next(42);
});

foo.subscribe((x) => console.log(x));
foo.subscribe((x) => console.log(x));
```

**Both output:**

```
Hello
42
Hello
42
```

## Sync and Async Behavior

Observables can emit both synchronously and asynchronously:

```ts
console.log("before");
foo.subscribe((x) => console.log(x));
console.log("after");
```

**Output:**

```
before
Hello
42
after
```

## Returning Multiple Values

Functions can only return once:

```ts
function foo() {
  return 42;
  return 100; // unreachable
}
```

Observables can emit many values:

```ts
new Observable((subscriber) => {
  subscriber.next(42);
  subscriber.next(100);
});
```

Even asynchronously:

```ts
setTimeout(() => subscriber.next(300), 1000);
```

## TL;DR

- `func.call()` → "Give me 1 value now"
- `observable.subscribe()` → "Give me 0–∞ values now or later"
