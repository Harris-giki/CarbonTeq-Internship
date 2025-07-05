// promises are usually returned from the api interactions
// they either resolve or reject a certain async function
// it has three states: pending, fullfilled, rejected

// let promise = new promisr ((resolve, reject) => {
//    console.log("this is a promise");
//    reject("some error occured");
//    });

function processData(data) {
  console.log("Processing:", data);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = data.toUpperCase();
      resolve(result); // success
    }, 1000);
  });
}

// now promises thus can be used as an alternate to callbacks
// to avoid callback hell

processData("hello")
  .then((result) => {
    console.log("Result:", result); // Output after 1 second
    return processData("world");
  })
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
