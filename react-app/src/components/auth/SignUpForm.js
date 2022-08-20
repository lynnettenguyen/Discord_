import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import "../CSS/SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='main-form-outer'>
      <div className='outer-form'>
        <form onSubmit={onSignUp}>
          <div className='form-header'>
            Create an account
          </div>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label className='form-label'>EMAIL</label>
            <input
              type='text'
              className='form-input'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label className='form-label'>USERNAME</label>
            <input
              type='text'
              className='form-input'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label className='form-label'>PASSWORD</label>
            <input
              type='password'
              className='form-input'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label className='form-label'>REPEAT PASSWORD</label>
            <input
              type='password'
              className='form-input'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='form-button-outer'>
            <button className='form-button' type='submit'>Continue</button>
          </div>
          <div>
            <NavLink to='/login'>Already Have an account?</NavLink>
          </div>
          <div>By registering, you agree to notDiscord's Terms of Service and Privacy Policy.</div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
