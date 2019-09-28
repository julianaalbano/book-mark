import React from 'react';
import { connect } from 'react-redux';
import { fetchAllBooks } from '../store/bestsellers';
// import { Link } from 'react-router-dom';

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      booksToRender: [],
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllBooks();
  }

  handleClick(event) {
    // this.
  }

  render() {
    const { allBooks } = this.props;
    if (this.props.loading) {
      return (
        <img
          src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif"
          className="loading-img"
        />
      );
    } else {
      return (
        <div>
          <h1>New York Times Bestsellers</h1>
          <p>Category</p>
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <p>Author</p>
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <button type="button" onClick={this.handleClick}>
            Popularity
          </button>
          <button type="button" onClick={this.handleClick}>
            New
          </button>
          <h1>All Bestsellers</h1>
          {allBooks.map(book => (
            <div key={book.id}>
              <img src={book.coverArt} />
              <p>
                {book.title} by {book.author}
              </p>
              <p>Description: {book.description}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    allBooks: state.bestsellers.allBooks,
    loading: state.bestsellers.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllBooks: function() {
      dispatch(fetchAllBooks());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);
