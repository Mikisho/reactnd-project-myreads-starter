import React, {Component} from 'react';

import {Link} from 'react-router-dom';

import * as BooksAPI from '../utils/BooksAPI';

import '../App.css';
import BooksShelf from './BooksShelf';

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
  };

  handleQueryChange = query => {
    BooksAPI.search (query).then (
      books => (books ? this.setState ({books}) : [])
    );
    this.setState ({
      query,
    });
  };

  handleBookShelf (book, shelf) {
    BooksAPI.update (book, shelf)
      .then (
        () =>
          shelf !== 'none'
            ? alert (`${book.title} succesfully added to shelf!`)
            : null
      )
      .catch (() => alert ('error occured'));
  }

  displaySearcResults () {
    const {books, query} = this.state;

    if (query) {
      return books.error
        ? <div>search not found</div>
        : books.map ((book, index) => {
            return (
              <BooksShelf
                key={index}
                book={book}
                handleBookShelf={this.handleBookShelf.bind (this)}
              />
            );
          });
    }
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.handleQueryChange (event.target.value)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.handleQueryChange (event.target.value);
                }
              }}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.displaySearcResults ()}
          </ol>
        </div>

      </div>
    );
  }
}

export default SearchBooks;
