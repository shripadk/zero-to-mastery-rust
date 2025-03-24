Object.assign(window.search, {"doc_urls":["async-rust/tokio/introduction.html#tokio","async-rust/tokio/basics.html#basics","async-rust/tokio/basics.html#understanding-async-and-await-in-tokio","async-rust/tokio/task-management.html#task-management","async-rust/tokio/task-management.html#spawning-concurrent-tasks-in-tokio"],"index":{"documentStore":{"docInfo":{"0":{"body":0,"breadcrumbs":2,"title":1},"1":{"body":0,"breadcrumbs":3,"title":1},"2":{"body":83,"breadcrumbs":6,"title":4},"3":{"body":0,"breadcrumbs":5,"title":2},"4":{"body":34,"breadcrumbs":7,"title":4}},"docs":{"0":{"body":"","breadcrumbs":"Tokio » Tokio","id":"0","title":"Tokio"},"1":{"body":"","breadcrumbs":"Tokio » Basics » Basics","id":"1","title":"Basics"},"2":{"body":"Tokio is an asynchronous runtime for Rust, built on top of Rust's async and await syntax. Let us start with a simple example of an async function inside a Tokio runtime. use std::time::Duration; use tokio::time::sleep; #[tokio::main]\nasync fn main() { println!(\"before sleep\"); sleep(Duration::from_secs(1)).await; println!(\"after sleep\");\n} Let us breakdown what is happening in the code above: #[tokio::main] initializes the Tokio runtime. sleep(Duration::from_secs(1)).await makes the task pause asynchronously without blocking the thread. The program prints messages before and after sleep. Some important points to keep in mind: Tokio's sleep operates at millisecond granularity and must not be used for tasks that require high-resolution timers. Implementation is platform specific and some platforms, like Windows, provide timers with larger resolution than 1 ms. Maximum duration for a sleep is 2.2 years.","breadcrumbs":"Tokio » Basics » Understanding async and await in Tokio","id":"2","title":"Understanding async and await in Tokio"},"3":{"body":"","breadcrumbs":"Tokio » Task Management » Task Management","id":"3","title":"Task Management"},"4":{"body":"Tokio allows you to run multiple asynchronous tasks concurrently using tokio::spawn. use std::time::Duration; use tokio::time::sleep; #[tokio::main]\nasync fn main() { let task1 = tokio::spawn(async { sleep(Duration::from_secs(2)).await; println!(\"Task 1 done!\"); }); let task2 = tokio::spawn(async { sleep(Duration::from_secs(1)).await; println!(\"Task 2 done!\"); }); task1.await.unwrap(); task2.await.unwrap(); println!(\"All tasks done!\");\n}","breadcrumbs":"Tokio » Task Management » Spawning Concurrent Tasks in Tokio","id":"4","title":"Spawning Concurrent Tasks in Tokio"}},"length":5,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"1":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}},"2":{".":{"2":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}},"a":{"b":{"df":0,"docs":{},"o":{"df":0,"docs":{},"v":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"c":{"df":2,"docs":{"2":{"tf":2.0},"4":{"tf":1.0}},"h":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"4":{"tf":1.0}}}}}}},"df":0,"docs":{}}}},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"b":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"i":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"l":{"df":0,"docs":{},"o":{"c":{"df":0,"docs":{},"k":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"k":{"d":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"u":{"df":0,"docs":{},"i":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"c":{"df":0,"docs":{},"o":{"d":{"df":0,"docs":{},"e":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{},"n":{"c":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}}}}},"df":0,"docs":{}}}},"d":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}},"u":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}},"f":{"df":0,"docs":{},"n":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}},"u":{"df":0,"docs":{},"n":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{}}}},"g":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"h":{"a":{"df":0,"docs":{},"p":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"g":{"df":0,"docs":{},"h":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.0}}}}},"s":{"df":0,"docs":{},"i":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}}},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"l":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"g":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{}},"m":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}}},"k":{"df":0,"docs":{},"e":{"df":1,"docs":{"2":{"tf":1.0}}}},"n":{"a":{"df":0,"docs":{},"g":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}},"x":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"u":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"a":{"df":0,"docs":{},"g":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}},"i":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"df":0,"docs":{},"s":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}}},"n":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}},"s":{"df":1,"docs":{"2":{"tf":1.0}}},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"4":{"tf":1.0}}}}}}}}},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"p":{"a":{"df":0,"docs":{},"u":{"df":0,"docs":{},"s":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}}}},"df":0,"docs":{}},"o":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}},"l":{"df":0,"docs":{},"n":{"!":{"(":{"\"":{"a":{"df":0,"docs":{},"f":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}},"l":{"df":1,"docs":{"4":{"tf":1.0}}}},"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"k":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"o":{"df":0,"docs":{},"g":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}},"v":{"df":0,"docs":{},"i":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"q":{"df":0,"docs":{},"u":{"df":0,"docs":{},"i":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}}}},"u":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.7320508075688772}}}}}},"s":{"df":0,"docs":{},"t":{"'":{"df":1,"docs":{"2":{"tf":1.0}}},"df":1,"docs":{"2":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"(":{"d":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{":":{":":{"df":0,"docs":{},"f":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"_":{"df":0,"docs":{},"s":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"s":{"(":{"1":{")":{")":{".":{"a":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"4":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"2":{")":{")":{".":{"a":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":1,"docs":{"2":{"tf":2.23606797749979}}}}}},"p":{"a":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"i":{"df":0,"docs":{},"f":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}}},"t":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}},"d":{":":{":":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{":":{":":{"d":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"y":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"x":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}}},"t":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"k":{"1":{".":{"a":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{".":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"w":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"p":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}},"2":{".":{"a":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{".":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"w":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"p":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}},"df":3,"docs":{"2":{"tf":1.4142135623730951},"3":{"tf":1.0},"4":{"tf":1.7320508075688772}}}}},"df":0,"docs":{},"h":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"a":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}},"o":{"df":0,"docs":{},"k":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"'":{"df":1,"docs":{"2":{"tf":1.0}}},":":{":":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"4":{"tf":1.0}}}}},"df":0,"docs":{}},"s":{"df":0,"docs":{},"p":{"a":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"(":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"c":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}},"df":0,"docs":{}}}}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}}},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{":":{":":{"df":0,"docs":{},"s":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":3,"docs":{"0":{"tf":1.0},"2":{"tf":2.0},"4":{"tf":1.4142135623730951}}}}},"p":{"df":1,"docs":{"2":{"tf":1.0}}}}},"u":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"s":{"df":2,"docs":{"2":{"tf":1.7320508075688772},"4":{"tf":1.7320508075688772}}}},"w":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}},"t":{"df":0,"docs":{},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}}},"y":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}}},"breadcrumbs":{"root":{"1":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}},"2":{".":{"2":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}},"a":{"b":{"df":0,"docs":{},"o":{"df":0,"docs":{},"v":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"c":{"df":2,"docs":{"2":{"tf":2.23606797749979},"4":{"tf":1.0}},"h":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"4":{"tf":1.0}}}}}}},"df":0,"docs":{}}}},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.7320508075688772}}}}},"df":0,"docs":{}}},"b":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"i":{"c":{"df":2,"docs":{"1":{"tf":1.7320508075688772},"2":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"l":{"df":0,"docs":{},"o":{"c":{"df":0,"docs":{},"k":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"k":{"d":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"u":{"df":0,"docs":{},"i":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"c":{"df":0,"docs":{},"o":{"d":{"df":0,"docs":{},"e":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{},"n":{"c":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}},"df":0,"docs":{}}}},"d":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}},"u":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}},"f":{"df":0,"docs":{},"n":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}},"u":{"df":0,"docs":{},"n":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{}}}},"g":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"h":{"a":{"df":0,"docs":{},"p":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"g":{"df":0,"docs":{},"h":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.0}}}}},"s":{"df":0,"docs":{},"i":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}}},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"l":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"g":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{}},"m":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}}},"k":{"df":0,"docs":{},"e":{"df":1,"docs":{"2":{"tf":1.0}}}},"n":{"a":{"df":0,"docs":{},"g":{"df":2,"docs":{"3":{"tf":1.7320508075688772},"4":{"tf":1.0}}}},"df":0,"docs":{}},"x":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"u":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"a":{"df":0,"docs":{},"g":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}},"i":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"df":0,"docs":{},"s":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}}},"n":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}},"s":{"df":1,"docs":{"2":{"tf":1.0}}},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"4":{"tf":1.0}}}}}}}}},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"p":{"a":{"df":0,"docs":{},"u":{"df":0,"docs":{},"s":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}}}},"df":0,"docs":{}},"o":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}},"l":{"df":0,"docs":{},"n":{"!":{"(":{"\"":{"a":{"df":0,"docs":{},"f":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}},"l":{"df":1,"docs":{"4":{"tf":1.0}}}},"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"k":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"o":{"df":0,"docs":{},"g":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}},"v":{"df":0,"docs":{},"i":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"q":{"df":0,"docs":{},"u":{"df":0,"docs":{},"i":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}}}},"u":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.7320508075688772}}}}}},"s":{"df":0,"docs":{},"t":{"'":{"df":1,"docs":{"2":{"tf":1.0}}},"df":1,"docs":{"2":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"(":{"d":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{":":{":":{"df":0,"docs":{},"f":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"_":{"df":0,"docs":{},"s":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"s":{"(":{"1":{")":{")":{".":{"a":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"4":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"2":{")":{")":{".":{"a":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":1,"docs":{"2":{"tf":2.23606797749979}}}}}},"p":{"a":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"i":{"df":0,"docs":{},"f":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}}},"t":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}},"d":{":":{":":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{":":{":":{"d":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"y":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"x":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}}},"t":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"k":{"1":{".":{"a":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{".":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"w":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"p":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}},"2":{".":{"a":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{".":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"w":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"p":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}},"df":3,"docs":{"2":{"tf":1.4142135623730951},"3":{"tf":1.7320508075688772},"4":{"tf":2.23606797749979}}}}},"df":0,"docs":{},"h":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"a":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}},"o":{"df":0,"docs":{},"k":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"'":{"df":1,"docs":{"2":{"tf":1.0}}},":":{":":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"4":{"tf":1.0}}}}},"df":0,"docs":{}},"s":{"df":0,"docs":{},"p":{"a":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"(":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"c":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}},"df":0,"docs":{}}}}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}}},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{":":{":":{"df":0,"docs":{},"s":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":2,"docs":{"2":{"tf":1.0},"4":{"tf":1.0}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":5,"docs":{"0":{"tf":1.7320508075688772},"1":{"tf":1.0},"2":{"tf":2.449489742783178},"3":{"tf":1.0},"4":{"tf":2.0}}}}},"p":{"df":1,"docs":{"2":{"tf":1.0}}}}},"u":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"s":{"df":2,"docs":{"2":{"tf":1.7320508075688772},"4":{"tf":1.7320508075688772}}}},"w":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}},"t":{"df":0,"docs":{},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}}},"y":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":1.0}}}},"df":0,"docs":{}}}}},"title":{"root":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"c":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}},"w":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}}},"b":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"i":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"c":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"n":{"a":{"df":0,"docs":{},"g":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"s":{"df":0,"docs":{},"p":{"a":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}}},"t":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"k":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.0}}}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"k":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":3,"docs":{"0":{"tf":1.0},"2":{"tf":1.0},"4":{"tf":1.0}}}}}}},"u":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}},"lang":"English","pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":30,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});