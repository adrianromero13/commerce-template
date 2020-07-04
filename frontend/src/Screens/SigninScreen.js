import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './../index.css';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      //
    };
  }, [])
  const submitHandler = (e) => {
    e.preventDefault();

  }
  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <ul classname='form-container'>
          <li>
            <h3>Sign In</h3>
          </li>
          <li>
            <label for='email'>
              Email
                    </label>
            <input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)}>
            </input>
          </li>
          <li>
            <label for='password'>
              Password
                    </label>
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)}>
            </input>
          </li>
          <li>
            <button type='submit' className='button primary'>
              Sign In
                    </button>
          </li>
          <li>
            New to CommerceApp?
                </li>
          <li>
            <Link to='/register' className='button full-width' >Create your CommerceApp account</Link>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default SigninScreen;
