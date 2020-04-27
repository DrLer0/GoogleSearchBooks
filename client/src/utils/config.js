import React from "react";

let apiKey ="";

if (typeof process.env.BOOKS_KEY == "undefined") {
  apiKey = 'AIzaSyDf7tmSasmGFGiKLwSVVFAtWHezHX03D_M';
}
else{
  apiKey = process.env.BOOKS_KEY;
}
var conifg = {
  BOOKS_KEY: apiKey
}


export default conifg;