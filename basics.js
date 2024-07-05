// console.log("Server file is running!");

// function add(a,b){
//     return a+b;
// }

// const add = function(a,b){
//     return a+b;
// }

// const add = (a,b) => {
//     return a+b;
// }

// const add = (a,b)=> a+b;

// const result = add(2876,76);
// console.log(result);

// Immediately Invoked Function Expression- IIFE

// (function(){
//     console.log("Akshay");
// })();


// CALLBACK FUNCTION
/*
function callback(){
    console.log("Adding succesfully completed!");
}

function add(a,b,callback){
    const result = a+b;
    console.log("Result = " + result);  // Main function work complete
    callback();
}

add(2,3, callback);
*/

// function add(a, b, callback) {
//     const result = a + b;
//     console.log("Result = " + result);  // Main function work complete
//     callback();
// }

// add(2,3, ()=> console.log("Added Succesfully!"));

// FILE SYSTEM AND OS MODULES OF NODEJS

// const fs = require('fs');
// const os = require('os');

// const user = os.userInfo();
// fs.appendFile("greetings.txt", "Hello " + user.username + "y!\n", () => console.log("File created"));

// console.log(user);

// FS.READFILE

// fs.readFile("server.js", (err, data) => {
//     if (err) {
//         console.log("Error reading the file: ", err);
//         return;
//     }
//     console.log("File content : " + data);
// });


// console.log("Hello Ji HEllo");

// IMPORTING FILES

// const notes = require('./notes.js')

// console.log("Server file is available");
// const age = notes.age;
// console.log(age);
// const result = notes.addNumber(age,18);
// console.log("Result : " + result);


// LODASH PACKAGE -- Helps deal with data.

// var _ = require('lodash');
// const data = [1,2,3,4,2,3,'ram', 2, 'ram'];

// const filteredData = _.uniq(data);
// console.log(filteredData);
// console.log(_.chunk(filteredData,2));
// console.log(_.compact([0,1,2,3,false, null, undefined, 34, 'ramu']));   // removes falsy values from an array


// JSON

// const jsonString = '{ "name": "Jhon", "age": 28, "city": "New York" }'
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);
// const jsonObjectToString = JSON.stringify(jsonObject);
// console.log(jsonObjectToString);

// console.log(typeof(jsonObject));