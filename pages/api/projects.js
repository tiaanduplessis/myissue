import db from '@/lib/firebase-admin';

export default async (_, res) => {
    // TODO: Filter to user
  const snapshot = await db.collection('projects').get();
  const projects = [];

  snapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ projects });
};