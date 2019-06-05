import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI.js';
import './App.css';

import SHELVES from './estantes/shelves.js';
import ShelfContainer from './estantes/shelf-container.js';
import Busca from './busca/busca.js';

class App extends Component {
  
  state = {
    books: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })

    BooksAPI.getAll().then((books) => {
      this.setState({
        books,
        loading: false
      })
    })
  }

  updatedBook = (book, shelf) => {
    let allbooks = this.state.books
    let foundBook = allbooks.filter(myBook => myBook.id === book.id)

    if(foundBook.length){
      let books = allbooks.map(myBook => {
        if(myBook.id === book.id) {
          myBook.shelf = shelf
        }
        return myBook
      })
      
      this.setState({ books })
    }else{
      book.shelf = shelf
      allbooks.push(book)
      this.setState({ books: allbooks })
    }
  }

  renderShelf = shelf => {
    return <ShelfContainer key={shelf.flag} shelf={shelf.title} books={this.state.books.filter(book => book.shelf === shelf.flag)} updatedBook={this.updatedBook} />
  }

  render() {
    return (
      <Router>
        <div className="list-books">
          <div className="list-books-title">
            <h1>My Reads</h1>
          </div>

          <Route exact path='/' render={() => (
            <div className={`${this.state.loading ? "loading" : ""} content-wrapper`}>
              <div className="loader"></div>

              {this.state.books.length > 0 && (
                SHELVES.map(this.renderShelf)
              )}

              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>

          <Route path='/search' render={() => (
            <div className="content-wrapper">
              <Busca books={this.state.books} updatedBook={this.updatedBook} />
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
