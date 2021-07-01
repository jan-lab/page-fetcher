const fs = require('fs'); //to write the file
const request = require('request');
const args = process.argv.slice(2);

request(args[0], (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  //const content = `error: ${error}\nstatusCode: ${response.statusCode}\n\n${body}`; //seems to take only string data type..

  const content = body;
  fs.writeFile(args[1], content, err => {
    if (err) {
      console.error(err);
      return;
    }
    let size;
    fs.stat(args[1], (err, stats) => { //this needed to be callback in order for the size to calculate after file is written
      size = stats.size;
      console.log(`Downloaded and saved ${size} bytes to ${args[1]}`);
    });
  });
});

//Expected output on terminal
//> node fetcher.js http://www.example.edu/ ./index.html
//Downloaded and saved 3261 bytes to ./index.html
