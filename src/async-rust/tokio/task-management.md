# Task Management

## Spawning Concurrent Tasks

Tokio allows you to run multiple asynchronous tasks concurrently
using `tokio::spawn`.

{{#playground ../../../examples/task-management-spawn.rs ignore}}

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

{{#playground ../../../examples/task-management-join.rs ignore}}

Let us breakdown what is happening in the code above:

* `tokio::join!(task1(), task2())` runs both `task1` and `task2` concurrently
  and waits for both to finish.
* Unlike `tokio::spawn`, `join!` does not create separate background tasks;
  instead, it runs the tasks within the same task thread.

## Combining `tokio::spawn` with `tokio::join!`

Now let us combine `tokio::spawn` (for background tasks) with `tokio::join!`
(for structured concurrency).

{{#playground ../../../examples/task-management-spawn-join.rs ignore}}

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

{{#playground ../../../examples/task-management-task-failure.rs ignore}}

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

{{#playground ../../../examples/task-management-task-cancellation.rs ignore}}

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

{{#playground ../../../examples/task-management-task-precondition.rs ignore}}

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

## Optional `else` with `tokio::select!`

The `tokio::select!` macro may include a single, optional `else`
branch, which evaluates if none of the other branches match their patterns:

```text,ignore
else => <expression>
```

{{#playground ../../../examples/task-management-else.rs ignore}}

Breakdown of above code:

* All tasks are spawned as separate background tasks.
* `inside task 1`, `inside task 2`, `inside task 3` is printed to stdout when 
  `handle1`, `handle2` and `handle3` async expressions gets evaluated. This 
  happens **irrespective of whether the branches are enabled or not.**
* The first and second branch are disabled and their futures not polled due
  to precondition failure.
* Only the `else` branch gets evaluated and future polled. Note the difference 
  in how the `else` pattern is defined.

## Optional `biased` mode to control `tokio::select!` polling execution order

By default, `select!` uses pseudo-random mode to pick a branch randomly to check.
This is done to ensure fairness. However, this can be disabled with `biased` mode, which will 
cause `select!` to poll futures in the order they appear (from top to bottom). 

{{#playground ../../../examples/task-management-biased.rs ignore}}

The `biased;` statement at the beginning of `tokio::select!` indicates that the branches 
should be polled in the order they are written, rather than randomly. This ensures 
a deterministic execution order, which is crucial in this context

A `loop` is used to show how this execution order works:

* The first branch contains an empty asynchronous block (`async {}`) and a precondition 
  `if count < 1`. Since `count` starts at 0, this precondition is true during the 
  first iteration. The handler increments `count` to 1 and asserts `count` equals 1.

* The second branch is similar to first branch with only the precondition check
  being `if count < 2`. This handler increments `count` to 2 and asserts `count` equals 2
  during the second iteration of the loop.

* The same happens to the third branch during the third iteration. `count` is incremented
  to 3.

* The final `else` branch executes during the fourth iteration of the `loop` as
  `count` is now 3 and none of the other branches pass the precondition check.
  The handler increments `count` to 4 and asserts `count` is 4 and finally breaks the loop.

If `biased;` statement was not set at the begin beginning of `tokio::select!` then
there is no guarantee of the branches being chosen in deterministic execution order
as it would be pseudo-random by default.

You can test for this case by commenting out the `biased;` statement and test run 
the program multiple times.

<div class="warning" style="font-size: 0.95em;">

You can use `biased;` if you need to save on CPU cycles (used for pseudo-random number 
generation) or if you need deterministic execution order. It is much more efficient.

Caveat: It becomes your responsibility to ensure that the polling order of your 
futures is fair. If, for example, you are selecting between a stream and a shutdown future, 
and the stream has a huge volume of messages and zero or nearly zero time between them, 
you should place the shutdown future earlier in the `select!` list to ensure that it is
always polled, and will not be ignored due to the stream being constantly
ready.

</div>

# Implementing Timeouts

You can use Tokio's builtin `timeout` to cancel a long running
task.

{{#playground ../../../examples/task-management-timeout.rs ignore}}

It should print `deadline has elapsed` to stderr.

# Spawn collection of tasks using `JoinSet`

You can spawn a collection of tasks using `JoinSet`. You can either await
completion of some or all of the tasks in the set. And the tasks will be returned
in the order they complete.

When a `JoinSet` is dropped, all tasks in the `JoinSet` are immediately aborted.

{{#playground ../../../examples/task-management-joinset.rs ignore}}

* First an empty unordered collection, called `set`, is created using `JoinSet::new`.
* Then a collection of tasks are spawned via the `set`.
* Then `set.join_next().await` is called in a loop to return the tasks in order of completion.

# Abort a `JoinSet`

You can abort a collection of tasks spawned using `JoinSet`.

{{#playground ../../../examples/task-management-joinset-abort.rs ignore}}

* We use the same example as above, except for introducing a `set.abort_all()` 
  before looping over the results of the spawned tasks.
* Should output errors with `task {id} was cancelled` where `id` is the id of the task.

# Spawn blocking code using `JoinSet`

You can spawn blocking code on the blocking threadpool and store it in a `JoinSet`.
Returns an `AbortHandle` much like the [Abort a `JoinSet`](#abort-a-joinset) section 
described above.

{{#playground ../../../examples/task-management-joinset-blocking.rs ignore}}

* We calculate a simple fibonacci number using the `fib(v: usize) -> usize` function.
  This is a CPU intensive operation and hence is best handled in the blocking threadpool.
* The `calculate_fib(value: usize)` function returns a `FibResult` that contains the value
  passed, the result as well as time elapsed to run the CPU intensive operation.
* The `set` spawns **42** tasks, calculating fibonacci numbers from **0** to **42**.
* Then `set.join_next().await` is called in a loop to return the tasks in order of completion.

<div class="warning" style="font-size: 0.95em;">

An important point to keep in mind:

Tasks spawned using `spawn_blocking` cannot be aborted because they are not
async. If you call `abort` on a `spawn_blocking` task it won't have any effect.
Only exception is if the task hasn't started running yet, where calling `abort`
may prevent the task from running.

</div>

