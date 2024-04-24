import React from 'react';
import './styles.scss';
import userIMG from './../../assets/user.png';
import {  useNavigate } from 'react-router-dom';


const UserProfile = props => {  
  const { currentUser } = props;
  const { displayName } = currentUser;
  const navigate = useNavigate();

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            <a href="/dashboard"><img src={userIMG} /></a>
          </div>
        </li>
        <li>
          <span className="displayName" >
            {displayName && displayName}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;