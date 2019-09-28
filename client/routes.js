import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Books from './components/books';
// import SingleBook from './components/singlebook';
// import Lists from './components/lists';

// import Colors from './components/colors';
// import SingleColor from './components/singleColor';
// import colorCategory from './components/colorCategory';

const Routes = props => {
  return (
    <Switch>
      {/* <Route exact path="/" component={Colors} /> */}
      <Route exact path="/" component={Books} />
      {/* <Route exact path="/colors/:hexName" component={SingleColor} /> */}
      {/* <Route exact path="/colors/:hexName" component={SingleBook} /> */}
      {/* <Route exact path="/Red" component={colorCategory} /> */}
      {/* <Route exact path="/Red" component={Lists} /> */}
      {/* <Route exact path="/Purple" component={colorCategory} />
      <Route exact path="/Brown" component={colorCategory} />
      <Route exact path="/Gray" component={colorCategory} /> */}
    </Switch>
  );
};

export default withRouter(Routes);
