import React from 'react';
import { connect } from 'react-redux';
import {
  fetchAllBooks,
  fetchPopular,
  fetchNew,
  fetchAllLists,
} from '../store/bestsellers';

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      booksToRender: '',
      bookList: [],
    };
    this.handleClickAll = this.handleClickAll.bind(this);
    this.handleClickNew = this.handleClickNew.bind(this);
    this.handleClickPopular = this.handleClickPopular.bind(this);
    this.handleClickAllLists = this.handleClickAllLists.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllBooks();
    this.props.fetchPopular();
    this.props.fetchNew();
    this.props.fetchAllLists();
  }

  async handleClickAll() {
    await this.setState({
      booksToRender: 'ALL',
    });
  }

  async handleClickNew() {
    await this.setState({
      booksToRender: 'NEW',
    });
  }

  async handleClickPopular() {
    await this.setState({
      booksToRender: 'POPULAR',
    });
  }

  async handleClickAllLists() {
    await this.setState({
      booksToRender: 'LIST',
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>New York Times Bestsellers</h1>
          <p>Category</p>
          <button type="button" onClick={this.handleClickAllLists}>
            Lists
          </button>
          {/* <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select> */}
          <p>Author</p>
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <br />
          <button type="button" onClick={this.handleClickAll}>
            All
          </button>
          <button type="button" onClick={this.handleClickPopular}>
            Popularity
          </button>
          <br />
          <button type="button" onClick={this.handleClickNew}>
            New
          </button>
        </div>

        <div>
          {this.props.loading ? (
            <img
              src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif"
              className="loading-img"
            />
          ) : this.state.booksToRender === 'LIST' ? (
            <div>
              <h1>LIST</h1>
              <div id="book-map-container">
                {this.props.allLists.map(list => (
                  <div key={list.id} className="book-map">
                    <p>{list.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : this.state.booksToRender === 'POPULAR' ? (
            <div>
              <h1>Popular Bestsellers</h1>
              <div id="book-map-container">
                {this.props.popular.map(book => (
                  <div key={book.id} className="book-map">
                    <img className="book-map-img" src={book.coverArt} />
                    <div>
                      <p>{book.title}</p>
                      <p>by {book.author}</p>
                      <p>Description: {book.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : this.state.booksToRender === 'ALL' ? (
            <div>
              <h1>All Bestsellers</h1>
              <div id="book-map-container">
                {this.props.allBooks.map(book => (
                  <div key={book.id} className="book-map">
                    <img className="book-map-img" src={book.coverArt} />
                    <div>
                      <p>{book.title}</p>
                      <p>by {book.author}</p>
                      <p>Description: {book.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : this.state.booksToRender === 'NEW' ? (
            <div>
              <h1>New Bestsellers</h1>
              <div id="book-map-container">
                {this.props.new.map(book => (
                  <div key={book.id} className="book-map">
                    <img className="book-map-img" src={book.coverArt} />
                    <div>
                      <p>{book.title}</p>
                      <p>by {book.author}</p>
                      <p>Description: {book.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>d–(^ ‿ ^ )z </p>
          )}
        </div>
      </div>
    );
  }
}
// }

function mapStateToProps(state) {
  return {
    allBooks: state.bestsellers.allBooks,
    loading: state.bestsellers.loading,
    popular: state.bestsellers.popular,
    new: state.bestsellers.new,
    allLists: state.bestsellers.allLists,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllBooks: function() {
      dispatch(fetchAllBooks());
    },
    fetchPopular: function() {
      dispatch(fetchPopular());
    },
    fetchNew: function() {
      dispatch(fetchNew());
    },
    fetchAllLists: function() {
      dispatch(fetchAllLists());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);
