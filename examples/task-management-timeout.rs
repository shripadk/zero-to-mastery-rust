use std::time::Duration;

use tokio::time::{sleep, timeout};

async fn long_running_task() -> &'static str {
    sleep(Duration::from_secs(5)).await;
    "Finally completed the task!"
}

#[tokio::main]
async fn main() {
    let result = timeout(Duration::from_secs(2), long_running_task()).await;
    match result {
        Ok(value) => println!("{}", value),
        Err(err) => eprintln!("{}", err),
    }
}
