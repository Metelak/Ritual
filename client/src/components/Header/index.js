import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
   
  return (
    <header>
      <div>
        <Link to="/">
          <h1>Ritual</h1>
        </Link>

        <nav>
          <Link to="/dashboard">My Rituals</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  )
  };
  
  export default Header;