use std::time::Duration;

use rand::random;
use tokio::{sync::oneshot, time::sleep};

#[derive(Debug)]
enum Status {
    Completed(Duration),
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let (tx, rx) = oneshot::channel();

    tokio::spawn(async move {
        println!("entering task! sleeping...");

        let duration = Duration::from_millis(random::<u8>() as u64);
        sleep(duration).await;

        tx.send(Status::Completed(duration)).unwrap();
    });

    let res = rx.await?;
    match res {
        Status::Completed(duration) => println!("completed in: {:?}", duration),
    }

    Ok(())
}
