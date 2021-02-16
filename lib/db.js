import firebase from "./firebase"

const firestore = firebase.firestore()

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

export const createProject = (data) =>
  firestore.collection("projects").add(data)

export const deleteProject = (id) =>  firestore.collection('projects').doc(id).delete();

export const createBug = (data) => firestore.collection("bugs").add(data)

export const deleteBug = (id) => firestore.collection('bugs').doc(id).delete()

export const createFeature = (data) => firestore.collection("features").add(data)

export const deleteFeature = (id) => firestore.collection('features').doc(id).delete()

