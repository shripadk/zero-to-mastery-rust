use std::time::Duration;

use rand::random;
use tokio::{task::JoinSet, time::sleep};

struct TaskResult {
    id: usize,
    duration: Duration,
}

async fn task(id: usize) -> TaskResult {
    let millis = random::<u8>() as u64;
    let duration = Duration::from_millis(millis);

    sleep(duration).await;

    TaskResult { id, duration }
}

#[tokio::main]
async fn main() {
    let mut set = JoinSet::new();

    for id in 1..10 {
        set.spawn(task(id));
    }

    while let Some(result) = set.join_next().await {
        match result {
            Ok(value) => println!(
                "received from task: {}, slept for: {:?}",
                value.id, value.duration
            ),
            Err(err) => eprintln!("error: {}", err),
        }
    }
}
