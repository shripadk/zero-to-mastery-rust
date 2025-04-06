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

{{#playground ../../../examples/async-rust/tokio/io-asyncreadext.rs ignore}}

## `AsyncWriteExt` — Writing Data Asynchronously

{{#playground ../../../examples/async-rust/tokio/io-asyncwriteext.rs ignore}}
