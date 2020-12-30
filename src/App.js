import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import User from './Components/User/User';
import ProtectedRoute from './Components/Helpers/ProtectedRoute';

import { UserStorage } from './UserContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="AppBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <ProtectedRoute path="account/*" element={<User />} />
              <Route path="*">
                <div>404 - Not Found</div>
              </Route>
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
