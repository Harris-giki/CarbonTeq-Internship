// async and await are built on top of promises to make
// async coding easier with a cleaner and easier to understand code

// Step 1: processData now returns a Promise
function processData(data) {
  console.log("Processing:", data);

  return new Promise((resolve) => {
    setTimeout(() => {
      const result = data.toUpperCase();
      resolve(result);
    }, 1000); // simulate 1-second async work
  });
}

// Step 2: Define an async function to use await
async function run() {
  try {
    const result1 = await processData("hello");
    console.log("Result 1:", result1); // HELLO

    const result2 = await processData("yo bro");
    console.log("Result 2:", result2); // YO BRO

    const result3 = await processData("im good");
    console.log("Result 3:", result3); // IM GOOD
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Step 3: Call the async function to run the flow
run();
