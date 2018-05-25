import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import BooksShelf from './BooksShelf';
import shelfs from './shelfs';
import * as BooksAPI from '../utils/BooksAPI';

class BooksList extends Component {
  state = {
    currently_Reading: [],
    want_To_Read: [],
    read: [],
  };

  componentDidMount () {
    this.getAllBooks ();
  }

  getAllBooks () {
    BooksAPI.getAll ().then (books => {
      let currently_Reading = books.filter (book => {
        return book.shelf === shelfs.currentlyReading;
      });
      let want_To_Read = books.filter (book => {
        return book.shelf === shelfs.wantToRead;
      });
      let read = books.filter (book => {
        return book.shelf === shelfs.read;
      });

      this.setState ({
        currently_Reading,
        want_To_Read,
        read,
      });
    });
  }

  handleBookShelf (book, shelf) {
    BooksAPI.update (book, shelf).then (() => this.getAllBooks ());
  }

  displayShelf (books, title) {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map ((book, index) => (
              <BooksShelf
                key={index}
                book={book}
                handleBookShelf={this.handleBookShelf.bind (this)}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }

  render () {
    const {currently_Reading, want_To_Read, read} = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title"><h1>MyReads</h1></div>
        <div className="list-books-content">
          <div>
            {this.displayShelf (currently_Reading, 'Currently Reading')}
            {this.displayShelf (want_To_Read, 'Want to Read')}
            {this.displayShelf (read, 'Already Read')}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" > Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BooksList;
