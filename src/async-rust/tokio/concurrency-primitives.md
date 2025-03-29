# Concurrency Primitives

## Oneshot channel

For sending a single value from a single producer to a single consumer.

{{#playground ../../../examples/async-rust/tokio/concurrency-primitives-oneshot.rs ignore}}

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

