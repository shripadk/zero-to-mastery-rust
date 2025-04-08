use std::{sync::Arc, time::Duration};

use rand::random;
use tokio::{sync::Mutex, time::sleep};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Wrap data in Arc<Mutex<T>> for sharing across tasks
    let shared_data = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    println!("Mutex: Initial value = {}", *shared_data.lock().await);

    for i in 0..10 {
        let data_clone = Arc::clone(&shared_data);
        let handle = tokio::spawn(async move {
            // Aquire the lock asynchronously.
            // If the lock is held by another task, this .await yields.
            let mut num = data_clone.lock().await;
            println!("Task {} acquired lock", i);

            // MutexGuard (`num`) derefs to the inner data (&mut i32 here)
            *num += 1;
            println!("Task {} incremented value to: {}", i, *num);

            // Lock is released when `num` (the MutexGuard) goes out of scope
            let duration = random::<u8>() as u64;
            sleep(Duration::from_millis(duration)).await; // Hold lock briefly
            println!("Task {} releasing lock", i);
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.await?;
    }

    assert_eq!(*shared_data.lock().await, 10);

    Ok(())
}
