import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleCategory } from '../store/colors';

class ColorCategory extends React.Component {
  componentDidMount() {
    this.props.fetchSingleCategory(this.props.match.path.slice(1));
  }
  render() {
    const { colors } = this.props;
    if (this.props.loading) {
      return (
        <img
          src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif"
          className="loading-img"
        />
      );
    } else {
      return (
        <div id="all-category-container">
          {console.log('THIS.PROPS: ', this.props)}
          <h1 id="category-title">{colors.colorCategory.name}</h1>
          <div id="ind-colors-container">
            {console.log(
              colors.colorCategory.colors,
              Array.isArray(colors.colorCategory.colors)
            )}
            {colors.colorCategory.colors.map(color => (
              <Link to={`/colors/${color.id}`} key={color.id}>
                <div
                  className="color-container"
                  style={{ backgroundColor: `${color.hexCode}` }}
                >
                  <button type="button">{color.hexCode}</button>
                </div>
              </Link>
            ))}
          </div>
          <br />
          <br />
          <Link to="/" className="wrapper" style={{ textDecoration: 'none' }}>
            <button type="button" className="pointer-cursor">
              Back to all colors
            </button>
          </Link>
          <br />
          <br />
        </div>
      );
    }
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
    fetchSingleCategory: function(name) {
      dispatch(fetchSingleCategory(name));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorCategory);
