import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const generateID = (function () {
  let id = 0;
  function newID() {
      return id++;
  }
  return {newID}
})();


const BookTable = (props) => {
  const renderTableData = () => {
    return props.books.map((book) => {
      const {title, author, pages, read, id,} = book;
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
    const updatedBooks = this.state.books.filter((book) => book.id !== id);
    this.setState({books: updatedBooks})
  }

  readToggle(id) {
    const books = [...this.state.books];
    const index = books.findIndex(book => book.id === id);
    books[index].read = (books[index].read === 'yes')? 'no' : 'yes';

    this.setState({
      books,
    })
  }

  render() {
    return (
      <div>
        <h1>My Library</h1>
        <BookForm addBook={this.addBook} />
        <BookTable books={this.state.books} removeBook={this.removeBook} readToggle={this.readToggle}/>
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

