import { auth } from './index.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Loading, Notify } from 'quasar';
import firebaseErrorMessages from './firebase-errormessages';
import { useUI } from 'stores/ui';

const FirebaseLogin = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
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

export default FirebaseLogin;
