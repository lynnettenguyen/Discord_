import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import "../CSS/SignUpForm.css"
import "../CSS/LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='main-form-outer'>
      <div className='outer-form-login'>
        <form onSubmit={onLogin}>
          <div className='form-header'>
            Welcome back!
          </div>
            <div className='login-caption'>We're so excited to see you again!</div>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form-section'>
            <div className='form-label'>
            <label htmlFor='email'>EMAIL</label>
            </div>
            <input
              name='email'
              className='form-input'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
            <label htmlFor='password'>PASSWORD</label>
            </div>
            <input
              name='password'
              className='form-input'
              type='password'
              value={password}
              onChange={updatePassword}
            />
            <div className='form-button-outer'>
              <button className='form-button-login' type='submit'>Log In</button>
            </div>
            <div className='redirect-register'>
              <span class='redirect-span'>Need an Account?</span>
              <NavLink to='/register'>Register</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
