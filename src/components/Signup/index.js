import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { signUpUserStart, clearUserError } from '../../redux/User/user.actions';
import FormInput from '../forms/FormInput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

const Signup = props => {
  const {currentUser, userErr} = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [shouldRender1, setShouldRender] = useState(true);

  const clearError = () => {
    dispatch(clearUserError());
    setErrors([]);
  };

  useEffect(() => {
    if (!shouldRender1) {
      clearError();
    }
  }, [shouldRender1]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleInputChange = () => {
    setErrors([]);
  };

  useEffect(() => {
    if (currentUser){
      reset();
      navigate('/');
    }
  }, [currentUser, navigate]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(signUpUserStart({
      displayName,
      email,
      password,
      confirmPassword
    })); 
  }
    return (
      <AuthWrapper key={shouldRender1}>

          <div className="formwrap">
          <h2>Registration</h2>
          {errors.length > 0 && (
            <ul>
              {errors.map((err, reg) => {
                return <li key={reg}>{err}</li>;
              })}
            </ul>
          )}

            <form onSubmit={handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full Name"
                handleChange={e => {setDisplayName(e.target.value);
                  handleInputChange();
                }}
                required={true}
              />
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={e => {setEmail(e.target.value);
                  handleInputChange();
                }}
                required={true}
              />
              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                handleChange={e => {setPassword(e.target.value);
                  handleInputChange();
                }}
                required={true}
              />
              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                handleChange={e => {setConfirmPassword(e.target.value);
                  handleInputChange();
                }}
                required={true}
              />
              <Button type="submit">Register</Button>
            </form>
          </div>
          </AuthWrapper>
    );
  }
export default Signup;
