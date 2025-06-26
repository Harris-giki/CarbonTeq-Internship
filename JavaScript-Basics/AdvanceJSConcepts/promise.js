// promises are usually returned from the api interactions
// they either resolve or reject a certain async function
// it has three states: pending, fullfilled, rejected

// let promise = new promisr ((resolve, reject) => {
//    console.log("this is a promise");
//    reject("some error occured");
//    });

function processData(data, callback) {
  console.log("Processing: ", data);

  //simulate async work with setTimeOut
  setTimeout(() => {
    const result = data.toUpperCase();
    callback(result);
  }, 1000);
}

// now promises thus can be used as an alternate to callbacks
// to avoid callback hell
