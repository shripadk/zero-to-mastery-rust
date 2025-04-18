# I/O Module

Okay, let us dive into `tokio::io` module. This module is fundamental for performing
asynchronous input and output operations in Tokio, forming the basis for modules like
`tokio::net` and `tokio::fs`.

<div class="warning" style="font-size: 0.95em;">

This module requires a thorough understanding of [Runtime](./runtime.md).

So please complete that module before attempting this one.

</div>

## Core Idea: Non-blocking I/O Traits

The standard library (`std::io`) provides traits `Read` and `Write` for asynchronous I/O.
These traits have methods that might block the current thread until the I/O operation
completes.

`tokio::io` provides asynchronous counterparts:

1. `AsyncRead`: For types from which bytes can be read asynchronously.
2. `AsyncWrite`: For types to which bytes can be written asynchronously.
3. `AsyncSeek`: For types that support asynchronously changing the current cursor 
    position (like files).
4. `AsyncBufRead`: An asynchronous version of `BufRead`, providing methods for buffered
    reading (like reading lines).

These traits work differently under the hood. Instead of blocking, their core methods
(like `poll_read`, `poll_write`) are designed to be called repeatedly by the Tokio
runtime. They return:

1. `Poll::Ready(Ok(result))`: The operation completed successfully (e.g., bytes read/written).
2. `Poll::Ready(Err(e))`: An error occurred.
3. `Poll::Pending`: The operation could not complete *yet* (e.g., the socket has no data
    to read, or the write buffer is full). When this happens, the trait implementation must
    arrange for the current task's `Waker` (obtained from the `Context`) to be notified when
    the resource *might* be ready again, so the runtime knows to poll the future again
    later.

## User Interaction: Extension traits (`AsyncReadExt`, `AsyncWriteExt`)

While the `poll_*` methods are the core, you rarely call them directly. Instead you use
the convenience **extension traits** `AsyncReadExt` and `AsyncWriteExt`. These traits
are automatically implemented for any type that implements `AsyncRead` or `AsyncWrite`,
respectively, and they provide the familiar `.await`-able methods.

## `AsyncReadExt` — Reading Data Asynchronously

Let us use `tokio::fs::File` as an example source that implements `AsyncRead`.

{{#playground ../../../examples/io-asyncreadext.rs ignore}}

## `AsyncWriteExt` — Writing Data Asynchronously

{{#playground ../../../examples/io-asyncwriteext.rs ignore}}

## Utility Functions: `copy` and `copy_bidirectional`

These are helpers for efficiently transferring data between `AsyncRead` and
`AsyncWrite` sources/sinks.

* `io::copy(reader, writer)`: Reads data from `reader` and writes it to `writer`
  until EOF is reached on the `reader`. Returns the total number of bytes copied.
  Uses an internal buffer.

{{#playground ../../../examples/io-copy.rs ignore}}

* `io::copy_bidirectional(a, b)`: Copies data from `a` to `b` AND from `b`
  to `a` simultaneously. Useful for proxying network connections. Returns the
  bytes copied in each direction.

## Buffered Reading/Writing: `BufReader` and `BufWriter`

System calls for reading/writing small amounts of data frequently can be inefficient.
`BufReader` and `BufWriter` wrap an existing reader/writer and add an in-memory buffer.

* `BufReader<R>`: Reads large chunks from the underlying reader `R` into its buffer,
  then serves smaller read requests from the buffer. Implements `AsyncBufRead`.
* `BufWriter<R>`: Collects smaller writes in its buffer and writes larger chunks to
  the underlying writer `W` when the buffer is full or `flush()` is called.

{{#playground ../../../examples/io-buffered.rs ignore}}

* `AsyncBufReadExt`: Provides methods like `read_line` and `lines` (returns a stream of 
  lines) for types implementing `AsyncBufRead` (like `BufReader`).

## Standard I/O: `stdin()`, `stdout()`, `stderr()`

Tokio provides asynchronous handles to the standard input, output, and error streams
of your process.

{{#playground ../../../examples/io-std.rs ignore}}

*Note*: Asynchronous interaction with standard I/O can sometimes be tricky depending on
terminal behavior and whether the underlying OS handles are truly non-blocking. For 
complex interactive applications, dedicated terminal handling crates might be better.

* `tokio::io` provides the core asynchronous I/O traits (`AsyncRead`, `AsyncWrite`).
* You primarily interact with them via the convenient `.await`-able methods from
  `AsyncReadExt` and `AsyncWriteExt`.
* Utilities like `copy` simplify data transfer.
* `BufReader` and `BufWriter` improve performance for frequent small I/O operations
  by adding buffering. `BufReader` enables line-based reading via `AsyncBufReadExt`.
* `stdin`, `stdout`, `stderr` provide async access to standard process streams.
