import './App.css'

import AsideMenu from './components/asideMenu/AsideMenu';
import Content from './components/content/mainContent/Content';
import Header from './components/header/Header';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import StoreProvider from './store/StoreProvider';

const App = () => {

  return (
    <StoreProvider>
      <Header />
      <Router>
        <div className='content-wrapper'>
          <AsideMenu />
          <Content />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
