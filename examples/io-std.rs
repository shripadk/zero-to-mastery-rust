use tokio::io::{self, AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let mut stdout = io::stdout(); // Get handle to stdout
    let mut stdin = io::stdin(); // Get handle to stdin

    stdout.write_all(b"Please enter your name: ").await?;
    stdout.flush().await?; // Ensure prompt is displayed

    let mut name_buf = Vec::with_capacity(1024); // Simple fixed-size buffer
    let n = stdin.read_buf(&mut name_buf).await?; // Read from stdin

    println!("Read: {} bytes", n);
    
    stdout.write_all(b"Hello, ").await?;
    stdout.write_all(&name_buf).await?; // Write back the input (including newline)
    stdout.flush().await?;

    Ok(())
}
