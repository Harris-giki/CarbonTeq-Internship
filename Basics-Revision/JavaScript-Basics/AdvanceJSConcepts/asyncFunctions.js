// JavaScript is single-threaded, meaning it can only do one thing at a time. Without asynchronous programming
// Async functions are the functions that take sometime to execute while JS skips past them until they are ready
// to finally execute them

// Synchronous
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third (in order)

// Asynchronous
console.log("First");
setTimeout(() => console.log("Second"), 1000);
console.log("Third");
// Output: First, Third, Second (after 1 second)
