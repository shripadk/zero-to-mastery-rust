use colored::Colorize;
use tokio::{fs::File, io::AsyncWriteExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Open file for writing (create if not exists, truncate if exists)
    let mut file = File::create("temp_write.txt").await?;

    // --- Common write methods ---

    // 1. write(): Write some bytes from a buffer.
    //    Returns the number of bytes written (can be less than the buffer size)
    let data = b"First line\n";
    let n = file.write(data).await?;
    println!("Wrote {} bytes (attempted {})", n, data.len());

    // 2. write_all(): Write the entire buffer.
    //    Handles short writes internally by looping until all bytes are written.
    let data = b"Second line, all of it!\n";
    file.write_all(data).await?;
    println!("Wrote all {} bytes", data.len());

    // 3. flush(): Ensure all buffered data is written to the underlying sink.
    //    Important for buffered writers or some OS-level buffering.
    file.flush().await?;
    println!("Flushed the writer.");

    // Verify content (optional)
    let content = tokio::fs::read_to_string("temp_write.txt").await?;
    println!(
        "\nFile content:
=============\n{}",
        content.trim().color("green")
    );

    // Clean up
    tokio::fs::remove_file("temp_write.txt").await?;

    Ok(())
}
