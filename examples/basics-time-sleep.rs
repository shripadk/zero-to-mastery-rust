use tokio::time::{Duration, Instant, sleep};

#[tokio::main]
async fn main() {
    println!("Starting main task");
    let start = Instant::now();

    // We can spawn other tasks that run during the sleep
    tokio::spawn(async move {
        loop {
            // simulate some work
            sleep(Duration::from_millis(250)).await;
            println!(
                "Background task running while main task might be sleeping. Elapsed: {:?}",
                start.elapsed(),
            );
        }
    });

    // Pause execution of this task for 1000 milliseconds
    // without blocking the underlying thread.
    sleep(Duration::from_millis(1000)).await;

    println!("Slept for {:?}", start.elapsed());

    sleep(Duration::from_millis(50)).await;
    println!(
        "
Finished main task after: {:?}.
Will also implicitly abort the spawned task once main scope drops.",
        start.elapsed()
    );
}
