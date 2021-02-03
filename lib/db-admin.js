import { compareDesc, parseISO } from 'date-fns';

import {db} from './firebase-admin';

export async function getAllIssuesForProject(userId, projectId) {
  try {
    const snapshot = await db
      .collection('issues')
      .where('userId', '==', userId)
      .where('projectId', '==', projectId)
      .get();

    const issues = [];

    snapshot.forEach((doc) => {
        issues.push({ id: doc.id, ...doc.data() });
    });

    issues.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { issues };
  } catch (error) {
    return { error };
  }
}

export const getAllProjectsForUser = async (userId) => {
  
  try {
    const snapshot = await db
      .collection('projects')
      .where('userId', '==', userId)
      .get();
    const projects = [];

    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    return { projects };
  } catch (error) {
    return { error };
  }
}

export const getIssueById = async (id) => {
  try {
    const doc = await db
      .collection('issues')
      .doc(id)
      .get();

    return { issue: { id: doc.id, ...doc.data() } };
  } catch (error) {
    return { error };
  }
}

export const getAllIssuesForUser = async (userId) => {
  try {
    const snapshot = await db
      .collection('issues')
      .where('userId', '==', userId)
      .get();
    const issues = [];

    snapshot.forEach((doc) => {
      issues.push({ id: doc.id, ...doc.data() });
    });

    return { issues };
  } catch (error) {
    return { error };
  }
}