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

* `tokio::join!(task1(), task2())` runs both `task1` and `task2` concurrently
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

## Task Cancellation with `tokio::select!`

Sometimes, you may want to **race multiple tasks** and cancel the slower one
once the faster one completes. This is where `tokio::select!` comes in.

{{#playground ../../../examples/async-rust/tokio/task-management-task-cancellation.rs ignore}}

Breakdown of above code:

* `tokio::select!` waits for **whichever task finishes first**.
* The **faster task wins** (`fast_task()`), and the **slower task gets cancelled**
  (`slow_task()` never completes).
* `tokio::select!` moves on once the branch resolves returning the result which
  is of type `&str`.

## Adding Preconditions with `tokio::select!`

`tokio::select!` macro accepts one or more branches with the following pattern:

```text,ignore
<pattern> = <async expression> (, if <precondition>)? => <handler>,
```

As we saw from the [Task Cancellation](#task-cancellation-with-tokioselect) section above, 
the branch selection depends on which branch completes first, resulting in cancellation of the
remaining branches.

Sometimes you may wish to disable a particular branch based on a precondition.
`tokio::select!` allows you to do this. However, it will still evaluate the async
expression as defined in the pattern above. The resulting future however is not
polled.

{{#playground ../../../examples/async-rust/tokio/task-management-task-precondition.rs ignore}}

Breakdown of above code:

We are running the same code twice with the only difference being the `run_task2`
precondition flag that is set to `false` the first time and `true` the second time.

Let us consider the case where `run_task2` is set to `false`:

* Both tasks are spawned as separate background tasks.
* `inside task 1` is printed to stdout when `handle1` async expression gets evaluated.
* Even though `run_task2` is `false`, we still see the message `inside task 2`
  printed to stdout. **This demonstrates that the async expression is evaluated
  irrespective of disabling the branch. The future is however not polled.**
* Because the branch is disabled, **`select!` picks the first branch (even though it
  sleeps for longer duration)** and outputs `Task 1 completed`.

Now consider the case where `run_task2` is set to `true`:

* Both tasks are spawned as separate background tasks.
* `inside task 1` is printed to stdout when `handle1` async expression gets evaluated.
* With `run_task2` set to `true`, we see the message `inside task 2` printed to stdout. 
  **The async expression is evaluated and since the branch is now enabled, 
  `select!` polls this future when performing its branch selection.**
* As the branch is enabled and has a smaller timeout set, **`select!` picks the 
  second branch** and outputs `Task 2 completed` while cancelling Task 1's handle.

<div class="warning" style="font-size: 0.95em;">
Some important points to keep in mind:

The async expressions will **ALWAYS** get evaluated irrespective of
whether the branch is disabled or not. So it is preferable to not perform
any side effects that would need to be rolled back in case of task cancellation.
</div>

