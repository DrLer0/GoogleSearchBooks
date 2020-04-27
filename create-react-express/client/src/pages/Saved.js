import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";


class Saved extends Component {
  state = {
    books: []
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBooks()
      .then(res => {
        console.log(res.data);
        this.setState({ books: res.data })
    })
      .catch(err => console.log(err));
  }
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
          <h1 className="border text-light text-center bg-info">React Google Books</h1>
          </Col>
        </Row>
        <Row>
          <Col size="lg-2"></Col>
          <Col size="lg-8 sm-12">
          <h1 className="border text-light text-center bg-info">Saved Books</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <img src={book.image} alt="book thumbnail"></img>
                    <a href={book.link}>
                      <strong>
                        {book.title} by {book.author.map((name, i) => <span key={i}>{name} </span>)}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => {
                      this.deleteBook(book._id)
                      // console.log(book._id);
                    }
                  } />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
