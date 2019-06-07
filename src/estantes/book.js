import React, { Component } from 'react';
import * as BooksAPI from './../BooksAPI.js';
import './book.css';

class Book extends Component {

  shelfChanger = (book) => (e) => {
    let shelf = e.target.value

    BooksAPI.update(book, shelf).then(() => {
      this.props.updatedBook(book, shelf)
    })
  }

  getShelfFlag = (shelf) => {
    return (!shelf) ? "none" : shelf
  }

  render() {
    const { book } = this.props

    return(
      <li>
        <div className="book">
            <div className={`book-avatar ${!book.imageLinks ? 'no-image' : ''}`} style={{backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ''}}></div>
            <div className="book-shelf-changer">
              
              <select defaultValue={this.getShelfFlag(book.shelf)} onChange={this.shelfChanger(book)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div><span>{this.getShelfFlag(book.shelf)}</span>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.author}</div>
        </div>
      </li>
    )
  }
}

export default Book;