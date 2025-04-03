# Basics

## Understanding `async` and `await` in Tokio

Tokio is an asynchronous runtime for Rust, built on top of
Rust's `async` and `await` syntax. Let us start with a simple
example of an `async` function inside a Tokio runtime.

{{#playground ../../../examples/async-rust/tokio/basics.rs ignore mdbook-runnable}}

Let us breakdown what is happening in the code above:

* `#[tokio::main]` initializes the Tokio runtime.
* `sleep(Duration::from_secs(1)).await` makes the task pause 
   asynchronously without blocking the thread.
* The program prints messages before and after `sleep`.

<div class="warning" style="font-size: 0.95em;">
Some important points to keep in mind:

Tokio's `sleep` operates at millisecond granularity and must
not be used for tasks that require high-resolution timers. Implementation
is platform specific and some platforms, like Windows, provide timers
with larger resolution than 1 ms.

Maximum duration for a `sleep` is 2.2 years.
</div>

## Asynchronous `sleep`

`tokio::time::sleep` is the asynchronous equivalent of `thread::sleep`.
It creates a future that completes after the specified duration has elapsed.

{{#playground ../../../examples/async-rust/tokio/basics-time-sleep.rs ignore}}

## Asynchronous `interval`

An `Interval` creates a stream that yields values at a fixed period.
The stream produces `()` values each time the interval elapses.
You use `.tick().await` in a loop to wait for the next tick.

{{#playground ../../../examples/async-rust/tokio/basics-time-interval.rs ignore}}

Explanation:

* `interval(Duration)` creates the `Interval` struct.
* `interval.tick().await` returns a future that completes at next tick.
* The first tick completes immediately. Subsequent ticks wait for the duration.
* If the task takes longer than the interval duration to execute between
  ticks, the interval might "miss" ticks to catch up, ensuring ticks don't
  accumulate indefinitely if the receiver is slow.

