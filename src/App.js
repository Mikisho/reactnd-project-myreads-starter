import React from 'react'
// import * as BooksAPI from './BooksAPI'

import { Route } from 'react-router-dom';

import './App.css'

import SearchBooks from './components/SearchBooks';
import BooksList from './components/BooksList';

class BooksApp extends React.Component {
  state = {
  
  }

  render() {
    return (
      <div>
         <Route exact path = '/' component = {BooksList}/>
         <Route exact path = '/search' component = {SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
