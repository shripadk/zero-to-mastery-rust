use std::time::Duration;

use tokio::time::sleep;

async fn task1() {
    sleep(Duration::from_secs(2)).await;
    println!("Task 1 completed")
}

async fn task2() {
    sleep(Duration::from_secs(1)).await;
    println!("Task 2 completed")
}

#[tokio::main]
async fn main() {
    let handle1 = tokio::spawn(task1());
    let handle2 = tokio::spawn(task2());

    let _ = tokio::join!(handle1, handle2);

    println!("all tasks completed!");
}
