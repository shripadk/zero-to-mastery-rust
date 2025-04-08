use colored::Colorize;
use tokio::{
    fs::File,
    io::{AsyncBufReadExt, AsyncWriteExt, BufReader, BufWriter},
};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // --- BufReader ---
    tokio::fs::write("buffered_read.txt", "Line 1\nLine 2\nEnd").await?;
    let file_reader = File::open("buffered_read.txt").await?;
    let mut reader = BufReader::new(file_reader); // Wrap the file reader

    let mut line_buffer = String::new();

    // AsyncBufReadExt provides read_line
    println!("Reading lines with BufReader:");
    while reader.read_line(&mut line_buffer).await? > 0 {
        print!("  Read line: {}", line_buffer); // line_buffer includes '\n'
        line_buffer.clear(); // Clear buffer for the next line
    }
    println!("\nFinished reading lines.");

    // --- BufWriter ---
    let file_writer = File::create("buffered_write.txt").await?;
    let mut writer = BufWriter::new(file_writer); // Wrap the file writer

    writer.write_all(b"Buffered write 1.").await?;
    writer.write_all(b" Still buffered.").await?;
    // Data might not even be in the file yet!

    println!("Flushing BufWriter...");
    writer.flush().await?; // Force writing the buffer content to file
    println!("BufWriter flushed.");

    // Add more data
    writer
        .write_all(b" Another buffered write after flush.")
        .await?;
    // Need to flush again or shutdown the writer for this to be written

    // Shutting down the BufWriter using shutdown() flushes data written to it.
    writer.shutdown().await?;
    println!("BufWriter shutdown (implicit flush).");

    // Verify content
    let content = tokio::fs::read_to_string("buffered_write.txt").await?;
    println!("Buffered write file content:\n{}", content.color("green"));

    // Clean up
    tokio::fs::remove_file("buffered_read.txt").await?;
    tokio::fs::remove_file("buffered_write.txt").await?;

    Ok(())
}
