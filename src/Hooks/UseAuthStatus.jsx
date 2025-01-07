import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuthStatus() {
  // Login status of the user
  const [loggedIn, setLoggedIn] = useState(false);

  // Checking status of authentication
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Check if a user is logged in immediately when the page loads
  useEffect(() => {
    const auth = getAuth();

    // Set up a listener to check if a user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }

      setCheckingStatus(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return { loggedIn, checkingStatus };
}
