#[tokio::main]
async fn main() {
    let mut count = 0;

    loop {
        tokio::select! {
            biased;
            _ = async {}, if count < 1 => {
                count += 1;
                assert_eq!(count, 1);
            }
            _ = async {}, if count < 2 => {
                count += 1;
                assert_eq!(count, 2);
            }
            _ = async {}, if count < 3 => {
                count += 1;
                assert_eq!(count, 3);
            }
            else => {
                count += 1;
                assert_eq!(count, 4);
                break;
            }
        };
    }

    assert_eq!(count, 4);
    println!("completed successfully with count: {count}");
}
