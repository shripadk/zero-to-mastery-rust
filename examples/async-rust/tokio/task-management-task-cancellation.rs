use std::time::Duration;

use tokio::time::sleep;

async fn fast_task() -> &'static str {
    sleep(Duration::from_secs(1)).await;
    "Fast task won!"
}

async fn slow_task() -> &'static str {
    sleep(Duration::from_secs(2)).await;
    "Slow task lost!"
}

#[tokio::main]
async fn main() {
    let result = tokio::select! {
        res = fast_task() => res,
        res = slow_task() => res,
    };

    println!("{}", result);
}
