use std::time::Duration;

use tokio::time::sleep;

async fn successful_task() -> &'static str {
    sleep(Duration::from_secs(2)).await;
    "Task succeeded"
}

async fn failing_task() -> &'static str {
    sleep(Duration::from_secs(1)).await;
    panic!("Task failed!");
}

#[tokio::main]
async fn main() {
    let handle1 = tokio::spawn(successful_task());
    let handle2 = tokio::spawn(failing_task());
    let result1 = handle1.await;
    let result2 = handle2.await;
    
    match result1 {
        Ok(value) => println!("{}", value),
        Err(err) => eprintln!("{}", err)
    }
    
    match result2 {
        Ok(value) => println!("{}", value),
        Err(err) => eprintln!("{}", err)
    }

    println!("All tasks completed (even if some failed)");
}
