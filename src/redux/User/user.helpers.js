import { auth } from "../../firebase/utils";
import { sendPasswordResetEmail } from 'firebase/auth';

export const handleResetPasswordAPI = (email) => {
    const config = {
        url: 'http://localhost:3000/login',
    };
    return new Promise(async (resolve, reject) => {
        try {
            await sendPasswordResetEmail(auth, email, config);
            resolve();
        } catch (err) {
                reject([err.message]);
            
        }
    });
};
