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

  handleUpdateQuery = query => {
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
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.handleUpdateQuery (event.target.value)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.handleUpdateQuery (event.target.value);
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
