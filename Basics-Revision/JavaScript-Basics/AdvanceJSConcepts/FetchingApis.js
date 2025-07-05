const URL = "https://cat-fact.herokuapp.com/facts"; //Api's url

const getFacts = async () => {
  let response = await fetch(URL);
  console.log(response);

  // converting retrieved data into useable data

  let data = await response.json();
  console.log(data[0]);
};

// used an async function to use await as api calling can take some time
// fetch function thus returns a promise in JS
