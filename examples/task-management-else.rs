use std::time::Duration;

use tokio::time::sleep;

async fn task1() -> &'static str {
    println!("in task 1");
    sleep(Duration::from_secs(2)).await;
    "Task 1 completed"
}

async fn task2() -> &'static str {
    println!("in task 2");
    sleep(Duration::from_secs(1)).await;
    "Task 2 completed"
}

async fn task3() -> &'static str {
    println!("in task 3");
    sleep(Duration::from_secs(3)).await;
    "Task 3 completed"
}

#[tokio::main]
async fn main() {
    let handle1 = tokio::spawn(task1());
    let handle2 = tokio::spawn(task2());
    let handle3 = tokio::spawn(task3());

    let task_enabled = 3;

    let result = tokio::select! {
        res = handle1, if task_enabled == 1 => res,
        res = handle2, if task_enabled == 2 => res,
        else => handle3.await,
    };

    match result {
        Ok(value) => println!("{}", value),
        Err(err) => eprintln!("{}", err),
    }

    println!("all tasks completed!")
}
