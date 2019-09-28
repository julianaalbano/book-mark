import React from 'react';
import { connect } from 'react-redux';
import { fetchAllBooks } from '../store/colors';
import { Link } from 'react-router-dom';

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      colorsPerPage: 12,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchColors();
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    const { colors } = this.props;
    const { currentPage, colorsPerPage } = this.state;
    if (this.props.loading) {
      return (
        <img
          src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif"
          className="loading-img"
        />
      );
    }

    const indexOfLastColor = currentPage * colorsPerPage;
    const indexOfFirstColor = indexOfLastColor - colorsPerPage;
    const currentColors = colors.allColors.slice(
      indexOfFirstColor,
      indexOfLastColor
    );

    const renderColors = currentColors.map(color => {
      return (
        <Link to={`/colors/${color.id}`} key={color.id}>
          <div
            className="color-container"
            style={{ backgroundColor: `${color.hexCode}` }}
          >
            <button type="button">{color.hexCode}</button>
          </div>
        </Link>
      );
    });

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(colors.allColors.length / colorsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if (number === this.state.currentPage) {
        return (
          <button
            key={number}
            type="button"
            className="ind-page-nums"
            id={number}
            onClick={this.handleClick}
            style={{ textDecoration: 'underline', fontWeight: 900 }}
          >
            {number}
          </button>
        );
      } else {
        return (
          <button
            key={number}
            type="button"
            className="ind-page-nums"
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </button>
        );
      }
    });

    return (
      <div id="span-page">
        <div id="all-colors-container">{renderColors}</div>
        <p id="page-numbers">{renderPageNumbers}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    colors: state.colors,
    loading: state.colors.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchColors: function() {
      dispatch(fetchColors());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);
