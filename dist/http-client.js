"use strict";
/*Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of each "data" event from the response to a new line on the console (stdout).*/
const url = process.argv[2];
// const url = "http://example.com/";
const http = require("http");
http
    .get(url, (response) => {
    response.setEncoding("utf8"); //set response to string
    response.on("data", (chunk) => {
        //listen for data events and print them in parts (chunk)
        console.log(chunk);
    });
    response.on("error", (error) => {
        //listen error events
        console.error(error);
    });
})
    .on("error", (error) => {
    //handle network errors
    console.error(error);
});
