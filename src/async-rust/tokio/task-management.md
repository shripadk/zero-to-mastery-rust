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

## Joining Multiple Tasks Efficiently

Instead of `.await`ing tasks sequentially, we can wait for multiple 
tasks concurrently using `tokio::join!`.

{{#playground ../../../examples/async-rust/tokio/task-management-join.rs ignore}}

Let us breakdown what is happening in the code above:

* `tokio::join(task1(), task2())` runs both `task1` and `task2` concurrently
  and waits for both to finish.
* Unlike `tokio::spawn`, `join!` does not create separate background tasks;
  instead, it runs the tasks within the same task thread.

## Combining `tokio::spawn` with `tokio::join!`

Now let us combine `tokio::spawn` (for background tasks) with `tokio::join!`
(for structured concurrency).

{{#playground ../../../examples/async-rust/tokio/task-management-spawn-join.rs ignore}}

Let us breakdown what is happening in the code above:

* `tokio::spawn(task1())` runs `task1` in the background.
* `tokio::spawn(task2())` runs `task2` in the background.
* `tokio::join!(handle1, handle2)` waits for both background tasks to complete.
* Unlike the previous example, `tokio::spawn` creates actual **background
  tasks**, which means they can run even if the main task moves forward.

## Handling Task Failures with `tokio::spawn`

Since `tokio::spawn` runs tasks in the background, it returns a `JoinHandle<T>`
that we must `.await` to retrieve the result. If the task panics,
`JoinHandle::await` will return an `Err`.

{{#playground ../../../examples/async-rust/tokio/task-management-task-failure.rs ignore}}

Let us breakdown what is happening in the code above:

* `tokio::spawn(successful_task())` returns `Ok("Task succeeded")`.
* `tokio::spawn(failing_task())` panics, so `handle2.await` returns an `Err`.
* We use `match` to check whether the task completed successfully or panicked.
* Even though `failing_task()` panicked, the program **continues running**.
* Tokio isolates panics in spawned tasks so that one failing task doesn't crash
  the entire program.
