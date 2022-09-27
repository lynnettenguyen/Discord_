import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import "../CSS/SignUpForm.css"

const SignUpForm = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const blue = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/blue.png'
  const green = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/green.png'
  const lightBlue = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/light-blue.png'
  const pink = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/light-pink.png'
  const purple = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/purple.png'
  const darkPink = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/pink.png'
  const red = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/red.png'
  const yellow = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/yellow.png'
  const lightPurple = 'https://res.cloudinary.com/dv3qturtv/image/upload/v1661582933/light-purple.png'

  const userPfps = [blue, green, lightBlue, darkPink, purple, pink, red, yellow, lightPurple]
  const randomPfp = userPfps[Math.floor(Math.random() * userPfps.length)];

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_pic, setProfilePic] = useState(randomPfp)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profile_pic));
      if (data) {
        setErrors(data)
      }
    } else setErrors(['password: Password does not match'])
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

  const updateProfilePic = (e) => {
    setProfilePic(e.target.value);
  };

  if (user) {
    return <Redirect to='/noServer' />;
  }

  return (
    <div className='main-form-outer'>
      <div className='outer-form'>
        <form onSubmit={onSignUp}>
          <div className='form-header'>
            Create an account
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>EMAIL</label>
            </div>
            <input
              type='email'
              className='form-input'
              name='email'
              onChange={updateEmail}
              value={email}
              required
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>USERNAME</label>
            </div>
            <input
              type='text'
              className='form-input'
              name='username'
              onChange={updateUsername}
              value={username}
              required
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>PASSWORD</label>
            </div>
            <input
              type='password'
              className='form-input'
              name='password'
              onChange={updatePassword}
              value={password}
              required
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>REPEAT PASSWORD</label>
            </div>
            <input
              type='password'
              className='form-input'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>PROFILE PIC</label>
            </div>
            <input
              type='text'
              className='form-input'
              name='profile_pic'
              onChange={updateProfilePic}
              value={profile_pic}
              required
            />
          </div>
          <div className='signup-errors'>
            {errors.map((error, ind) => (
              <li className='signup-errors-inner' key={ind}>{error.split(":")[1]}</li>
            ))}
          </div>
          <div className='form-button-outer'>
            <button className='form-button' type='submit'>Continue</button>
          </div>
          <div className='redirect-login'>
            <NavLink id='navLink-login' to='/login'>Already have an account?</NavLink>
          </div>
          <div className='form-terms'>By registering, you agree to !Discord's Terms of Service and Privacy Policy.</div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
