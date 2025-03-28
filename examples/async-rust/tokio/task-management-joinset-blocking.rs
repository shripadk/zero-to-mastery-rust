use std::time::{Duration, Instant};

use tokio::task::JoinSet;

struct FibResult {
    value: usize,
    result: usize,
    elapsed: Duration,
}

fn fib(v: usize) -> usize {
    match v {
        0 => 0,
        1 => 1,
        _ => fib(v - 1) + fib(v - 2),
    }
}

fn calculate_fib(value: usize) -> FibResult {
    let start = Instant::now();
    let result = fib(value);
    let elapsed = start.elapsed();

    FibResult {
        value,
        result,
        elapsed,
    }
}

#[tokio::main]
async fn main() {
    let mut set = JoinSet::new();

    for value in 0..=42 {
        set.spawn_blocking(move || calculate_fib(value));
    }

    while let Some(result) = set.join_next().await {
        match result {
            Ok(v) => {
                println!(
                    "fib({}) = {}. Took {:?}",
                    v.value, v.result, v.elapsed
                )
            }
            Err(err) => eprintln!("error: {}", err),
        }
    }
}
