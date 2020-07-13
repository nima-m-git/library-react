import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {generateID} from './generateID';


/* TODO:
- media query, fix element crunch
- add localstorage / backend db
- order-by choice for table
*/


const BookTable = (props) => {
  const renderTableData = () => {
    return props.books.map((book) => {
      const {title, author, pages, read, id,} = book;

      console.log({id, title})

      return (
        <tr key={id}>
          <td>{title}</td>
          <td>{author}</td>
          <td>{pages}</td>
          <td>{read}</td>
          <td>
            <button onClick={() => props.readToggle(id)}>read?</button>
          </td>
          <td>
            <button onClick={() => props.removeBook(id)}>remove?</button>
          </td>
        </tr>
      )
    })

  }
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
      <tbody>
        {renderTableData()}
      </tbody>
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
      read: 'no',
    };
    this.state = {
      ...this.initialState,
    };
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
    this.setState({
      id: (new Date()).getTime(),
    })
    this.props.addBook(this.state);
    this.resetForm();
  }

  resetForm() {
    this.setState({...this.initialState})
  }

  render() {
    return (
      <form id='new-book' onSubmit={this.bookSubmit}>
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
          <select
            name='read'
            type='checkbox'
            value={this.state.read}
            onChange={this.handleChange} >
            <option value='no'>No</option>
            <option value='yes'>Yes</option>
          </select>
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
    this.getBooks = () => Object.values(localStorage).map(book => JSON.parse(book));
    this.state = {
      books: this.getBooks(),
    }
    this.updateStorage = this.updateStorage.bind(this);
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.readToggle = this.readToggle.bind(this);
  }

  updateUI() {
    this.setState({
      books: this.getBooks()
    })
  }

  updateStorage(book){
    localStorage.setItem(book.id, JSON.stringify(book));
    this.updateUI()
  }

  addBook(bookToAdd) {
    this.updateStorage(bookToAdd);
  }

  removeBook(id) {
    localStorage.removeItem(id);
    // const updatedBooks = this.state.books.filter((book) => book.id !== id);
    // this.setState({books: updatedBooks})
    this.updateUI()
  }

  readToggle(id) {
    const book = JSON.parse(localStorage.getItem(id));
    book.read = (book.read === "yes") ? "no" : "yes";
    this.updateStorage(book)


    // const books = [...this.state.books];
    // const index = books.findIndex(book => book.id === id);
    // books[index].read = (books[index].read === 'yes')? 'no' : 'yes';

    // this.setState({
    //   books,
    // })
  }

  getLibrary = () => Object.values(localStorage).map(book => JSON.parse(book));


  render() {
    const sortedBooks = this.state.books.sort((a, b) => (a.id > b.id)? 1 : -1);
    return (
      <div>
        <BookForm addBook={this.addBook} />
        <BookTable 
          books={sortedBooks} 
          removeBook={this.removeBook} 
          readToggle={this.readToggle}
        />
      </div>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
    <div className='header'>
      <h1>My Library</h1>
    </div>
    <Library />
  </React.StrictMode>,
  document.getElementById('root')
);

