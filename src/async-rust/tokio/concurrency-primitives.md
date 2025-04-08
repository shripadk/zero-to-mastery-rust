# Concurrency Primitives

## Oneshot channel

For sending a single value from a single producer to a single consumer.

{{#playground ../../../examples/concurrency-primitives-oneshot.rs ignore}}

Breakdown of above code:

* Oneshot channel returns a sender (`tx`) and receiver (`rx`).
* The sender `tx` is moved to a spawned tokio task, where the task is made to sleep for
  few milliseconds. 
* Then a message of `Status::Completed` with the `duration` is sent.
* The receiver `rx` waits for message in the main task and the result is logged.

<div class="warning" style="font-size: 0.95em;">

An important point to keep in mind:

It is preferable to just return from a spawned task rather than opting
for allocating resources towards creating a Oneshot channel. Use it
only when it is not trivial to access a task's returned value.

</div>

## `mpsc` channel

The `mpsc` channel supports sending many values from many producers to
a single consumer.

This is also a channel one should use to send multiple messages
from single producer to single consumer as there is no dedicated `spsc`
channel.

{{#playground ../../../examples/concurrency-primitives-mpsc.rs ignore}}

Breakdown of above code:

* We create a `mpsc` channel which returns a Sender `tx` and Receiver `rx`.
* Clone the `tx` within the loop and spawn a task that calculates the corresponding
  Fibonacci number. Since `fib` is a CPU heavy computation, we use task `spawn_blocking`.
* Then send a tuple of value and its corresponding Fibonacci number via `tx.send`.
* Each cloned value of `tx` is dropped upon completion, except for the one owned by the
  main/current task. Since the main/current task did not utilize the `tx`, it continues to
  exist and the program never ends. So `tx` must be dropped.
* Call `rx.recv()` in a loop and print the resulting tuple formatting accordingly.
