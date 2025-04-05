use std::time::Duration;

use tokio::time::{sleep, timeout};

pub async fn long_running_operation() -> &'static str {
    println!("Long operation started...");
    sleep(Duration::from_millis(500)).await;
    println!("Long running operation finished.");
    "operation successful"
}

#[tokio::main]
async fn main() {
    println!("Testing timeout (100ms limit):");
    // Try to run the operation with a 100ms timeout.
    match timeout(Duration::from_millis(100), long_running_operation()).await {
        Ok(result) => {
            println!("Completed within timeout: {}", result);
        },
        Err(_) => {
            println!("Operation timed out");
        }
    }

    println!("\nTesting timeout (1000ms limit):");
    // Try again with a longer timeout.
    match timeout(Duration::from_millis(1000), long_running_operation()).await {
        Ok(result) => {
            println!("Completed within timeout: {}", result);
        },
        Err(_) => {
            println!("Operation timed out! (This shouldn't happen)");
        }
    }
}
