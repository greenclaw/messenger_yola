import { firebase } from './firebase';

const auth = firebase.auth();
auth.useDeviceLanguage();

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);


export const signInWithPopup = (provider) => 
  auth.signInWithPopup(provider);


export const signInWithRedirect = (provider) => 
  auth.signInWithRedirect(provider);
