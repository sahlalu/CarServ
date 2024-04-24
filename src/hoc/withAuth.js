import { useAuth } from "../customHooks";
import { useNavigate } from 'react-router-dom';

const WithAuth = props => {
  const navigate = useNavigate();

  if (!useAuth(props)) {
    navigate('/'); 
    return null; 
  }

  return props.children;
};

export default WithAuth;