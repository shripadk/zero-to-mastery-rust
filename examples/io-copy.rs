use tokio::{fs::{self, File}, io};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create source and destination files
    let source_content = b"Data to be copied asynchronously.";
    tokio::fs::write("source.txt", source_content).await?;
    let mut source_file = File::open("source.txt").await?;
    let mut dest_file = File::create("destination.txt").await?;

    println!("Starting copy...");
    let bytes_copied = io::copy(&mut source_file, &mut dest_file).await?;
    println!("Copied {} bytes.", bytes_copied);

    // Verify
    let dest_content = fs::read("destination.txt").await?;
    assert_eq!(source_content, &dest_content[..]);
    println!("Copy verified.");

    // Clean up
    fs::remove_file("source.txt").await?;
    fs::remove_file("destination.txt").await?;

    Ok(())
}
