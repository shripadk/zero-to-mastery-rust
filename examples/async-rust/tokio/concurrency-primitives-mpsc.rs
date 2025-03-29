use tokio::{sync::mpsc, task};

fn fib(n: usize) -> usize {
    match n {
        0 => 0,
        1 => 1,
        _ => fib(n - 1) + fib(n - 2),
    }
}

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(16);

    for i in 0..40 {
        let tx = tx.clone();
        tokio::spawn(async move {
            let v = task::spawn_blocking(move || fib(i)).await.unwrap();
            tx.send((i, v)).await.unwrap();
        });
    }

    // The `rx` half of the channel returns `None` once **all** `tx` clones
    // drop. However, the `tx` handle defined in the current/main task is not
    // utilized and continues to exist. So this `tx` handle must be dropped too.
    drop(tx);

    while let Some((i, v)) = rx.recv().await {
        println!("fib({}) = {}", i, v);
    }
}
