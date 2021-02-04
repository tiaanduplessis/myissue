import React, { useState, useEffect, useContext, createContext } from "react"
import {useRouter} from 'next/router'

import { createUser } from "./db"
import firebase from "./firebase"


const authContext = createContext()

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}

export function AuthProvider({ children }) {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useAuthProvider() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      createUser(user.uid, user)
      setUser(user)

      if(['/', '/sign-in'].includes(router.pathname)) {
        router.push('/projects')
      }

      return user
    } else {
      setUser(false)
      router.push('/')
      return false
    }
  }

  const signinWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user))
  }

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false)
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)
    return () => unsubscribe()
  }, [])

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  }
}

export const getToken = () =>
  firebase.auth().currentUser
    ? firebase.auth().currentUser.getIdToken()
    : Promise.resolve(null)
