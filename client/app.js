import React from 'react';
import Routes from './routes';
import Nav from './components/nav';

const App = () => {
  return (
    <div>
      <Nav />
      <div id="app-flex">
        <Routes />
      </div>
    </div>
  );
};

export default App;
