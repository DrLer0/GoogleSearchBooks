import React, { Component } from "react";
import AddBtn from "../components/AddBtn"
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: ""
  };

  componentDidMount() {
    // this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", description: "", image: "", link:"" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveGoogleBook = (book) => {
    API.saveBook({
      title: book.title,
      author: book.author,
      description: book.description,
      image: book.image,
      link: book.link
    })
      .then(res => {
        // this.loadBooks()
        alert(book.title+" Saved!");
      })
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchBooks({
        query: this.state.title
      })
        .then(res => {
          let tempBooks = [];
          let imgURL = ""
          // console.log(res.data.items);
          res.data.items.forEach(bookItem => {
            console.log(bookItem)
            if(typeof bookItem.volumeInfo.imageLinks == "undefined"){
              imgURL = require("../utils/missingBook.png");
            }
            else{
              imgURL = bookItem.volumeInfo.imageLinks.thumbnail;
            }
            tempBooks.push({
              id: bookItem.id,
              title: bookItem.volumeInfo.title,
              author: bookItem.volumeInfo.authors,
              description: bookItem.volumeInfo.description,
              image: imgURL,
              link: bookItem.volumeInfo.previewLink
            })
          });
          console.log(tempBooks);
          this.setState({books: tempBooks, title: ""});
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <h1 className="border text-light text-center bg-info">React Google Books</h1>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="lg-2"></Col>
          <Col size="lg-8 sm-12">
            <h1 className="border text-light text-center bg-info">Search Results</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    <img src={book.image} alt="book thumbnail"></img>
                    <a href={book.link}>
                      <strong>
                      {book.title} by {book.author.length > 1 ?
                        (book.author.map((name, i) => <span key={i}>{name} </span>)) :
                        book.author
                      }
                      </strong>
                    </a>
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                    <AddBtn onClick={() => {
                      this.saveGoogleBook(book);
                      // console.log(book);
                      }}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
