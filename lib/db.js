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

export const createIssue = (data) => firestore.collection("issues").add(data)
