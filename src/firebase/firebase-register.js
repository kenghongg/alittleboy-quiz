import { auth } from './index.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Loading, Notify } from 'quasar';
import firebaseErrorMessages from './firebase-errormessages';
import { useUI } from 'stores/ui';

const FirebaseRegister = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // updateProfile(userCredential.user, {
        //   displayName: data.first_name + ' ' + data.last_name
        // });
        const ui = useUI();

        Loading.hide();
        resolve(userCredential.user);
        ui.onAuthUser();
      })
      .catch((err) => {
        Loading.hide();
        const message = firebaseErrorMessages[err.code] || 'An error occurred. Please try again.';

        Notify.create({
          type: 'negative',
          message: message,
          position: 'top'
        });
        reject(err.message);
      });
  });
};

export default FirebaseRegister;
