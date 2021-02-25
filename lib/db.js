import firebase from "./firebase"

const firestore = firebase.firestore()

const collections = {
  users: "users",
  projects: "projects",
  bugs: "bugs",
  features: "features",
}

export function createUser(uid, data) {
  return firestore
    .collection(collections.users)
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

export const createProject = (data) =>
  firestore.collection(collections.projects).add(data)

export const deleteProject = (id) =>
  firestore.collection(collections.projects).doc(id).delete()

export const createBug = (data) =>
  firestore.collection(collections.bugs).add(data)

export const deleteBug = (id) =>
  firestore.collection(collections.bugs).doc(id).delete()

export const createFeature = (data) =>
  firestore.collection(collections.features).add(data)

export const deleteFeature = (id) =>
  firestore.collection(collections.features).doc(id).delete()
