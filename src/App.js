import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Navigate to="/posts" />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails/>} />
          <Route path='/auth' exact element={(user ? <Navigate to="/posts" /> : <Auth /> )} />
        </Routes>
      </Container>
    </Router>

  )
}

export default App;