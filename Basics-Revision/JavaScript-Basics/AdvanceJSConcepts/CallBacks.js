// a function when passed as an argument to another function
// is called as a call back function

function processData(data, callback) {
  console.log("Processing: ", data);

  //simulate async work with setTimeOut
  setTimeout(() => {
    const result = data.toUpperCase();
    callback(result);
  }, 1000);
}

processData("hello", () => {
  processData("yo bro"),
    () => {
      processData("im good");
    };
});

// remember that using a callback inside another call back can
// lead to call back hell
