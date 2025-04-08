use tokio::{fs::File, io::AsyncReadExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create a dummy file
    tokio::fs::write("temp_read.txt", "Hello\nAsync World!").await?;

    // Open the file for reading
    let mut file = File::open("./temp_read.txt").await?;

    // --- Common read methods ---

    // 1. read(): Read some bytes into the buffer.
    //    Returns the number of bytes read (can be less than buffer size, or 0 for EOF)
    let mut buffer = [0u8; 10]; // 10-byte buffer
    let n = file.read(&mut buffer).await?;
    println!("Read {} bytes: {:?}", n, buffer);
    println!(
        "Text read is: {}",
        String::from_utf8(buffer.into()).unwrap()
    );

    // 2. read_to_end(): Read all remaining bytes into a Vec<u8>
    let mut remaining_data = Vec::new();
    let n_rem = file.read_to_end(&mut remaining_data).await?;
    println!("Read remaining {} bytes: {:?}", n_rem, remaining_data);
    println!(
        "Text read is: {}",
        String::from_utf8(remaining_data).unwrap()
    );
    // Note: File cursor is now at the end.

    // Re-open file to demonstrate other methods
    let mut file = File::open("./temp_read.txt").await?;

    // 3. read_to_string(): Read all remaining bytes into a String.
    let mut content = String::new();
    let n_str = file.read_to_string(&mut content).await?;
    println!("Read {} bytes into string:\n{}", n_str, content);
    // Output: Read 18 bytes into string:
    // Hello
    // Async World!

    // Re-open file
    let mut file = File::open("./temp_read.txt").await?;

    // 4. read_exact(): Read exactly N bytes into the buffer.
    //    Returns an error if EOF is reached before N bytes are read.
    let mut exact_buffer = [0u8; 5]; // Read exactly 5 bytes
    file.read_exact(&mut exact_buffer).await?;
    println!("Read exactly 5 bytes: {:?}", exact_buffer);
    println!(
        "Text read is: {}",
        String::from_utf8(exact_buffer.into()).unwrap()
    );
    file.read_exact(&mut exact_buffer).await?;
    println!("Read exactly 5 bytes: {:?}", exact_buffer);
    println!(
        "Text read is: {}",
        String::from_utf8(exact_buffer.into()).unwrap()
    );

    // Clean up
    tokio::fs::remove_file("./temp_read.txt").await?;

    Ok(())
}
