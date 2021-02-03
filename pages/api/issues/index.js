import {getAllIssuesForUser} from '@/lib/db-admin';

export default async (req, res) => {
  const { uid } = await auth.verifyIdToken(req.headers.authorization);
  const issues = await getAllIssuesForUser(uid)
  res.status(200).json(issues);
};