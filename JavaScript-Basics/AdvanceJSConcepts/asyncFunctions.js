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
