use std::time::{Duration, Instant};

use tokio::time::interval;

#[tokio::main]
async fn main() {
    println!("Starting interval example.");
    // Create an interval that ticks every 200 milliseconds.
    let mut interval = interval(Duration::from_millis(200));
    let start_time = Instant::now();
    let mut tick_count = 0;

    loop {
        // Wait for the next tick.
        interval.tick().await;
        tick_count += 1;
        println!("Tick {} at {:?}", tick_count, start_time.elapsed());

        if tick_count >= 5 {
            break;
        }
    }

    println!("Interval finished");
}
