import { compareDesc, parseISO } from 'date-fns';

import firebase from './firebase-admin';

export async function getAllIssuesForProject(projectId) {
  try {
    const snapshot = await firebase
      .collection('issues')
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

export const getAllProjects = async () => {
  try {
    const snapshot = await firebase.collection('projects').get();
    const projects = [];

    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    return { projects };
  } catch (error) {
    return { error };
  }
}

export const getAllIssues = async () => {
  try {
    const snapshot = await firebase.collection('issues').get();
    const issues = [];

    snapshot.forEach((doc) => {
      issues.push({ id: doc.id, ...doc.data() });
    });

    return { issues };
  } catch (error) {
    return { error };
  }
}