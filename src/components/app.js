import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Header from './header';
import Content from './content';

const App = () => (
  <Router handler='{App}'>
    <div>
      <Header />
      <Content />
    </div>
  </Router>
);

export default App;
