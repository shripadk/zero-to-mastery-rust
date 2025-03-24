# Task Management

## Spawning Concurrent Tasks in Tokio

Tokio allows you to run multiple asynchronous tasks concurrently
using `tokio::spawn`.

{{#playground ../../../examples/async-rust/tokio/task-management-spawn.rs ignore}}

Let us breakdown what is happening in the code above:

* `tokio::spawn` creates two tasks that run concurrently.
* Each task sleeps for different durations.
* Calling `.await.unwrap()` ensures we wait for tasks to finish
  and handle potential panics.

Even though Task 1 was spawned first, Task 2 completes first as it sleeps
for a shorter duration.

