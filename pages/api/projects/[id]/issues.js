import {getAllIssuesForProject} from '@/lib/db-admin';

export default async (req, res) => {
  const issues = await getAllIssuesForProject(req.query.id)
  res.status(200).json(issues);
};