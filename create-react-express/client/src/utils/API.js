import axios from "axios";
import config from "./config.js";

export default {
  // Gets all books
  searchBooks: function(query) {
    let apiKey = "";
    if (typeof process.env.BOOKS_KEY == "undefined") {
      apiKey = config.BOOKS_KEY;
    }
    else{
      apiKey = process.env.BOOKS_KEY;
    }
    const queryString = query.query.replace(/\s/g, "+");
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+queryString+"&key="+apiKey);
  },
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
