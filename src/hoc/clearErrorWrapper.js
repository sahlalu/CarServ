import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserError } from '../redux/User/user.actions';

const mapState = ({ user }) => ({
    userErr: user.userErr
  });

const ErrorClearingRouteWrapper = ({ children }) => {
  const { userErr } = useSelector(mapState);
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUserError());
    setErrors([]);
  }, [location.pathname, dispatch]);

  return <>{children}</>;
};

export default ErrorClearingRouteWrapper;