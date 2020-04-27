import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import AddBtn from "../components/AddBtn"
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

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
        console.log("saved Book!");
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
          // console.log(res.data.items);
          res.data.items.forEach(bookItem => {
            console.log(bookItem)
            tempBooks.push({
              id: bookItem.id,
              title: bookItem.volumeInfo.title,
              author: bookItem.volumeInfo.authors,
              description: bookItem.volumeInfo.description,
              image: bookItem.volumeInfo.imageLinks.thumbnail,
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
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="12">
            <h1 className="border text-light text-center bg-info">Search Results</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    <img src={book.image} alt="book thumbnail"></img>
                    <a href={book.link}>
                      <strong>
                        {book.title} by {book.author.map((name, i) => <span key={i}>{name} </span>)}
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
