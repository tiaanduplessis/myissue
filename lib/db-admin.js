import { compareDesc, parseISO } from "date-fns"

import { db } from "./firebase-admin"

export async function getAllBugsForProject(userId, projectId) {
  try {
    const snapshot = await db
      .collection("bugs")
      .where("userId", "==", userId)
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

export const getAllProjectsForUser = async (userId) => {
  try {
    const snapshot = await db
      .collection("projects")
      .where("userId", "==", userId)
      .get()
    const projects = []

    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() })
    })

    return { projects }
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

export const getAllBugsForUser = async (userId) => {
  try {
    const snapshot = await db
      .collection("bugs")
      .where("userId", "==", userId)
      .get()
    const bugs = []

    snapshot.forEach((doc) => {
      bugs.push({ id: doc.id, ...doc.data() })
    })

    return { bugs }
  } catch (error) {
    return { error }
  }
}
