import { auth } from './index.js';
import { signOut } from 'firebase/auth';
import { Loading, Notify } from 'quasar';
import firebaseErrorMessages from './firebase-errormessages';
import { useUI } from 'stores/ui';

const FirebaseSignOut = () => {
  return new Promise((resolve, reject) => {
    Loading.show();

    signOut(auth)
      .then(() => {
        const ui = useUI();

        Loading.hide();
        resolve();
        ui.offAuthUser();
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

export default FirebaseSignOut;
