import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './../BooksAPI.js';

import Book from './../estantes/book.js';
import './busca.css';

class Busca extends Component {

  state = {
    allBooks: [],
    loading: false,
    isEmpty: false
  }

  onSearch = (event) => {
    let value = event.target.value.trim()

    if(value){
      this.getAllBooks(value)
    }else{ 
      this.setState({ allBooks: [] })
    }
  }

  getAllBooks = (query) => {
    this.setState({ loading: true })

    BooksAPI.search(query, 20).then((books) => {
      if(!books.error) {
        let allBooks = books.map(book => {
          let foundMyBook = this.props.books.filter(myBook => book.id === myBook.id)[0]
          if(foundMyBook){
            book.shelf = foundMyBook.shelf
          }
          return book
        })

        this.setState({
          allBooks,
          loading: false,
          isEmpty: false
        })
      }else{
        this.setState({
          allBooks: [],
          loading: false,
          isEmpty: true
        })
      }
    })
  }

  updatedBook = () => {
    this.props.updatedBook()
  }

  render() {
    return(
      <div className="search-wrapper">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearch}
            />
          </div>
        </div>

        {this.state.isEmpty && (
          <p className="text-warning">Not found</p>
        )}

        <ol className={`${this.state.loading ? "loading" : ""} listing`}>
          <li className="loader"></li>
          {this.state.allBooks.map((book) => (
            <Book key={book.id} book={book} updatedBook={this.props.updatedBook} />
          ))}
        </ol>
      </div>
    )
  }
}

export default Busca;