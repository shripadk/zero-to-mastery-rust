use std::time::Duration;

use tokio::time::sleep;

async fn task1() -> &'static str {
    sleep(Duration::from_secs(3)).await;
    "Task 1 completed"
}

async fn task2() -> &'static str {
    sleep(Duration::from_secs(1)).await;
    "Task 2 completed"
}

#[tokio::main]
async fn main() {
    let (res1, res2) = tokio::join!(task1(), task2());
    println!("{}", res1);
    println!("{}", res2);
}
