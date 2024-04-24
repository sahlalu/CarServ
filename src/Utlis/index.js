import axios from 'axios';

export const checkUserIsAdmin = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const { userRoles } =currentUser;
    if (userRoles.includes('admin')) return true;

    return false;
}

export const apiInstance = axios.create({
    baseURL: 'https://us-central1-carserv-e40f1.cloudfunctions.net/api'
  });