import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

const generateID = (function () {
  let id = 0;
  function newID() {
      return id++;
  }
  return {newID}
})();


const BookTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Pages</th>
          <th>Read</th>
          <th>Read?</th>
          <th>Remove?</th>
        </tr>
      </thead>
    </table>
  );
}

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      title: '',
      author: '',
      pages: '',
      read: false,
    };
    this.state = {...this.initialState};
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.bookSubmit = this.bookSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  bookSubmit(e) {
    e.preventDefault();
    this.props.addBook(this.state);
    this.resetForm();
  }

  resetForm() {
    this.setState({...this.initialState})
  }

  render() {
    return (
      <form onSubmit={this.bookSubmit}>
        <label>
          Title: 
          <input
            name='title'
            type='text'
            value={this.state.title}
            onChange={this.handleChange} 
            required/>
        </label>
        <label>
          Author:
          <input
            name='author'
            type='text'
            value={this.state.author}
            onChange={this.handleChange} />
        </label>
        <label>
          Pages:
          <input
            name='pages'
            type='number'
            value={this.state.pages}
            max='2000'
            onChange={this.handleChange} />
        </label>
        <label>
          Read: 
          <input
            name='read'
            type='checkbox'
            onChange={this.handleChange} />
        </label>
        <input 
          type='submit'
          value='Add Book' />
      </form>
    );
  }
}


class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.readToggle = this.readToggle.bind(this);
  }

  addBook(bookAdd) {
    bookAdd.id = generateID.newID();
    this.setState({books: [...this.state.books, bookAdd]})
  }

  removeBook(id) {
    const books = this.state;
    const updatedBooks = books.books.filter((book) => book.id !== id);
    this.setState({books: updatedBooks})
  }

  readToggle(id) {
    const books = this.state;
    const bookToToggle = books.book.filter((book) => book.id === id);
    bookToToggle.read = (bookToToggle.read)? false : true;
    this.addBook(bookToToggle);
  }

  render() {
    return (
      <div>
        <h1>My Library</h1>
        <BookForm addBook={this.addBook} />
        <BookTable />
      </div>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Library />
  </React.StrictMode>,
  document.getElementById('root')
);

