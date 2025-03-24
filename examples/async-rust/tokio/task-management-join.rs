use std::time::Duration;

use tokio::time::sleep;

async fn task1() {
    sleep(Duration::from_secs(3)).await;
    println!("Task 1 completed")
}

async fn task2() {
    sleep(Duration::from_secs(1)).await;
    println!("Task 2 completed")
}

#[tokio::main]
async fn main() {
    let _ = tokio::join!(task1(), task2());
    println!("all tasks completed!");
}
