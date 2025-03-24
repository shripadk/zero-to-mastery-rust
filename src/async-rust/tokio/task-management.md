# Task Management

## Spawning Concurrent Tasks

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

### Joining Multiple Tasks Efficiently

Instead of `.await`ing tasks sequentially, we can wait for multiple 
tasks concurrently using `tokio::join!`.

{{#playground ../../../examples/async-rust/tokio/task-management-join.rs ignore}}

Let us breakdown what is happening in the code above:

* `tokio::join(task1(), task2())` runs both `task1` and `task2` concurrently
  and waits for both to finish.
* Unlike `tokio::spawn`, `join!` does not create separate background tasks;
  instead, it runs the tasks within the same task thread.
