import { ref } from 'vue';
import { auth } from 'src/firebase'; // Assuming you have Firebase initialized in a separate file

const user = ref(null);

auth.onAuthStateChanged((firebaseUser) => {
  user.value = firebaseUser;
});

export function useAuth() {
  const isLoggedIn = ref(false);

  auth.onAuthStateChanged((firebaseUser) => {
    isLoggedIn.value = !!firebaseUser;
  });

  function logout() {
    auth.signOut();
  }

  return {
    isLoggedIn,
    logout
  };
}
