import React from 'react';
import Book from './book.js';

const ShelfContainer = (props) => {
  return(
    <div className="shelves-wrapper">
      <div className="shelves-inner">
        <h2>{props.shelf}</h2>
        
        {!props.books.length && (
          <p className="text-warning">Sem livros nesta estante!</p>
        )}

        <ol className="listing">
          {props.books.map((book) => (
            <Book key={book.id} book={book} updatedBook={props.updatedBook} />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default ShelfContainer;