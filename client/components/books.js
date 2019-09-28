import React from 'react';
import { connect } from 'react-redux';
import { fetchAllBooks, fetchPopular, fetchNew } from '../store/bestsellers';
// import { Link } from 'react-router-dom';

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      booksToRender: '',
    };
    this.handleClickAll = this.handleClickAll.bind(this);
    this.handleClickNew = this.handleClickNew.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllBooks();
    this.props.fetchPopular();
    this.props.fetchNew();
  }

  async handleClickAll() {
    console.log('MADE IT TO HANDLECLICKALL');
    console.log('old state: ', this.state);
    await this.setState({
      booksToRender: 'ALL',
    });
    console.log('new state: ', this.state);
  }

  async handleClickNew() {
    console.log('MADE IT TO HANDLECLICKALL');
    console.log('old state: ', this.state);
    await this.setState({
      booksToRender: 'NEW',
    });
    console.log('new state: ', this.state);
  }

  render() {
    // const { allBooks } = this.props;
    // if (this.props.loading) {
    //   return (
    //     <img
    //       src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif"
    //       className="loading-img"
    //     />
    //   );
    // } else {
    return (
      <div>
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);
