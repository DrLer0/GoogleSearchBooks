import axios from "axios";
import config from "./config.js";

export default {
  // Gets all books
  searchBooks: function(query) {
    const queryString = query.query.replace(/\s/g, "+");
    console.log(config);
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+queryString+"&key="+config.BOOKS_KEY);
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
