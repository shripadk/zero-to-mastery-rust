use std::time::Duration;

use tokio::time::sleep;

#[tokio::main]
async fn main() {
    let task1 = tokio::spawn(async {
        sleep(Duration::from_secs(2)).await;
        println!("Task 1 done!");
    });

    let task2 = tokio::spawn(async {
        sleep(Duration::from_secs(1)).await;
        println!("Task 2 done!");
    });

    task1.await.unwrap();
    task2.await.unwrap();

    println!("All tasks done!");
}
