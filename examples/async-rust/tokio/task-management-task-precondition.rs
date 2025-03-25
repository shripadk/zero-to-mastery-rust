use std::time::Duration;

use tokio::time::sleep;

async fn task1() -> &'static str {
    println!("inside task 1");
    sleep(Duration::from_secs(2)).await;
    "Task 1 completed"
}

async fn task2() -> &'static str {
    println!("inside task 2");
    sleep(Duration::from_secs(1)).await;
    "Task 2 completed"
}

#[tokio::main]
async fn main() {
    let run_task2 = false;

    let handle1 = tokio::spawn(task1());
    let handle2 = tokio::spawn(task2());

    let result = tokio::select! {
        res = handle1 => res,
        // NOTE: Branch is disabled as run_task2 is set to `false`.
        //       However, the async expression is still evaluated
        //       but future is not polled.
        res = handle2, if run_task2 => res,
    };

    match result {
        Ok(value) => println!("received (run_task2 = false): {}", value),
        Err(err) => eprintln!("{}", err),
    }

    println!("---");

    let run_task2 = true;

    let handle1 = tokio::spawn(task1());
    let handle2 = tokio::spawn(task2());

    let result = tokio::select! {
        res = handle1 => res,
        // NOTE: Branch is enabled as run_task2 is set to `true`.
        //       So async expression is evaluated and future polled.
        res = handle2, if run_task2 => res,
    };

    match result {
        Ok(value) => println!("received (run_task2 = true): {}", value),
        Err(err) => eprintln!("{}", err),
    }
}
