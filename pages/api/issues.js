import db from '@/lib/firebase-admin';

export default async (_, res) => {
    // TODO: Filter to user
  const snapshot = await db.collection('issues').get();
  const issues = [];

  snapshot.forEach((doc) => {
    issues.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ issues });
};