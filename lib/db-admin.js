import { compareDesc, parseISO } from "date-fns"

import { db } from "./firebase-admin"

export const getAllProjectsForUser = async (authorId) => {
  try {
    const snapshot = await db
      .collection("projects")
      .where("authorId", "==", authorId)
      .get()
    const projects = []

    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() })
    })

    projects.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )

    return { projects }
  } catch (error) {
    return { error }
  }
}

export const getAllBugsForProject = async (authorId, projectId) => {
  try {
    const snapshot = await db
      .collection("bugs")
      .where("authorId", "==", authorId)
      .where("projectId", "==", projectId)
      .get()

    const bugs = []

    snapshot.forEach((doc) => {
      bugs.push({ id: doc.id, ...doc.data() })
    })

    bugs.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    )

    return { bugs }
  } catch (error) {
    return { error }
  }
}

export const getBugById = async (id) => {
  try {
    const doc = await db.collection("bugs").doc(id).get()
    return { bug: { id: doc.id, ...doc.data() } }
  } catch (error) {
    return { error }
  }
}

export const getAllBugsForUser = async (authorId) => {
  try {
    const snapshot = await db
      .collection("bugs")
      .where("authorId", "==", authorId)
      .get()
    const bugs = []

    snapshot.forEach((doc) => {
      bugs.push({ id: doc.id, ...doc.data() })
    })

    bugs.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )

    return { bugs }
  } catch (error) {
    return { error }
  }
}

export const getAllFeaturesForProject = async (authorId, projectId) => {
  try {
    const snapshot = await db
      .collection("features")
      .where("authorId", "==", authorId)
      .where("projectId", "==", projectId)
      .get()

    const features = []

    snapshot.forEach((doc) => {
      features.push({ id: doc.id, ...doc.data() })
    })

    features.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    )

    return { features }
  } catch (error) {
    return { error }
  }
}

export const getAllFeaturesForUser = async (authorId) => {
  try {
    const snapshot = await db
      .collection("features")
      .where("authorId", "==", authorId)
      .get()
    const features = []

    snapshot.forEach((doc) => {
      features.push({ id: doc.id, ...doc.data() })
    })

    features.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )
    return { features }
  } catch (error) {
    return { error }
  }
}

export const getFeatureById = async (id) => {
  try {
    const doc = await db.collection("features").doc(id).get()
    return { feature: { id: doc.id, ...doc.data() } }
  } catch (error) {
    return { error }
  }
}