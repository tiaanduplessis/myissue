import firebase from './firebase';

const firestore = firebase.firestore();

export function addUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function addProject(data) {
    return firestore.collection('projects').add(data);
  }
